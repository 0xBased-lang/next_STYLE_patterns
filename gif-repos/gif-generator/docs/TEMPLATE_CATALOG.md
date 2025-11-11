# Template Catalog - Visual Reference

**Quick reference guide for all available templates**

## 📁 Template Library Overview

**Total Templates**: 9
**Categories**: 5
**Ready to Use**: ✅ All templates validated

---

## 1️⃣ Social Media Templates (4)

### Twitter Product Demo
```yaml
Path: social-media/twitter-demo
Platform: Twitter
Format: 600px wide GIF
Duration: 5 seconds
Size Limit: <5MB
Tools: gifcurry → gifsicle
```

**Pipeline**:
```
Video (any format)
  → gifcurry (convert + text overlay)
  → gifsicle (optimize -60% size)
  → Twitter-ready GIF
```

**Presets**:
- `quick`: 10 FPS, 64 colors, smallest file
- `balanced`: 15 FPS, 128 colors (default)
- `quality`: 20 FPS, 256 colors, best quality

**Use Cases**:
- Product launches
- Feature announcements
- Quick tutorials
- Marketing campaigns

**Command**:
```bash
gif-gen create social-media/twitter-demo \
  --video demo.mp4 \
  --var product_name="My Product" \
  --preset balanced
```

---

### Instagram Square
```yaml
Path: social-media/instagram-square
Platform: Instagram
Format: 640×640 (1:1 square)
Duration: 8 seconds
Size Limit: <15MB
Tools: gifcurry → gifsicle
```

**Pipeline**:
```
Video
  → gifcurry (square crop + text)
  → gifsicle (optimize for Instagram)
  → Instagram-ready GIF
```

**Presets**:
- `story`: 1080×1920 (9:16 vertical)
- `post`: 640×640 (1:1 square, default)
- `feed`: 480×480 (smaller for scrolling)

**Use Cases**:
- Product showcases
- Behind-the-scenes
- Quick tips
- User-generated content

---

### LinkedIn Header
```yaml
Path: social-media/linkedin-header
Platform: LinkedIn
Format: 1200×627 (wide)
Duration: 6 seconds
Size Limit: <5MB
Tools: gifcurry → gifsicle
```

**Pipeline**:
```
Video
  → gifcurry (wide format + professional text)
  → gifsicle (compress)
  → LinkedIn article header
```

**Presets**:
- `article`: 1200×627, 12 FPS (default)
- `post`: 1200×675, 15 FPS
- `banner`: 1536×768, 10 FPS (company page)

**Use Cases**:
- Article headers
- Company updates
- Thought leadership
- Professional announcements

---

### GitHub README Demo
```yaml
Path: social-media/github-readme
Platform: GitHub
Format: 800×600
Duration: 10 seconds
Size Limit: <10MB
Tools: gifcurry → gifsicle
```

**Pipeline**:
```
Screen recording
  → gifcurry (optimize for docs)
  → gifsicle (compress for fast loading)
  → README-ready GIF
```

**Presets**:
- `feature`: 800×600, 12 FPS (default)
- `quickstart`: 600×400, 10 FPS (fast)
- `tutorial`: 1000×750, 15 FPS (detailed)
- `mobile`: 360×640, 20 FPS (app demos)

**Use Cases**:
- Feature demos
- Installation guides
- Usage examples
- CLI tool showcases

---

## 2️⃣ Portrait Animation Templates (2)

### AI Talking Head
```yaml
Path: portrait-animation/talking-head
Model: LivePortrait (or first-order-model fallback)
Input: Portrait photo + driving video
Output: MP4 video (1080p)
GPU: Recommended
Tools: LivePortrait → ffmpeg
```

**Pipeline**:
```
Portrait.jpg + Talking_video.mp4
  → LivePortrait (AI face animation)
  → ffmpeg (audio sync + encode)
  → Talking presenter video
```

**Presets**:
- `professional`: Subtle, 1080p, 4Mbps
- `casual`: Natural, 720p, 2Mbps
- `subtle`: Minimal animation
- `expressive`: Exaggerated for impact

**Use Cases**:
- Video presentations
- Virtual avatars
- Testimonials
- E-learning content
- Product demos with presenter

**Command**:
```bash
gif-gen create portrait-animation/talking-head \
  --portrait face.jpg \
  --driving talking.mp4 \
  --preset professional
```

---

### Expression Transfer
```yaml
Path: portrait-animation/expression-transfer
Model: first-order-model
Input: Source portrait + expression video
Output: MP4 video
GPU: Required
Tools: first-order-model → ffmpeg
```

**Pipeline**:
```
Portrait.jpg + Expression_video.mp4
  → first-order-model (transfer expressions)
  → ffmpeg (enhance + encode)
  → Animated portrait
```

**Presets**:
- `subtle`: 0.7× intensity
- `normal`: 1.0× intensity (default)
- `exaggerated`: 1.5× intensity
- `headpose_only`: Only head movement

**Use Cases**:
- Emotion demonstration
- Character animation
- Educational content
- Artistic projects
- Meme creation

---

## 3️⃣ Character Animation Template (1)

### Hand-Drawn Character
```yaml
Path: character-animation/hand-drawn
Model: AnimatedDrawings
Input: Drawing image + BVH motion file
Output: MP4 video
GPU: Recommended
Tools: AnimatedDrawings → ffmpeg
```

**Pipeline**:
```
Drawing.jpg + Motion.bvh
  → AnimatedDrawings (pose detection + retargeting)
  → ffmpeg (background + encode)
  → Animated character
```

**Presets**:
- `dance`: Dancing animation, 5s
- `wave`: Waving animation, 3s
- `walk`: Walking animation, 4s
- `custom`: User-provided motion

**Use Cases**:
- Children's drawings come alive
- Mascot animations
- Educational content
- Creative projects
- Social media content

**Command**:
```bash
gif-gen create character-animation/hand-drawn \
  --drawing kids_drawing.jpg \
  --preset dance
```

---

## 4️⃣ Web Animation Template (1)

### Loading Spinner
```yaml
Path: web-animation/loading-spinner
Framework: framer-motion / Motion
Output: React/Vue/JS code
No GPU needed
Tool: motion (code generation)
```

**Pipeline**:
```
Configuration
  → motion (generate code)
  → React/Vue/JS component
```

**Presets**:
- `circular`: Classic spinner
- `dots`: Three dots animation
- `pulse`: Pulsing circle
- `bars`: Vertical bars

**Output Formats**:
- React (framer-motion)
- Vue (Motion for Vue)
- Vanilla JavaScript

**Use Cases**:
- Page loading indicators
- Data fetching feedback
- Form submissions
- File uploads

---

## 5️⃣ Technical Documentation Template (1)

### Terminal Demo
```yaml
Path: technical-docs/terminal-demo
Tool: asciicast2gif
Input: .cast recording (asciinema)
Output: GIF
No GPU needed
Tools: asciicast2gif → gifsicle
```

**Pipeline**:
```
Terminal.cast
  → asciicast2gif (render)
  → gifsicle (optimize)
  → Terminal demo GIF
```

**Presets**:
- `installation`: 1.5× speed, solarized
- `tutorial`: 1.0× speed, monokai
- `demo`: 1.2× speed, dracula
- `quick`: 2.0× speed, gruvbox

**Use Cases**:
- Installation instructions
- CLI tool demonstrations
- Command tutorials
- DevOps workflows
- Debugging sessions

**Command**:
```bash
# First record terminal session
asciinema rec demo.cast

# Then convert to GIF
gif-gen create technical-docs/terminal-demo \
  --recording demo.cast \
  --preset tutorial
```

---

## 🎯 Template Selection Guide

### By Output Type

| Need | Template | Tools |
|------|----------|-------|
| **GIF for social** | twitter-demo, instagram-square, linkedin-header | gifcurry, gifsicle |
| **GIF for docs** | github-readme, terminal-demo | gifcurry/asciicast2gif, gifsicle |
| **Video with AI** | talking-head, expression-transfer, hand-drawn | LivePortrait/first-order/AnimatedDrawings, ffmpeg |
| **Web code** | loading-spinner | motion/framer-motion |

### By Time to Generate

| Speed | Templates | Time Estimate |
|-------|-----------|---------------|
| **Fast** (<1 min) | Social media GIFs | 10-30 seconds |
| **Medium** (1-5 min) | Terminal demos, hand-drawn | 1-3 minutes |
| **Slow** (5-15 min) | AI portrait animation | 5-10 minutes |
| **Instant** | Web animation (code) | <1 second |

### By Complexity

| Level | Templates | Skill Required |
|-------|-----------|----------------|
| **Beginner** | All social media, terminal-demo | Basic CLI |
| **Intermediate** | hand-drawn, web animation | Some tech knowledge |
| **Advanced** | AI portrait templates | Understanding of AI models |

---

## 🔧 Quick Commands

### Social Media

```bash
# Twitter
gif-gen create social-media/twitter-demo --video demo.mp4 --var product_name="Product"

# Instagram
gif-gen create social-media/instagram-square --video demo.mp4 --preset post

# LinkedIn
gif-gen create social-media/linkedin-header --video demo.mp4 --var headline="News"

# GitHub
gif-gen create social-media/github-readme --video demo.mp4 --preset feature
```

### Portrait Animation

```bash
# Talking head
gif-gen create portrait-animation/talking-head --portrait face.jpg --driving talk.mp4

# Expression transfer
gif-gen create portrait-animation/expression-transfer --source face.jpg --expression video.mp4
```

### Other

```bash
# Character
gif-gen create character-animation/hand-drawn --drawing art.jpg --preset dance

# Terminal
gif-gen create technical-docs/terminal-demo --recording demo.cast --preset tutorial
```

---

## 📊 Template Matrix

|  | Twitter | Instagram | LinkedIn | GitHub | Talking Head | Expression | Hand-Drawn | Spinner | Terminal |
|---|---------|-----------|----------|--------|--------------|------------|------------|---------|----------|
| **GIF Output** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Video Output** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Code Output** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **GPU Required** | ❌ | ❌ | ❌ | ❌ | Yes* | ✅ | Yes* | ❌ | ❌ |
| **Text Overlay** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | N/A | ❌ |
| **AI-Powered** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |

*Recommended but can run on CPU (slower)

---

## 🎨 Customization Examples

### Change Dimensions

```bash
gif-gen create social-media/twitter-demo \
  --video demo.mp4 \
  --config "gifcurry.width=800" \
  --config "gifcurry.height=600"
```

### Adjust Quality

```bash
gif-gen create social-media/instagram-square \
  --video demo.mp4 \
  --config "gifsicle.colors=256" \
  --config "gifsicle.lossy=40"
```

### Multiple Variables

```bash
gif-gen create social-media/linkedin-header \
  --video demo.mp4 \
  --var headline="Breaking News" \
  --var theme="professional"
```

---

**Total Templates**: 9 ready-to-use configurations
**Next**: Implement orchestrator to execute these templates!

See `templates/README.md` for detailed documentation.
