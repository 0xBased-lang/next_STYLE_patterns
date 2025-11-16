"""
FFmpeg GIF Tool Wrapper
Fallback for gifcurry using ffmpeg for video to GIF conversion
"""

from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class FFmpegGifTool(BaseTool):
    """Wrapper for ffmpeg (as fallback for gifcurry)"""

    def get_tool_name(self) -> str:
        return "ffmpeg"

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute ffmpeg GIF creation operation

        Supported operations:
        - create_gif: Convert video to GIF
        - create_gif_with_text: Convert video to GIF with text overlay

        Parameters:
        - start_time: Start time in seconds (default: 0)
        - duration: Duration in seconds (default: 5)
        - width: Output width in pixels (default: 640)
        - fps: Frames per second (default: 15)
        - quality: Quality/colors (default: 256)
        - text_overlay: Dict with text overlay settings (optional)
        """
        self.check_available()

        if operation in ["create_gif", "create_gif_with_text"]:
            return self._create_gif(input_path, output_path, params,
                                  with_text=(operation == "create_gif_with_text"))
        elif operation == "convert":
            # Basic video-to-GIF conversion without advanced optimizations
            return self._convert(input_path, output_path, params)
        elif operation == "convert_to_gif":
            # Alternative GIF creation (synonym for create_gif for compatibility)
            return self._create_gif(input_path, output_path, params, with_text=False)
        elif operation == "apply_filter":
            # Apply custom ffmpeg filters
            return self._apply_filter(input_path, output_path, params)
        elif operation == "process":
            # Generic processing operation
            return self._process(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _create_gif(self, input_path: Path, output_path: Path,
                   params: Dict[str, Any], with_text: bool = False) -> Path:
        """Create GIF from video using ffmpeg"""

        # Extract parameters (ensure proper types)
        start_time = float(params.get('start_time', 0))
        duration = float(params.get('duration', 5))

        # Handle both old and new parameter naming
        # Old format might have 'end_time', new might have 'duration'
        if 'end_time' in params and 'duration' not in params:
            end_time = float(params['end_time'])
            duration = end_time - start_time

        width = int(params.get('width', 640))
        fps = int(params.get('fps', 15))
        colors = int(params.get('colors', params.get('quality', 256)))

        # Ensure colors doesn't exceed 256 for GIF
        if colors > 256:
            colors = 256

        # Build ffmpeg filter chain
        filters = []

        # Scale filter
        filters.append(f"scale={width}:-1:flags=lanczos")

        # FPS filter
        filters.append(f"fps={fps}")

        # Generate palette for better quality
        filters.append("split[s0][s1]")
        filters.append(f"[s0]palettegen=max_colors={colors}[p]")
        filters.append("[s1][p]paletteuse=dither=bayer:bayer_scale=5")

        # Add text overlay if requested
        if with_text and 'text_overlay' in params:
            text_cfg = params['text_overlay']
            if isinstance(text_cfg, dict) and text_cfg.get('text'):
                text = text_cfg['text'].replace("'", "\\'")  # Escape quotes
                font_size = text_cfg.get('font_size', 36)
                position = text_cfg.get('position', 'bottom')

                # Determine y position
                if position == 'top':
                    y_pos = "20"
                elif position == 'center':
                    y_pos = "(h-text_h)/2"
                else:  # bottom
                    y_pos = "h-th-20"

                # Add drawtext filter before palette generation
                drawtext = (
                    f"drawtext=text='{text}':fontsize={font_size}:"
                    f"fontcolor=white:bordercolor=black:borderw=3:"
                    f"x=(w-text_w)/2:y={y_pos}"
                )
                filters.insert(2, drawtext)  # Insert before split

        filter_complex = ",".join(filters)

        # Build command
        cmd = [
            str(self.tool_path),
            "-ss", str(start_time),
            "-t", str(duration),
            "-i", str(input_path),
            "-filter_complex", filter_complex,
            "-y",  # Overwrite output
            str(output_path)
        ]

        print(f"Running ffmpeg: {' '.join(cmd)}")

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
                f"FFmpeg completed but output file not created: {output_path}"
            )

        return output_path

    def _convert(self, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Basic video-to-GIF conversion without advanced optimizations
        Simpler and faster than create_gif
        """
        # Extract parameters
        start_time = float(params.get('start_time', 0))
        duration = float(params.get('duration', 5))
        width = int(params.get('width', 640))
        fps = int(params.get('fps', 15))

        # Build simple ffmpeg command for basic conversion
        cmd = [
            str(self.tool_path),
            '-ss', str(start_time),
            '-t', str(duration),
            '-i', str(input_path),
            '-vf', f'fps={fps},scale={width}:-1:flags=lanczos',
            '-y',  # Overwrite output
            str(output_path)
        ]

        # Execute
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=self.timeout
        )

        if result.returncode != 0:
            raise ToolExecutionError(
                f"FFmpeg convert failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg convert completed but output file not created: {output_path}"
            )

        return output_path

    def _apply_filter(self, input_path: Path, output_path: Path,
                     params: Dict[str, Any]) -> Path:
        """
        Apply custom ffmpeg filter to video
        """
        # Extract parameters
        filter_str = params.get('filter', params.get('vf', ''))
        if not filter_str:
            raise ValueError("No filter specified for apply_filter operation")

        start_time = float(params.get('start_time', 0))
        duration = float(params.get('duration', 5))

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
            '-ss', str(start_time),
            '-t', str(duration),
            '-i', str(input_path),
            '-vf', filter_str,
            '-y',  # Overwrite output
            str(output_path)
        ]

        # Execute
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=self.timeout
        )

        if result.returncode != 0:
            raise ToolExecutionError(
                f"FFmpeg filter failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg filter completed but output file not created: {output_path}"
            )

        return output_path

    def _process(self, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Generic processing operation - applies whatever parameters are provided
        Falls back to basic conversion if no specific operations specified
        """
        # Check if filter is specified
        if 'filter' in params or 'vf' in params:
            return self._apply_filter(input_path, output_path, params)

        # Otherwise, do basic conversion
        return self._convert(input_path, output_path, params)

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
FFmpeg GIF Tool - Video to GIF Converter (gifcurry fallback)

Operations:
  create_gif: Convert video segment to GIF with palette optimization
  create_gif_with_text: Convert with text overlay
  convert: Basic video-to-GIF conversion (faster, simpler)
  convert_to_gif: Alias for create_gif
  apply_filter: Apply custom ffmpeg filters
  process: Generic processing (auto-detects based on params)

Parameters:
  start_time (float): Start time in seconds (default: 0)
  duration (float): Duration in seconds (default: 5)
  width (int): Output width in pixels (default: 640)
  fps (int): Frames per second (default: 15)
  quality/colors (int): Number of colors (default: 256, max: 256)
  filter/vf (str): Custom ffmpeg filter string (for apply_filter)
  text_overlay (dict): Text overlay settings
    - text (str): Text to display
    - font_size (int): Font size in pixels
    - position (str): Position (top/bottom/center)

Examples:
  # Create GIF with text
  ffmpeg_gif.execute('create_gif_with_text', 'video.mp4', 'output.gif', {
      'start_time': 0,
      'duration': 5,
      'width': 600,
      'fps': 15,
      'text_overlay': {
          'text': 'Hello World',
          'font_size': 48,
          'position': 'bottom'
      }
  })

  # Basic conversion
  ffmpeg_gif.execute('convert', 'video.mp4', 'output.gif', {
      'start_time': 2,
      'duration': 3,
      'width': 480,
      'fps': 12
  })

  # Apply custom filter
  ffmpeg_gif.execute('apply_filter', 'video.mp4', 'output.gif', {
      'filter': 'scale=640:-1,fps=15,hue=s=0'
  })
"""


# Example usage and testing
if __name__ == '__main__':
    tool = FFmpegGifTool()

    if tool.is_available():
        print(f"✅ FFmpeg found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ FFmpeg not found")
        print("Install: apt-get install ffmpeg")
