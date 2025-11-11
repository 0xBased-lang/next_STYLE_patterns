"""Global configuration with intelligent defaults"""

from pathlib import Path
from typing import Dict
import shutil


class Config:
    """Global configuration for template generator"""

    # Paths
    ROOT_DIR = Path(__file__).parent.parent.absolute()
    GENERATOR_DIR = ROOT_DIR / "generator"
    TEMPLATES_DIR = ROOT_DIR / "templates"
    GALLERY_DIR = ROOT_DIR / "gallery"
    CACHE_DIR = ROOT_DIR / ".cache"
    DEFAULT_OUTPUT_DIR = ROOT_DIR / "output"

    # Tool paths (auto-detect or use full paths)
    GIFCURRY_CLI = "gifcurry_cli"
    GIFSICLE = "gifsicle"
    FFMPEG = "ffmpeg"

    # Defaults
    DEFAULT_PRESET = "balanced"
    DEFAULT_CATEGORY = "social-media"

    # Quality gates
    MAX_FILE_SIZE_MB = 10
    MIN_FPS = 5
    MAX_FPS = 60
    DEFAULT_WIDTH = 600
    DEFAULT_FPS = 15

    # Performance
    USE_GPU = True
    MAX_WORKERS = 4
    ENABLE_CACHE = True

    # Validation
    STRICT_MODE = True  # Fail on validation errors
    AUTO_OPTIMIZE = True  # Always run optimization

    @classmethod
    def validate_tools(cls) -> Dict[str, bool]:
        """
        Check which tools are available on the system

        Returns:
            Dict mapping tool names to availability (True/False)
        """
        tools_status = {
            'gifcurry': cls._check_tool(cls.GIFCURRY_CLI),
            'gifsicle': cls._check_tool(cls.GIFSICLE),
            'ffmpeg': cls._check_tool(cls.FFMPEG),
        }

        # Check Python tools
        try:
            import torch
            tools_status['pytorch'] = torch.cuda.is_available()
        except ImportError:
            tools_status['pytorch'] = False

        try:
            import cv2
            tools_status['opencv'] = True
        except ImportError:
            tools_status['opencv'] = False

        return tools_status

    @staticmethod
    def _check_tool(tool_name: str) -> bool:
        """Check if a tool is available in PATH"""
        return shutil.which(tool_name) is not None

    @classmethod
    def print_status(cls):
        """Print configuration status"""
        print("\n📊 Generator Configuration\n")
        print(f"Root: {cls.ROOT_DIR}")
        print(f"Templates: {cls.TEMPLATES_DIR}")
        print(f"Output: {cls.DEFAULT_OUTPUT_DIR}\n")

        print("🔧 Tool Availability:")
        tools = cls.validate_tools()
        for tool, available in tools.items():
            status = "✅" if available else "❌"
            print(f"  {status} {tool}")

        print()


# Create output directory if it doesn't exist
Config.DEFAULT_OUTPUT_DIR.mkdir(exist_ok=True)
Config.CACHE_DIR.mkdir(exist_ok=True)
