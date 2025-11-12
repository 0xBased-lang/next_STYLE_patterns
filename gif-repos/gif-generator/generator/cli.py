#!/usr/bin/env python3
"""
GIF Generator CLI
User-friendly command-line interface for template-based GIF generation
"""

import argparse
import sys
from pathlib import Path
from typing import Optional, Dict, Any
import json

from .core import TemplateLoader, PipelineOrchestrator, Template
from .core.validator import TemplateValidator
from .core.batch import BatchProcessor
from .config import Config
from .tools import GifcurryTool, GifsicleTool


class Colors:
    """Terminal colors"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'

    @staticmethod
    def disable():
        """Disable colors"""
        Colors.HEADER = ''
        Colors.BLUE = ''
        Colors.CYAN = ''
        Colors.GREEN = ''
        Colors.YELLOW = ''
        Colors.RED = ''
        Colors.BOLD = ''
        Colors.UNDERLINE = ''
        Colors.END = ''


def print_header(text: str):
    """Print colored header"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}{text}{Colors.END}")


def print_success(text: str):
    """Print success message"""
    print(f"{Colors.GREEN}✓{Colors.END} {text}")


def print_error(text: str):
    """Print error message"""
    print(f"{Colors.RED}✗{Colors.END} {text}", file=sys.stderr)


def print_warning(text: str):
    """Print warning message"""
    print(f"{Colors.YELLOW}⚠{Colors.END} {text}")


def print_info(text: str):
    """Print info message"""
    print(f"{Colors.CYAN}ℹ{Colors.END} {text}")


class CLI:
    """Main CLI application"""

    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.templates_dir = self.project_root / 'templates'
        self.loader = TemplateLoader(self.templates_dir)
        self.orchestrator = PipelineOrchestrator()

    def cmd_list(self, args):
        """List available templates"""
        print_header("Available Templates")

        templates = self.loader.list_templates()

        # Group by category
        by_category = {}
        for template_path in templates:
            try:
                template = self.loader.load_template(template_path)
                category = template.category
                if category not in by_category:
                    by_category[category] = []
                by_category[category].append((template_path, template))
            except Exception as e:
                print_warning(f"Skipping {template_path}: {e}")

        # Display
        for category, items in sorted(by_category.items()):
            category_name = category.replace('-', ' ').title()
            print(f"\n{Colors.BOLD}{category_name}{Colors.END} ({len(items)} templates)")

            for template_path, template in items:
                name_parts = template_path.split('/')
                short_name = name_parts[-1]
                print(f"  {Colors.CYAN}{short_name:25}{Colors.END} {template.description[:50]}")

        print(f"\n{Colors.BOLD}Total:{Colors.END} {len(templates)} templates")
        print(f"\nUse {Colors.CYAN}gif-gen info <template>{Colors.END} to see details")

    def cmd_info(self, args):
        """Show template information"""
        template_path = args.template

        try:
            template = self.loader.load_template(template_path)
        except FileNotFoundError:
            print_error(f"Template not found: {template_path}")
            print_info("Run 'gif-gen list' to see available templates")
            return 1
        except Exception as e:
            print_error(f"Error loading template: {e}")
            return 1

        # Display template info
        print_header(f"Template: {template.name}")
        print(f"{Colors.BOLD}Description:{Colors.END} {template.description}")
        print(f"{Colors.BOLD}Version:{Colors.END} {template.version}")
        print(f"{Colors.BOLD}Category:{Colors.END} {template.category}")
        print()

        # Presets
        print(f"{Colors.BOLD}Presets:{Colors.END}")
        for preset_name, preset_config in template.presets.items():
            desc = preset_config.get('description', 'No description')
            expected_size = preset_config.get('expected_size', 'Unknown')
            processing_time = preset_config.get('processing_time', 'Unknown')

            print(f"  {Colors.CYAN}{preset_name:12}{Colors.END} {desc}")
            print(f"               Expected: {expected_size}, Time: {processing_time}")
        print()

        # Pipeline
        print(f"{Colors.BOLD}Pipeline Steps:{Colors.END}")
        for i, step in enumerate(template.pipeline, 1):
            tool = step['tool']
            operation = step['operation']
            print(f"  {i}. {Colors.CYAN}{tool:12}{Colors.END} → {operation}")
        print()

        # Variables
        required_vars = [(k, v) for k, v in template.variables.items() if v.get('required', False)]
        if required_vars:
            print(f"{Colors.BOLD}Required Variables:{Colors.END}")
            for var_name, var_config in required_vars:
                var_type = var_config.get('type', 'any')
                var_desc = var_config.get('description', '')
                print(f"  --{var_name:20} ({var_type}) {var_desc}")
            print()

        # Usage example
        print(f"{Colors.BOLD}Example Usage:{Colors.END}")
        example_vars = " ".join([f"--{var[0]} <value>" for var in required_vars[:2]])
        print(f"  gif-gen create {template_path} {example_vars} --preset balanced")
        print()

        return 0

    def cmd_check(self, args):
        """Check tool availability"""
        print_header("Tool Availability Check")

        tools = {
            'gifcurry': GifcurryTool(),
            'gifsicle': GifsicleTool(),
        }

        all_available = True

        for name, tool in tools.items():
            if tool.is_available():
                print_success(f"{name:15} {tool.tool_path}")
            else:
                print_error(f"{name:15} NOT INSTALLED")
                all_available = False

        print()

        if not all_available:
            print_warning("Some tools are missing!")
            print()
            print("Installation instructions:")
            print(f"  {Colors.BOLD}gifcurry:{Colors.END}")
            print("    macOS: Download from https://github.com/lettier/gifcurry/releases")
            print("    Linux: Download AppImage or build from source")
            print()
            print(f"  {Colors.BOLD}gifsicle:{Colors.END}")
            print("    macOS: brew install gifsicle")
            print("    Ubuntu: sudo apt-get install gifsicle")
            print()
            return 1
        else:
            print_success("All tools are installed and ready!")
            print()
            return 0

    def cmd_create(self, args):
        """Create GIF from template"""
        template_path = args.template

        # Load template
        try:
            template = self.loader.load_template(template_path)
        except FileNotFoundError:
            print_error(f"Template not found: {template_path}")
            print_info("Run 'gif-gen list' to see available templates")
            return 1
        except Exception as e:
            print_error(f"Error loading template: {e}")
            return 1

        print_header(f"Creating GIF: {template.name}")
        print(f"Template: {template_path}")
        print()

        # Check tools
        tool_status = self.orchestrator.check_tools(template)
        missing_tools = [name for name, available in tool_status.items() if not available]

        if missing_tools:
            print_error(f"Missing tools: {', '.join(missing_tools)}")
            print_info("Run 'gif-gen check' for installation instructions")
            return 1

        # Parse user variables
        user_vars = {}

        # Add variables from --var arguments
        if args.var:
            for var_str in args.var:
                if '=' in var_str:
                    key, value = var_str.split('=', 1)
                    user_vars[key] = value
                else:
                    print_warning(f"Ignoring invalid variable format: {var_str}")

        # Add common variables from arguments
        if args.video:
            user_vars['video_path'] = args.video
        if args.output:
            user_vars['output_path'] = args.output

        # Resolve variables with preset
        try:
            resolved = template.resolve_variables(user_vars, preset_name=args.preset)
        except Exception as e:
            print_error(f"Error resolving variables: {e}")
            return 1

        # Validate
        errors = self.loader.validate_template(template, resolved)
        if errors:
            print_error("Validation errors:")
            for error in errors:
                print(f"  - {error}")
            return 1

        # Show configuration
        print(f"{Colors.BOLD}Configuration:{Colors.END}")
        print(f"  Preset: {args.preset}")
        if 'video_path' in resolved:
            print(f"  Input: {resolved['video_path']}")
        if 'output_path' in resolved:
            print(f"  Output: {resolved['output_path']}")
        print()

        # Execute
        output_path = Path(resolved.get('output_path', args.output or 'output.gif'))

        try:
            result = self.orchestrator.execute(template, resolved, output_path)

            if result.success:
                print()
                print_success("GIF created successfully!")
                print(f"  Output: {result.output_path}")
                print(f"  Duration: {result.duration_seconds:.1f}s")

                if result.output_path.exists():
                    size_mb = result.output_path.stat().st_size / (1024 * 1024)
                    print(f"  Size: {size_mb:.2f} MB")

                return 0
            else:
                print()
                print_error("Failed to create GIF")
                print(f"  Error: {result.error_message}")
                print(f"  Steps completed: {result.steps_completed}/{result.total_steps}")
                return 1

        except Exception as e:
            print()
            print_error(f"Unexpected error: {e}")
            return 1

    def cmd_presets(self, args):
        """Show presets for a template"""
        template_path = args.template

        try:
            template = self.loader.load_template(template_path)
        except Exception as e:
            print_error(f"Error loading template: {e}")
            return 1

        print_header(f"Presets for: {template.name}")

        for preset_name, preset_config in template.presets.items():
            print(f"\n{Colors.BOLD}{Colors.CYAN}{preset_name}{Colors.END}")

            desc = preset_config.get('description', 'No description')
            print(f"  Description: {desc}")

            expected_size = preset_config.get('expected_size', 'Unknown')
            processing_time = preset_config.get('processing_time', 'Unknown')
            print(f"  Expected: {expected_size}")
            print(f"  Processing: {processing_time}")

            # Show key parameters
            params = {k: v for k, v in preset_config.items()
                     if k not in ['description', 'expected_size', 'processing_time']}
            if params and args.verbose:
                print(f"  Parameters:")
                for key, value in params.items():
                    print(f"    {key}: {value}")

        print()
        return 0

    def cmd_validate(self, args):
        """Validate templates"""
        validator = TemplateValidator()

        # Validate single template or directory
        path = Path(args.path) if args.path else self.templates_dir

        if path.is_file():
            # Validate single template
            print_header(f"Validating: {path}")

            try:
                validator.validate_template_file(path)
                print()
                print_success("Template is valid!")

                if validator.warnings:
                    print()
                    print_warning(f"{len(validator.warnings)} warning(s):")
                    for warning in validator.warnings:
                        print(f"  • {warning}")

                return 0

            except Exception as e:
                print()
                print_error("Validation failed!")

                if validator.errors:
                    print()
                    print(f"{Colors.RED}Errors:{Colors.END}")
                    for error in validator.errors:
                        print(f"  • {error}")

                if validator.warnings:
                    print()
                    print(f"{Colors.YELLOW}Warnings:{Colors.END}")
                    for warning in validator.warnings:
                        print(f"  • {warning}")

                return 1

        elif path.is_dir():
            # Validate all templates in directory
            print_header(f"Validating templates in: {path}")

            results = validator.validate_directory(path)
            validator.print_validation_report(results)

            # Return error if any templates invalid
            if any(errors for errors in results.values()):
                return 1

            return 0

        else:
            print_error(f"Path not found: {path}")
            return 1

    def cmd_config(self, args):
        """Manage configuration"""
        if args.init:
            # Create default config file
            Config.create_default_config()
            return 0

        elif args.show:
            # Show current configuration
            Config.print_status()
            return 0

        elif args.edit:
            # Open config file in editor
            import subprocess
            import os

            config_path = Config.USER_CONFIG_FILE

            if not config_path.exists():
                print_warning(f"Config file not found: {config_path}")
                print_info("Run 'gif-gen config --init' to create one")
                return 1

            # Try to open in editor
            editor = os.environ.get('EDITOR', 'nano')

            try:
                subprocess.run([editor, str(config_path)])
                print_success("Config file updated. Reload to see changes.")
                return 0
            except Exception as e:
                print_error(f"Could not open editor: {e}")
                print_info(f"Manually edit: {config_path}")
                return 1

        elif args.reset:
            # Reset to defaults
            if Config.USER_CONFIG_FILE.exists():
                backup = Config.USER_CONFIG_FILE.with_suffix('.bak')
                Config.USER_CONFIG_FILE.rename(backup)
                print_warning(f"Backed up to: {backup}")

            Config.create_default_config()
            print_success("Configuration reset to defaults")
            return 0

        else:
            # Show current config
            Config.print_status()
            return 0

    def cmd_batch(self, args):
        """Process batch of files"""
        processor = BatchProcessor(max_workers=args.workers)

        if args.config:
            # Process from config file
            config_path = Path(args.config)

            if not config_path.exists():
                print_error(f"Config file not found: {config_path}")
                return 1

            try:
                result = processor.process_from_config(config_path)

                if result.failed == 0:
                    print_success(f"All {result.successful} jobs completed successfully!")
                    return 0
                else:
                    print_error(f"{result.failed} job(s) failed")
                    return 1

            except Exception as e:
                print_error(f"Batch processing failed: {e}")
                return 1

        elif args.input_dir:
            # Process directory
            input_dir = Path(args.input_dir)
            output_dir = Path(args.output_dir) if args.output_dir else input_dir / 'output'

            if not input_dir.exists():
                print_error(f"Input directory not found: {input_dir}")
                return 1

            try:
                template = self.loader.load_template(args.template)
            except Exception as e:
                print_error(f"Error loading template: {e}")
                return 1

            # Parse common variables
            common_vars = {}
            if args.var:
                for var in args.var:
                    key, value = var.split('=', 1)
                    common_vars[key] = value

            try:
                result = processor.process_directory(
                    template,
                    input_dir,
                    output_dir,
                    preset_name=args.preset,
                    pattern=args.pattern,
                    **common_vars
                )

                if result.failed == 0:
                    print_success(f"All {result.successful} jobs completed successfully!")
                    return 0
                else:
                    print_error(f"{result.failed} job(s) failed")
                    return 1

            except Exception as e:
                print_error(f"Batch processing failed: {e}")
                return 1

        else:
            print_error("Either --config or --input-dir must be specified")
            return 1


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        prog='gif-gen',
        description='Template-based GIF and animation generator',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # List all templates
  gif-gen list

  # Show template info
  gif-gen info social-media/twitter-demo

  # Check tool availability
  gif-gen check

  # Create a GIF
  gif-gen create demo/simple-gif --video my-video.mp4 --preset balanced

  # Create with custom variables
  gif-gen create social-media/twitter-demo \\
    --video demo.mp4 \\
    --var product_name="My Product" \\
    --preset balanced \\
    --output output.gif

For more information, see ORCHESTRATOR_README.md
        """
    )

    parser.add_argument('--no-color', action='store_true',
                       help='Disable colored output')

    subparsers = parser.add_subparsers(dest='command', help='Command to run')

    # List command
    list_parser = subparsers.add_parser('list', help='List available templates')

    # Info command
    info_parser = subparsers.add_parser('info', help='Show template information')
    info_parser.add_argument('template', help='Template path (e.g., social-media/twitter-demo)')

    # Check command
    check_parser = subparsers.add_parser('check', help='Check tool availability')

    # Presets command
    presets_parser = subparsers.add_parser('presets', help='Show template presets')
    presets_parser.add_argument('template', help='Template path')
    presets_parser.add_argument('-v', '--verbose', action='store_true',
                               help='Show detailed preset parameters')

    # Validate command
    validate_parser = subparsers.add_parser('validate', help='Validate templates')
    validate_parser.add_argument('path', nargs='?',
                                help='Template file or directory to validate (default: all templates)')

    # Config command
    config_parser = subparsers.add_parser('config', help='Manage configuration')
    config_group = config_parser.add_mutually_exclusive_group()
    config_group.add_argument('--init', action='store_true',
                             help='Create default config file (~/.gifgenrc)')
    config_group.add_argument('--show', action='store_true',
                             help='Show current configuration')
    config_group.add_argument('--edit', action='store_true',
                             help='Edit config file in $EDITOR')
    config_group.add_argument('--reset', action='store_true',
                             help='Reset configuration to defaults')

    # Batch command
    batch_parser = subparsers.add_parser('batch', help='Batch process multiple files')
    batch_parser.add_argument('--config', '-c', help='Batch config file (JSON)')
    batch_parser.add_argument('--input-dir', '-i', help='Input directory')
    batch_parser.add_argument('--output-dir', '-o', help='Output directory')
    batch_parser.add_argument('--template', '-t', help='Template to use (required with --input-dir)')
    batch_parser.add_argument('--preset', '-p', default='balanced', help='Preset to use')
    batch_parser.add_argument('--pattern', default='*.mp4', help='File pattern (default: *.mp4)')
    batch_parser.add_argument('--workers', '-w', type=int, default=4,
                            help='Number of parallel workers (default: 4)')
    batch_parser.add_argument('--var', action='append',
                            help='Common variable for all jobs (key=value)')

    # Create command
    create_parser = subparsers.add_parser('create', help='Create GIF from template')
    create_parser.add_argument('template', help='Template path (e.g., demo/simple-gif)')
    create_parser.add_argument('--video', help='Input video file')
    create_parser.add_argument('--output', '-o', help='Output file path')
    create_parser.add_argument('--preset', '-p', default='balanced',
                              help='Preset to use (default: balanced)')
    create_parser.add_argument('--var', action='append',
                              help='Template variable (key=value, can be used multiple times)')

    args = parser.parse_args()

    # Disable colors if requested
    if args.no_color:
        Colors.disable()

    # Show help if no command
    if not args.command:
        parser.print_help()
        return 0

    # Create CLI instance and run command
    cli = CLI()

    try:
        if args.command == 'list':
            return cli.cmd_list(args)
        elif args.command == 'info':
            return cli.cmd_info(args)
        elif args.command == 'check':
            return cli.cmd_check(args)
        elif args.command == 'presets':
            return cli.cmd_presets(args)
        elif args.command == 'validate':
            return cli.cmd_validate(args)
        elif args.command == 'config':
            return cli.cmd_config(args)
        elif args.command == 'batch':
            return cli.cmd_batch(args)
        elif args.command == 'create':
            return cli.cmd_create(args)
        else:
            parser.print_help()
            return 1
    except KeyboardInterrupt:
        print()
        print_warning("Interrupted by user")
        return 130
    except Exception as e:
        print_error(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == '__main__':
    sys.exit(main())
