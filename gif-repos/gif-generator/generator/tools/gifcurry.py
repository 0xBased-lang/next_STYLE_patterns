"""
Gifcurry Tool Wrapper
Video to GIF converter with text overlays
"""

from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class GifcurryTool(BaseTool):
    """Wrapper for gifcurry CLI tool"""

    def get_tool_name(self) -> str:
        return "gifcurry_cli"

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute gifcurry operation

        Supported operations:
        - create_gif: Convert video to GIF with optional text overlay

        Parameters:
        - start_time: Start time in seconds (default: 0)
        - duration: Duration in seconds (default: 5)
        - width: Output width in pixels (default: 640)
        - height: Output height in pixels (optional, maintains aspect if not set)
        - quality: Quality 1-100 (default: 100)
        - fps: Frames per second (default: 15)
        - text_overlay: Dict with text overlay settings (optional)
        """
        self.check_available()

        if operation == "create_gif" or operation == "create_gif_with_text":
            return self._create_gif(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _create_gif(self, input_path: Path, output_path: Path,
                   params: Dict[str, Any]) -> Path:
        """Create GIF from video"""

        # Build command
        cmd = [
            str(self.tool_path),
            "-i", str(input_path),
            "-o", str(output_path),
            "-s", str(params.get('start_time', 0)),
            "-d", str(params.get('duration', 5)),
            "-w", str(params.get('width', 640)),
            "-q", str(params.get('quality', 100)),
            "-r", str(params.get('fps', 15))
        ]

        # Add height if specified
        if 'height' in params:
            cmd.extend(["-h", str(params['height'])])

        # Add text overlay if specified
        text_overlay = params.get('text_overlay', {})
        if text_overlay and text_overlay.get('enabled', False):
            # Top text
            top_text = text_overlay.get('top_text', {})
            if isinstance(top_text, dict) and top_text.get('text'):
                cmd.extend([
                    "-t", top_text['text'],
                    "-f", str(top_text.get('font_size', 40)),
                    "-c", top_text.get('color', 'white'),
                    "-p", top_text.get('position', 'top')
                ])
            elif isinstance(text_overlay, dict) and 'text' in text_overlay:
                # Simple text overlay
                cmd.extend([
                    "-t", text_overlay['text'],
                    "-f", str(text_overlay.get('font_size', 40)),
                    "-c", text_overlay.get('color', 'white')
                ])

        print(f"Running: {' '.join(cmd)}")

        # Execute
        try:
            self._run_command(cmd)
        except ToolExecutionError as e:
            # Provide helpful error message
            if not input_path.exists():
                raise ToolExecutionError(f"Input file not found: {input_path}")
            raise

        # Verify output
        if not output_path.exists():
            raise ToolExecutionError(
                f"Gifcurry completed but output file not created: {output_path}"
            )

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
Gifcurry - Video to GIF Converter

Usage:
  create_gif: Convert video segment to GIF

Parameters:
  start_time (float): Start time in seconds (default: 0)
  duration (float): Duration in seconds (default: 5)
  width (int): Output width in pixels (default: 640)
  height (int): Output height in pixels (optional)
  quality (int): Quality 1-100 (default: 100)
  fps (int): Frames per second (default: 15)
  text_overlay (dict): Text overlay settings
    - enabled (bool): Enable text overlay
    - text (str): Text to display
    - font_size (int): Font size in pixels
    - color (str): Text color
    - position (str): Position (top/bottom/center)

Example:
  gifcurry.execute('create_gif', 'video.mp4', 'output.gif', {
      'start_time': 0,
      'duration': 5,
      'width': 600,
      'fps': 15,
      'text_overlay': {
          'enabled': True,
          'text': 'Hello World',
          'font_size': 48,
          'color': 'white'
      }
  })
"""


# Example usage and testing
if __name__ == '__main__':
    tool = GifcurryTool()

    if tool.is_available():
        print(f"✅ Gifcurry found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ Gifcurry not found")
        print("Install: https://github.com/lettier/gifcurry")
