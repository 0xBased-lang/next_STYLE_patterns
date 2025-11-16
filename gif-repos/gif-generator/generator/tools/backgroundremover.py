"""
Background Remover Tool
Removes backgrounds from videos using AI
"""

import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class BackgroundRemoverTool(BaseTool):
    """Background removal using backgroundremover AI model"""

    def __init__(self):
        super().__init__()
        self.tool_name = "backgroundremover"
        self.find_tool()

    def get_tool_name(self) -> str:
        return "backgroundremover"

    def find_tool(self):
        """Find backgroundremover command"""
        # Check if installed as Python package
        result = subprocess.run(
            ["which", "backgroundremover"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if result.returncode == 0:
            self.tool_path = Path(result.stdout.decode().strip())
        else:
            # Try python module
            result = subprocess.run(
                ["python3", "-m", "backgroundremover", "--help"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            if result.returncode == 0:
                self.tool_path = Path("python3 -m backgroundremover")
            else:
                self.tool_path = None

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute background removal operation

        Operations:
          remove_background: Remove background from video/image

        Parameters:
          model: Model type (u2net/u2netp, default: u2net)
          alpha_matting: Use alpha matting (default: false)
          alpha_threshold: Alpha matting threshold (default: 240)
        """
        self.check_available()

        if operation == "remove_background":
            return self._remove_background(input_path, output_path, params)
        else:
            raise ValueError(f"Unknown operation: {operation}")

    def _remove_background(self, input_path: Path, output_path: Path,
                          params: Dict[str, Any]) -> Path:
        """Remove background from video or image"""

        # Extract parameters
        model = params.get('model', 'u2net')
        alpha_matting = params.get('alpha_matting', False)

        # Build command
        cmd = [
            'backgroundremover',
            '-i', str(input_path),
            '-o', str(output_path),
            '-m', model
        ]

        if alpha_matting:
            cmd.extend(['-a', '-ae', '15'])

        # Execute
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=self.timeout
        )

        if result.returncode != 0:
            raise ToolExecutionError(
                f"Background removal failed: {result.stderr.decode('utf-8', errors='ignore')}"
            )

        if not output_path.exists():
            raise ToolExecutionError(
                f"Background removal completed but output file not created: {output_path}"
            )

        return output_path

    def get_help(self) -> str:
        """Get help text for this tool"""
        return """
Background Remover - AI-based background removal

Installation:
  pip install backgroundremover[gpu]  # For GPU support
  pip install backgroundremover       # CPU only

Operations:
  remove_background: Remove background from video/image

Parameters:
  model (str): Model type (u2net/u2netp, default: u2net)
  alpha_matting (bool): Use alpha matting (default: false)
  alpha_threshold (int): Alpha matting threshold (default: 240)

Example:
  backgroundremover.execute('remove_background', 'video.mp4', 'no_bg.mp4', {
      'model': 'u2net',
      'alpha_matting': True
  })

Models:
  - u2net: High quality (more accurate, slower)
  - u2netp: Fast (lighter model, faster)

Notes:
  - First run downloads the AI model (~175MB)
  - GPU support requires CUDA
  - Processing time: ~1-5s per frame depending on resolution
"""


# Example usage and testing
if __name__ == '__main__':
    tool = BackgroundRemoverTool()

    if tool.is_available():
        print(f"✅ backgroundremover found at: {tool.tool_path}")
        print(tool.get_help())
    else:
        print("❌ backgroundremover not found")
        print("Install: pip install backgroundremover")
