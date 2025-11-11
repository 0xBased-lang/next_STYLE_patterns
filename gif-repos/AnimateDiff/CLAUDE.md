# AnimateDiff - Text-to-Animation for Stable Diffusion

## Overview

**Purpose**: Plug-and-play motion module for Stable Diffusion models to generate animations
**Framework**: PyTorch 2.3+ with Diffusers 0.11.1
**Innovation**: Learns transferable motion priors that work with any SD variant without fine-tuning
**Key Insight**: Separates motion learning from spatial appearance for zero-shot adaptation

## Key Features

- 🔌 **Plug-and-Play**: Works with 100+ community SD models without retraining
- 📝 **Text-to-Video**: Generate animations from text prompts
- 🖼️ **Image-to-Video**: Animate static images (v3+ with domain adapter)
- 🎥 **MotionLoRA**: Specific camera movements (zoom, pan, tilt, roll)
- 🎮 **SparseCtrl**: RGB/Scribble control for precise motion guidance
- 🚀 **SDXL Support**: Beta support for high-resolution (1024×1024)
- 🎨 **Community Integration**: WebUI, ComfyUI, Replicate integration available

## Architecture

### Three-Stage Training

1. **Domain Adapter** (v3+)
   - LoRA-based adapter for handling image-video domain gap
   - Reduces artifacts in image-to-video generation
   - Enables better temporal consistency

2. **Motion Module**
   - Temporal attention layers integrated into UNet
   - Learns motion patterns across video datasets
   - Transferable to any SD model

3. **MotionLoRA**
   - Lightweight LoRA modules (74 MB each)
   - Specific camera movements (zoom in/out, pan, tilt, roll)
   - Composable motion effects

### Directory Structure

```
AnimateDiff/
├── models/
│   ├── Motion_Module/        # Main motion modules
│   │   ├── mm_sd_v15.ckpt   # SD 1.5 motion module
│   │   ├── mm_sd_v15_v2.ckpt # v2 motion module
│   │   └── mm_sdxl_v10_beta.ckpt # SDXL motion module
│   ├── MotionLoRA/           # Camera movement LoRAs
│   │   ├── v2_lora_ZoomIn.ckpt
│   │   ├── v2_lora_ZoomOut.ckpt
│   │   ├── v2_lora_PanLeft.ckpt
│   │   └── ... (8 variants)
│   ├── DreamBooth_LoRA/      # Style LoRAs (community models)
│   └── StableDiffusion/      # Base SD models
├── scripts/
│   └── animate.py            # Main inference script
├── configs/
│   └── prompts/              # Example prompts
├── app.py                    # Gradio UI
└── train.py                  # Training pipeline
```

## Quick Start

### Installation

```bash
git clone https://github.com/guoyww/AnimateDiff
cd AnimateDiff

conda create -n animatediff python=3.10
conda activate animatediff
pip install torch torchvision diffusers==0.11.1 transformers xformers decord omegaconf
```

### Download Models

```bash
# Download motion module (1.6 GB)
cd models/Motion_Module
wget https://huggingface.co/guoyww/animatediff/resolve/main/mm_sd_v15_v2.ckpt

# Download base SD model
cd ../StableDiffusion
wget https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt
```

### Text-to-Video Generation

```bash
python -m scripts.animate \
  --config configs/prompts/v2/5-RealisticVision.yaml \
  --pretrained_model_path models/StableDiffusion/realisticVisionV20_v20.safetensors \
  --L 16 \
  --W 512 \
  --H 512
```

### With MotionLoRA (Camera Movement)

```bash
python -m scripts.animate \
  --config configs/prompts/v2/5-RealisticVision.yaml \
  --pretrained_model_path models/StableDiffusion/realisticVisionV20_v20.safetensors \
  --motion_lora_path models/MotionLoRA/v2_lora_ZoomIn.ckpt \
  --motion_lora_scale 1.0 \
  --L 16 \
  --W 512 \
  --H 512
```

## Configuration

### Prompt Config Example (YAML)

```yaml
# configs/prompts/v2/example.yaml
ToonYou:
  path: "models/DreamBooth_LoRA/ToonYou.safetensors"
  base: "models/StableDiffusion/v1-5-pruned-emaonly.ckpt"
  motion_module:
    - "models/Motion_Module/mm_sd_v15_v2.ckpt"

  steps: 25
  guidance_scale: 7.5

  prompt:
    - "1girl, smile, dancing, outdoors, sunshine"
    - "masterpiece, best quality, 1boy, walking in rain, cyberpunk city"

  n_prompt:
    - "bad quality, worst quality, deformed"
```

### Key Parameters

- **L**: Number of frames (8, 16, 24, 32)
- **W, H**: Width and height (512×512 typical for SD1.5, 1024×1024 for SDXL)
- **steps**: Sampling steps (20-30 typical)
- **guidance_scale**: CFG scale (7-12 typical)
- **motion_lora_scale**: MotionLoRA strength (0.5-1.5)

## Pre-trained Models

### Motion Modules

| Version | Size | Base Model | Features | Download |
|---------|------|------------|----------|----------|
| v3 (latest) | 1.56 GB | SD 1.5 | Domain Adapter LoRA | [HuggingFace](https://huggingface.co/guoyww/animatediff) |
| v2 | 1.82 GB | SD 1.5 | Improved motion | [HuggingFace](https://huggingface.co/guoyww/animatediff) |
| v1 | 1.82 GB | SD 1.4/1.5 | Original | [HuggingFace](https://huggingface.co/guoyww/animatediff) |
| SDXL Beta | 950 MB | SDXL | High-res support | [HuggingFace](https://huggingface.co/guoyww/animatediff) |

### MotionLoRA (v2)

8 camera movement variants (74 MB each):
- `v2_lora_ZoomIn.ckpt`
- `v2_lora_ZoomOut.ckpt`
- `v2_lora_PanLeft.ckpt`
- `v2_lora_PanRight.ckpt`
- `v2_lora_TiltUp.ckpt`
- `v2_lora_TiltDown.ckpt`
- `v2_lora_RollClockwise.ckpt`
- `v2_lora_RollCounterClockwise.ckpt`

### Compatible Base Models

Works with 100+ community models:
- RealisticVision
- ToonYou
- Lyriel
- RcnzCartoon
- MajicMix
- FilmGirl
- And many more on CivitAI

## Usage Examples

### Example 1: Simple Text-to-Video

```python
from animatediff.pipelines import AnimateDiffPipeline
import torch

pipe = AnimateDiffPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe.load_motion_module("models/Motion_Module/mm_sd_v15_v2.ckpt")
pipe = pipe.to("cuda")

video = pipe(
    prompt="astronaut riding a horse on mars",
    num_frames=16,
    guidance_scale=7.5,
    num_inference_steps=25
).frames
```

### Example 2: With MotionLoRA

```python
pipe.load_lora_weights("models/MotionLoRA/v2_lora_ZoomIn.ckpt")
pipe.set_adapters(["motion_lora"], adapter_weights=[1.0])

video = pipe(
    prompt="close up of a flower blooming, timelapse",
    num_frames=16,
    guidance_scale=7.5
).frames
```

### Example 3: SDXL (High-Resolution)

```bash
python -m scripts.animate \
  --config configs/prompts/v3/sdxl.yaml \
  --pretrained_model_path models/StableDiffusion/sdxl_base_1.0.safetensors \
  --motion_module_path models/Motion_Module/mm_sdxl_v10_beta.ckpt \
  --L 16 \
  --W 1024 \
  --H 1024
```

## Integration Patterns

### WebUI Integration (Automatic1111)

```bash
# Install AnimateDiff extension
cd stable-diffusion-webui/extensions
git clone https://github.com/continue-revolution/sd-webui-animatediff
# Restart WebUI
```

### ComfyUI Integration

```bash
# Install ComfyUI-AnimateDiff nodes
cd ComfyUI/custom_nodes
git clone https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved
# Restart ComfyUI
```

### API Integration (Replicate)

```python
import replicate

output = replicate.run(
    "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
    input={
        "prompt": "masterpiece, best quality, 1girl, dancing",
        "num_frames": 16,
        "guidance_scale": 7.5
    }
)
```

## Performance

### Speed
- **SD 1.5**: ~2-5 minutes for 16 frames (RTX 3090)
- **SDXL**: ~5-10 minutes for 16 frames (RTX 3090)
- Scales linearly with frame count

### Memory
- **SD 1.5**: ~8-10 GB VRAM (512×512, 16 frames)
- **SDXL**: ~16-20 GB VRAM (1024×1024, 16 frames)
- Batch size=1 typically required

### Quality
- **Temporal Consistency**: Good (v2/v3 better than v1)
- **Motion Quality**: Varies by prompt and model
- **Artifacts**: Reduced with domain adapter (v3)

## Tips & Best Practices

### Prompt Engineering
1. Start with tested community prompts
2. Include quality modifiers: "masterpiece, best quality"
3. Specify action/movement: "walking", "dancing", "rotating"
4. Use negative prompts: "bad quality, deformed, blurry"

### Model Selection
- **Photorealistic**: RealisticVision, MajicMix
- **Anime/Cartoon**: ToonYou, RcnzCartoon
- **Artistic**: Lyriel, FilmGirl

### Motion Control
- Combine multiple MotionLoRAs for complex camera moves
- Adjust `motion_lora_scale` for subtlety (0.5) or intensity (1.5)
- Use SparseCtrl for precise motion guidance (v3+)

### Quality Optimization
1. Use v3 motion module with domain adapter
2. Increase steps (25-30) for smoother motion
3. Adjust CFG scale (7-12) for prompt adherence
4. Use appropriate base model for style

## Troubleshooting

### CUDA Out of Memory
```bash
# Reduce resolution
--W 256 --H 256

# Reduce frames
--L 8

# Enable CPU offload
pipe.enable_model_cpu_offload()
```

### Poor Temporal Consistency
- Use v3 motion module (best consistency)
- Increase CFG scale (9-12)
- Try different base models
- Simplify prompt

### Slow Generation
- Use xformers: `pip install xformers`
- Reduce steps to 20
- Use smaller resolution
- Batch process overnight

## Related Projects in Collection

### Comparison

| Project | Input | Approach | Speed | Quality |
|---------|-------|----------|-------|---------|
| **AnimateDiff** | Text/Image | Diffusion | Slow | Variable |
| first-order-model | Image+Video | Keypoint | Fast | Good |
| LivePortrait | Image+Video | Modular | Fast | Excellent |

### Workflow Integration

```bash
# Pattern: Image → AnimateDiff → GIF
python scripts/animate.py --config config.yaml
ffmpeg -i output.mp4 -r 15 temp.gif
gifsicle -O3 temp.gif -o final.gif

# Pattern: AnimateDiff → Post-process
python scripts/animate.py --config config.yaml  # Generate
python upscale.py output.mp4                    # Upscale (optional)
ffmpeg -i output.mp4 -c:v libx264 -preset slow final.mp4  # Encode
```

## Documentation Links

- **Repository**: https://github.com/guoyww/AnimateDiff
- **HuggingFace**: https://huggingface.co/guoyww/animatediff
- **Paper**: "AnimateDiff: Animate Your Personalized Text-to-Image Diffusion Models"
- **WebUI Extension**: https://github.com/continue-revolution/sd-webui-animatediff
- **ComfyUI Nodes**: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved

## Project Status

- ✅ **Active Development**: Regular updates
- ✅ **Production Ready**: Used in commercial applications
- ✅ **Community Support**: Large ecosystem (WebUI, ComfyUI, Replicate)
- ✅ **Pre-trained Models**: Multiple domains available
- ⚠️ **GPU Required**: High VRAM requirements

## License

See LICENSE file in repository
