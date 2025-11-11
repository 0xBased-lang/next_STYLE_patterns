# Template Library

**Collection of ready-to-use templates for GIF and animation generation**

## 📚 Template Categories

### 1. Social Media (4 templates)

Platform-optimized templates for social media content.

| Template | Platform | Format | Duration | Size Limit | Use Case |
|----------|----------|--------|----------|------------|----------|
| **twitter-demo** | Twitter | 600×auto | 5s | <5MB | Product demos, announcements |
| **instagram-square** | Instagram | 640×640 (1:1) | 8s | <15MB | Posts, stories, feed content |
| **linkedin-header** | LinkedIn | 1200×627 | 6s | <5MB | Articles, posts, company pages |
| **github-readme** | GitHub | 800×600 | 10s | <10MB | README demos, documentation |

### 2. Portrait Animation (2 templates)

AI-powered portrait and face animation using LivePortrait or first-order-model.

| Template | Model | Input | Output | Use Case |
|----------|-------|-------|--------|----------|
| **talking-head** | LivePortrait (primary) | Portrait + driving video | MP4 video | Presentations, testimonials, avatars |
| **expression-transfer** | first-order-model | Portrait + expression video | MP4 video | Emotion demos, character animation |

### 3. Character Animation (1 template)

Hand-drawn character animation using ML pose detection.

| Template | Model | Input | Output | Use Case |
|----------|-------|-------|--------|----------|
| **hand-drawn** | AnimatedDrawings | Drawing + motion (BVH) | MP4 video | Children's art, mascots, creative |

### 4. Web Animation (1 template)

Code-based web animations using framer-motion.

| Template | Framework | Output | Use Case |
|----------|-----------|--------|----------|
| **loading-spinner** | Motion/Framer Motion | React/Vue/JS code | Loading indicators, spinners |

### 5. Technical Documentation (1 template)

Terminal and CLI demos.

| Template | Tool | Input | Output | Use Case |
|----------|------|-------|--------|----------|
| **terminal-demo** | asciicast2gif | .cast recording | GIF | Installation guides, CLI demos |

## 🚀 Quick Start

### Basic Usage

```bash
# List all available templates
python -m generator.cli list

# Get template info
python -m generator.cli info social-media/twitter-demo

# Create output from template
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --output result.gif
```

### With Presets

```bash
# Use quality preset
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --preset quality \
  --output high-quality.gif

# Use quick preset (smallest/fastest)
python -m generator.cli create social-media/instagram-square \
  --video product.mp4 \
  --preset quick \
  --output insta-quick.gif
```

### With Variables

```bash
# Customize text overlay
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --var product_name="Amazing Product" \
  --var caption="Now Available" \
  --output twitter.gif
```

### Portrait Animation

```bash
# Create talking head video
python -m generator.cli create portrait-animation/talking-head \
  --portrait face.jpg \
  --driving talking.mp4 \
  --preset professional \
  --output presenter.mp4
```

## 📋 Template Structure

Each template directory contains:

```
template-name/
├── template.yaml       # Template configuration
├── README.md          # Usage documentation
├── presets/           # Quality/style presets (optional)
└── examples/          # Sample inputs/outputs (optional)
    ├── input/
    └── output/
```

## 🎨 Template Configuration

### Basic Template Structure

```yaml
name: "Template Name"
description: "What this template creates"
version: "1.0.0"
category: "social-media"

# Processing stages
pipeline:
  - tool: "gifcurry"
    config:
      width: 600
      fps: 15

  - tool: "gifsicle"
    config:
      colors: 128
      lossy: 80

# Required inputs
assets:
  required:
    - name: "video"
      type: "video/*"
      description: "Input video file"

# Template variables
variables:
  product_name:
    type: "string"
    default: "Product"
    description: "Text to display"

# Quality presets
presets:
  quick: {fps: 10, colors: 64}
  balanced: {fps: 15, colors: 128}
  quality: {fps: 20, colors: 256}

# Output validation
validation:
  max_size_mb: 5
  max_duration: 10
```

## 🎯 Selecting the Right Template

### By Platform

| Platform | Recommended Template | Why |
|----------|---------------------|-----|
| Twitter | `twitter-demo` | Optimized for 5MB limit, 5s duration |
| Instagram | `instagram-square` | 1:1 aspect ratio, higher quality |
| LinkedIn | `linkedin-header` | Professional aspect ratio |
| GitHub | `github-readme` | Code-friendly dimensions |

### By Use Case

| Use Case | Recommended Template | Tools Used |
|----------|---------------------|------------|
| Product launch | `twitter-demo` or `instagram-square` | gifcurry → gifsicle |
| Video presentation | `talking-head` | LivePortrait → ffmpeg |
| Tutorial/Demo | `github-readme` or `terminal-demo` | gifcurry or asciicast2gif |
| Character animation | `hand-drawn` | AnimatedDrawings → ffmpeg |
| Web UI component | `loading-spinner` | motion (code generation) |

### By Input Type

| Input | Template | Output |
|-------|----------|--------|
| Video file | Any social-media template | GIF |
| Portrait photo + video | `talking-head` or `expression-transfer` | MP4 |
| Hand-drawn image | `hand-drawn` | MP4 |
| Terminal recording | `terminal-demo` | GIF |
| Configuration | `loading-spinner` | Code |

## 🔧 Customization

### Creating Custom Presets

Add to `template.yaml`:

```yaml
presets:
  my_custom_preset:
    gifcurry:
      width: 500
      fps: 12
    gifsicle:
      colors: 100
      lossy: 90
```

### Overriding Defaults

```bash
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --config "gifcurry.width=800" \
  --config "gifsicle.colors=256"
```

## 📊 Template Comparison

### File Size vs Quality

| Preset | File Size | Quality | Speed | Best For |
|--------|-----------|---------|-------|----------|
| **quick** | Smallest (~1-2MB) | Good | Fastest | Testing, drafts |
| **balanced** | Medium (~2-4MB) | Better | Fast | Most use cases |
| **quality** | Larger (~4-8MB) | Best | Slower | Final output |

### Tool Capabilities

| Tool | Type | Speed | Quality | GPU Required |
|------|------|-------|---------|--------------|
| gifcurry | GIF creation | Fast | Good | No |
| gifsicle | GIF optimization | Very fast | Excellent | No |
| LivePortrait | AI portrait | Medium | Excellent | Yes (recommended) |
| first-order-model | AI motion | Fast | Good | Yes |
| AnimatedDrawings | Character AI | Medium | Good | Yes |
| asciicast2gif | Terminal | Fast | Good | No |

## 🎓 Template Development

### Creating a New Template

1. **Copy base template**:
```bash
cp -r templates/social-media/twitter-demo templates/my-category/my-template
```

2. **Edit `template.yaml`**:
```yaml
name: "My Template"
category: "my-category"
# ... customize pipeline, assets, presets
```

3. **Add documentation**:
```bash
# Edit README.md with usage examples
```

4. **Test**:
```bash
python -m generator.cli create my-category/my-template \
  --video test.mp4
```

5. **Add examples** (optional):
```bash
mkdir -p examples/{input,output}
# Add sample files
```

### Template Best Practices

1. **Provide 3 presets**: quick/balanced/quality
2. **Validate outputs**: Set appropriate limits
3. **Document variables**: Clear descriptions
4. **Test edge cases**: Large files, unusual formats
5. **Include examples**: Help users understand expected I/O

## 🔍 Template Validation

Templates are validated against the schema in `_base/template.schema.yaml`.

**Required fields**:
- `name`: Human-readable name
- `category`: One of the defined categories
- `pipeline`: At least one processing stage

**Common validation errors**:

| Error | Fix |
|-------|-----|
| "Missing required field" | Add required field to template |
| "Invalid tool name" | Use supported tool or 'custom' |
| "Invalid category" | Use defined category or add new one |

## 📖 Advanced Usage

### Batch Processing

```bash
# Process multiple videos
for video in videos/*.mp4; do
  python -m generator.cli create social-media/twitter-demo \
    --video "$video" \
    --output "output/$(basename $video .mp4).gif"
done
```

### Template Chaining

```bash
# Generate → optimize → upload
python -m generator.cli create social-media/twitter-demo \
  --video demo.mp4 \
  --output temp.gif && \
gifsicle -O3 temp.gif -o final.gif && \
upload-to-twitter final.gif
```

### Programmatic Usage

```python
from generator.core.template_loader import TemplateLoader
from generator.core.orchestrator import PipelineOrchestrator

# Load template
loader = TemplateLoader(templates_dir, schema_path)
template = loader.load_template('social-media/twitter-demo')
template = loader.apply_preset(template, 'quality')

# Execute
orchestrator = PipelineOrchestrator()
result = orchestrator.execute_pipeline(template, {'video': 'demo.mp4'})
```

## 🤝 Contributing Templates

Want to add a template to the library?

1. Create template following structure above
2. Test with multiple inputs
3. Document usage and examples
4. Submit PR with:
   - Template files
   - README with examples
   - Sample inputs/outputs (small files)

## 📝 Template Metadata

Each template includes metadata for discovery:

```yaml
metadata:
  author: "creator-name"
  tags: [keyword1, keyword2, keyword3]
  platform: "target-platform"
  use_cases: ["use case 1", "use case 2"]
```

## 🔗 Resources

- **Schema**: `_base/template.schema.yaml`
- **Examples**: Each template's `examples/` directory
- **Documentation**: Individual template `README.md` files
- **Tool docs**: `../[repo-name]/CLAUDE.md`

## 📊 Template Statistics

**Total Templates**: 9
**Categories**: 5
**Tools Covered**: 6 (gifcurry, gifsicle, LivePortrait, first-order-model, AnimatedDrawings, asciicast2gif)
**Frameworks**: 2 (motion, framer-motion)

---

**Ready to create?** Start with `python -m generator.cli list` to see all available templates!
