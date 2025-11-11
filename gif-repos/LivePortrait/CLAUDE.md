# LivePortrait - Efficient Portrait Animation System

## Overview

**Purpose**: Production-ready portrait animation with stitching and retargeting control
**Framework**: PyTorch 2.x + ONNX Runtime GPU
**Innovation**: Modular F→M→W→G→S+R pipeline with explicit eye/lip control
**Status**: ⭐ Production deployed on Kuaishou, Douyin, Jianying, WeChat Channels

## Key Features

- 🎯 **Modular Pipeline**: Separate modules for appearance, motion, warping, generation
- 👁️ **Stitching Control**: Explicit control over eye blinks and gaze
- 👄 **Retargeting Control**: Precise lip movement manipulation
- 🐱 **Animals Mode**: Separate mode for cats, dogs, and other animals
- ⚡ **Real-Time Capable**: ONNX optimized for production inference
- 🎥 **Motion Templates**: Privacy-preserving .pkl format for motion reuse
- 🔧 **Regional Control**: Fine-grained control over specific facial regions

## Architecture

### Pipeline: F→M→W→G→S+R

```
Input Image → [F] Appearance Feature Extraction
              ↓
Driving Video → [M] Motion Extraction → [W] Warping Network
                                        ↓
                                [G] SPADE Generator
                                        ↓
                                [S+R] Stitching & Retargeting
                                        ↓
                                    Output Video
```

### Core Modules

1. **F - Appearance Feature Extractor** (`appearance_feature_extractor.py`)
   - **Backbone**: ConvNextV2
   - **Purpose**: Extract appearance features from source image
   - **Output**: High-dimensional feature representation

2. **M - Motion Extractor** (`motion_extractor.py`)
   - **Purpose**: Extract motion and pose information
   - **Output**: Motion parameters, head pose (pitch, yaw, roll)

3. **W - Warping Network** (`warping_network.py`)
   - **Purpose**: Spatial transformation based on motion
   - **Method**: Dense motion field prediction

4. **G - SPADE Generator** (`spade_generator.py`)
   - **Architecture**: SPADE-based image synthesis
   - **Purpose**: Generate high-quality output frames

5. **S+R - Stitching & Retargeting** (`stitching_retargeting_network.py`)
   - **Stitching**: Blend generated content with source
   - **Retargeting**: Control eye closure, lip closure ratios
   - **Innovation**: Explicit control mechanisms

### Directory Structure

```
LivePortrait/
├── src/
│   ├── modules/              # Core pipeline modules
│   │   ├── appearance_feature_extractor.py  # [F]
│   │   ├── motion_extractor.py             # [M]
│   │   ├── warping_network.py              # [W]
│   │   ├── spade_generator.py              # [G]
│   │   ├── stitching_retargeting_network.py # [S+R]
│   │   ├── dense_motion.py
│   │   ├── convnextv2.py    # Backbone
│   │   └── util.py
│   ├── config/               # Configuration files
│   ├── utils/                # Utility functions
│   └── live_portrait_wrapper.py  # Main orchestration
├── inference.py              # Human mode inference
├── inference_animals.py      # Animal mode inference
├── app.py                    # Gradio UI (humans)
├── app_animals.py            # Gradio UI (animals)
├── pretrained_weights/       # Model checkpoints (download)
└── assets/                   # Demo assets
```

## Quick Start

### Installation

```bash
git clone https://github.com/KwaiVGI/LivePortrait
cd LivePortrait

# Create environment
conda create -n liveportrait python=3.9
conda activate liveportrait

# Install dependencies
pip install torch torchvision
pip install onnxruntime-gpu  # or onnxruntime for CPU
pip install opencv-python mediapipe insightface
pip install -r requirements.txt
```

### Download Models

```bash
# Automatic download (recommended)
python inference.py  # Models download on first run

# Manual download (if needed)
# Download from HuggingFace/Google Drive/Baidu Yun
# See README for links
```

### Image-to-Video Animation

```bash
# Basic usage
python inference.py \
  --source assets/examples/source/s1.jpg \
  --driving assets/examples/driving/d0.mp4 \
  --output results/output.mp4

# With audio
python inference.py \
  --source source.jpg \
  --driving driving.mp4 \
  --output output.mp4 \
  --paste_back  # Paste face back to original image
  --audio        # Copy audio from driving video
```

### Video-to-Video (v2v)

```bash
python inference.py \
  --source source_video.mp4 \
  --driving driving_video.mp4 \
  --output output.mp4 \
  --v2v  # Enable video-to-video mode
```

### Animals Mode

```bash
python inference_animals.py \
  --source cat.jpg \
  --driving cat_video.mp4 \
  --output animated_cat.mp4
```

## Gradio UI

### Human Mode

```bash
python app.py
# Open browser to http://localhost:7860

# Features:
# - Upload source image
# - Upload or record driving video
# - Adjust retargeting controls (eyes, lips)
# - Preview and download result
```

### Animals Mode

```bash
python app_animals.py
# Open browser to http://localhost:7861
```

## Configuration

### Key Parameters

```python
# Inference config
--flag_lip_zero           # Zero-out lip motion (keep mouth closed)
--flag_eye_retargeting    # Enable eye retargeting control
--flag_lip_retargeting    # Enable lip retargeting control
--flag_stitching          # Enable stitching for seamless blend
--flag_relative           # Use relative motion (recommended)
--flag_pasteback          # Paste result back to original frame
--flag_do_crop            # Auto-crop face region
--flag_do_rot             # Auto-rotate for alignment
```

### Retargeting Parameters

```python
# Eye control
--eyes_retargeting_ratio 1.0  # 0.0 = source eyes, 1.0 = driving eyes

# Lip control
--lip_retargeting_ratio 1.0   # 0.0 = source lips, 1.0 = driving lips
```

## Motion Templates (.pkl)

### Create Motion Template

```bash
# Extract motion from video (privacy-preserving)
python inference.py \
  --driving video.mp4 \
  --save_motion_template motion.pkl
```

### Use Motion Template

```bash
# Animate with pre-saved motion
python inference.py \
  --source portrait.jpg \
  --motion_template motion.pkl \
  --output result.mp4
```

**Benefits**:
- Privacy: No visual information, only motion parameters
- Reusability: Apply same motion to multiple sources
- Efficiency: Skip motion extraction step

## Advanced Features

### Regional Control

```python
# Control specific facial regions
from src.live_portrait_wrapper import LivePortraitWrapper

wrapper = LivePortraitWrapper()

# Animate with regional control
result = wrapper.execute(
    source_image=source,
    driving_video=driving,
    flag_eye_retargeting=True,
    flag_lip_retargeting=True,
    eyes_retargeting_ratio=0.8,
    lip_retargeting_ratio=1.2
)
```

### Head Pose Estimation

```python
# Extract head pose (pitch, yaw, roll)
motion_params = motion_extractor(driving_frame)
pitch = motion_params['pitch']  # Degrees
yaw = motion_params['yaw']
roll = motion_params['roll']
```

### Batch Processing

```python
import glob
from src.live_portrait_wrapper import LivePortraitWrapper

wrapper = LivePortraitWrapper()

sources = glob.glob("sources/*.jpg")
driving = "driving_video.mp4"

for source in sources:
    wrapper.execute(
        source_image=source,
        driving_video=driving,
        output=f"results/{os.path.basename(source)}"
    )
```

## Performance

### Speed
- **Real-Time**: 25-30 FPS on RTX 3090 (512×512)
- **ONNX Optimized**: 2-3x faster than pure PyTorch
- **Production**: Deployed in high-traffic platforms

### Memory
- **GPU**: ~4 GB VRAM (512×512)
- **CPU**: ~2 GB RAM
- **Model Size**: ~100 MB per module (modular loading)

### Quality
- **Temporal Consistency**: Excellent
- **Facial Details**: High fidelity
- **Eye/Lip Control**: Precise
- **Stitching**: Seamless blending

## Integration Patterns

### Production Pipeline

```python
# 1. Load model once
wrapper = LivePortraitWrapper()

# 2. Process requests
def animate_portrait(source_path, driving_path):
    # Auto-crop and process
    result = wrapper.execute(
        source_image=source_path,
        driving_video=driving_path,
        flag_do_crop=True,
        flag_pasteback=True,
        flag_stitching=True
    )
    return result

# 3. Serve via API
from fastapi import FastAPI, UploadFile

app = FastAPI()

@app.post("/animate")
async def animate(source: UploadFile, driving: UploadFile):
    result = animate_portrait(source.file, driving.file)
    return {"video_url": result}
```

### With Other Tools

```bash
# Pattern 1: LivePortrait → GIF
python inference.py --source face.jpg --driving video.mp4 --output temp.mp4
ffmpeg -i temp.mp4 -r 15 output.gif
gifsicle -O3 output.gif -o final.gif

# Pattern 2: Batch processing
for img in sources/*.jpg; do
    python inference.py --source "$img" --driving driving.mp4 --output "results/$(basename $img .jpg).mp4"
done

# Pattern 3: Motion template reuse
python inference.py --driving template.mp4 --save_motion_template motion.pkl
for img in sources/*.jpg; do
    python inference.py --source "$img" --motion_template motion.pkl --output "results/$(basename $img .jpg).mp4"
done
```

## Tips & Best Practices

### Source Image
- Front-facing, clear face
- Good lighting, minimal occlusion
- High resolution (512×512 minimum)
- Neutral or similar expression to driving

### Driving Video
- Clear face visibility throughout
- Smooth motion (avoid jumps)
- 25-30 FPS recommended
- Similar lighting to source if possible

### Parameter Tuning
- **Stitching**: Always enable for seamless results
- **Pasteback**: Enable for full-frame output
- **Eye/Lip Retargeting**: Adjust ratios for naturalness (0.8-1.2 typical)
- **Relative Mode**: Enable for different starting poses

### Animals Mode
- Works best with cats, dogs
- Requires clear animal face visibility
- May need X-Pose model (separate download)
- Less control than human mode

## Troubleshooting

### Poor Face Detection
```bash
# Manually crop face first
python crop_face.py --input source.jpg --output cropped.jpg

# Or use flag_do_crop
python inference.py --source source.jpg --driving video.mp4 --flag_do_crop
```

### Jittery Output
- Enable stitching: `--flag_stitching`
- Increase driving video FPS
- Smooth driving video with ffmpeg
- Check motion template quality

### Memory Issues
```bash
# Reduce resolution
python inference.py --source source.jpg --driving video.mp4 --output_size 256

# Use CPU
python inference.py --device cpu
```

## Related Projects in Collection

### Comparison

| Model | Speed | Quality | Control | Production |
|-------|-------|---------|---------|------------|
| **LivePortrait** | Real-time | Excellent | High | ✅ Yes |
| first-order-model | Fast | Good | Low | Research |
| AnimateDiff | Slow | Variable | Medium | Creative |

### Use Case Selection
- **LivePortrait**: Production faces, real-time, explicit control
- **first-order-model**: Quick prototyping, research
- **AnimateDiff**: Creative, text-driven, stylized

## Documentation Links

- **Repository**: https://github.com/KwaiVGI/LivePortrait
- **HuggingFace**: https://huggingface.co/KwaiVGI/LivePortrait
- **Paper**: (Check repository for publication details)
- **Demo**: Gradio UI included

## Citation

```bibtex
@article{liveportrait2024,
  title={LivePortrait: Efficient Portrait Animation with Stitching and Retargeting Control},
  author={LivePortrait Team},
  journal={arXiv preprint},
  year={2024}
}
```

## Project Status

- ✅ **Production Deployed**: Kuaishou, Douyin, Jianying, WeChat Channels
- ✅ **Active Development**: Regular updates
- ✅ **ONNX Optimized**: Real-time performance
- ✅ **Modular Design**: Easy integration
- ✅ **Well Documented**: Comprehensive README and examples

## License

See LICENSE file in repository
