# First-Order Motion Model for Image Animation

## Overview

**Purpose**: Transfer motion from driving video to animate source image using keypoint-based motion model
**Framework**: PyTorch 1.12.1+
**Paper**: "First Order Motion Model for Image Animation" (NeurIPS 2019)
**Authors**: Aliaksandr Siarohin, Stéphane Lathuilière, Sergey Tulyakov, Elisa Ricci, Nicu Sebe
**Innovation**: Uses first-order Taylor approximation (Jacobian matrices) for local transformations

## Key Features

- 🎯 **Keypoint-Based**: Sparse keypoint detection and tracking
- 📐 **First-Order Approximation**: Jacobian matrices model local affine transformations
- 🎬 **Self-Supervised**: Trains without keypoint annotations
- 🎨 **Equivariance Loss**: Ensures pose consistency and geometric constraints
- 🖼️ **Multi-Domain**: Works on faces, bodies, fashion, animations
- ⚡ **Fast Inference**: Real-time capable after training
- 🔄 **Two Modes**: Absolute (direct) or relative (offset-based) animation

## Architecture

### Directory Structure

```
first-order-model/
├── modules/                  # Model components
│   ├── keypoint_detector.py # Sparse keypoint extraction
│   ├── dense_motion.py      # Dense motion field prediction
│   ├── generator.py         # Frame generation (Johnson architecture)
│   ├── discriminator.py     # Adversarial loss
│   ├── model.py             # Main model with VGG19 perceptual loss
│   └── util.py              # Utilities
├── config/                   # Dataset configurations
│   ├── vox-256.yaml         # VoxCeleb (faces)
│   ├── fashion-256.yaml     # Fashion dataset
│   ├── taichi-256.yaml      # Taichi martial arts
│   ├── mgif-256.yaml        # Monkey gifs
│   ├── nemo-256.yaml        # Nemo fish
│   └── ted-256.yaml         # TED talks
├── checkpoints/             # Pre-trained models (download)
├── run.py                   # Main training/evaluation
├── train.py                 # Training loop
├── demo.py                  # Inference demo
├── animate.py               # Animation script
├── crop-video.py            # Video preprocessing
├── reconstruction.py        # Reconstruction mode
└── sup-mat/                 # Supplementary materials
```

### Core Components

#### 1. Keypoint Detector (`modules/keypoint_detector.py`)
- **Architecture**: U-Net with temperature-controlled softmax
- **Output**: K keypoints (default: 10) with heatmaps
- **Features**: Gaussian heatmaps, learnable temperature
- **Purpose**: Extract sparse motion-driving points

#### 2. Dense Motion Network (`modules/dense_motion.py`)
- **Architecture**: U-Net predicting optical flow
- **Input**: Source keypoints + driving keypoints + Jacobians
- **Output**: Dense motion field + occlusion mask
- **Innovation**: First-order Taylor expansion for local transforms

#### 3. Generator (`modules/generator.py`)
- **Architecture**: Johnson ResNet-based generator
- **Components**: Downsampling → ResBlocks → Upsampling
- **Input**: Source image warped by dense motion
- **Output**: Animated frame
- **Loss**: Perceptual (VGG19) + adversarial + equivariance

#### 4. Discriminator (`modules/discriminator.py`)
- **Architecture**: Multi-scale patch discriminator
- **Purpose**: Adversarial training for realistic outputs
- **Scales**: Multiple scales for detail preservation

## Technical Stack

### Dependencies

```yaml
Framework: PyTorch 1.12.1+
Vision: torchvision
Image Processing: scikit-image, scipy, imageio
Video Processing: ffmpeg-python
ML Tools: scikit-learn
Visualization: matplotlib
```

### Installation

```bash
# Clone repository
git clone https://github.com/AliaksandrSiarohin/first-order-model
cd first-order-model

# Create environment
conda create -n first-order python=3.7
conda activate first-order

# Install dependencies
pip install torch torchvision
pip install scikit-image scipy imageio
pip install ffmpeg-python matplotlib
```

## Usage Examples

### Inference (Absolute Mode)

```bash
# Download pre-trained model
wget https://cloud.mail.ru/public/...  # VoxCeleb checkpoint

# Animate image with driving video
python demo.py \
  --config config/vox-256.yaml \
  --driving_video path/to/driving.mp4 \
  --source_image path/to/source.png \
  --checkpoint checkpoints/vox-cpk.pth.tar \
  --relative False \
  --adapt_scale False \
  --result_video result.mp4
```

### Inference (Relative Mode)

```bash
# Relative motion transfer (recommended)
python demo.py \
  --config config/vox-256.yaml \
  --driving_video driving.mp4 \
  --source_image source.png \
  --checkpoint checkpoints/vox-cpk.pth.tar \
  --relative True \
  --adapt_scale True \
  --result_video result.mp4
```

### Training

```bash
# Train on custom dataset
python run.py \
  --config config/dataset.yaml \
  --device_ids 0,1 \
  --num_epochs 100
```

### Reconstruction Mode

```bash
# Video reconstruction (identity animation)
python reconstruction.py \
  --config config/vox-256.yaml \
  --checkpoint checkpoints/vox-cpk.pth.tar \
  --video path/to/video.mp4
```

## Pre-trained Models

### Available Checkpoints

| Dataset | Domain | Resolution | Download | Size |
|---------|--------|------------|----------|------|
| VoxCeleb | Faces (talking heads) | 256×256 | [Link](https://cloud.mail.ru/public/4cS9/JyJhbR8B7) | ~150 MB |
| Fashion | Full-body fashion | 256×256 | [Link](https://cloud.mail.ru/public/4TLc/jFCqpnSGq) | ~150 MB |
| Taichi | Martial arts | 256×256 | [Link](https://cloud.mail.ru/public/3xXf/KCRZx2DLj) | ~150 MB |
| MGIF | Monkey animations | 256×256 | [Link](https://cloud.mail.ru/public/3T8V/aEyJxTH42) | ~150 MB |
| Nemo | Fish animations | 256×256 | [Link](https://cloud.mail.ru/public/3MZN/KkDcuwBcS) | ~150 MB |
| TED-talks | Speakers | 256×256 | [Link](https://cloud.mail.ru/public/4pK4/3XeGm3kfB) | ~150 MB |

### Model Selection Guide

- **VoxCeleb**: Human faces, talking heads, portraits
- **Fashion**: Full-body human motion, fashion videos
- **Taichi**: Articulated motion, martial arts, dancing
- **MGIF**: Cartoon/animation style motion
- **Nemo**: Underwater creatures, fish
- **TED-talks**: Professional presentations, upper-body motion

## Configuration

### Dataset Config Example (`config/vox-256.yaml`)

```yaml
dataset_params:
  root_dir: data/vox-png
  frame_shape: [256, 256, 3]
  id_sampling: True
  pairs_list: data/vox256.csv
  augmentation_params:
    flip_param:
      horizontal_flip: True
      time_flip: True
    crop_param:
      size: [256, 256]

model_params:
  common_params:
    num_kp: 10              # Number of keypoints
    num_channels: 3
    estimate_jacobian: True # Enable first-order approximation

  kp_detector_params:
    temperature: 0.1
    block_expansion: 32
    max_features: 1024
    scale_factor: 0.25
    num_blocks: 5

  generator_params:
    block_expansion: 64
    max_features: 512
    num_down_blocks: 2
    num_bottleneck_blocks: 6
    estimate_occlusion_map: True

  discriminator_params:
    scales: [1]
    block_expansion: 32
    max_features: 512
    num_blocks: 4

train_params:
  num_epochs: 100
  num_repeats: 75
  epoch_milestones: [60, 90]
  lr_generator: 2.0e-4
  lr_discriminator: 2.0e-4
  batch_size: 30
  scales: [1, 0.5, 0.25, 0.125]  # Multi-scale perceptual loss
  checkpoint_freq: 10

  loss_weights:
    perceptual: [10, 10, 10, 10, 10]  # VGG19 layers
    equivariance_value: 10
    equivariance_jacobian: 10
```

## Training Details

### Loss Functions

1. **Perceptual Loss (VGG19)**
   - Multiple VGG layers: conv1_2, conv2_2, conv3_4, conv4_4, conv5_4
   - Multi-scale pyramid: [1, 0.5, 0.25, 0.125]
   - Weight: 10 per scale

2. **Adversarial Loss**
   - Multi-scale patch discriminator
   - Hinge loss formulation
   - Feature matching

3. **Equivariance Loss**
   - Value equivariance: Keypoint positions should transform consistently
   - Jacobian equivariance: Local transformations should compose properly
   - Weight: 10 each

### Training Strategy

```python
# Epoch schedule
# Epochs 0-60:  Full learning rate
# Epochs 60-90: Reduced learning rate
# Epochs 90+:   Fine-tuning

# Data augmentation
- Horizontal flip (50%)
- Time flip (reverse video, 50%)
- Random crops (256×256)
- Color jittering

# Batch construction
- Batch size: 30 frame pairs
- Same video: Source + driving from same video
- ID sampling: Diverse identities per batch
```

## Technical Innovations

### First-Order Motion Model

**Key Idea**: Model local transformations using first-order Taylor approximation:
```
T(x) ≈ T(xₖ) + J(xₖ) · (x - xₖ)
```

Where:
- `xₖ`: Keypoint location
- `J(xₖ)`: 2×2 Jacobian matrix (local affine transformation)
- Result: Flexible deformation beyond rigid/affine transformations

### Equivariance Constraints

**Principle**: Model should be geometrically consistent
```python
# If we transform the input, outputs should transform accordingly
transform(keypoints(image)) == keypoints(transform(image))
```

**Benefits**:
- Better generalization
- Geometric consistency
- Improved motion transfer quality

### Dense Motion Prediction

**Pipeline**:
1. Detect keypoints and Jacobians in source + driving
2. Compute local affine transformations
3. Predict dense optical flow field
4. Generate occlusion mask
5. Warp source image using flow
6. Inpaint occluded regions

## Performance

### Speed
- **Inference**: ~30 FPS on modern GPU (RTX 3080)
- **Training**: ~1 day on 4 GPUs for 100 epochs (VoxCeleb)

### Memory
- **Inference**: ~2 GB GPU memory (256×256)
- **Training**: ~10 GB GPU memory (batch size 30)

### Quality
- **VoxCeleb**: State-of-the-art face animation (2019)
- **Fashion**: Competitive full-body animation
- **Limitation**: Struggles with extreme pose changes

## Integration Patterns

### Video Processing Pipeline

```bash
# 1. Extract frames from video
ffmpeg -i input.mp4 frames/frame_%04d.png

# 2. Crop faces/subjects
python crop-video.py --input input.mp4 --output cropped.mp4

# 3. Animate
python demo.py \
  --config config/vox-256.yaml \
  --source_image portrait.png \
  --driving_video cropped.mp4 \
  --checkpoint checkpoints/vox-cpk.pth.tar \
  --result_video result.mp4

# 4. Post-process (optional)
ffmpeg -i result.mp4 -c:v libx264 -preset slow -crf 18 final.mp4
```

### Batch Processing

```python
import yaml
from demo import load_checkpoints, make_animation
import imageio

# Load model once
with open('config/vox-256.yaml') as f:
    config = yaml.safe_load(f)

generator, kp_detector = load_checkpoints(
    config_path='config/vox-256.yaml',
    checkpoint_path='checkpoints/vox-cpk.pth.tar'
)

# Process multiple source-driving pairs
pairs = [
    ('source1.png', 'driving1.mp4'),
    ('source2.png', 'driving2.mp4'),
    # ...
]

for source, driving in pairs:
    source_img = imageio.imread(source)
    driving_video = imageio.mimread(driving, memtest=False)

    result = make_animation(
        source_img, driving_video,
        generator, kp_detector,
        relative=True, adapt_movement_scale=True
    )

    imageio.mimsave(f'result_{source}_{driving}.mp4', result, fps=25)
```

## Related Projects in Collection

### Comparison with Other Models

| Model | Keypoints | Transformation | Speed | Quality |
|-------|-----------|----------------|-------|---------|
| **First-Order** | 10 sparse | First-order Taylor | Fast | Good |
| Thin-Plate Spline | 10 sparse | TPS (more flexible) | Medium | Better |
| AnimateDiff | N/A (latent) | Diffusion motion | Slow | Variable |
| LivePortrait | Dense features | Modular pipeline | Fast | Excellent |

### Workflow Integration

```bash
# Use Case 1: Quick prototyping
first-order-model → Fast animation for demos

# Use Case 2: Better quality
first-order-model → Thin-Plate-Spline → Higher quality

# Use Case 3: Production
LivePortrait → Best for production faces
```

## Troubleshooting

### Common Issues

**CUDA Out of Memory**
```bash
# Reduce batch size during training
batch_size: 15  # Instead of 30

# Or use smaller images
frame_shape: [128, 128, 3]
```

**Poor Animation Quality**
- Try `--relative True --adapt_scale True`
- Ensure source and driving have similar poses
- Use appropriate pre-trained model for domain
- Check keypoint detection visualization

**Keypoints Not Detected Properly**
- Crop input images/videos to subject
- Use `crop-video.py` for preprocessing
- Ensure sufficient contrast and lighting

## Best Practices

### Source Image Selection
- Clear, front-facing pose
- Good lighting and contrast
- Minimal occlusions
- Similar domain to training data

### Driving Video Selection
- Similar pose space to source
- Smooth motion (avoid jumps)
- Good quality and resolution
- Appropriate frame rate (25-30 FPS)

### Mode Selection
- **Absolute**: When source and driving have similar pose
- **Relative**: For different starting poses (recommended)
- **Adapt Scale**: Enable for better motion adaptation

### Training Custom Models
1. Collect 50-100K frame pairs
2. Ensure diverse motion and identities
3. Use appropriate augmentation
4. Start from pre-trained checkpoint
5. Monitor equivariance loss convergence

## Documentation Links

- **Paper**: https://papers.nips.cc/paper/8935-first-order-motion-model-for-image-animation
- **Repository**: https://github.com/AliaksandrSiarohin/first-order-model
- **Project Page**: https://aliaksandrsiarohin.github.io/first-order-model-website/
- **Colab Demo**: Available in repository

## Citation

```bibtex
@InProceedings{Siarohin_2019_NeurIPS,
  author={Siarohin, Aliaksandr and Lathuilière, Stéphane and Tulyakov, Sergey and Ricci, Elisa and Sebe, Nicu},
  title={First Order Motion Model for Image Animation},
  booktitle = {Conference on Neural Information Processing Systems (NeurIPS)},
  year = {2019}
}
```

## Project Status

- ✅ **Research Project**: NeurIPS 2019 publication
- ✅ **Well Maintained**: Active community support
- ✅ **Production Ready**: Used in many applications
- ✅ **Pre-trained Models**: Multiple domains available
- ⚠️ **GPU Required**: CPU inference very slow

## License

See LICENSE file in repository root
