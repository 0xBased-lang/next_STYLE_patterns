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
        elif operation == "prepare_image":
            # Prepare image (crop, scale, format)
            return self._prepare_image(input_path, output_path, params)
        elif operation == "apply_vhs_filters":
            # Apply VHS-style retro effects
            return self._apply_vhs_filters(input_path, output_path, params)
        elif operation == "prepare_360_video":
            # Prepare 360-degree video
            return self._prepare_360_video(input_path, output_path, params)
        elif operation == "create_animation":
            # Create animation from static image
            return self._create_animation(input_path, output_path, params)
        elif operation == "composite_background":
            # Composite with new background
            return self._composite_background(input_path, output_path, params)
        elif operation == "smooth_frames":
            # Smooth frame transitions
            return self._smooth_frames(input_path, output_path, params)
        elif operation == "apply_filters":
            # Apply generic filters (similar to apply_filter but plural form)
            return self._apply_filter(input_path, output_path, params)
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

    def _prepare_image(self, input_path: Path, output_path: Path,
                      params: Dict[str, Any]) -> Path:
        """
        Prepare image for animation (crop, scale, format conversion)
        """
        # Extract parameters
        width = params.get('width', params.get('size', 640))
        height = params.get('height', params.get('size', 640))

        # Build filter chain for image preparation
        filters = []

        # Scale to desired size
        if width and height:
            filters.append(f"scale={width}:{height}:force_original_aspect_ratio=decrease")
            filters.append(f"pad={width}:{height}:(ow-iw)/2:(oh-ih)/2")

        filter_str = ','.join(filters) if filters else "scale=640:640"

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
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
                f"FFmpeg prepare_image failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg prepare_image completed but output file not created: {output_path}"
            )

        return output_path

    def _apply_vhs_filters(self, input_path: Path, output_path: Path,
                          params: Dict[str, Any]) -> Path:
        """
        Apply VHS-style retro effects to video
        """
        # Extract parameters
        noise_level = int(params.get('noise_level', 30))

        # Build VHS filter chain
        filters = []

        # Color bleeding effect (reduce saturation, shift colors)
        filters.append("colorchannelmixer=.8:.2:.2:.2:.8:.2:.2:.2:.8")

        # Add noise (VHS tape grain)
        filters.append(f"noise=alls={noise_level}:allf=t")

        # Slight blur (VHS quality degradation)
        filters.append("unsharp=-1.5:-1.5:-1.5:-1.5:0:0")

        # Vignette (edge darkening)
        filters.append("vignette=angle=PI/4")

        filter_str = ','.join(filters)

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
            '-i', str(input_path),
            '-vf', filter_str,
            '-c:a', 'copy',  # Copy audio unchanged
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
                f"FFmpeg VHS filters failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg VHS filters completed but output file not created: {output_path}"
            )

        return output_path

    def _prepare_360_video(self, input_path: Path, output_path: Path,
                          params: Dict[str, Any]) -> Path:
        """
        Prepare 360-degree video (stabilization, cropping, format)
        """
        # Extract parameters
        width = int(params.get('width', 640))
        rotation = float(params.get('rotation', 0))

        # Build filter chain for 360 video
        filters = []

        # Scale
        filters.append(f"scale={width}:-1")

        # Rotate if needed
        if rotation != 0:
            filters.append(f"rotate={rotation}*PI/180")

        # Stabilization (basic)
        filters.append("deshake")

        filter_str = ','.join(filters)

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
            '-i', str(input_path),
            '-vf', filter_str,
            '-c:a', 'copy',
            '-y',
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
                f"FFmpeg 360 video prep failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg 360 video prep completed but output file not created: {output_path}"
            )

        return output_path

    def _create_animation(self, input_path: Path, output_path: Path,
                         params: Dict[str, Any]) -> Path:
        """
        Create animation from static image using motion effects
        """
        # Extract parameters
        duration = float(params.get('duration', 3))
        fps = int(params.get('fps', 24))
        animation_type = params.get('animation_type', 'subtle-zoom')

        # Build animation filter based on type
        if animation_type == 'subtle-zoom':
            # Slow zoom effect
            zoom_filter = f"zoompan=z='min(zoom+0.001,1.2)':d={int(duration*fps)}:s=640x640:fps={fps}"
        elif animation_type == 'subtle-bounce':
            # Slight bounce effect
            zoom_filter = f"zoompan=z='if(lte(zoom,1.0),1.05,max(1.00,zoom-0.01))':d={int(duration*fps)}:s=640x640:fps={fps}"
        elif animation_type == 'pan':
            # Pan across image
            zoom_filter = f"zoompan=z='1.5':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={int(duration*fps)}:s=640x640:fps={fps}"
        else:
            # Default: simple loop
            zoom_filter = f"loop=loop={int(duration*fps)}:size=1:start=0,fps={fps}"

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
            '-loop', '1',
            '-i', str(input_path),
            '-vf', zoom_filter,
            '-t', str(duration),
            '-pix_fmt', 'yuv420p',
            '-y',
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
                f"FFmpeg animation failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg animation completed but output file not created: {output_path}"
            )

        return output_path

    def _composite_background(self, input_path: Path, output_path: Path,
                             params: Dict[str, Any]) -> Path:
        """
        Composite video with new background (after background removal)
        """
        # Extract parameters
        background_color = params.get('background_color', 'white')
        background_image = params.get('background_image', None)

        # Build composite command
        if background_image:
            # Composite with image background
            cmd = [
                str(self.tool_path),
                '-i', str(background_image),
                '-i', str(input_path),
                '-filter_complex', '[0:v][1:v]overlay',
                '-y',
                str(output_path)
            ]
        else:
            # Composite with solid color background
            cmd = [
                str(self.tool_path),
                '-i', str(input_path),
                '-vf', f"colorkey={background_color}:similarity=0.3:blend=0.0",
                '-y',
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
                f"FFmpeg composite failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg composite completed but output file not created: {output_path}"
            )

        return output_path

    def _smooth_frames(self, input_path: Path, output_path: Path,
                      params: Dict[str, Any]) -> Path:
        """
        Smooth frame transitions (for AI-generated content with artifacts)
        """
        # Extract parameters
        fps = int(params.get('fps', 24))

        # Build smoothing filter chain
        filters = []

        # Temporal smoothing
        filters.append("minterpolate=fps=" + str(fps) + ":mi_mode=mci")

        # Slight blur to reduce artifacts
        filters.append("unsharp=5:5:0.5:5:5:0.0")

        filter_str = ','.join(filters)

        # Build ffmpeg command
        cmd = [
            str(self.tool_path),
            '-i', str(input_path),
            '-vf', filter_str,
            '-c:a', 'copy',
            '-y',
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
                f"FFmpeg smooth frames failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"FFmpeg smooth frames completed but output file not created: {output_path}"
            )

        return output_path

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
  apply_filters: Apply generic filters (plural form)
  process: Generic processing (auto-detects based on params)
  prepare_image: Prepare image (crop, scale, format)
  apply_vhs_filters: Apply VHS-style retro effects
  prepare_360_video: Prepare 360-degree video
  create_animation: Create animation from static image
  composite_background: Composite with new background
  smooth_frames: Smooth frame transitions

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
