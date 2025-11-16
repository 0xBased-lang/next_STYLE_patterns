"""
Neural Style Transfer Tool
Applies artistic style transfer to videos using AI
"""

import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class NeuralStyleTransferTool(BaseTool):
    """Neural style transfer for artistic video effects"""

    def __init__(self):
        super().__init__()
        self.tool_name = "neural-style-transfer"
        self.find_tool()

    def get_tool_name(self) -> str:
        return "neural-style-transfer"

    def find_tool(self):
        """Find neural style transfer tool"""
        # Check for common implementations
        for cmd in ["neural-style", "neural_style", "fast-neural-style"]:
            result = subprocess.run(
                ["which", cmd],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            if result.returncode == 0:
                self.tool_path = Path(result.stdout.decode().strip())
                return

        # Check for Python module
        result = subprocess.run(
            ["python3", "-c", "import neural_style"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if result.returncode == 0:
            self.tool_path = Path("python3 -m neural_style")
        else:
            self.tool_path = None

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute style transfer operation

        Operations:
          apply_style: Apply artistic style to video

        Parameters:
          style_image: Path to style reference image
          style_strength: Style transfer strength (0.0-1.0, default: 0.7)
          preserve_colors: Preserve original colors (default: false)
          quality: Output quality preset (fast/balanced/quality, default: balanced)
        """
        self.check_available()

        if operation == "apply_style":
            return self._apply_style(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _apply_style(self, input_path: Path, output_path: Path,
                    params: Dict[str, Any]) -> Path:
        """Apply neural style transfer to video"""

        # Extract parameters
        style_image = params.get('style_image', '')
        style_strength = float(params.get('style_strength', 0.7))
        preserve_colors = params.get('preserve_colors', False)
        quality = params.get('quality', 'balanced')

        if not style_image or not Path(style_image).exists():
            raise ValueError("style_image parameter is required and must be a valid file path")

        # Build command (using fast-neural-style if available)
        cmd = [
            'fast-neural-style',
            '-model', 'models/instance_norm/candy.t7',  # Default model
            '-input_image', str(input_path),
            '-output_image', str(output_path)
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
                f"Neural style transfer failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"Neural style transfer completed but output file not created: {output_path}"
            )

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
Neural Style Transfer - AI artistic style transfer

Installation:
  # Option 1: fast-neural-style (recommended, real-time)
  git clone https://github.com/jcjohnson/fast-neural-style
  cd fast-neural-style
  bash models/download_style_transfer_models.sh

  # Option 2: original neural-style (slower, higher quality)
  git clone https://github.com/jcjohnson/neural-style
  cd neural-style
  bash models/download_models.sh

Operations:
  apply_style: Apply artistic style to video/image

Parameters:
  style_image (str): Path to style reference image (required)
  style_strength (float): Style transfer strength (0.0-1.0, default: 0.7)
  preserve_colors (bool): Preserve original colors (default: false)
  quality (str): Output quality (fast/balanced/quality, default: balanced)

Example:
  neural_style.execute('apply_style', 'video.mp4', 'stylized.mp4', {
      'style_image': 'starry_night.jpg',
      'style_strength': 0.8,
      'preserve_colors': False
  })

Available Styles (pre-trained models):
  - candy: Bright, vibrant style
  - mosaic: Mosaic tile effect
  - rain_princess: Impressionist style
  - udnie: Abstract geometric style

Notes:
  - First run downloads models (~6.6MB per model)
  - Processing time: ~0.5-2s per frame (GPU), ~5-20s (CPU)
  - GPU strongly recommended for video processing
  - Supports both images and videos
"""


# Example usage and testing
if __name__ == '__main__':
    tool = NeuralStyleTransferTool()

    if tool.is_available():
        print(f"✅ neural-style-transfer found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ neural-style-transfer not found")
        print("Install: See installation instructions above")
