# 🚀 Quick Start Guide

## Installation

```bash
cd /Users/seman/Desktop/gif-repos/gif-generator
```

## Check Tools
```bash
./gif-gen check
```

Expected output if tools not installed:
```
✗ gifcurry        NOT INSTALLED
✗ gifsicle        NOT INSTALLED
```

## Install Tools

### macOS
```bash
# Install gifsicle
brew install gifsicle

# Install gifcurry (download from releases)
# https://github.com/lettier/gifcurry/releases
```

### Linux
```bash
# Gifsicle
sudo apt-get install gifsicle  # Ubuntu/Debian
sudo yum install gifsicle      # CentOS/RHEL

# Gifcurry - download from GitHub releases
```

## Usage

### List Templates
```bash
./gif-gen list
```

### Template Info
```bash
./gif-gen info demo/simple-gif
```

### Check Presets
```bash
./gif-gen presets demo/simple-gif
```

### Create GIF
```bash
./gif-gen create demo/simple-gif \
  -i input-video.mp4 \
  -o output.gif \
  --preset balanced
```

### With Custom Variables
```bash
./gif-gen create social-media/twitter-demo \
  -i product-demo.mp4 \
  -o twitter.gif \
  --preset quick \
  --var "product_name=My Product"
```

## Quick Examples

### Simple Video → GIF
```bash
./gif-gen create demo/simple-gif -i video.mp4 -o output.gif
```

### Twitter-Optimized GIF
```bash
./gif-gen create social-media/twitter-demo \
  -i demo.mp4 -o tweet.gif --preset quick
```

### High Quality GIF
```bash
./gif-gen create demo/simple-gif \
  -i video.mp4 -o high-quality.gif --preset quality
```

## Python API

```python
from pathlib import Path
from generator.core import TemplateLoader, PipelineOrchestrator

# Load template
loader = TemplateLoader(Path('templates'))
template = loader.load_template('demo/simple-gif')

# Configure
vars = {
    'video_path': 'input.mp4',
    'output_path': 'output.gif'
}
resolved = template.resolve_variables(vars, preset_name='balanced')

# Execute
orchestrator = PipelineOrchestrator()
result = orchestrator.execute(template, resolved, Path('output.gif'))

if result.success:
    print(f"✅ Created: {result.output_path}")
else:
    print(f"❌ Failed: {result.error}")
```

## Available Templates

### Social Media (10)
- `twitter-demo` - Twitter-optimized product demos
- `instagram-story` - Instagram story animations
- `linkedin-post` - Professional LinkedIn posts
- And 7 more...

### AI Enhancement (2)
- `style-transfer` - Artistic style transfer
- `background-removal` - AI background removal

### Creative Effects (4)
- `glitch-effect` - Cyberpunk glitch effects
- `retro-vhs` - VHS tape aesthetics
- `cinemagraph` - Selective motion cinemagraphs
- `logo-animation` - Logo animations

### Professional (2)
- `profile-picture` - Animated profile pictures
- `email-signature` - Email signature GIFs

### Technical (2)
- `terminal-demo` - Terminal recordings
- `loading-spinner` - Loading animations

## File Locations

```
gif-generator/
├── gif-gen              # CLI tool (use this!)
├── demo.py              # Python demo
├── README.md            # Full documentation
├── QUICKSTART.md        # This file
│
├── generator/           # Core system
├── templates/           # 29 templates
├── docs/               # Detailed docs
└── gallery/            # Examples
```

## Need Help?

- **Full Docs**: See [README.md](README.md)
- **Architecture**: See [docs/ORCHESTRATOR_README.md](docs/ORCHESTRATOR_README.md)
- **CLI Details**: See [docs/CLI_COMPLETE.md](docs/CLI_COMPLETE.md)
- **Organization**: See [docs/PROJECT_ORGANIZATION.md](docs/PROJECT_ORGANIZATION.md)

## Common Issues

### Tools Not Found
Install gifcurry and gifsicle (see Installation section above)

### Permission Denied
```bash
chmod +x gif-gen
```

### Import Errors
Run from gif-generator directory:
```bash
cd /Users/seman/Desktop/gif-repos/gif-generator
./gif-gen list
```

---

**Ready to create GIFs? Start here:** `./gif-gen list` 🎬
