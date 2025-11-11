# 🎮 How to Animate Your Character (Pepe "Game Over")

**Goal**: Make your static character walk around, move, and create funny interactive animations

This guide provides multiple approaches from simple to advanced, using the tools you already have!

---

## 🎯 Quick Recommendations

| Method | Difficulty | Best For | Output Quality | Time |
|--------|-----------|----------|----------------|------|
| **AnimatedDrawings** | ⭐⭐ Medium | Walking, dancing, jumping | ⭐⭐⭐⭐⭐ | 30 min |
| **First-Order Model** | ⭐⭐⭐ Hard | Expressive movements | ⭐⭐⭐⭐ | 1 hour |
| **Sprite Sheet** | ⭐ Easy | Simple walking cycles | ⭐⭐⭐ | 15 min |
| **TPS Motion Model** | ⭐⭐⭐ Hard | Complex motion transfer | ⭐⭐⭐⭐⭐ | 1 hour |

**Recommended**: Start with **AnimatedDrawings** - it's specifically designed for cartoon characters like yours!

---

## 🥇 Method 1: AnimatedDrawings (BEST FOR YOUR IMAGE!)

**Why Perfect**: Designed by Meta specifically to animate hand-drawn/cartoon characters with realistic motion

### What It Can Do

✅ **Walking** - Natural walking cycles
✅ **Dancing** - Fun dance moves
✅ **Jumping** - Jumps and hops
✅ **Waving** - Hand gestures
✅ **Custom Motions** - Any pose sequence
✅ **Export to GIF/MP4** - Ready to use

### Setup

```bash
# Navigate to AnimatedDrawings
cd /Users/seman/Desktop/gif-repos/AnimatedDrawings

# Create conda environment
conda create --name animated_drawings python=3.8.13
conda activate animated_drawings

# Install
pip install -e .
```

### Usage - Quick Start

```python
from animated_drawings import render

# Interactive window - see your character move!
render.start('./examples/config/mvc/interactive_window_example.yaml')

# Export to MP4
render.start('./examples/config/mvc/export_mp4_example.yaml')

# Export to transparent GIF
render.start('./examples/config/mvc/export_gif_example.yaml')
```

### Animate Your Pepe Character

**Step 1: Prepare Your Image**

Your image needs:
- Character centered
- White/transparent background (optional but better)
- Clear outline
- Full body visible (arms, legs)

**Step 2: Create Config File**

Create `pepe_walking.yaml`:

```yaml
scene:
  ADD_FLOOR: True
  CAMERA_POS: [0, 100, 300]

controller:
  MODE: video_render
  OUTPUT_VIDEO_PATH: ./pepe_walking.gif

character:
  character_config: ./your_character/pepe_config.yaml
  motion: walking  # Options: walking, dancing, jumping, zombie, dab

view:
  WINDOW_WIDTH: 1080
  WINDOW_HEIGHT: 1080
  USE_MESA: False
```

**Step 3: Create Character Config**

Create `pepe_config.yaml`:

```yaml
skeleton:
  root: torso
  joints:
    - torso
    - head
    - right_arm
    - left_arm
    - right_leg
    - left_leg

texture:
  path: /path/to/your/pepe_image.png

bounding_box:
  # You'll need to annotate where the character is
  # Tool is provided: use the annotation GUI
```

**Step 4: Run Annotation Tool** (First Time Only)

AnimatedDrawings provides an interactive tool to mark your character's joints:

```python
from animated_drawings import render
render.start('./examples/config/mvc/annotations_example.yaml')
```

This opens a window where you click to mark:
- Head
- Torso
- Arms (left, right)
- Legs (left, right)

**Step 5: Generate Animation**

```python
from animated_drawings import render
render.start('./pepe_walking.yaml')
```

**Output**: `pepe_walking.gif` with your character walking!

### Available Motions

AnimatedDrawings includes these pre-built motions:

- `walking` - Natural walk cycle
- `running` - Fast running
- `jumping` - Jump animation
- `dancing` - Dance moves
- `zombie` - Zombie walk
- `dab` - Dab pose
- `thriller` - Michael Jackson thriller dance
- `wave` - Waving hand
- Custom - Record your own with motion capture!

### Advanced: Custom Motions

You can create custom motion sequences:

```yaml
motion:
  path: ./custom_motions/funny_walk.bvh  # BVH motion file
  start_frame: 0
  end_frame: 120
  fps: 30
```

### Tips for Best Results

✅ **Clear Background** - Remove complex backgrounds
✅ **Full Body Visible** - Show all limbs
✅ **Good Contrast** - Character should stand out
✅ **Centered** - Place character in center
✅ **High Resolution** - At least 512x512px

---

## 🥈 Method 2: First-Order Motion Model

**Why Good**: Transfer motion from ANY video to your character (you move, Pepe moves!)

### What It Can Do

✅ **Motion Transfer** - Copy movements from a video
✅ **Facial Expressions** - If character has a face
✅ **Complex Movements** - Any human motion
✅ **Multiple Styles** - Different animation styles

### Setup

```bash
cd /Users/seman/Desktop/gif-repos/first-order-model

# Install dependencies
pip install -r requirements.txt

# Download pre-trained model
# (Check README for model download links)
```

### Usage

```python
import imageio
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from skimage.transform import resize
from IPython.display import HTML
import warnings
warnings.filterwarnings("ignore")

# Load your character image
source_image = imageio.imread('/path/to/pepe.png')

# Load driving video (your motion reference)
driving_video = imageio.mimread('/path/to/walking_video.mp4')

# Generate animation
# (See first-order-model README for full code)
```

### Best Driving Videos

Use videos with:
- Clear human figure
- Similar pose to your character
- Good lighting
- Full body visible
- Simple background

### Example Workflow

1. **Record yourself walking** (or find a video)
2. **Run first-order-model** with your Pepe image as source
3. **Pepe copies your movements!**

**Result**: Your character mimics the movements from the video

---

## 🥉 Method 3: Sprite Sheet Animation (Simplest!)

**Why Simple**: Traditional animation approach, full control

### What You Need

1. Create multiple poses of your character (walking cycle)
2. Combine into sprite sheet
3. Animate with your gif-generator CLI

### Step 1: Create Walking Frames

Using image editing (Photoshop, GIMP, Procreate):

```
Frame 1: Standing, right foot forward
Frame 2: Mid-step
Frame 3: Standing, left foot forward
Frame 4: Mid-step
Frame 5: Standing, right foot forward (cycle repeats)
```

**Tip**: You only need 4-8 frames for a simple walk cycle

### Step 2: Save Each Frame

```
pepe_walk_01.png
pepe_walk_02.png
pepe_walk_03.png
pepe_walk_04.png
```

### Step 3: Use Your CLI Tool

```bash
# Create sprite sheet template
cd /Users/seman/Desktop/gif-repos/gif-generator

# Create simple animation
./gif-gen create creative-effects/sprite-animation \
  --frames "pepe_walk_*.png" \
  --output pepe_walking.gif \
  --fps 12
```

### Tools to Help Create Frames

**Manual Drawing**:
- Procreate (iPad)
- Adobe Animate
- Krita (free)
- GIMP (free)

**AI-Assisted**:
- RunwayML
- Adobe Firefly
- Midjourney (with consistency)

---

## 🎨 Method 4: Add Funny Interactive Elements

Once you have basic animation, add these effects!

### 1. Add Text/Speech Bubbles

```bash
./gif-gen create social-media/meme-generator \
  --image pepe_walking.gif \
  --text "GAME OVER? MORE LIKE GAME START!" \
  --style comic-bubble
```

### 2. Add Background/Environment

```bash
./gif-gen create creative-effects/scene-composer \
  --character pepe_walking.gif \
  --background gaming_room.jpg \
  --preset balanced
```

### 3. Add Glitch Effects

```bash
./gif-gen create creative-effects/glitch-effect \
  --video pepe_walking.gif \
  --output pepe_glitchy.gif \
  --preset balanced
```

### 4. Add VHS Retro Effect

```bash
./gif-gen create creative-effects/retro-vhs \
  --video pepe_walking.gif \
  --output pepe_retro.gif
```

### 5. Make Cinemagraph (Selective Motion)

```bash
./gif-gen create creative-effects/cinemagraph \
  --video pepe_scene.mp4 \
  --mask pepe_motion_area.png \
  --output pepe_cinemagraph.gif
```

---

## 🚀 Recommended Workflow

### For Quick Results (30 minutes)

```bash
# 1. Set up AnimatedDrawings
cd AnimatedDrawings
conda activate animated_drawings

# 2. Run annotation tool on your image
python annotate_character.py --image /path/to/pepe.png

# 3. Generate walking animation
from animated_drawings import render
render.start('./config/pepe_walking.yaml')

# 4. Add effects with your CLI
cd ../gif-generator
./gif-gen create creative-effects/glitch-effect \
  --video ../AnimatedDrawings/pepe_walking.gif \
  --output pepe_final.gif
```

### For Best Quality (1-2 hours)

```bash
# 1. Use AnimatedDrawings for base animation
# 2. Export multiple motions (walking, jumping, dancing)
# 3. Use first-order-model for expressive face
# 4. Composite in video editor
# 5. Add effects with gif-generator CLI
# 6. Final polish with gifsicle optimization
```

---

## 💡 Creative Ideas for Your Character

### 1. Walking Cycles
- Normal walk
- Sneaky walk
- Happy walk
- Sad walk
- Power walk

### 2. Actions
- Jumping
- Dancing
- Waving
- Pointing
- Sitting down
- Standing up
- Running

### 3. Reactions
- Laughing
- Crying
- Shocked
- Confused
- Angry
- Celebrating

### 4. Interactive Elements
- Speech bubbles
- Thought clouds
- Emoji reactions
- Text overlays
- Background changes
- Particle effects

### 5. Meme Templates
- "When you..." scenarios
- Reaction GIFs
- Before/after
- Comparison memes
- Tutorial steps

---

## 📋 Full Example: Complete Workflow

Let me create a complete example for your exact image:

### Example: "Pepe Gaming Walk"

**Goal**: Make Pepe walk across the screen while the "GAME OVER" text glitches

```bash
# Step 1: Animate with AnimatedDrawings
cd /Users/seman/Desktop/gif-repos/AnimatedDrawings
conda activate animated_drawings

python << EOF
from animated_drawings import render
render.start('./config/pepe_walk_config.yaml')
EOF

# Output: pepe_base_walk.gif

# Step 2: Add glitch effect to "GAME OVER" text
cd /Users/seman/Desktop/gif-repos/gif-generator
./gif-gen create creative-effects/glitch-effect \
  --video ../AnimatedDrawings/pepe_base_walk.gif \
  --output pepe_glitch_walk.gif \
  --preset balanced

# Step 3: Add gaming background
./gif-gen create creative-effects/scene-composer \
  --character pepe_glitch_walk.gif \
  --background gaming_setup.jpg \
  --output pepe_gaming_final.gif

# Step 4: Optimize final GIF
gifsicle -O3 --colors 256 pepe_gaming_final.gif -o pepe_optimized.gif
```

---

## 🛠️ Tools Comparison

### AnimatedDrawings
**Pros**:
- ✅ Purpose-built for cartoon characters
- ✅ Pre-made motion library
- ✅ Easy to use
- ✅ High quality results
- ✅ Export to GIF/MP4

**Cons**:
- ❌ Requires annotation (one-time)
- ❌ Limited to humanoid characters
- ❌ Learning curve for configs

**Best For**: Walking, dancing, standard character animations

### First-Order Motion Model
**Pros**:
- ✅ Any video can drive motion
- ✅ Expressive movements
- ✅ Facial expressions
- ✅ Complex actions

**Cons**:
- ❌ More complex setup
- ❌ Requires good driving video
- ❌ Can have artifacts
- ❌ Processing time longer

**Best For**: Copying real movements, expressive animations

### Sprite Sheet
**Pros**:
- ✅ Full creative control
- ✅ No ML required
- ✅ Works offline
- ✅ Predictable results

**Cons**:
- ❌ Manual work required
- ❌ Time-consuming
- ❌ Need drawing skills
- ❌ Limited by your frames

**Best For**: Simple animations, full control needed

### TPS Motion Model
**Pros**:
- ✅ Flexible deformation
- ✅ Good for non-humanoid
- ✅ Smooth motion

**Cons**:
- ❌ Complex setup
- ❌ Requires keypoints
- ❌ Steeper learning curve

**Best For**: Unusual characters, specific motion patterns

---

## 🎬 Next Steps

### Immediate (Today)
1. Try AnimatedDrawings with example images
2. Understand the annotation process
3. Test with simple walking motion

### Short Term (This Week)
1. Prepare your Pepe image (clean background)
2. Annotate character joints
3. Generate 3-5 different animations
4. Add effects with your CLI tool

### Long Term (This Month)
1. Create sprite sheets for custom actions
2. Experiment with first-order-model
3. Build library of reaction GIFs
4. Create interactive meme templates

---

## 📚 Additional Resources

### Documentation
- AnimatedDrawings: `/Users/seman/Desktop/gif-repos/AnimatedDrawings/README.md`
- First-Order Model: `/Users/seman/Desktop/gif-repos/first-order-model/README.md`
- Your CLI Tool: `/Users/seman/Desktop/gif-repos/gif-generator/CLI_FEATURES.md`

### Tutorials
- AnimatedDrawings video: https://www.youtube.com/watch?v=WsMUKQLVsOI
- First-order paper: https://papers.nips.cc/paper/8935-first-order-motion-model-for-image-animation.pdf

### Community
- AnimatedDrawings hashtag: #FAIRAnimatedDrawings
- Share your creations!

---

## ⚡ Quick Start Command

**Fastest way to get started right now:**

```bash
cd /Users/seman/Desktop/gif-repos/AnimatedDrawings
conda create --name animated_drawings python=3.8.13
conda activate animated_drawings
pip install -e .

# Test with example
python << EOF
from animated_drawings import render
render.start('./examples/config/mvc/interactive_window_example.yaml')
EOF

# You'll see an animated character - this is what yours will look like!
```

**Press spacebar to pause, arrow keys to scrub, Q to quit.**

---

## 🎯 Summary

**Recommended Path for Your Pepe Character**:

1. ✅ **Use AnimatedDrawings** - Perfect for cartoon characters
2. ✅ **Start with walking** - Easiest motion to learn
3. ✅ **Add effects** - Use your gif-generator CLI for polish
4. ✅ **Iterate** - Try different motions and effects

**Expected Result**:
- Walking Pepe character
- "GAME OVER" shirt visible
- Smooth animation
- Can add effects, backgrounds, text
- Export as GIF or MP4

**Total Time**: 30-60 minutes for first result

**You have all the tools you need - let's make it move!** 🎮
