"""
LivePortrait Tool
Animate portrait photos using AI (talking heads, expressions)
"""

import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class LivePortraitTool(BaseTool):
    """LivePortrait AI for portrait animation"""

    def __init__(self):
        super().__init__()
        self.tool_name = "liveportrait"
        self.find_tool()

    def get_tool_name(self) -> str:
        return "liveportrait"

    def find_tool(self):
        """Find LivePortrait installation"""
        # Check for LivePortrait CLI
        result = subprocess.run(
            ["which", "liveportrait"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if result.returncode == 0:
            self.tool_path = Path(result.stdout.decode().strip())
        else:
            # Check for Python module
            result = subprocess.run(
                ["python3", "-c", "import liveportrait"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            if result.returncode == 0:
                self.tool_path = Path("python3 -m liveportrait")
            else:
                self.tool_path = None

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute LivePortrait operation

        Operations:
          animate_portrait: Animate portrait with motion from driving video

        Parameters:
          driving_video: Path to driving video (motion source)
          mode: Animation mode (image-to-video, default)
          eye_retargeting_ratio: Eye movement strength (0.0-2.0, default: 0.9)
          lip_retargeting_ratio: Lip sync strength (0.0-2.0, default: 1.0)
          flag_pasteback: Paste animated face back to original (default: true)
          flag_stitching: Smooth face boundaries (default: true)
          flag_relative: Use relative motion (default: true)
        """
        self.check_available()

        if operation == "animate_portrait":
            return self._animate_portrait(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _animate_portrait(self, input_path: Path, output_path: Path,
                         params: Dict[str, Any]) -> Path:
        """Animate portrait using LivePortrait"""

        # Extract parameters
        driving_video = params.get('driving_video', '')
        eye_retargeting = float(params.get('eye_retargeting_ratio', 0.9))
        lip_retargeting = float(params.get('lip_retargeting_ratio', 1.0))
        flag_pasteback = params.get('flag_pasteback', True)
        flag_stitching = params.get('flag_stitching', True)
        flag_relative = params.get('flag_relative', True)

        if not driving_video or not Path(driving_video).exists():
            raise ValueError("driving_video parameter is required")

        # Build command
        cmd = [
            'liveportrait',
            '-s', str(input_path),  # Source portrait
            '-d', str(driving_video),  # Driving video
            '-o', str(output_path),
            '--eye_retargeting_ratio', str(eye_retargeting),
            '--lip_retargeting_ratio', str(lip_retargeting)
        ]

        if flag_pasteback:
            cmd.append('--flag_pasteback')
        if flag_stitching:
            cmd.append('--flag_stitching')
        if flag_relative:
            cmd.append('--flag_relative')

        # Execute
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=self.timeout
        )

        if result.returncode != 0:
            raise ToolExecutionError(
                f"LivePortrait animation failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"LivePortrait completed but output file not created: {output_path}"
            )

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
LivePortrait - AI Portrait Animation

Installation:
  # Clone repository
  git clone https://github.com/KwaiVGI/LivePortrait
  cd LivePortrait

  # Install dependencies
  pip install -r requirements.txt

  # Download models
  python scripts/download_models.py

Operations:
  animate_portrait: Animate portrait with motion from driving video

Parameters:
  driving_video (str): Path to driving video (motion source, required)
  mode (str): Animation mode (image-to-video, default)
  eye_retargeting_ratio (float): Eye movement strength (0.0-2.0, default: 0.9)
  lip_retargeting_ratio (float): Lip sync strength (0.0-2.0, default: 1.0)
  flag_pasteback (bool): Paste face back to original (default: true)
  flag_stitching (bool): Smooth face boundaries (default: true)
  flag_relative (bool): Use relative motion (default: true)

Example:
  liveportrait.execute('animate_portrait', 'portrait.jpg', 'animated.mp4', {
      'driving_video': 'talking.mp4',
      'eye_retargeting_ratio': 0.9,
      'lip_retargeting_ratio': 1.0,
      'flag_pasteback': True
  })

Presets:
  Professional (subtle):
    eye_retargeting_ratio: 0.8
    lip_retargeting_ratio: 1.0

  Casual (natural):
    eye_retargeting_ratio: 1.0
    lip_retargeting_ratio: 1.2

  Expressive (exaggerated):
    eye_retargeting_ratio: 1.2
    lip_retargeting_ratio: 1.5

Notes:
  - Requires CUDA GPU for real-time processing
  - Models download: ~2GB total
  - Processing time: ~5-15s per second of video (GPU)
  - Best results with clear, front-facing portraits
  - Driving video should have clear facial movements
"""


# Example usage and testing
if __name__ == '__main__':
    tool = LivePortraitTool()

    if tool.is_available():
        print(f"✅ LivePortrait found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ LivePortrait not found")
        print("Install: See installation instructions above")
