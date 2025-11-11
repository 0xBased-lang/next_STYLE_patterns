# GIF & Animation Repositories

This directory contains various GIF and animation generation tools and repositories.

## 🎬 Main Project: GIF Generator

**Location**: [`gif-generator/`](gif-generator/)

A production-ready template-based GIF and animation generation system with CLI interface.

### Quick Start
```bash
cd gif-generator
./gif-gen list          # See available templates
./gif-gen check         # Check tool installation
./gif-gen create <template> -i input.mp4 -o output.gif
```

### Documentation
- [Main README](gif-generator/README.md) - Getting started guide
- [Orchestrator Documentation](gif-generator/docs/ORCHESTRATOR_README.md) - System architecture
- [CLI Documentation](gif-generator/docs/CLI_COMPLETE.md) - Command-line interface

---

## Other Repositories

This directory also contains various open-source animation and GIF tools:

- **animate-anything/** - Animation generation tools
- **AnimatedDrawings/** - Turn drawings into animations
- **AnimateDiff/** - Stable Diffusion animation
- **LivePortrait/** - Portrait animation
- **motion/** - Motion graphics tools
- **first-order-model/** - First-order motion model
- **Thin-Plate-Spline-Motion-Model/** - TPS motion model
- **asciicast2gif/** - Terminal recordings to GIF
- **gif-h/** - Header-only GIF library
- **gifcurry/** - Video to GIF converter
- **gifsicle/** - GIF manipulation tool
- **svgMotion/** - SVG animation
- **thorvg/** - Lightweight SVG graphics

---

## Project Structure

```
gif-repos/
├── gif-generator/          # ⭐ Main project
│   ├── generator/          # Core system
│   ├── templates/          # 25 GIF templates
│   ├── docs/              # Documentation
│   ├── examples/          # Usage examples
│   ├── gif-gen            # CLI tool
│   └── README.md          # Full documentation
│
└── [other-repos]/         # Additional tools
```

---

## For More Information

See the [gif-generator README](gif-generator/README.md) for complete documentation.
