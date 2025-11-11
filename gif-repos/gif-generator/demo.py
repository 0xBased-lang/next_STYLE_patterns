#!/usr/bin/env python3
"""
GIF Generator Demo
Demonstrates template-based GIF creation
"""

from pathlib import Path
import sys

# Add generator to path
sys.path.insert(0, str(Path(__file__).parent))

from generator.core import TemplateLoader, PipelineOrchestrator


def print_banner():
    """Print demo banner"""
    print("=" * 70)
    print("🎬 GIF & Animation Template Generator - Demo")
    print("=" * 70)
    print()


def check_requirements():
    """Check if required tools are installed"""
    from generator.tools import GifcurryTool, GifsicleTool

    print("Checking requirements...")
    print()

    tools = {
        'gifcurry': GifcurryTool(),
        'gifsicle': GifsicleTool()
    }

    all_available = True

    for name, tool in tools.items():
        if tool.is_available():
            print(f"  ✅ {name:12} - {tool.tool_path}")
        else:
            print(f"  ❌ {name:12} - NOT INSTALLED")
            all_available = False

    print()

    if not all_available:
        print("⚠️  Missing tools detected!")
        print()
        print("Installation instructions:")
        print("  gifcurry: https://github.com/lettier/gifcurry")
        print("  gifsicle: brew install gifsicle  (or  apt-get install gifsicle)")
        print()
        print("For this demo, we'll show the workflow anyway...")
        print()

    return all_available


def list_templates():
    """List all available templates"""
    templates_dir = Path(__file__).parent / 'templates'
    loader = TemplateLoader(templates_dir)

    print("📚 Available Templates:")
    print()

    templates = loader.list_templates()

    # Group by category
    by_category = {}
    for template_path in templates:
        category = template_path.split('/')[0]
        if category not in by_category:
            by_category[category] = []
        by_category[category].append(template_path)

    for category, tmpl_list in sorted(by_category.items()):
        category_name = category.replace('-', ' ').title()
        print(f"  {category_name} ({len(tmpl_list)} templates):")
        for tmpl in tmpl_list:
            print(f"    - {tmpl}")
        print()


def demo_template_info():
    """Show detailed info about a template"""
    templates_dir = Path(__file__).parent / 'templates'
    loader = TemplateLoader(templates_dir)

    template_path = 'demo/simple-gif'

    print(f"📝 Template Details: {template_path}")
    print()

    try:
        template = loader.load_template(template_path)

        print(f"Name: {template.name}")
        print(f"Description: {template.description}")
        print(f"Version: {template.version}")
        print(f"Category: {template.category}")
        print()

        print(f"Available Presets:")
        for preset_name, preset_config in template.presets.items():
            desc = preset_config.get('description', 'No description')
            print(f"  - {preset_name:12} {desc}")
        print()

        print(f"Pipeline Steps:")
        for i, step in enumerate(template.pipeline, 1):
            print(f"  {i}. {step['tool']:12} → {step['operation']}")
        print()

        print(f"Required Variables:")
        for var_name, var_config in template.variables.items():
            if var_config.get('required', False):
                var_type = var_config.get('type', 'any')
                var_desc = var_config.get('description', '')
                print(f"  - {var_name} ({var_type}): {var_desc}")
        print()

    except Exception as e:
        print(f"Error loading template: {e}")
        print()


def demo_dry_run():
    """Demonstrate workflow without executing"""
    templates_dir = Path(__file__).parent / 'templates'
    loader = TemplateLoader(templates_dir)

    print("🎯 Demo: Simple GIF Creation")
    print()

    # Load template
    template = loader.load_template('demo/simple-gif')

    # User inputs
    user_vars = {
        'video_path': 'my-demo-video.mp4',
        'output_path': 'demo-output.gif'
    }

    preset = 'balanced'

    print(f"Input Video: {user_vars['video_path']}")
    print(f"Preset: {preset}")
    print(f"Output: {user_vars['output_path']}")
    print()

    # Resolve variables
    resolved = template.resolve_variables(user_vars, preset_name=preset)

    print("Resolved Configuration:")
    for key, value in sorted(resolved.items()):
        if key not in ['video_path', 'output_path']:  # Skip paths
            print(f"  {key:20} = {value}")
    print()

    # Show pipeline
    print("Pipeline Execution Plan:")
    for i, step in enumerate(template.pipeline, 1):
        print(f"  Step {i}: {step['tool']}.{step['operation']}()")
        print(f"         Input: {step['input']}")
        print(f"         Output: {step['output']}")
        print()

    # Show expected result
    preset_config = template.get_preset(preset)
    print("Expected Result:")
    print(f"  File Size: {preset_config.get('expected_size', 'Unknown')}")
    print(f"  Processing Time: {preset_config.get('processing_time', 'Unknown')}")
    print()


def main():
    """Main demo"""
    print_banner()

    # Check requirements
    tools_available = check_requirements()

    # List templates
    list_templates()

    # Show template details
    demo_template_info()

    # Show workflow
    demo_dry_run()

    # Show next steps
    print("=" * 70)
    print("🚀 Next Steps:")
    print("=" * 70)
    print()

    if tools_available:
        print("✅ All tools installed! You're ready to generate GIFs.")
        print()
        print("To generate a GIF, you'll need:")
        print("  1. A video file (MP4, MOV, etc.)")
        print("  2. Run this command:")
        print()
        print("     python -m generator.cli create social-media/twitter-demo \\")
        print("       --video my-video.mp4 \\")
        print("       --var product_name=\"My Product\" \\")
        print("       --preset balanced \\")
        print("       --output output.gif")
        print()
    else:
        print("⚠️  Some tools are missing. Install them first:")
        print()
        print("  gifcurry:")
        print("    macOS: Download from https://github.com/lettier/gifcurry/releases")
        print("    Linux: Download AppImage or build from source")
        print()
        print("  gifsicle:")
        print("    macOS: brew install gifsicle")
        print("    Ubuntu: sudo apt-get install gifsicle")
        print()

    print("For more information, see:")
    print("  - QUICKSTART.md - Getting started guide")
    print("  - templates/README.md - Template documentation")
    print("  - IMPLEMENTATION_PLAN.md - Full system roadmap")
    print()


if __name__ == '__main__':
    main()
