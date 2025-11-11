"""
Base Tool Interface
All tool wrappers inherit from this
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Dict, Any, Optional
import subprocess
import shutil


class ToolNotFoundError(Exception):
    """Raised when a required tool is not installed"""
    pass


class ToolExecutionError(Exception):
    """Raised when tool execution fails"""
    pass


class BaseTool(ABC):
    """Base class for all tool wrappers"""

    def __init__(self):
        self.tool_name = self.get_tool_name()
        self.tool_path = self._find_tool()

    @abstractmethod
    def get_tool_name(self) -> str:
        """Return the name of the tool executable"""
        pass

    @abstractmethod
    def execute(self, operation: str, input_path: Path, output_path: Path,
                params: Dict[str, Any]) -> Path:
        """
        Execute tool operation

        Args:
            operation: Operation to perform
            input_path: Input file path
            output_path: Output file path
            params: Operation parameters

        Returns:
            Path to output file

        Raises:
            ToolExecutionError: If execution fails
        """
        pass

    def _find_tool(self) -> Optional[Path]:
        """Find tool executable in PATH"""
        tool_path = shutil.which(self.tool_name)
        if tool_path:
            return Path(tool_path)
        return None

    def is_available(self) -> bool:
        """Check if tool is available"""
        return self.tool_path is not None

    def check_available(self):
        """Raise error if tool not available"""
        if not self.is_available():
            raise ToolNotFoundError(
                f"Tool '{self.tool_name}' not found. Please install it first.\n"
                f"Installation: See docs for {self.tool_name}"
            )

    def _run_command(self, cmd: list, capture_output: bool = True) -> subprocess.CompletedProcess:
        """
        Run command and handle errors

        Args:
            cmd: Command and arguments as list
            capture_output: Whether to capture stdout/stderr

        Returns:
            CompletedProcess object

        Raises:
            ToolExecutionError: If command fails
        """
        try:
            result = subprocess.run(
                cmd,
                capture_output=capture_output,
                text=True,
                check=True
            )
            return result
        except subprocess.CalledProcessError as e:
            raise ToolExecutionError(
                f"Command failed: {' '.join(cmd)}\n"
                f"Exit code: {e.returncode}\n"
                f"Error: {e.stderr}"
            )
        except FileNotFoundError:
            raise ToolNotFoundError(
                f"Tool executable not found: {cmd[0]}\n"
                f"Please ensure {self.tool_name} is installed and in PATH"
            )
