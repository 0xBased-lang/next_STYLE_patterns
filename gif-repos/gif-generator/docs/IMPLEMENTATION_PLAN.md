# Template Generator System - Implementation Plan

## Overview

**Goal**: Create an intelligent template-based generator for GIF/animation outcomes
**Approach**: Incremental, test-driven, modular architecture
**Timeline**: 4 phases, ~2 weeks
**Success Criteria**: Generate professional outputs with 3 commands or less

## Design Principles

1. **Start Simple**: One working example before scaling
2. **Validate Early**: Test each component independently
3. **Compose Well**: Tools should chain naturally
4. **Fail Fast**: Clear errors, actionable feedback
5. **Progressive Enhancement**: Each step adds value to previous

## Architecture Decision: Hybrid Approach

```
Configuration Layer (YAML)     ← User-friendly templates
        ↓
Orchestration Layer (Python)   ← Intelligence & tool selection
        ↓
Tool Layer (Wrappers)          ← Existing repos abstracted
        ↓
Output Layer (Validation)      ← Quality gates & metrics
```

**Rationale**:
- YAML: Non-developers can create templates
- Python: Rich ecosystem, easy AI model integration
- Wrappers: Isolate tool complexity, enable mocking/testing
- Validation: Ensure quality before user sees output

---

## PHASE 1: Foundation (Day 1-2)

### Step 1.1: Directory Structure (30 min)

**Action**: Create foundational directory tree

```bash
gif-repos/
├── generator/                    # ← NEW: Core system
│   ├── core/                     # Orchestration logic
│   │   ├── __init__.py
│   │   ├── orchestrator.py       # Main pipeline executor
│   │   ├── template_loader.py    # YAML parser
│   │   └── validator.py          # Input/output validation
│   ├── tools/                    # Tool wrappers
│   │   ├── __init__.py
│   │   ├── base.py               # Abstract base class
│   │   ├── gif_tools.py          # gifcurry, gifsicle
│   │   └── ai_models.py          # LivePortrait, first-order
│   ├── cli.py                    # Command-line interface
│   ├── config.py                 # Global configuration
│   └── requirements.txt
│
├── templates/                    # ← NEW: Template library
│   ├── _base/                    # Base templates
│   │   └── template.schema.yaml  # JSON Schema for validation
│   ├── social-media/
│   │   ├── twitter-demo/
│   │   │   ├── template.yaml
│   │   │   ├── presets/
│   │   │   │   ├── quick.yaml
│   │   │   │   ├── balanced.yaml
│   │   │   │   └── quality.yaml
│   │   │   └── examples/
│   │   │       ├── input/
│   │   │       └── output/
│   │   └── README.md
│   ├── portrait-animation/
│   └── web-animation/
│
├── gallery/                      # ← NEW: Visual examples
│   ├── outcomes/
│   ├── comparisons/
│   └── metrics/
│
└── [existing repos...]
```

**Validation**: Directory tree exists, empty files compile

**Code**:
```bash
# Create structure
mkdir -p generator/{core,tools}
mkdir -p templates/{_base,social-media/twitter-demo/{presets,examples/{input,output}}}
mkdir -p gallery/{outcomes,comparisons,metrics}
touch generator/core/{__init__.py,orchestrator.py,template_loader.py,validator.py}
touch generator/tools/{__init__.py,base.py,gif_tools.py,ai_models.py}
touch generator/{cli.py,config.py,requirements.txt}
```

### Step 1.2: Requirements Definition (15 min)

**Action**: Define minimal dependencies

```python
# generator/requirements.txt
# Core
pyyaml>=6.0
click>=8.1.0          # CLI framework
jsonschema>=4.0       # Template validation
python-dotenv>=1.0

# Tool integration
pillow>=10.0          # Image processing
imageio>=2.31         # Video I/O
numpy>=1.24

# Optional (for AI models)
torch>=2.0            # AI models
opencv-python>=4.8    # Video processing

# Development
pytest>=7.4
black>=23.0
mypy>=1.5
```

**Validation**: `pip install -r requirements.txt` succeeds

### Step 1.3: Configuration System (30 min)

**Action**: Global configuration with smart defaults

```python
# generator/config.py
from pathlib import Path
from typing import Dict, Any
import yaml

class Config:
    """Global configuration with intelligent defaults"""

    # Paths
    ROOT_DIR = Path(__file__).parent.parent
    GENERATOR_DIR = ROOT_DIR / "generator"
    TEMPLATES_DIR = ROOT_DIR / "templates"
    GALLERY_DIR = ROOT_DIR / "gallery"
    CACHE_DIR = ROOT_DIR / ".cache"

    # Tool paths (auto-detect)
    GIFCURRY_CLI = "gifcurry_cli"
    GIFSICLE = "gifsicle"
    FFMPEG = "ffmpeg"

    # Defaults
    DEFAULT_PRESET = "balanced"
    DEFAULT_OUTPUT_DIR = ROOT_DIR / "output"

    # Quality gates
    MAX_FILE_SIZE_MB = 10
    MIN_FPS = 5
    MAX_FPS = 60

    # Performance
    USE_GPU = True
    MAX_WORKERS = 4

    @classmethod
    def load_user_config(cls, config_file: Path = None):
        """Override defaults with user config"""
        if config_file and config_file.exists():
            with open(config_file) as f:
                user_config = yaml.safe_load(f)
                for key, value in user_config.items():
                    setattr(cls, key.upper(), value)

    @classmethod
    def validate_tools(cls) -> Dict[str, bool]:
        """Check which tools are available"""
        import shutil
        return {
            'gifcurry': shutil.which(cls.GIFCURRY_CLI) is not None,
            'gifsicle': shutil.which(cls.GIFSICLE) is not None,
            'ffmpeg': shutil.which(cls.FFMPEG) is not None,
        }
```

**Validation**: Config loads, paths resolve, tools detected

---

## PHASE 2: Minimal Viable Product (Day 3-4)

### Step 2.1: Template Schema (45 min)

**Action**: Define template structure with JSON Schema

```yaml
# templates/_base/template.schema.yaml
$schema: "http://json-schema.org/draft-07/schema#"
title: "Template Schema"
description: "Schema for generator templates"
type: object

required:
  - name
  - category
  - pipeline

properties:
  name:
    type: string
    description: "Human-readable template name"

  description:
    type: string

  category:
    type: string
    enum: [social-media, portrait-animation, character-animation, web-animation, technical-docs, creative-effects]

  pipeline:
    type: array
    description: "Ordered list of processing stages"
    items:
      type: object
      required: [tool, config]
      properties:
        tool:
          type: string
          enum: [gifcurry, gifsicle, liveportrait, first-order-model, ffmpeg, custom]
        config:
          type: object
        fallback:
          type: string

  assets:
    type: object
    properties:
      required:
        type: array
        items:
          type: object
      optional:
        type: array

  presets:
    type: object
    description: "Named parameter sets"

  validation:
    type: object
    description: "Output validation rules"
```

**Validation**: Schema parses, can validate YAML files

### Step 2.2: First Template (Twitter Demo) (1 hour)

**Action**: Create one complete, working template

```yaml
# templates/social-media/twitter-demo/template.yaml
name: "Twitter Product Demo"
description: "5-second product demo optimized for Twitter (<5MB)"
category: "social-media"
version: "1.0.0"

pipeline:
  - tool: "gifcurry"
    config:
      start_time: 0
      end_time: 5
      width: 600
      fps: 15
      quality: 100
      text_overlay:
        text: "{{product_name}}"
        position: "bottom"
        font: "Arial-Bold"
        font_size: 36
        fill_color: [255, 255, 255, 255]
        outline_color: [0, 0, 0, 255]
        outline_size: 3

  - tool: "gifsicle"
    config:
      optimization_level: 3
      colors: 128
      lossy: 80

assets:
  required:
    - name: "video"
      type: "video/*"
      description: "Product demo video"

  optional:
    - name: "logo"
      type: "image/*"
      description: "Brand logo overlay"

variables:
  product_name:
    type: "string"
    default: "Product Name"
    description: "Text to display on GIF"

presets:
  quick:
    gifcurry: {fps: 10, quality: 80}
    gifsicle: {colors: 64, lossy: 100}

  balanced:  # Default
    gifcurry: {fps: 15, quality: 100}
    gifsicle: {colors: 128, lossy: 80}

  quality:
    gifcurry: {fps: 20, quality: 100}
    gifsicle: {colors: 256, lossy: 40}

validation:
  max_duration: 5.5
  max_size_mb: 5
  min_width: 400
  max_width: 1200
  required_format: "gif"

metadata:
  author: "Generator System"
  tags: [social-media, twitter, product, demo]
  platform: "twitter"
  use_cases: [product-launch, feature-announcement, tutorial]
```

**Validation**: Template validates against schema

### Step 2.3: Template Loader (1 hour)

**Action**: Parse and validate templates

```python
# generator/core/template_loader.py
import yaml
from pathlib import Path
from typing import Dict, Any, List
import jsonschema

class TemplateLoader:
    """Load and validate templates from YAML files"""

    def __init__(self, templates_dir: Path, schema_path: Path):
        self.templates_dir = templates_dir
        self.schema = self._load_schema(schema_path)

    def _load_schema(self, schema_path: Path) -> Dict:
        """Load JSON Schema"""
        with open(schema_path) as f:
            return yaml.safe_load(f)

    def load_template(self, template_path: str) -> Dict[str, Any]:
        """
        Load template from path (relative or absolute)
        Example: 'social-media/twitter-demo' or '/abs/path/template.yaml'
        """
        # Resolve path
        if Path(template_path).is_absolute():
            full_path = Path(template_path)
        else:
            # Relative to templates dir
            full_path = self.templates_dir / template_path
            if not full_path.suffix:
                full_path = full_path / "template.yaml"

        if not full_path.exists():
            raise FileNotFoundError(f"Template not found: {full_path}")

        # Load YAML
        with open(full_path) as f:
            template = yaml.safe_load(f)

        # Validate against schema
        try:
            jsonschema.validate(template, self.schema)
        except jsonschema.ValidationError as e:
            raise ValueError(f"Invalid template: {e.message}")

        # Add metadata
        template['_path'] = str(full_path)
        template['_dir'] = str(full_path.parent)

        return template

    def apply_preset(self, template: Dict, preset_name: str) -> Dict:
        """Apply preset to template config"""
        if preset_name not in template.get('presets', {}):
            raise ValueError(f"Preset '{preset_name}' not found")

        preset = template['presets'][preset_name]

        # Deep merge preset into pipeline configs
        for stage in template['pipeline']:
            tool = stage['tool']
            if tool in preset:
                stage['config'].update(preset[tool])

        return template

    def substitute_variables(self, template: Dict, variables: Dict[str, Any]) -> Dict:
        """Replace {{variable}} placeholders"""
        import json
        import re

        # Convert to JSON string for easy replacement
        template_str = json.dumps(template)

        # Replace all {{var}} with values
        for var, value in variables.items():
            pattern = r'\{\{' + var + r'\}\}'
            template_str = re.sub(pattern, str(value), template_str)

        # Check for unresolved variables
        unresolved = re.findall(r'\{\{(\w+)\}\}', template_str)
        if unresolved:
            # Use defaults
            defaults = template.get('variables', {})
            for var in unresolved:
                if var in defaults:
                    default = defaults[var].get('default', '')
                    template_str = template_str.replace(f'{{{{{var}}}}}', str(default))

        return json.loads(template_str)

    def list_templates(self) -> List[Dict[str, str]]:
        """List all available templates"""
        templates = []
        for template_file in self.templates_dir.rglob("template.yaml"):
            # Skip base template
            if '_base' in template_file.parts:
                continue

            try:
                with open(template_file) as f:
                    t = yaml.safe_load(f)
                templates.append({
                    'path': str(template_file.relative_to(self.templates_dir).parent),
                    'name': t.get('name', ''),
                    'category': t.get('category', ''),
                    'description': t.get('description', '')
                })
            except:
                pass

        return templates
```

**Validation**: Load template, apply preset, substitute variables

### Step 2.4: Tool Wrapper Base Class (45 min)

**Action**: Abstract tool interface

```python
# generator/tools/base.py
from abc import ABC, abstractmethod
from typing import Dict, Any
from pathlib import Path

class ToolWrapper(ABC):
    """Abstract base class for tool wrappers"""

    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}

    @abstractmethod
    def execute(self, input_data: Any, config: Dict[str, Any]) -> Any:
        """
        Execute tool with given input and config

        Args:
            input_data: Input file path or data structure
            config: Tool-specific configuration

        Returns:
            Output file path or data structure
        """
        pass

    @abstractmethod
    def validate_input(self, input_data: Any) -> bool:
        """Validate input before execution"""
        pass

    @abstractmethod
    def validate_output(self, output: Any) -> bool:
        """Validate output after execution"""
        pass

    def get_command(self, input_data: Any, config: Dict) -> str:
        """Get command that would be executed (for debugging)"""
        return "Tool command not implemented"
```

**Validation**: Base class imports, abstract methods defined

### Step 2.5: GIF Tools Wrapper (2 hours)

**Action**: Implement gifcurry and gifsicle wrappers

```python
# generator/tools/gif_tools.py
import subprocess
from pathlib import Path
from typing import Dict, Any
from .base import ToolWrapper
import shutil

class GifcurryWrapper(ToolWrapper):
    """Wrapper for gifcurry_cli"""

    def __init__(self):
        self.cli = shutil.which("gifcurry_cli")
        if not self.cli:
            raise RuntimeError("gifcurry_cli not found in PATH")

    def execute(self, input_data: Dict, config: Dict) -> Path:
        """
        Execute gifcurry

        input_data: {'video': Path}
        config: gifcurry parameters
        """
        video = input_data.get('video')
        output = input_data.get('output', Path('output.gif'))

        # Build command
        cmd = [
            self.cli,
            '--input-file', str(video),
            '--output-file', str(output),
            '--start-time', str(config.get('start_time', 0)),
            '--end-time', str(config.get('end_time', 5)),
            '--width', str(config.get('width', 600)),
            '--fps', str(config.get('fps', 15)),
            '--quality', str(config.get('quality', 100))
        ]

        # Add text overlay if configured
        if 'text_overlay' in config:
            overlay = config['text_overlay']
            cmd.extend([
                '--text', overlay.get('text', ''),
                '--font-family', overlay.get('font', 'Arial'),
                '--font-size', str(overlay.get('font_size', 36))
            ])

        # Execute
        print(f"🎬 Executing: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            raise RuntimeError(f"gifcurry failed: {result.stderr}")

        return output

    def validate_input(self, input_data: Dict) -> bool:
        video = input_data.get('video')
        return video and Path(video).exists()

    def validate_output(self, output: Path) -> bool:
        return output.exists() and output.stat().st_size > 0


class GifsicleWrapper(ToolWrapper):
    """Wrapper for gifsicle"""

    def __init__(self):
        self.cli = shutil.which("gifsicle")
        if not self.cli:
            raise RuntimeError("gifsicle not found in PATH")

    def execute(self, input_data: Dict, config: Dict) -> Path:
        """
        Execute gifsicle optimization

        input_data: {'input': Path}
        config: gifsicle parameters
        """
        input_gif = input_data.get('input')
        output = input_data.get('output', input_gif.parent / f"{input_gif.stem}_optimized.gif")

        # Build command
        cmd = [
            self.cli,
            f"-O{config.get('optimization_level', 3)}",
            '--colors', str(config.get('colors', 128)),
        ]

        # Add lossy compression if specified
        if 'lossy' in config:
            cmd.extend(['--lossy', f"={config['lossy']}"])

        cmd.extend([str(input_gif), '-o', str(output)])

        # Execute
        print(f"🗜️  Optimizing: {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            raise RuntimeError(f"gifsicle failed: {result.stderr}")

        # Log compression stats
        original_size = input_gif.stat().st_size
        optimized_size = output.stat().st_size
        reduction = (1 - optimized_size/original_size) * 100
        print(f"✅ Reduced by {reduction:.1f}% ({original_size/1024/1024:.2f}MB → {optimized_size/1024/1024:.2f}MB)")

        return output

    def validate_input(self, input_data: Dict) -> bool:
        gif = input_data.get('input')
        return gif and Path(gif).exists() and Path(gif).suffix == '.gif'

    def validate_output(self, output: Path) -> bool:
        return output.exists() and output.stat().st_size > 0
```

**Validation**: Run tools standalone, check outputs

---

## PHASE 3: Core Orchestration (Day 5-6)

### Step 3.1: Pipeline Orchestrator (3 hours)

**Action**: Execute multi-stage pipelines

```python
# generator/core/orchestrator.py
from pathlib import Path
from typing import Dict, Any
from ..tools.gif_tools import GifcurryWrapper, GifsicleWrapper

class PipelineOrchestrator:
    """Execute template pipelines"""

    def __init__(self):
        self.tools = {
            'gifcurry': GifcurryWrapper(),
            'gifsicle': GifsicleWrapper(),
        }
        self.metrics = {}

    def execute_pipeline(self, template: Dict, assets: Dict) -> Dict:
        """
        Execute full template pipeline

        Args:
            template: Loaded template dict
            assets: Input assets {'video': Path, ...}

        Returns:
            {
                'output': Path,
                'metrics': {...},
                'stages': [...]
            }
        """
        print(f"\n🚀 Executing template: {template['name']}")
        print(f"📋 Pipeline: {len(template['pipeline'])} stages\n")

        # Track data flow through pipeline
        data = assets.copy()
        stage_outputs = []

        # Execute each stage
        for i, stage in enumerate(template['pipeline'], 1):
            tool_name = stage['tool']
            config = stage['config']

            print(f"[{i}/{len(template['pipeline'])}] {tool_name}")

            # Get tool wrapper
            tool = self.tools.get(tool_name)
            if not tool:
                raise ValueError(f"Unknown tool: {tool_name}")

            # Validate input
            if not tool.validate_input(data):
                raise ValueError(f"Invalid input for {tool_name}")

            # Execute
            try:
                output = tool.execute(data, config)
                stage_outputs.append({
                    'stage': i,
                    'tool': tool_name,
                    'output': output,
                    'success': True
                })

                # Update data for next stage
                if tool_name == 'gifcurry':
                    data['input'] = output
                elif tool_name == 'gifsicle':
                    data['input'] = output

            except Exception as e:
                print(f"❌ Error in stage {i} ({tool_name}): {e}")

                # Try fallback if specified
                if 'fallback' in stage:
                    print(f"🔄 Trying fallback: {stage['fallback']}")
                    tool = self.tools[stage['fallback']]
                    output = tool.execute(data, config)
                else:
                    raise

        # Final output is last stage output
        final_output = stage_outputs[-1]['output']

        print(f"\n✅ Pipeline complete!")
        print(f"📁 Output: {final_output}")

        return {
            'output': final_output,
            'stages': stage_outputs,
            'template': template['name']
        }
```

**Validation**: Execute twitter-demo template end-to-end

### Step 3.2: Validator (1 hour)

**Action**: Input/output validation

```python
# generator/core/validator.py
from pathlib import Path
from typing import Dict, Any
import imageio

class Validator:
    """Validate inputs and outputs against template requirements"""

    @staticmethod
    def validate_assets(assets: Dict, requirements: list) -> bool:
        """Validate required assets are provided"""
        errors = []

        for req in requirements:
            name = req['name']
            if name not in assets:
                errors.append(f"Missing required asset: {name}")
            else:
                asset_path = Path(assets[name])
                if not asset_path.exists():
                    errors.append(f"Asset file not found: {asset_path}")

        if errors:
            raise ValueError("\n".join(errors))

        return True

    @staticmethod
    def validate_output(output_path: Path, validation_rules: Dict) -> bool:
        """Validate output against template validation rules"""
        errors = []

        # Check file exists
        if not output_path.exists():
            errors.append("Output file not created")
            return False

        # Check file size
        size_mb = output_path.stat().st_size / 1024 / 1024
        max_size = validation_rules.get('max_size_mb')
        if max_size and size_mb > max_size:
            errors.append(f"File too large: {size_mb:.2f}MB (max: {max_size}MB)")

        # Check format
        required_format = validation_rules.get('required_format')
        if required_format and output_path.suffix.lstrip('.') != required_format:
            errors.append(f"Wrong format: {output_path.suffix} (expected: {required_format})")

        # For GIF/video, check duration
        if output_path.suffix in ['.gif', '.mp4']:
            try:
                reader = imageio.get_reader(output_path)
                fps = reader.get_meta_data().get('fps', 15)
                duration = reader.count_frames() / fps

                max_duration = validation_rules.get('max_duration')
                if max_duration and duration > max_duration:
                    errors.append(f"Duration too long: {duration:.1f}s (max: {max_duration}s)")

            except Exception as e:
                errors.append(f"Could not validate duration: {e}")

        if errors:
            raise ValueError("\n".join(errors))

        return True
```

**Validation**: Test with various inputs

---

## PHASE 4: User Interface (Day 7-8)

### Step 4.1: CLI Implementation (2 hours)

**Action**: User-friendly command-line interface

```python
# generator/cli.py
import click
from pathlib import Path
from .core.template_loader import TemplateLoader
from .core.orchestrator import PipelineOrchestrator
from .core.validator import Validator
from .config import Config

@click.group()
def cli():
    """Template-based GIF/Animation Generator"""
    pass

@cli.command()
@click.argument('template_path')
@click.option('--video', type=click.Path(exists=True), help='Input video file')
@click.option('--preset', default='balanced', help='Preset to use')
@click.option('--output', type=click.Path(), help='Output file path')
@click.option('--var', multiple=True, help='Template variables (key=value)')
def create(template_path, video, preset, output, var):
    """Generate output from template"""

    # Load template
    loader = TemplateLoader(Config.TEMPLATES_DIR, Config.TEMPLATES_DIR / '_base' / 'template.schema.yaml')
    template = loader.load_template(template_path)

    # Apply preset
    template = loader.apply_preset(template, preset)

    # Parse variables
    variables = {}
    for v in var:
        key, value = v.split('=', 1)
        variables[key] = value

    template = loader.substitute_variables(template, variables)

    # Prepare assets
    assets = {'video': Path(video)}
    if output:
        assets['output'] = Path(output)

    # Validate assets
    Validator.validate_assets(assets, template['assets']['required'])

    # Execute pipeline
    orchestrator = PipelineOrchestrator()
    result = orchestrator.execute_pipeline(template, assets)

    # Validate output
    validation_rules = template.get('validation', {})
    Validator.validate_output(result['output'], validation_rules)

    click.echo(f"\n✅ Success! Output: {result['output']}")

@cli.command()
def list():
    """List available templates"""
    loader = TemplateLoader(Config.TEMPLATES_DIR, Config.TEMPLATES_DIR / '_base' / 'template.schema.yaml')
    templates = loader.list_templates()

    click.echo("\n📚 Available Templates:\n")
    for t in templates:
        click.echo(f"  {t['path']}")
        click.echo(f"    {t['description']}")
        click.echo(f"    Category: {t['category']}\n")

@cli.command()
@click.argument('template_path')
def info(template_path):
    """Show template information"""
    loader = TemplateLoader(Config.TEMPLATES_DIR, Config.TEMPLATES_DIR / '_base' / 'template.schema.yaml')
    template = loader.load_template(template_path)

    click.echo(f"\n📋 Template: {template['name']}")
    click.echo(f"   {template['description']}\n")
    click.echo(f"Category: {template['category']}")
    click.echo(f"Pipeline: {len(template['pipeline'])} stages")

    if 'presets' in template:
        click.echo(f"\nPresets: {', '.join(template['presets'].keys())}")

if __name__ == '__main__':
    cli()
```

**Validation**: CLI runs, shows help, lists templates

### Step 4.2: Example Assets & Testing (1 hour)

**Action**: Create sample inputs for testing

```bash
# Create example assets
mkdir -p templates/social-media/twitter-demo/examples/input
# Add sample video (download or create)
# Add expected output

# Test complete flow
python -m generator.cli create social-media/twitter-demo \
  --video templates/social-media/twitter-demo/examples/input/demo.mp4 \
  --preset balanced \
  --var product_name="Amazing Product" \
  --output output/demo.gif
```

**Validation**: Full pipeline executes successfully

---

## PHASE 5: Expansion & Intelligence (Day 9-12)

[Continuing in next step...]

Would you like me to continue with:
1. AI model integration (LivePortrait, first-order-model)
2. Preset system and intelligent tool selection
3. Batch processing
4. Interactive mode
5. Gallery generation

Or should I proceed to implement Step 1 (Foundation) right now?
