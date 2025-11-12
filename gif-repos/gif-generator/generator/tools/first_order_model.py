"""
First Order Model Tool Wrapper
Motion transfer using first-order motion model
"""

import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import BaseTool, ToolExecutionError


class FirstOrderModelTool(BaseTool):
    """Wrapper for first-order-model motion transfer"""

    def get_tool_name(self) -> str:
        return "python"  # First-order-model is a Python script

    def __init__(self, fom_dir: Path = None):
        """
        Initialize First Order Model tool

        Args:
            fom_dir: Path to first-order-model directory
                    Defaults to ../../first-order-model relative to this file
        """
        super().__init__()

        if fom_dir is None:
            # Default to first-order-model directory in gif-repos
            base_dir = Path(__file__).parent.parent.parent.parent
            self.fom_dir = base_dir / "first-order-model"
        else:
            self.fom_dir = Path(fom_dir)

        self.demo_script = self.fom_dir / "demo.py"

    def is_available(self) -> bool:
        """Check if first-order-model is available"""
        return (
            self.fom_dir.exists() and
            self.demo_script.exists() and
            super().is_available()  # Check if python is available
        )

    def check_available(self):
        """Raise error if first-order-model not available"""
        if not self.fom_dir.exists():
            raise ToolExecutionError(
                f"first-order-model directory not found: {self.fom_dir}\n"
                f"Please clone first-order-model repository:\n"
                f"  git clone https://github.com/AliaksandrSiarohin/first-order-model\n"
                f"  cd first-order-model && pip install -r requirements.txt"
            )

        if not self.demo_script.exists():
            raise ToolExecutionError(
                f"first-order-model demo script not found: {self.demo_script}"
            )

        super().check_available()

    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute first-order-model operation

        Args:
            operation: Operation to perform ('motion_transfer')
            input_path: Path to source image
            output_path: Path to output video/gif
            params: Operation parameters:
                - driving_video: Path to driving video
                - config: Path to config file (default: vox-256.yaml)
                - checkpoint: Path to checkpoint file (default: vox-cpk.pth.tar)
                - relative: bool, use relative keypoint displacement
                - adapt_scale: bool, adapt movement scale
                - find_best_frame: bool, find best frame in driving video

        Returns:
            Path to output file
        """
        self.check_available()

        # Get driving video path
        driving_video = params.get('driving_video')
        if not driving_video:
            raise ToolExecutionError("driving_video parameter is required")

        driving_video = Path(driving_video)
        if not driving_video.exists():
            raise ToolExecutionError(f"Driving video not found: {driving_video}")

        # Get config and checkpoint paths
        config = params.get('config', 'config/vox-256.yaml')
        checkpoint = params.get('checkpoint', 'checkpoints/vox-cpk.pth.tar')

        config_path = self.fom_dir / config
        checkpoint_path = self.fom_dir / checkpoint

        if not config_path.exists():
            raise ToolExecutionError(
                f"Config file not found: {config_path}\n"
                f"Please download the config file or specify a valid config path"
            )

        if not checkpoint_path.exists():
            raise ToolExecutionError(
                f"Checkpoint file not found: {checkpoint_path}\n"
                f"Please download the pre-trained model from:\n"
                f"  https://drive.google.com/drive/folders/1PyQJmkdCsAkOYwUyaj_l-l0as-iLDgeH"
            )

        # Build command
        cmd = [
            str(self.tool_path),
            str(self.demo_script),
            "--config", str(config_path),
            "--checkpoint", str(checkpoint_path),
            "--source_image", str(input_path),
            "--driving_video", str(driving_video),
            "--result_video", str(output_path)
        ]

        # Add optional flags
        if params.get('relative', True):
            cmd.append("--relative")

        if params.get('adapt_scale', True):
            cmd.append("--adapt_scale")

        if params.get('find_best_frame', False):
            cmd.append("--find_best_frame")

        # Execute
        print(f"Running first-order-model motion transfer...")
        try:
            # Change to first-order-model directory for execution
            import os
            original_dir = os.getcwd()
            os.chdir(self.fom_dir)

            result = self._run_command(cmd, capture_output=False)

            os.chdir(original_dir)

            if not output_path.exists():
                raise ToolExecutionError(
                    f"first-order-model execution completed but output not found: {output_path}"
                )

            return output_path

        except Exception as e:
            import os
            os.chdir(original_dir)
            raise ToolExecutionError(
                f"first-order-model execution failed: {str(e)}\n"
                f"Command: {' '.join(cmd)}"
            )

    def transfer_motion(self, source_image: Path, driving_video: Path,
                       output: Path, **kwargs) -> Path:
        """
        Convenience method to transfer motion from driving video to source image

        Args:
            source_image: Path to source image
            driving_video: Path to driving video
            output: Path to output video
            **kwargs: Additional parameters (relative, adapt_scale, find_best_frame)

        Returns:
            Path to output file
        """
        params = {
            'driving_video': driving_video,
            **kwargs
        }

        return self.execute('motion_transfer', source_image, output, params)
