# GIF & Animation Repository Collection

## Overview

This directory contains 13 specialized repositories for GIF manipulation, motion modeling, and animation. The collection spans from low-level GIF tools to state-of-the-art AI/ML animation models.

**Total Repositories**: 13
**Categories**: 3 (GIF Tools, Motion Models, Animation Frameworks)
**Languages**: C, C++, Haskell, Python, JavaScript/TypeScript
**Frameworks**: PyTorch, React, Vue, GTK+, OpenGL

## Repository Categories

### 🎨 GIF Manipulation Tools

Low-level tools for creating and manipulating GIF files directly.

#### 1. [gifcurry](./gifcurry/) - Video-to-GIF Converter
- **Language**: Haskell
- **Purpose**: GUI/CLI video-to-GIF converter with text overlays
- **Key Features**: GTK+ interface, FFmpeg backend, text overlay editor
- **Use Case**: Convert video clips to GIFs with custom branding

#### 2. [gifsicle](./gifsicle/) - GIF Optimization Suite
- **Language**: C
- **Purpose**: Command-line GIF manipulation and optimization
- **Key Features**: Frame editing, color reduction, lossy compression
- **Use Case**: Optimize GIF file sizes for web (30-60% reduction)

#### 3. [gif-h](./gif-h/) - Single-Header GIF Library
- **Language**: C/C++ header-only
- **Purpose**: Programmatic GIF encoding in code
- **Key Features**: Zero dependencies, K-D tree color matching, delta encoding
- **Use Case**: Embed GIF generation in C/C++ applications

### 🤖 AI/ML Motion Models

State-of-the-art machine learning models for motion transfer and animation.

#### 4. [first-order-model](./first-order-model/) - Keypoint Motion Transfer
- **Framework**: PyTorch
- **Approach**: Sparse keypoint detection + first-order Taylor approximation
- **Innovation**: Jacobian matrices for local affine transformations
- **Use Case**: Fast face/body animation from driving video
- **Speed**: ~30 FPS inference

#### 5. [AnimateDiff](./AnimateDiff/) - Diffusion Motion Module
- **Framework**: PyTorch + Diffusers
- **Approach**: Plug-and-play motion module for Stable Diffusion
- **Innovation**: Separates motion learning from spatial appearance
- **Use Case**: Text-to-video, zero-shot adaptation to any SD variant
- **Speed**: Slow (diffusion-based)

#### 6. [LivePortrait](./LivePortrait/) - Modular Portrait Animation
- **Framework**: PyTorch + ONNX Runtime
- **Approach**: F→M→W→G→S+R modular pipeline
- **Innovation**: Explicit stitching/retargeting control (eyes, lips)
- **Use Case**: Production-ready portrait animation (Kuaishou, Douyin)
- **Speed**: Real-time capable

#### 7. [Thin-Plate-Spline-Motion-Model](./Thin-Plate-Spline-Motion-Model/) - TPS Deformation
- **Framework**: PyTorch
- **Approach**: Thin-plate spline control points for flexible deformation
- **Innovation**: More flexible than first-order, better for complex articulations
- **Use Case**: High-quality animation with smooth deformations
- **Speed**: Medium

### 🎬 Animation Frameworks

Tools and frameworks for creating, editing, and rendering animations.

#### 8. [animate-anything](./animate-anything/) - AI Image Animator
- **Framework**: PyTorch (Diffusion)
- **Purpose**: Animate static images with text prompts
- **Key Features**: 3D UNets, temporal understanding, LoRA finetuning
- **Use Case**: Semantic-driven image animation

#### 9. [AnimatedDrawings](./AnimatedDrawings/) - Hand-Drawn Character Animator
- **Framework**: PyTorch + OpenGL
- **Purpose**: Animate hand-drawn characters using ML pose detection
- **Key Features**: ARAP deformation, BVH motion retargeting, web editor
- **Use Case**: Bring children's drawings to life

#### 10. [svgMotion](./svgMotion/) - SVG Animation Editor
- **Language**: JavaScript
- **Purpose**: Browser-based SVG animation with GSAP timeline
- **Key Features**: Mobile-responsive, GifShot export, visual editor
- **Status**: Archived (2022) but functional

#### 11. [motion](./motion/) - Universal Animation Library
- **Language**: TypeScript (React/Vue/JS)
- **Purpose**: Declarative animation library with GPU acceleration
- **Key Features**: 120fps capable, component-based, actively maintained
- **Use Case**: Modern web animations (Figma, Linear, Tailwind use this)

#### 12. [thorvg](./thorvg/) - Vector Graphics Engine
- **Language**: C++
- **Purpose**: Lightweight vector graphics rendering (<150KB)
- **Key Features**: Multiple backends (CPU/GL/WebGL/WebGPU), SVG/Lottie support
- **Use Case**: Embedded systems, high-performance graphics (Canva, Godot)

#### 13. [asciicast2gif](./asciicast2gif/) - Terminal Recording Converter
- **Language**: JavaScript (Node.js)
- **Purpose**: Convert terminal recordings (asciicast) to GIF
- **Key Features**: Virtual terminal emulation, PhantomJS rendering
- **Use Case**: Create terminal demo GIFs

## Quick Navigation

### By Use Case

**Need to convert video to GIF?**
→ [gifcurry](./gifcurry/) (GUI/CLI, text overlays) → [gifsicle](./gifsicle/) (optimize output)

**Need to optimize GIF file size?**
→ [gifsicle](./gifsicle/) (30-60% reduction with lossy compression)

**Need to generate GIFs programmatically?**
→ [gif-h](./gif-h/) (C/C++ header-only) → [gifsicle](./gifsicle/) (post-process)

**Need to animate faces from driving video?**
→ [LivePortrait](./LivePortrait/) (production-ready) or [first-order-model](./first-order-model/) (faster)

**Need to animate with text prompts?**
→ [AnimateDiff](./AnimateDiff/) (SD-based) or [animate-anything](./animate-anything/) (image-to-video)

**Need to animate hand-drawn characters?**
→ [AnimatedDrawings](./AnimatedDrawings/) (ML pose detection + BVH retargeting)

**Need web animations?**
→ [motion](./motion/) (modern React/Vue) or [svgMotion](./svgMotion/) (SVG editor)

**Need high-performance vector rendering?**
→ [thorvg](./thorvg/) (C++, <150KB, multiple backends)

**Need terminal demo GIFs?**
→ [asciicast2gif](./asciicast2gif/) (asciinema → GIF)

### By Language/Framework

**C/C++**: gifsicle, gif-h, thorvg
**Haskell**: gifcurry
**Python/PyTorch**: first-order-model, AnimateDiff, LivePortrait, Thin-Plate-Spline, animate-anything, AnimatedDrawings
**JavaScript/TypeScript**: svgMotion, motion, asciicast2gif

### By Complexity

**Simple (< 1 hour to use)**:
- gif-h (single header)
- gifsicle (CLI tool)
- motion (npm install)

**Moderate (< 1 day to use)**:
- gifcurry (install + GUI)
- first-order-model (pre-trained models)
- AnimateDiff (HuggingFace)

**Complex (requires ML expertise)**:
- LivePortrait (modular pipeline)
- Thin-Plate-Spline (TPS understanding)
- animate-anything (diffusion expertise)

## Workflow Patterns

### Pattern 1: Video → Optimized GIF

```bash
# Step 1: Convert video to GIF with text overlay
gifcurry_cli -i video.mp4 -o temp.gif -s 0 -e 5 -w 800 -f 15

# Step 2: Optimize for web
gifsicle -O3 --colors 128 --lossy=80 temp.gif -o final.gif

# Result: High-quality, web-optimized GIF with branding
```

### Pattern 2: Portrait Animation

```bash
# Option A: Fast (first-order-model)
python demo.py \
  --config config/vox-256.yaml \
  --source_image portrait.png \
  --driving_video talking.mp4 \
  --checkpoint checkpoints/vox-cpk.pth.tar \
  --result_video animated.mp4

# Option B: Production (LivePortrait)
python inference.py \
  --source portrait.png \
  --driving talking.mp4 \
  --output animated.mp4

# Option C: Better quality (Thin-Plate-Spline)
python demo.py \
  --config config/vox-256.yaml \
  --source portrait.png \
  --driving talking.mp4 \
  --result animated.mp4
```

### Pattern 3: Programmatic GIF Generation

```cpp
// Generate animation with gif-h
#include "gif.h"
GifWriter g;
GifBegin(&g, "output.gif", 256, 256, 2);
for (int frame = 0; frame < 100; ++frame) {
    // Generate frame pixels
    GifWriteFrame(&g, pixels, 256, 256, 2);
}
GifEnd(&g);

// Optimize with gifsicle
system("gifsicle -O3 output.gif -o final.gif");
```

### Pattern 4: Text-to-Animation

```bash
# AnimateDiff workflow
python -m scripts.animate \
  --config configs/prompts/v2/5-RealisticVision.yaml \
  --pretrained_model_path models/StableDiffusion/realisticVisionV20_v20.safetensors \
  --L 16 \
  --W 512 \
  --H 512

# Alternative: animate-anything
python inference.py \
  --image input.png \
  --prompt "dancing joyfully" \
  --output animated.mp4
```

### Pattern 5: Web Animation

```typescript
// Using motion library
import { motion } from "framer-motion"

<motion.div
  animate={{ x: 100, rotate: 360 }}
  transition={{ duration: 2, ease: "easeInOut" }}
>
  Animated Content
</motion.div>
```

## Comparison Matrix

### GIF Tools Comparison

| Tool | Input | Output | Optimization | Use Case |
|------|-------|--------|--------------|----------|
| gifcurry | Video | GIF | Basic | Video conversion + text |
| gifsicle | GIF | GIF | Excellent | Post-processing optimization |
| gif-h | Code | GIF | None | Programmatic generation |

**Recommended Pipeline**: gifcurry/gif-h → gifsicle

### Motion Model Comparison

| Model | Keypoints | Speed | Quality | Production |
|-------|-----------|-------|---------|------------|
| first-order-model | 10 sparse | Fast (30 FPS) | Good | Research |
| Thin-Plate-Spline | 10 sparse | Medium | Better | Research |
| LivePortrait | Dense | Fast (real-time) | Excellent | ✅ Production |
| AnimateDiff | Latent | Slow | Variable | Creative |

**Recommendation**:
- **Fast prototyping**: first-order-model
- **Best quality**: LivePortrait
- **Creative control**: AnimateDiff

### Animation Framework Comparison

| Framework | Language | Domain | Active | Enterprise |
|-----------|----------|--------|--------|------------|
| motion | TypeScript | Web | ✅ Yes | ✅ Yes (Figma, Linear) |
| thorvg | C++ | Embedded | ✅ Yes | ✅ Yes (Canva, Godot) |
| svgMotion | JavaScript | SVG | ❌ Archived | No |
| AnimatedDrawings | Python | Characters | ✅ Yes | Research |

**Recommendation**:
- **Modern web**: motion
- **Embedded/performance**: thorvg
- **Character animation**: AnimatedDrawings

## Installation Quick Start

### GIF Tools

```bash
# gifcurry (Linux AppImage)
wget https://github.com/lettier/gifcurry/releases/latest/download/gifcurry-linux-appimage.tar.gz
tar -zxvf gifcurry-linux-appimage.tar.gz
./gifcurry-linux-appimage

# gifsicle (package manager)
sudo apt-get install gifsicle  # Ubuntu/Debian
brew install gifsicle          # macOS

# gif-h (header-only)
wget https://raw.githubusercontent.com/charlietangora/gif-h/master/gif.h
# Include in your C/C++ project
```

### Motion Models

```bash
# first-order-model
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model
pip install torch torchvision scikit-image scipy imageio ffmpeg-python

# AnimateDiff
git clone https://github.com/guoyww/AnimateDiff
cd AnimateDiff
pip install torch torchvision diffusers transformers xformers decord

# LivePortrait
git clone https://github.com/KwaiVGI/LivePortrait
cd LivePortrait
pip install torch torchvision onnxruntime-gpu opencv-python mediapipe

# Thin-Plate-Spline
git clone https://github.com/yoyo-nb/Thin-Plate-Spline-Motion-Model
cd Thin-Plate-Spline-Motion-Model
pip install torch torchvision scikit-image scipy imageio
```

### Animation Frameworks

```bash
# motion
npm install framer-motion

# thorvg
git clone https://github.com/thorvg/thorvg
cd thorvg
meson build
ninja -C build

# AnimatedDrawings
git clone https://github.com/facebookresearch/AnimatedDrawings
cd AnimatedDrawings
pip install -e .
```

## Performance Considerations

### Speed Comparison (256×256 resolution)

| Tool/Model | CPU | GPU | Use Case |
|------------|-----|-----|----------|
| gifsicle | Fast (~1s) | N/A | GIF optimization |
| gif-h | Fast (~100ms) | N/A | Programmatic generation |
| first-order-model | Slow | Fast (30 FPS) | Face animation |
| LivePortrait | Very Slow | Fast (real-time) | Production animation |
| AnimateDiff | N/A | Very Slow | Text-to-video |
| motion | Fast (120 FPS) | N/A | Web animation |

### Memory Requirements

| Tool/Model | RAM | VRAM | Notes |
|------------|-----|------|-------|
| gifsicle | <100 MB | N/A | Memory-efficient |
| gif-h | <50 MB | N/A | Minimal footprint |
| first-order-model | ~2 GB | ~2 GB | Moderate |
| LivePortrait | ~4 GB | ~4 GB | Modular pipeline |
| AnimateDiff | ~8 GB | ~10 GB | Diffusion-based |
| thorvg | <10 MB | <50 MB | Lightweight |

## Documentation Structure

Each repository contains a `CLAUDE.md` file with comprehensive documentation:

- **Overview**: Purpose, language, key features
- **Architecture**: Directory structure, components
- **Technical Stack**: Dependencies, build system
- **Usage Examples**: Code samples, command-line examples
- **Configuration**: Config files, parameters
- **Installation**: Step-by-step setup
- **Integration Patterns**: Workflow examples, pipelines
- **Troubleshooting**: Common issues, solutions
- **Best Practices**: Tips, recommendations
- **Related Projects**: Cross-references within collection

## Common Integration Patterns

### Pattern: Video → GIF → Web

```bash
# 1. Video editing (gifcurry)
gifcurry_cli -i video.mp4 -o temp.gif -s 0 -e 5 -w 800

# 2. Optimization (gifsicle)
gifsicle -O3 --colors 128 --lossy=80 temp.gif -o web.gif

# 3. Embed in web page
# <img src="web.gif" alt="Demo">
```

### Pattern: Portrait AI Animation Pipeline

```bash
# 1. Collect source images and driving videos

# 2. Quick prototype (first-order-model)
python demo.py --config config/vox-256.yaml --source face.png --driving video.mp4 --result proto.mp4

# 3. Production version (LivePortrait)
python inference.py --source face.png --driving video.mp4 --output final.mp4

# 4. Convert to GIF if needed
ffmpeg -i final.mp4 -r 15 output.gif
gifsicle -O3 output.gif -o final.gif
```

### Pattern: Programmatic Animation

```cpp
// 1. Generate frames with gif-h
#include "gif.h"

void generate_animation() {
    GifWriter g;
    GifBegin(&g, "animation.gif", 256, 256, 2, 8, true);

    for (int frame = 0; frame < 100; ++frame) {
        std::vector<uint8_t> pixels = render_frame(frame);
        GifWriteFrame(&g, pixels.data(), 256, 256, 2, 8, true);
    }

    GifEnd(&g);
}

// 2. Optimize
system("gifsicle -O3 animation.gif -o final.gif");
```

### Pattern: Web Animation with React

```typescript
// Using motion library
import { motion, AnimatePresence } from "framer-motion"

function AnimatedComponent() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        Content
      </motion.div>
    </AnimatePresence>
  )
}
```

## Troubleshooting

### General Issues

**"Command not found" errors**
- Ensure tools are in PATH
- Check installation completed successfully
- Verify package manager installation

**GPU/CUDA issues (PyTorch models)**
```bash
# Check CUDA availability
python -c "import torch; print(torch.cuda.is_available())"

# Install appropriate PyTorch version
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

**Memory issues**
- Reduce batch sizes for ML models
- Lower resolution for processing
- Use CPU mode if GPU OOM
- Close other applications

**Quality issues**
- Increase color count in gifsicle
- Enable dithering
- Use higher bitDepth in gif-h
- Try different pre-trained models

### Performance Optimization

**Speed up ML inference**
- Use smaller models when available
- Enable CUDA/GPU acceleration
- Reduce input resolution
- Use ONNX Runtime (LivePortrait)

**Reduce file sizes**
- Aggressive gifsicle optimization: `-O3 --lossy=80 --colors 64`
- Lower frame rates
- Crop unnecessary borders
- Reduce resolution

## Best Practices

### GIF Creation
1. Start with high-quality source
2. Keep duration under 10 seconds
3. Target 640-800px width for web
4. Use 10-15 FPS for balance
5. Always post-process with gifsicle

### ML Model Usage
1. Use pre-trained models when available
2. Match source/driving domain to model
3. Preprocess inputs (crop, resize)
4. Enable relative mode for better adaptation
5. Batch process when possible

### Web Animation
1. Prefer CSS/JS over GIF when possible
2. Use motion library for complex animations
3. Optimize for 60 FPS target
4. Consider accessibility (prefers-reduced-motion)
5. Lazy load animations

### Production Deployment
1. Test on target devices
2. Optimize for performance
3. Monitor resource usage
4. Implement fallbacks
5. Cache static assets

## Contributing

Each repository has its own contribution guidelines. See individual CLAUDE.md files for repository-specific information.

## License Information

- **gifcurry**: BSD3
- **gifsicle**: GPL v2
- **gif-h**: Public Domain
- **first-order-model**: See repository
- **AnimateDiff**: See repository
- **LivePortrait**: See repository
- **Thin-Plate-Spline**: See repository
- **animate-anything**: See repository
- **AnimatedDrawings**: See repository
- **svgMotion**: See repository (archived)
- **motion**: MIT
- **thorvg**: MIT
- **asciicast2gif**: See repository (archived)

Refer to individual repository LICENSE files for complete details.

## Additional Resources

### Documentation
- Each repository has a `CLAUDE.md` with comprehensive documentation
- Original README.md files preserved for reference
- Configuration examples in individual repos

### External Links
- **Papers**: Check individual ML model repositories for citations
- **Demos**: Many repositories include Colab notebooks
- **Communities**: GitHub Issues, Discussions, Discord servers

## Quick Reference Card

```bash
# === GIF TOOLS ===

# Convert video to GIF
gifcurry_cli -i video.mp4 -o out.gif -s 0 -e 5 -w 800

# Optimize GIF
gifsicle -O3 --colors 128 --lossy=80 input.gif -o output.gif

# Generate GIF programmatically
# See gif-h/CLAUDE.md

# === MOTION MODELS ===

# Fast face animation
python first-order-model/demo.py --source face.png --driving video.mp4

# Production portrait
python LivePortrait/inference.py --source face.png --driving video.mp4

# Text-to-video
python AnimateDiff/scripts/animate.py --config config.yaml

# === ANIMATION ===

# Web animation
npm install framer-motion

# Vector graphics
# See thorvg/CLAUDE.md

# Character animation
python AnimatedDrawings/main.py --image drawing.png
```

## Summary

This collection provides a comprehensive toolkit for GIF manipulation and animation, spanning:
- **3 GIF tools** for creation, optimization, and programmatic generation
- **4 AI/ML motion models** for state-of-the-art animation
- **6 animation frameworks** for web, embedded, and character animation

Whether you need to convert a video to an optimized GIF, animate portraits using AI, or build custom web animations, this collection has you covered.

**Recommended Starting Points**:
- **Beginners**: gifcurry (GUI) + gifsicle (optimization)
- **Developers**: gif-h (C/C++) or motion (web)
- **Researchers**: first-order-model or LivePortrait
- **Production**: LivePortrait (faces) + motion (web) + thorvg (graphics)
