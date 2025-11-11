# 🎬 CLI Features Guide

Complete guide to all features in the `gif-gen` CLI tool.

---

## Overview

The CLI provides 5 main commands for managing and creating GIFs:

1. **`list`** - Browse all available templates
2. **`info`** - Get detailed information about a template
3. **`check`** - Verify tool installation
4. **`presets`** - View preset configurations
5. **`create`** - Generate GIFs from templates

---

## 1. `list` - Browse Templates

**Purpose**: View all 29 available templates organized by category

### Usage
```bash
./gif-gen list
```

### Output
- Templates grouped by category (Social Media, AI Enhancement, etc.)
- Shows template name and short description
- Total count of available templates
- Color-coded output for easy reading

### Example Output
```
Available Templates

Social Media (10 templates)
  twitter-demo             Twitter-optimized product demos (15MB, 5:1 aspect)
  instagram-story          Instagram story animations (1080x1920, 15s max)
  linkedin-post            Professional LinkedIn posts (slow-motion, captions)
  ...

AI Enhancement (2 templates)
  style-transfer           Transform videos into artistic masterpieces
  background-removal       Remove backgrounds from videos using AI
  ...

Total: 29 templates

Use gif-gen info <template> to see details
```

### Categories Available
- **Social Media** (10): Twitter, Instagram, LinkedIn, Facebook, etc.
- **AI Enhancement** (2): Style transfer, background removal
- **Character Animation** (3): Hand-drawn, skeletal, sprite-based
- **Portrait Animation** (2): Talking head, expression transfer
- **Creative Effects** (4): Glitch, VHS, cinemagraph, logo animation
- **Professional** (2): Profile pictures, email signatures
- **Technical Docs** (2): Terminal recordings, loading spinners
- **E-commerce** (1): 360° product views
- **Business** (1): Presentation highlights
- **Web Animation** (1): Hover effects
- **Demo** (1): Simple test template

---

## 2. `info` - Template Details

**Purpose**: Get comprehensive information about a specific template

### Usage
```bash
./gif-gen info <template-path>
```

### Examples
```bash
./gif-gen info demo/simple-gif
./gif-gen info social-media/twitter-demo
./gif-gen info ai-enhancement/style-transfer
```

### Output Sections

#### 1. **Basic Info**
- Template name
- Description
- Version
- Category

#### 2. **Available Presets**
- Preset name (quick, balanced, quality)
- Description
- Expected file size
- Processing time estimate

#### 3. **Pipeline Steps**
Shows the tool pipeline:
```
Pipeline Steps:
  1. gifcurry    → video_to_gif
  2. gifsicle    → optimize
```

#### 4. **Required Variables**
Lists variables you must provide:
```
Required Variables:
  --video_path          (file_path) Path to input video file
  --output_path         (file_path) Where to save the GIF
```

#### 5. **Example Usage**
Ready-to-copy command example:
```bash
gif-gen create demo/simple-gif --video_path <value> --preset balanced
```

### Example Output
```
Template: Simple GIF Demo
Description: Basic video to GIF conversion with optimization
Version: 1.0.0
Category: demo

Presets:
  quick         Fast conversion, lower quality
               Expected: 2-3MB, Time: 30s
  balanced      Good balance of quality and size
               Expected: 3-4MB, Time: 60s
  quality       Best quality, larger files
               Expected: 5-8MB, Time: 120s

Pipeline Steps:
  1. gifcurry    → video_to_gif
  2. gifsicle    → optimize

Required Variables:
  --video_path          (file_path) Path to input video file
  --output_path         (file_path) Where to save the GIF

Example Usage:
  gif-gen create demo/simple-gif --video_path <value> --output_path <value> --preset balanced
```

---

## 3. `check` - Tool Availability

**Purpose**: Verify that required tools (gifcurry, gifsicle) are installed

### Usage
```bash
./gif-gen check
```

### What It Checks
- ✅ gifcurry installation and path
- ✅ gifsicle installation and path

### Output - All Tools Installed
```
Tool Availability Check

✓ gifcurry        /usr/local/bin/gifcurry
✓ gifsicle        /usr/local/bin/gifsicle

✓ All tools are installed and ready!
```

### Output - Tools Missing
```
Tool Availability Check

✗ gifcurry        NOT INSTALLED
✓ gifsicle        /usr/local/bin/gifsicle

⚠ Some tools are missing!

Installation instructions:
  gifcurry:
    macOS: Download from https://github.com/lettier/gifcurry/releases
    Linux: Download AppImage or build from source

  gifsicle:
    macOS: brew install gifsicle
    Ubuntu: sudo apt-get install gifsicle
```

### When to Use
- ✅ Before creating your first GIF
- ✅ After installing tools to verify
- ✅ When troubleshooting errors
- ✅ When setting up on a new machine

---

## 4. `presets` - View Preset Details

**Purpose**: See detailed preset configurations for a template

### Usage
```bash
./gif-gen presets <template-path>
./gif-gen presets <template-path> --verbose  # Show all parameters
```

### Examples
```bash
./gif-gen presets demo/simple-gif
./gif-gen presets social-media/twitter-demo -v
```

### Output
```
Presets for: Simple GIF Demo

quick
  Description: Fast conversion, lower quality
  Expected: 2-3MB
  Processing: 30s

balanced
  Description: Good balance of quality and size
  Expected: 3-4MB
  Processing: 60s

quality
  Description: Best quality, larger files
  Expected: 5-8MB
  Processing: 120s
```

### With `--verbose` Flag
Shows all preset parameters:
```bash
./gif-gen presets demo/simple-gif --verbose
```

```
balanced
  Description: Good balance of quality and size
  Expected: 3-4MB
  Processing: 60s
  Parameters:
    width: 640
    height: 480
    fps: 15
    quality: 80
    start_time: 0
    duration: 5
```

### Typical Presets

**`quick`** - Fast & Small
- Lower quality
- Smaller file size (1-3MB)
- Faster processing (30-60s)
- Good for: Testing, drafts, quick sharing

**`balanced`** - Default Choice
- Good quality
- Moderate size (3-5MB)
- Reasonable time (60-90s)
- Good for: Most use cases, social media

**`quality`** - Best Quality
- High quality
- Larger files (5-10MB)
- Longer processing (120-180s)
- Good for: Final versions, presentations

---

## 5. `create` - Generate GIFs

**Purpose**: Create GIFs from templates with your videos

### Basic Usage
```bash
./gif-gen create <template> --video <input> --output <output> --preset <preset>
```

### Examples

#### Simple GIF
```bash
./gif-gen create demo/simple-gif \
  --video my-video.mp4 \
  --output result.gif \
  --preset balanced
```

#### Twitter Demo with Custom Variables
```bash
./gif-gen create social-media/twitter-demo \
  --video product-demo.mp4 \
  --output twitter.gif \
  --var product_name="Amazing Widget" \
  --preset quick
```

#### Using Short Flags
```bash
./gif-gen create demo/simple-gif \
  -i input.mp4 \
  -o output.gif \
  -p quality
```

### Options

#### Required Options
- `template` - Template path (e.g., `demo/simple-gif`)

#### Common Options
- `--video` or `-i` - Input video file
- `--output` or `-o` - Output GIF file
- `--preset` or `-p` - Preset to use (default: `balanced`)

#### Advanced Options
- `--var key=value` - Set template variables (can use multiple times)

### Variables

Templates can have custom variables. Use `--var` to set them:

```bash
./gif-gen create social-media/twitter-demo \
  --video demo.mp4 \
  --var product_name="My Product" \
  --var tagline="Best in class" \
  --preset balanced
```

To see what variables a template needs:
```bash
./gif-gen info <template>
```

### Output

During creation, you'll see:
```
Creating GIF: Simple GIF Demo
Template: demo/simple-gif

Configuration:
  Preset: balanced
  Input: my-video.mp4
  Output: output.gif

Executing pipeline...
  Step 1/2: gifcurry (video_to_gif)
  Step 2/2: gifsicle (optimize)

✓ GIF created successfully!
  Output: output.gif
  Duration: 45.3s
  Size: 3.42 MB
```

### Error Handling

**Missing Tools**:
```
✗ Missing tools: gifcurry
ℹ Run 'gif-gen check' for installation instructions
```

**Missing Variables**:
```
✗ Validation errors:
  - Required variable 'video_path' not provided
  - Required variable 'output_path' not provided
```

**File Not Found**:
```
✗ Template not found: social-media/invalid
ℹ Run 'gif-gen list' to see available templates
```

---

## Global Options

Available for all commands:

### `--no-color`
Disable colored output (useful for scripts or logs)

```bash
./gif-gen list --no-color
./gif-gen create demo/simple-gif --video input.mp4 --no-color
```

---

## Real-World Examples

### 1. Quick Social Media Post
```bash
# Fast Twitter GIF
./gif-gen create social-media/twitter-demo \
  --video product-demo.mp4 \
  --output tweet.gif \
  --var product_name="New Feature" \
  --preset quick
```

### 2. High-Quality Presentation
```bash
# Quality GIF for presentation
./gif-gen create business/presentation-highlight \
  --video keynote-clip.mp4 \
  --output presentation.gif \
  --preset quality
```

### 3. Profile Picture Animation
```bash
# Animated profile picture
./gif-gen create professional/profile-picture \
  --video headshot-video.mp4 \
  --output profile.gif \
  --preset balanced
```

### 4. E-commerce Product
```bash
# 360° product view
./gif-gen create ecommerce/360-product \
  --video product-spin.mp4 \
  --output product-view.gif \
  --var product_name="Widget Pro" \
  --preset balanced
```

### 5. Creative Effect
```bash
# Glitch effect
./gif-gen create creative-effects/glitch-effect \
  --video normal-video.mp4 \
  --output glitchy.gif \
  --preset balanced
```

---

## Workflow Tips

### 1. Discovery Workflow
```bash
# 1. See what's available
./gif-gen list

# 2. Check template details
./gif-gen info social-media/twitter-demo

# 3. View preset options
./gif-gen presets social-media/twitter-demo

# 4. Create your GIF
./gif-gen create social-media/twitter-demo ...
```

### 2. Quick Test Workflow
```bash
# Test with quick preset first
./gif-gen create demo/simple-gif \
  --video test.mp4 \
  --output test-quick.gif \
  --preset quick

# If satisfied, make quality version
./gif-gen create demo/simple-gif \
  --video test.mp4 \
  --output test-final.gif \
  --preset quality
```

### 3. Batch Creation
```bash
# Create multiple presets
for preset in quick balanced quality; do
  ./gif-gen create demo/simple-gif \
    --video input.mp4 \
    --output output-${preset}.gif \
    --preset ${preset}
done
```

---

## Advanced Features

### 1. Variable Substitution
Templates use `{{variable}}` syntax. You can override with `--var`:

```bash
./gif-gen create social-media/twitter-demo \
  --video demo.mp4 \
  --var product_name="Widget" \
  --var tagline="Amazing!" \
  --var twitter_handle="@mycompany"
```

### 2. Pipeline Execution
Each template defines a pipeline of tools:
- Video conversion (gifcurry)
- Optimization (gifsicle)
- AI processing (future)
- Effects (future)

The CLI executes them sequentially.

### 3. Preset Inheritance
Presets can inherit and override parameters:
- Base template has defaults
- Presets override specific values
- Your `--var` overrides everything

### 4. Validation
Before execution, the CLI validates:
- ✅ Required variables provided
- ✅ Tools are installed
- ✅ Input files exist
- ✅ Output directory is writable
- ✅ Parameters are valid

---

## Troubleshooting

### Tools Not Found
```bash
./gif-gen check  # See what's missing
```

### Template Not Found
```bash
./gif-gen list   # See available templates
```

### Variables Missing
```bash
./gif-gen info <template>  # See required variables
```

### Output Directory Doesn't Exist
```bash
mkdir -p output/
./gif-gen create ... --output output/result.gif
```

### Permission Denied
```bash
chmod +x gif-gen
```

---

## Command Reference Table

| Command | Purpose | Key Options |
|---------|---------|-------------|
| `list` | Browse templates | None |
| `info` | Template details | `<template>` |
| `check` | Verify tools | None |
| `presets` | Show presets | `<template>`, `-v` |
| `create` | Generate GIF | `<template>`, `--video`, `--output`, `--preset`, `--var` |

---

## Quick Reference

### Most Common Commands
```bash
# See what's available
./gif-gen list

# Learn about a template
./gif-gen info demo/simple-gif

# Create a GIF
./gif-gen create demo/simple-gif \
  --video input.mp4 \
  --output output.gif \
  --preset balanced
```

### Help Commands
```bash
./gif-gen --help              # General help
./gif-gen list --help         # List command help
./gif-gen create --help       # Create command help
```

---

## Next Steps

1. **Browse Templates**: `./gif-gen list`
2. **Check Tools**: `./gif-gen check`
3. **Pick a Template**: `./gif-gen info <template>`
4. **Create Your First GIF**: `./gif-gen create ...`

See [README.md](README.md) for more documentation!
