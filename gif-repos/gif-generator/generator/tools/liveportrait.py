"""
LivePortrait Tool Wrapper
Animates portraits using AI-based motion transfer
"""

import json
import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class LivePortraitTool(BaseTool):
    """Wrapper for LivePortrait portrait animation"""

    def get_tool_name(self) -> str:
        return "python"  # LivePortrait is a Python script

    def __init__(self, liveportrait_dir: Path = None):
        """
        Initialize LivePortrait tool

        Args:
            liveportrait_dir: Path to LivePortrait directory
                            Defaults to ../../LivePortrait relative to this file
        """
        super().__init__()

        if liveportrait_dir is None:
            # Default to LivePortrait directory in gif-repos
            base_dir = Path(__file__).parent.parent.parent.parent
            self.liveportrait_dir = base_dir / "LivePortrait"
        else:
            self.liveportrait_dir = Path(liveportrait_dir)

        self.inference_script = self.liveportrait_dir / "inference.py"
        self.animals_script = self.liveportrait_dir / "inference_animals.py"

    def is_available(self) -> bool:
        """Check if LivePortrait is available"""
        return (
            self.liveportrait_dir.exists() and
            self.inference_script.exists() and
            super().is_available()  # Check if python is available
        )

    def check_available(self):
        """Raise error if LivePortrait not available"""
        if not self.liveportrait_dir.exists():
            raise ToolExecutionError(
                f"LivePortrait directory not found: {self.liveportrait_dir}\n"
                f"Please clone LivePortrait repository:\n"
                f"  git clone https://github.com/KwaiVGI/LivePortrait\n"
                f"  cd LivePortrait && pip install -r requirements.txt"
            )

        if not self.inference_script.exists():
            raise ToolExecutionError(
                f"LivePortrait inference script not found: {self.inference_script}"
            )

        super().check_available()

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute LivePortrait operation

        Args:
            operation: Operation to perform ('animate_human', 'animate_animal')
            input_path: Path to source portrait image
            output_path: Path to output video/gif
            params: Operation parameters:
                - driving_video: Path to driving video
                - mode: 'human' or 'animal'
                - retargeting: bool, enable retargeting control
                - stitching: bool, enable stitching
                - paste_back: bool, paste animated face back to original image

        Returns:
            Path to output file
        """
        self.check_available()

        # Determine which script to use
        mode = params.get('mode', 'human')
        if mode == 'animal':
            script = self.animals_script
        else:
            script = self.inference_script

        # Get driving video path
        driving_video = params.get('driving_video')
        if not driving_video:
            raise ToolExecutionError("driving_video parameter is required")

        driving_video = Path(driving_video)
        if not driving_video.exists():
            raise ToolExecutionError(f"Driving video not found: {driving_video}")

        # Build command
        cmd = [
            str(self.tool_path),
            str(script),
            "--source", str(input_path),
            "--driving", str(driving_video),
            "--output", str(output_path)
        ]

        # Add optional parameters
        if params.get('retargeting', False):
            cmd.append("--flag_do_crop")

        if params.get('stitching', True):
            cmd.append("--flag_stitching")

        if params.get('paste_back', True):
            cmd.append("--flag_pasteback")

        # Execute
        print(f"Running LivePortrait ({mode} mode)...")
        try:
            result = self._run_command(cmd, capture_output=False)

            if not output_path.exists():
                raise ToolExecutionError(
                    f"LivePortrait execution completed but output not found: {output_path}"
                )

            return output_path

        except Exception as e:
            raise ToolExecutionError(
                f"LivePortrait execution failed: {str(e)}\n"
                f"Command: {' '.join(cmd)}"
            )

    def animate_portrait(self, source_image: Path, driving_video: Path,
                        output: Path, mode: str = 'human', **kwargs) -> Path:
        """
        Convenience method to animate a portrait

        Args:
            source_image: Path to source portrait image
            driving_video: Path to driving video
            output: Path to output video
            mode: 'human' or 'animal'
            **kwargs: Additional parameters (retargeting, stitching, paste_back)

        Returns:
            Path to output file
        """
        params = {
            'driving_video': driving_video,
            'mode': mode,
            **kwargs
        }

        return self.execute('animate', source_image, output, params)
