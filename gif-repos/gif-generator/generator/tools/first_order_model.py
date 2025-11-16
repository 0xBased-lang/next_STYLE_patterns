"""
First Order Model Tool
Transfer motion between videos using AI
"""

import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class FirstOrderModelTool(BaseTool):
    """First Order Model for motion transfer"""

    def __init__(self):
        super().__init__()
        self.tool_name = "first-order-model"
        self.find_tool()

    def get_tool_name(self) -> str:
        return "first-order-model"

    def find_tool(self):
        """Find first-order-model installation"""
        # Check for first-order-model CLI
        result = subprocess.run(
            ["which", "fomm"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if result.returncode == 0:
            self.tool_path = Path(result.stdout.decode().strip())
        else:
            # Check for Python module
            result = subprocess.run(
                ["python3", "-c", "import first_order_model"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            if result.returncode == 0:
                self.tool_path = Path("python3 -m first_order_model")
            else:
                self.tool_path = None

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute first-order-model operation

        Operations:
          transfer_motion: Transfer motion from driving video to source

        Parameters:
          driving_video: Path to driving video (motion source)
          mode: Transfer mode (standard/relative/avd, default: relative)
          find_best_frame: Auto-select best frame for alignment (default: true)
          adapt_movement_scale: Adapt motion scale to source (default: true)
          cpu: Use CPU instead of GPU (default: false)
        """
        self.check_available()

        if operation == "transfer_motion":
            return self._transfer_motion(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _transfer_motion(self, input_path: Path, output_path: Path,
                        params: Dict[str, Any]) -> Path:
        """Transfer motion using first-order-model"""

        # Extract parameters
        driving_video = params.get('driving_video', '')
        mode = params.get('mode', 'relative')
        find_best_frame = params.get('find_best_frame', True)
        adapt_scale = params.get('adapt_movement_scale', True)
        use_cpu = params.get('cpu', False)

        if not driving_video or not Path(driving_video).exists():
            raise ValueError("driving_video parameter is required")

        # Build command
        cmd = [
            'fomm',
            '--source', str(input_path),
            '--driving', str(driving_video),
            '--result', str(output_path),
            '--mode', mode
        ]

        if find_best_frame:
            cmd.append('--find-best-frame')
        if adapt_scale:
            cmd.append('--adapt-scale')
        if use_cpu:
            cmd.append('--cpu')

        # Execute
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=self.timeout
        )

        if result.returncode != 0:
            raise ToolExecutionError(
                f"Motion transfer failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"Motion transfer completed but output file not created: {output_path}"
            )

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
First Order Model - AI Motion Transfer

Installation:
  # Clone repository
  git clone https://github.com/AliaksandrSiarohin/first-order-model
  cd first-order-model

  # Install dependencies
  pip install -r requirements.txt

  # Download pre-trained models
  # VoxCeleb (faces): https://drive.google.com/drive/folders/1PyQJmkdCsAkOYwUyaj_l-l0as-iLDgeH
  # Fashion (full body): https://drive.google.com/drive/folders/1kZ1gCnpfU0BnpdU47pLM_TQ6RbYdFHKy
  mkdir checkpoints
  # Download vox-cpk.pth.tar to checkpoints/

Operations:
  transfer_motion: Transfer motion from driving video to source image/video

Parameters:
  driving_video (str): Path to driving video (motion source, required)
  mode (str): Transfer mode (standard/relative/avd, default: relative)
  find_best_frame (bool): Auto-select best frame for alignment (default: true)
  adapt_movement_scale (bool): Adapt motion scale to source (default: true)
  cpu (bool): Use CPU instead of GPU (default: false)

Example:
  fomm.execute('transfer_motion', 'portrait.jpg', 'animated.mp4', {
      'driving_video': 'dance.mp4',
      'mode': 'relative',
      'find_best_frame': True,
      'adapt_movement_scale': True
  })

Modes:
  - standard: Direct keypoint transfer
  - relative: Relative motion transfer (recommended for portraits)
  - avd: Adaptive mode with better generalization

Use Cases:
  - Animate portraits from driving videos
  - Transfer facial expressions between people
  - Create deepfakes (with appropriate consent)
  - Animation retargeting
  - Digital avatars

Notes:
  - Requires CUDA GPU for real-time processing
  - Models: ~200MB each
  - Processing time: ~10-30s per second of video (GPU)
  - Best results when source and driving have similar poses
  - Different models for faces vs. full body
"""


# Example usage and testing
if __name__ == '__main__':
    tool = FirstOrderModelTool()

    if tool.is_available():
        print(f"✅ first-order-model found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ first-order-model not found")
        print("Install: See installation instructions above")
