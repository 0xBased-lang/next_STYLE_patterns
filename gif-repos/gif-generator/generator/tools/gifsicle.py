"""
Gifsicle Tool Wrapper
GIF optimization and manipulation
"""

from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class GifsicleTool(BaseTool):
    """Wrapper for gifsicle CLI tool"""

    def get_tool_name(self) -> str:
        return "gifsicle"

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute gifsicle operation

        Supported operations:
        - optimize: Optimize GIF file size

        Parameters for optimize:
        - optimization_level: 1-3 (default: 3)
        - colors: Number of colors 2-256 (default: 256)
        - lossy: Lossy compression amount 0-200 (default: 0, disabled)
        - resize: Resize dimensions like "800x600" (optional)
        - loop: Loop count, 0 for infinite (optional)
        """
        self.check_available()

        if operation == "optimize":
            return self._optimize(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _optimize(self, input_path: Path, output_path: Path,
                 params: Dict[str, Any]) -> Path:
        """Optimize GIF file"""

        # Build command
        cmd = [str(self.tool_path)]

        # Optimization level (ensure int)
        opt_level = int(params.get('optimization_level', 3))
        cmd.append(f"-O{opt_level}")

        # Color reduction (ensure int)
        colors = int(params.get('colors', 256))
        if colors < 256:
            cmd.extend(["--colors", str(colors)])

        # Lossy compression (ensure int)
        lossy = int(params.get('lossy', 0))
        if lossy > 0:
            cmd.append(f"--lossy={lossy}")

        # Resize
        if 'resize' in params:
            resize = params['resize']
            cmd.extend(["--resize", resize])

        # Loop count
        if 'loop' in params:
            loop = params['loop']
            if loop == 0:
                cmd.append("--loopcount=forever")
            else:
                cmd.extend(["--loopcount", str(loop)])

        # Input and output
        cmd.extend([
            str(input_path),
            "-o", str(output_path)
        ])

        print(f"Running: {' '.join(cmd)}")

        # Execute
        try:
            self._run_command(cmd)
        except ToolExecutionError as e:
            if not input_path.exists():
                raise ToolExecutionError(f"Input file not found: {input_path}")
            raise

        # Verify output
        if not output_path.exists():
            raise ToolExecutionError(
                f"Gifsicle completed but output file not created: {output_path}"
            )

        # Print file size reduction
        if input_path != output_path and input_path.exists():
            input_size = input_path.stat().st_size
            output_size = output_path.stat().st_size
            reduction = ((input_size - output_size) / input_size) * 100
            print(f"  Input: {input_size / 1024:.1f} KB")
            print(f"  Output: {output_size / 1024:.1f} KB")
            print(f"  Reduction: {reduction:.1f}%")

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
Gifsicle - GIF Optimizer

Usage:
  optimize: Optimize GIF file size

Parameters:
  optimization_level (int): 1-3 (default: 3)
    1 = Fast, basic optimization
    2 = Good optimization
    3 = Best optimization (slower)

  colors (int): Number of colors 2-256 (default: 256)
    Reducing colors can significantly reduce file size

  lossy (int): Lossy compression 0-200 (default: 0)
    0 = Lossless
    20 = Slight quality loss, good size reduction
    80 = Noticeable quality loss, major size reduction
    200 = Maximum compression

  resize (str): Resize dimensions (optional)
    Examples: "800x600", "640x480", "50%"

  loop (int): Loop count (optional)
    0 = Infinite loop
    N = Loop N times

Example:
  gifsicle.execute('optimize', 'input.gif', 'output.gif', {
      'optimization_level': 3,
      'colors': 128,
      'lossy': 20,
      'resize': '800x600'
  })

Typical Settings:
  - Quick preview: optimization_level=2, colors=128, lossy=30
  - Balanced: optimization_level=3, colors=256, lossy=20
  - High quality: optimization_level=3, colors=256, lossy=10
"""


# Example usage and testing
if __name__ == '__main__':
    tool = GifsicleTool()

    if tool.is_available():
        print(f"✅ Gifsicle found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ Gifsicle not found")
        print("Install: https://www.lcdf.org/gifsicle/")
        print("  macOS: brew install gifsicle")
        print("  Ubuntu: apt-get install gifsicle")
