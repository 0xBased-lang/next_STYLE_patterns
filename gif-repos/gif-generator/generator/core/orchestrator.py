"""
Pipeline Orchestrator
Executes multi-step template pipelines with tool coordination
"""

from pathlib import Path
from typing import Dict, Any, Optional
import time
import tempfile
from dataclasses import dataclass

from .template import Template, substitute_variables
from ..tools.base import ToolNotFoundError, ToolExecutionError
from ..tools.gifcurry import GifcurryTool
from ..tools.gifsicle import GifsicleTool
from ..tools.liveportrait import LivePortraitTool
from ..tools.first_order_model import FirstOrderModelTool


@dataclass
class ExecutionResult:
    """Result of pipeline execution"""
    success: bool
    output_path: Optional[Path]
    duration_seconds: float
    steps_completed: int
    total_steps: int
    error_message: Optional[str] = None


class PipelineOrchestrator:
    """Executes template pipelines"""

    def __init__(self, temp_dir: Optional[Path] = None):
        """
        Initialize orchestrator

        Args:
            temp_dir: Temporary directory for intermediate files (optional)
        """
        self.temp_dir = Path(temp_dir) if temp_dir else Path(tempfile.gettempdir()) / 'gif-generator'
        self.temp_dir.mkdir(parents=True, exist_ok=True)

        # Initialize tools
        self.tools = {
            'gifcurry': GifcurryTool(),
            'gifsicle': GifsicleTool(),
            'liveportrait': LivePortraitTool(),
            'first-order-model': FirstOrderModelTool(),
        }

    def execute(self, template: Template, resolved_vars: Dict[str, Any],
                output_path: Path) -> ExecutionResult:
        """
        Execute template pipeline

        Args:
            template: Template to execute
            resolved_vars: Resolved variables (from user + preset)
            output_path: Final output file path

        Returns:
            ExecutionResult with execution details
        """
        start_time = time.time()
        steps_completed = 0
        total_steps = len(template.pipeline)

        try:
            print(f"\n🎬 Executing: {template.name}")
            print(f"   Steps: {total_steps}")
            print(f"   Output: {output_path}")
            print()

            current_input = None
            current_output = None

            for i, step in enumerate(template.pipeline, 1):
                print(f"📝 Step {i}/{total_steps}: {step['tool']} - {step['operation']}")

                # Get tool
                tool_name = step['tool']
                if tool_name not in self.tools:
                    raise ValueError(f"Unknown tool: {tool_name}")

                tool = self.tools[tool_name]

                # Check tool availability
                if not tool.is_available():
                    raise ToolNotFoundError(
                        f"Tool '{tool_name}' is not installed.\n"
                        f"Please install it before running this template."
                    )

                # Resolve step input
                step_input = self._resolve_path(step['input'], resolved_vars, current_output)

                # Resolve step output
                if i == total_steps:
                    # Last step - use final output path
                    step_output = output_path
                else:
                    # Intermediate step - use temp file
                    step_output = self.temp_dir / f"step_{i}_output.gif"

                # Resolve parameters
                step_params = self._resolve_params(step['params'], resolved_vars)

                # Execute tool
                print(f"   Input: {step_input}")
                print(f"   Output: {step_output}")

                try:
                    result_path = tool.execute(
                        operation=step['operation'],
                        input_path=step_input,
                        output_path=step_output,
                        params=step_params
                    )

                    current_output = result_path
                    steps_completed += 1
                    print(f"   ✅ Complete")
                    print()

                except ToolExecutionError as e:
                    raise ToolExecutionError(f"Step {i} failed: {e}")

            # Success!
            duration = time.time() - start_time

            print(f"✨ Pipeline complete!")
            print(f"   Duration: {duration:.1f}s")
            print(f"   Output: {output_path}")

            if output_path.exists():
                size_mb = output_path.stat().st_size / (1024 * 1024)
                print(f"   Size: {size_mb:.2f} MB")

            return ExecutionResult(
                success=True,
                output_path=output_path,
                duration_seconds=duration,
                steps_completed=steps_completed,
                total_steps=total_steps
            )

        except Exception as e:
            duration = time.time() - start_time

            print(f"\n❌ Pipeline failed!")
            print(f"   Error: {e}")
            print(f"   Steps completed: {steps_completed}/{total_steps}")

            return ExecutionResult(
                success=False,
                output_path=None,
                duration_seconds=duration,
                steps_completed=steps_completed,
                total_steps=total_steps,
                error_message=str(e)
            )

    def _resolve_path(self, path_template: str, variables: Dict[str, Any],
                     previous_output: Optional[Path]) -> Path:
        """Resolve path with variable substitution"""

        # Substitute variables
        resolved = substitute_variables(path_template, variables)

        # Handle special cases
        if resolved == 'previous_output' or resolved == '{{previous_output}}':
            if previous_output is None:
                raise ValueError("No previous output available")
            return previous_output

        return Path(resolved)

    def _resolve_params(self, params: Dict[str, Any],
                       variables: Dict[str, Any]) -> Dict[str, Any]:
        """Resolve parameters with variable substitution"""

        resolved = {}

        for key, value in params.items():
            if isinstance(value, str):
                resolved[key] = substitute_variables(value, variables)
            elif isinstance(value, dict):
                resolved[key] = self._resolve_params(value, variables)
            else:
                resolved[key] = value

        return resolved

    def check_tools(self, template: Template) -> Dict[str, bool]:
        """
        Check which tools are available for template

        Returns:
            Dict mapping tool names to availability status
        """
        tool_status = {}

        for step in template.pipeline:
            tool_name = step['tool']
            if tool_name not in tool_status:
                if tool_name in self.tools:
                    tool_status[tool_name] = self.tools[tool_name].is_available()
                else:
                    tool_status[tool_name] = False

        return tool_status

    def cleanup_temp_files(self):
        """Clean up temporary files"""
        if self.temp_dir.exists():
            for file in self.temp_dir.glob('step_*_output.*'):
                try:
                    file.unlink()
                except Exception:
                    pass


# Example usage
if __name__ == '__main__':
    from .template import TemplateLoader

    # Load a template
    loader = TemplateLoader(Path(__file__).parent.parent.parent / 'templates')
    template = loader.load_template('social-media/twitter-demo')

    # Resolve variables
    user_vars = {
        'video_path': 'demo.mp4',
        'product_name': 'My Product'
    }
    resolved = template.resolve_variables(user_vars, preset_name='balanced')

    # Check tools
    orchestrator = PipelineOrchestrator()
    tool_status = orchestrator.check_tools(template)

    print("Tool availability:")
    for tool, available in tool_status.items():
        status = "✅" if available else "❌"
        print(f"  {status} {tool}")

    # Would execute if tools available and video exists:
    # output_path = Path('output.gif')
    # result = orchestrator.execute(template, resolved, output_path)
