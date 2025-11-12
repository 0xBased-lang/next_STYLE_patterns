"""Global configuration with intelligent defaults"""

from pathlib import Path
from typing import Dict, Optional, Any
import shutil
import json
import os


class Config:
    """Global configuration for template generator"""

    # Paths
    ROOT_DIR = Path(__file__).parent.parent.absolute()
    GENERATOR_DIR = ROOT_DIR / "generator"
    TEMPLATES_DIR = ROOT_DIR / "templates"
    GALLERY_DIR = ROOT_DIR / "gallery"
    CACHE_DIR = ROOT_DIR / ".cache"
    DEFAULT_OUTPUT_DIR = ROOT_DIR / "output"

    # User config file
    USER_CONFIG_FILE = Path.home() / ".gifgenrc"

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

    # Config loaded flag
    _user_config_loaded = False

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
    def load_user_config(cls, config_path: Optional[Path] = None):
        """
        Load user configuration from file

        Args:
            config_path: Path to config file (default: ~/.gifgenrc)
        """
        if config_path is None:
            config_path = cls.USER_CONFIG_FILE

        if not config_path.exists():
            return

        try:
            with open(config_path) as f:
                user_config = json.load(f)

            # Update class attributes
            for key, value in user_config.items():
                # Convert to uppercase and set
                attr_name = key.upper() if not key.isupper() else key

                # Handle special cases
                if attr_name.endswith('_DIR') and isinstance(value, str):
                    value = Path(value)
                elif attr_name == 'USER_CONFIG_FILE' and isinstance(value, str):
                    value = Path(value)

                if hasattr(cls, attr_name):
                    setattr(cls, attr_name, value)

            cls._user_config_loaded = True

        except (json.JSONDecodeError, IOError) as e:
            print(f"Warning: Could not load user config from {config_path}: {e}")

    @classmethod
    def save_user_config(cls, config_path: Optional[Path] = None,
                        config: Optional[Dict[str, Any]] = None):
        """
        Save user configuration to file

        Args:
            config_path: Path to save config (default: ~/.gifgenrc)
            config: Configuration dict to save (default: current config)
        """
        if config_path is None:
            config_path = cls.USER_CONFIG_FILE

        if config is None:
            # Save current configuration
            config = cls.get_user_configurable()

        try:
            with open(config_path, 'w') as f:
                json.dump(config, f, indent=2, default=str)

            print(f"Configuration saved to: {config_path}")

        except IOError as e:
            print(f"Error: Could not save config to {config_path}: {e}")

    @classmethod
    def get_user_configurable(cls) -> Dict[str, Any]:
        """Get user-configurable settings"""
        return {
            'default_preset': cls.DEFAULT_PRESET,
            'default_category': cls.DEFAULT_CATEGORY,
            'max_file_size_mb': cls.MAX_FILE_SIZE_MB,
            'default_width': cls.DEFAULT_WIDTH,
            'default_fps': cls.DEFAULT_FPS,
            'max_workers': cls.MAX_WORKERS,
            'enable_cache': cls.ENABLE_CACHE,
            'strict_mode': cls.STRICT_MODE,
            'auto_optimize': cls.AUTO_OPTIMIZE,
            'use_gpu': cls.USE_GPU,
            'gifcurry_cli': cls.GIFCURRY_CLI,
            'gifsicle': cls.GIFSICLE,
            'ffmpeg': cls.FFMPEG,
        }

    @classmethod
    def create_default_config(cls, config_path: Optional[Path] = None):
        """
        Create a default configuration file with comments

        Args:
            config_path: Path to save config (default: ~/.gifgenrc)
        """
        if config_path is None:
            config_path = cls.USER_CONFIG_FILE

        default_config = {
            "_comment": "GIF Generator configuration file",
            "_docs": "Edit these values to customize default behavior",
            "default_preset": cls.DEFAULT_PRESET,
            "default_category": cls.DEFAULT_CATEGORY,
            "max_file_size_mb": cls.MAX_FILE_SIZE_MB,
            "default_width": cls.DEFAULT_WIDTH,
            "default_fps": cls.DEFAULT_FPS,
            "max_workers": cls.MAX_WORKERS,
            "enable_cache": cls.ENABLE_CACHE,
            "strict_mode": cls.STRICT_MODE,
            "auto_optimize": cls.AUTO_OPTIMIZE,
            "use_gpu": cls.USE_GPU,
            "_tool_paths_comment": "Tool paths (use full paths if not in PATH)",
            "gifcurry_cli": cls.GIFCURRY_CLI,
            "gifsicle": cls.GIFSICLE,
            "ffmpeg": cls.FFMPEG,
        }

        try:
            with open(config_path, 'w') as f:
                json.dump(default_config, f, indent=2)

            print(f"✅ Default configuration created: {config_path}")
            print(f"   Edit this file to customize settings")

        except IOError as e:
            print(f"Error: Could not create config file: {e}")

    @classmethod
    def print_status(cls):
        """Print configuration status"""
        print("\n📊 Generator Configuration\n")
        print(f"Root: {cls.ROOT_DIR}")
        print(f"Templates: {cls.TEMPLATES_DIR}")
        print(f"Output: {cls.DEFAULT_OUTPUT_DIR}")

        if cls._user_config_loaded:
            print(f"User config: {cls.USER_CONFIG_FILE} ✅")
        else:
            print(f"User config: Not loaded")

        print()

        print("🔧 Tool Availability:")
        tools = cls.validate_tools()
        for tool, available in tools.items():
            status = "✅" if available else "❌"
            print(f"  {status} {tool}")

        print()

        print("⚙️  Settings:")
        print(f"  Default preset: {cls.DEFAULT_PRESET}")
        print(f"  Max workers: {cls.MAX_WORKERS}")
        print(f"  Auto optimize: {cls.AUTO_OPTIMIZE}")
        print(f"  Use GPU: {cls.USE_GPU}")
        print()


# Create output directory if it doesn't exist
Config.DEFAULT_OUTPUT_DIR.mkdir(exist_ok=True)
Config.CACHE_DIR.mkdir(exist_ok=True)

# Auto-load user config if it exists
Config.load_user_config()
