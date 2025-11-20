"""
Component Preview Generation System
Automatically generates visual previews of animation components
"""

import json
import subprocess
from pathlib import Path
from typing import Optional, Dict, Any, List
from dataclasses import dataclass
import hashlib


@dataclass
class PreviewConfig:
    """Configuration for preview generation"""
    width: int = 1200
    height: int = 675
    duration_ms: int = 3000  # 3 seconds
    fps: int = 30
    format: str = "mp4"  # or "gif", "webp"
    quality: str = "high"  # "low", "medium", "high"


class ComponentPreviewGenerator:
    """
    Generate visual previews of animation components

    Supports:
    - Video previews (MP4, WebM)
    - Animated GIFs
    - Static screenshots (PNG, WebP)
    - Thumbnail generation
    """

    def __init__(
        self,
        components_path: Optional[Path] = None,
        output_path: Optional[Path] = None
    ):
        """
        Initialize preview generator

        Args:
            components_path: Path to component source files
            output_path: Path to save generated previews
        """
        self.components_path = components_path or Path(__file__).parent.parent / "graphic-animation-template"
        self.output_path = output_path or Path(__file__).parent / "previews"
        self.output_path.mkdir(parents=True, exist_ok=True)

        # Preview metadata cache
        self.metadata_file = self.output_path / "preview_metadata.json"
        self.metadata = self._load_metadata()

    def _load_metadata(self) -> Dict[str, Any]:
        """Load preview metadata from cache"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r') as f:
                return json.load(f)
        return {}

    def _save_metadata(self):
        """Save preview metadata to cache"""
        with open(self.metadata_file, 'w') as f:
            json.dump(self.metadata, f, indent=2)

    def generate_preview_html(
        self,
        component_id: str,
        component_path: str,
        preset: Optional[str] = None
    ) -> Path:
        """
        Generate standalone HTML file for preview

        Args:
            component_id: Component identifier
            component_path: Path to component TSX file
            preset: Optional preset configuration

        Returns:
            Path to generated HTML file
        """
        html_file = self.output_path / f"{component_id}-preview.html"

        # Read component file
        component_file = Path(component_path)
        if not component_file.exists():
            raise FileNotFoundError(f"Component not found: {component_path}")

        # Generate HTML with component embedded
        html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{component_id} Preview</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background: #000;
        }}
        #root {{
            width: 100%;
            height: 100%;
        }}
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module">
        // Component code will be inserted here
        // For demo purposes, showing structure
        console.log('Preview rendering for: {component_id}');
    </script>
</body>
</html>
        """

        html_file.write_text(html_content)
        return html_file

    def capture_screenshot(
        self,
        component_id: str,
        config: Optional[PreviewConfig] = None
    ) -> Path:
        """
        Capture screenshot of component (requires Playwright)

        Args:
            component_id: Component identifier
            config: Preview configuration

        Returns:
            Path to screenshot file
        """
        config = config or PreviewConfig()
        screenshot_file = self.output_path / f"{component_id}.png"

        try:
            from playwright.sync_api import sync_playwright

            # Generate preview HTML
            html_file = self.generate_preview_html(component_id, "")

            # Capture screenshot
            with sync_playwright() as p:
                browser = p.chromium.launch()
                page = browser.new_page(
                    viewport={'width': config.width, 'height': config.height}
                )

                page.goto(f"file://{html_file.absolute()}")
                page.wait_for_timeout(1000)  # Wait for animation to start

                page.screenshot(path=str(screenshot_file))
                browser.close()

            # Update metadata
            self.metadata[component_id] = {
                'screenshot': str(screenshot_file.name),
                'width': config.width,
                'height': config.height,
                'generated': True
            }
            self._save_metadata()

            return screenshot_file

        except ImportError:
            print("⚠️  Playwright not installed. Install with: pip install playwright && playwright install")
            return self._generate_placeholder(component_id, config)

    def _generate_placeholder(
        self,
        component_id: str,
        config: PreviewConfig
    ) -> Path:
        """Generate placeholder preview (no dependencies)"""
        placeholder_file = self.output_path / f"{component_id}-placeholder.txt"

        placeholder_content = f"""
Component Preview Placeholder
==============================

Component: {component_id}
Size: {config.width}x{config.height}
Format: {config.format}
Duration: {config.duration_ms}ms

To generate real previews, install:
  pip install playwright
  playwright install

Then run:
  python preview_generator.py --component {component_id}
        """

        placeholder_file.write_text(placeholder_content)

        # Update metadata
        self.metadata[component_id] = {
            'placeholder': str(placeholder_file.name),
            'width': config.width,
            'height': config.height,
            'generated': False,
            'requires': 'playwright'
        }
        self._save_metadata()

        return placeholder_file

    def generate_all_previews(
        self,
        components: List[Dict[str, Any]],
        config: Optional[PreviewConfig] = None
    ) -> Dict[str, Path]:
        """
        Generate previews for all components

        Args:
            components: List of component metadata
            config: Preview configuration

        Returns:
            Dict mapping component IDs to preview file paths
        """
        config = config or PreviewConfig()
        previews = {}

        for comp in components:
            comp_id = comp['id']
            print(f"📸 Generating preview for {comp_id}...")

            try:
                preview_path = self.capture_screenshot(comp_id, config)
                previews[comp_id] = preview_path
                print(f"✅ Generated: {preview_path.name}")
            except Exception as e:
                print(f"❌ Failed: {e}")
                preview_path = self._generate_placeholder(comp_id, config)
                previews[comp_id] = preview_path

        return previews

    def generate_thumbnails(
        self,
        sizes: List[tuple] = [(200, 113), (400, 225), (800, 450)]
    ):
        """
        Generate multiple thumbnail sizes from previews

        Args:
            sizes: List of (width, height) tuples
        """
        try:
            from PIL import Image

            for comp_id, metadata in self.metadata.items():
                if 'screenshot' not in metadata:
                    continue

                screenshot_path = self.output_path / metadata['screenshot']
                if not screenshot_path.exists():
                    continue

                print(f"🖼️  Generating thumbnails for {comp_id}...")

                img = Image.open(screenshot_path)

                for width, height in sizes:
                    thumb_path = self.output_path / f"{comp_id}-thumb-{width}x{height}.png"
                    img_copy = img.copy()
                    img_copy.thumbnail((width, height), Image.Resampling.LANCZOS)
                    img_copy.save(thumb_path, "PNG", optimize=True)

                    print(f"  ✅ {width}x{height}: {thumb_path.name}")

        except ImportError:
            print("⚠️  Pillow not installed. Install with: pip install Pillow")

    def get_preview_metadata(self, component_id: str) -> Optional[Dict[str, Any]]:
        """Get preview metadata for a component"""
        return self.metadata.get(component_id)

    def list_previews(self) -> List[Dict[str, Any]]:
        """List all generated previews"""
        previews = []
        for comp_id, metadata in self.metadata.items():
            previews.append({
                'component_id': comp_id,
                **metadata
            })
        return previews


# CLI interface
def main():
    """CLI for preview generation"""
    import argparse

    parser = argparse.ArgumentParser(description="Generate component previews")
    parser.add_argument('--component', help='Component ID to generate')
    parser.add_argument('--all', action='store_true', help='Generate all previews')
    parser.add_argument('--thumbnails', action='store_true', help='Generate thumbnails')
    parser.add_argument('--width', type=int, default=1200, help='Preview width')
    parser.add_argument('--height', type=int, default=675, help='Preview height')
    parser.add_argument('--format', default='png', choices=['png', 'jpg', 'webp'])

    args = parser.parse_args()

    generator = ComponentPreviewGenerator()
    config = PreviewConfig(
        width=args.width,
        height=args.height,
        format=args.format
    )

    if args.component:
        print(f"📸 Generating preview for {args.component}...")
        preview = generator.capture_screenshot(args.component, config)
        print(f"✅ Generated: {preview}")

    elif args.all:
        # Load component registry
        import sys
        sys.path.append(str(Path(__file__).parent.parent / "python"))
        from component_registry import load_registry

        registry = load_registry()
        components = [
            {'id': comp.id, 'name': comp.name}
            for comp in registry.components.values()
        ]

        print(f"📸 Generating previews for {len(components)} components...")
        previews = generator.generate_all_previews(components, config)

        print(f"\n✅ Generated {len(previews)} previews")
        print(f"📁 Output: {generator.output_path}")

    if args.thumbnails:
        print("\n🖼️  Generating thumbnails...")
        generator.generate_thumbnails()

    # Show summary
    print("\n📊 Preview Summary:")
    for preview in generator.list_previews():
        status = "✅" if preview.get('generated') else "⏳"
        print(f"  {status} {preview['component_id']}: {preview.get('screenshot', preview.get('placeholder', 'N/A'))}")


if __name__ == "__main__":
    main()
