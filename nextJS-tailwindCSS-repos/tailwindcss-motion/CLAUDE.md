# Tailwind CSS Motion - Inline Motion Syntax Plugin

**Official Site**: https://rombo.co/tailwind/
**Documentation**: https://docs.rombo.co/tailwind
**GitHub**: https://github.com/romboHQ/tailwindcss-motion
**Type**: Tailwind CSS Plugin
**License**: MIT
**Version**: 1.1.1
**Compatibility**: Tailwind CSS 3.0+ and insiders

---

## 🎯 What is Tailwind CSS Motion?

Tailwind CSS Motion is a **simple yet powerful animation library** with an innovative inline syntax that allows you to create animations without defining custom keyframes. Built by RomboHQ, it provides dimension-based animation utilities and ready-to-use presets.

### Core Philosophy

> "Motion, without commotion." - Create custom animations inline using utility classes, no keyframes required.

**Key Innovations**:
- **Inline Syntax**: Define animations directly in HTML using `motion-*` utilities
- **No Keyframes**: All animations created through utility combinations
- **Visual Builder**: Chrome extension with animator and code export
- **Dimension-Based**: Animate by dimension (translate, scale, opacity, rotate)
- **TypeScript Support**: Full type definitions included
- **Preset Library**: Ready-to-use animation presets

---

## ✨ Complete Feature Set

### 1. Inline Animation Syntax

**Revolutionary Approach**:
Instead of defining keyframes, specify initial/final states inline:

```html
<!-- Traditional approach (other plugins) -->
<div class="animate-slide-fade">...</div>

<!-- Motion approach (no keyframes needed) -->
<div class="motion-translate-x-in-25 motion-opacity-in-0">...</div>
```

**Core Syntax Pattern**:
```
motion-{property}-{direction}-{value}
```

- `property`: translate-x, translate-y, scale, opacity, rotate
- `direction`: in (from), out (to)
- `value`: distance/percentage/degrees

---

### 2. Translation Animations

**X-Axis Translation**:

| Class | Effect | Use Case |
|-------|--------|----------|
| `motion-translate-x-in-0` | No horizontal movement | Reference point |
| `motion-translate-x-in-25` | Slide in from 25% left | Subtle entrance |
| `motion-translate-x-in-50` | Slide in from 50% left | Medium slide |
| `motion-translate-x-in-75` | Slide in from 75% left | Large slide |
| `motion-translate-x-in-100` | Slide in from full left | Full-width slide |
| `motion-translate-x-in-[200px]` | Custom distance | Precise control |

**Y-Axis Translation**:

| Class | Effect | Use Case |
|-------|--------|----------|
| `motion-translate-y-in-0` | No vertical movement | Reference point |
| `motion-translate-y-in-25` | Slide in from 25% top | Header entrance |
| `motion-translate-y-in-50` | Slide in from 50% top | Modal entrance |
| `motion-translate-y-in-75` | Slide in from 75% top | Large vertical |
| `motion-translate-y-in-100` | Slide in from full top | Full-height slide |
| `motion-translate-y-in-[-50%]` | Slide from bottom | Bottom entrance |

**Out Directions**:
```html
<!-- Exit animations -->
<div class="motion-translate-x-out-100">Slide out right</div>
<div class="motion-translate-y-out-100">Slide out down</div>
```

---

### 3. Opacity Animations

**Opacity Control**:

| Class | Opacity | Effect |
|-------|---------|--------|
| `motion-opacity-in-0` | Start from 0 (invisible) | Fade in |
| `motion-opacity-in-25` | Start from 25% | Partial transparency |
| `motion-opacity-in-50` | Start from 50% | Half transparent |
| `motion-opacity-in-75` | Start from 75% | Mostly visible |
| `motion-opacity-in-100` | Start from 100% (visible) | No fade |

**Out Directions**:
```html
<div class="motion-opacity-out-0">Fade out</div>
<div class="motion-opacity-out-50">Fade to half</div>
```

---

### 4. Scale Animations

**Scale Control**:

| Class | Scale | Effect |
|-------|-------|--------|
| `motion-scale-in-0` | Start from 0% size | Zoom in from nothing |
| `motion-scale-in-25` | Start from 25% size | Small zoom in |
| `motion-scale-in-50` | Start from 50% size | Medium zoom in |
| `motion-scale-in-75` | Start from 75% size | Subtle zoom in |
| `motion-scale-in-90` | Start from 90% size | Minimal zoom |
| `motion-scale-in-95` | Start from 95% size | Tiny zoom |
| `motion-scale-in-100` | Start from 100% size | No scale change |
| `motion-scale-in-105` | Start from 105% size | Slightly larger |
| `motion-scale-in-110` | Start from 110% size | Bounce effect |

**Custom Values**:
```html
<div class="motion-scale-in-[0.8]">Start from 80%</div>
<div class="motion-scale-in-[1.2]">Start from 120%</div>
```

---

### 5. Rotation Animations

**Rotate Control**:

| Class | Rotation | Effect |
|-------|----------|--------|
| `motion-rotate-in-0` | 0 degrees | No rotation |
| `motion-rotate-in-45` | 45 degrees | Slight tilt |
| `motion-rotate-in-90` | 90 degrees | Quarter turn |
| `motion-rotate-in-180` | 180 degrees | Half turn |
| `motion-rotate-in-[-45]` | -45 degrees | Opposite tilt |
| `motion-rotate-in-[-90]` | -90 degrees | Counter-quarter |

**Use Cases**:
```html
<!-- Icon spin entrance -->
<div class="motion-rotate-in-180 motion-scale-in-0">Icon</div>

<!-- Card flip -->
<div class="motion-rotate-in-90 motion-opacity-in-0">Card</div>
```

---

### 6. Animation Presets

**Ready-to-Use Presets**:

| Preset | Effect | Composition |
|--------|--------|-------------|
| `motion-preset-fade` | Simple fade in | opacity-in-0 |
| `motion-preset-slide-left` | Slide from left | translate-x-in-100 |
| `motion-preset-slide-right` | Slide from right | translate-x-in-[-100] |
| `motion-preset-slide-up` | Slide from bottom | translate-y-in-[100%] |
| `motion-preset-slide-down` | Slide from top | translate-y-in-[-100%] |
| `motion-preset-zoom` | Zoom in | scale-in-0 |
| `motion-preset-blur` | Blur fade in | opacity-in-0 + blur |
| `motion-preset-shake` | Shake effect | translate-x oscillation |
| `motion-preset-bounce` | Bounce effect | scale + translate-y |
| `motion-preset-spin` | Spin entrance | rotate-in-180 |
| `motion-preset-flip` | Flip effect | rotate-in-90 + scale |

**Usage**:
```html
<!-- Simple preset -->
<div class="motion-preset-fade">Fades in</div>

<!-- Preset with timing -->
<div class="motion-preset-slide-left motion-duration-500">
  Slides in over 500ms
</div>
```

---

### 7. Timing & Duration Control

**Duration Classes**:

| Class | Duration | Use Case |
|-------|----------|----------|
| `motion-duration-100` | 100ms | Instant feedback |
| `motion-duration-150` | 150ms | Quick animations |
| `motion-duration-200` | 200ms | Fast transitions |
| `motion-duration-300` | 300ms | Standard speed |
| `motion-duration-500` | 500ms | Moderate |
| `motion-duration-700` | 700ms | Slower |
| `motion-duration-1000` | 1000ms | Long animations |

**Delay Classes**:

| Class | Delay | Use Case |
|-------|-------|----------|
| `motion-delay-0` | 0ms | No delay |
| `motion-delay-100` | 100ms | Slight stagger |
| `motion-delay-200` | 200ms | Small delay |
| `motion-delay-300` | 300ms | Medium delay |
| `motion-delay-500` | 500ms | Half-second |
| `motion-delay-700` | 700ms | Longer delay |
| `motion-delay-1000` | 1000ms | One second |

**Easing Functions** (via theme customization):
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      motionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
}
```

---

## 🎨 Chrome Extension - Visual Animator

### Rombo Chrome Extension Features

**Official Link**: https://rombo.co/extension/

**Capabilities**:
1. **Visual Animator**: Create animations visually in browser
2. **Real-time Preview**: See animations as you build them
3. **Loop Control**: Test infinite animations
4. **Preset Library**: Save and reuse custom animations
5. **Multi-Format Export**:
   - Tailwind CSS classes
   - Pure CSS code
   - Framer Motion code

**Workflow**:
```
1. Install Chrome extension
2. Open animator on any webpage
3. Design animation visually
4. Export as Tailwind classes
5. Copy-paste into project
```

**Example Export**:
```html
<!-- Created visually, exported as: -->
<div class="
  motion-translate-x-in-100
  motion-opacity-in-0
  motion-duration-700
  motion-delay-300
">
  Visual animation
</div>
```

---

## 📖 Installation & Setup

### Installation

**Install via npm/pnpm/yarn**:
```bash
npm i -D tailwindcss-motion

# Or
pnpm add -D tailwindcss-motion

# Or
yarn add -D tailwindcss-motion
```

### Configuration

**JavaScript Config** (Tailwind v3+):
```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-motion')],
}
```

**ESM Import**:
```javascript
import tailwindcssMotion from "tailwindcss-motion"

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssMotion],
}
```

**TypeScript Support**:
```typescript
import type { Config } from "tailwindcss"
import motion from "tailwindcss-motion"

const config: Config = {
  theme: {
    extend: {
      motionScale: {
        "200": "200%",
      },
      motionTimingFunction: {
        custom: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [motion],
}

export default config
```

---

## 🚀 Usage Examples

### Basic Slide & Fade

```html
<!-- Simple slide and fade from left -->
<div class="motion-translate-x-in-25 motion-opacity-in-0">
  Content slides and fades in
</div>
```

### Complex Entrance

```html
<!-- Multi-dimensional animation -->
<div class="
  motion-translate-x-in-50
  motion-translate-y-in-25
  motion-scale-in-90
  motion-opacity-in-0
  motion-duration-700
  motion-delay-200
">
  Complex entrance
</div>
```

### Using Presets

```html
<!-- Preset animations -->
<div class="motion-preset-fade">Fades in</div>
<div class="motion-preset-slide-left">Slides from left</div>
<div class="motion-preset-zoom">Zooms in</div>
```

### Staggered List

```html
<ul>
  <li class="motion-preset-slide-left motion-delay-100">Item 1</li>
  <li class="motion-preset-slide-left motion-delay-200">Item 2</li>
  <li class="motion-preset-slide-left motion-delay-300">Item 3</li>
  <li class="motion-preset-slide-left motion-delay-500">Item 4</li>
</ul>
```

---

## 🎯 Advanced Use Cases

### 1. Hero Section Animation

```html
<section>
  <!-- Heading -->
  <h1 class="
    motion-translate-y-in-50
    motion-opacity-in-0
    motion-duration-700
  ">
    Welcome
  </h1>

  <!-- Subtitle -->
  <p class="
    motion-translate-y-in-50
    motion-opacity-in-0
    motion-duration-700
    motion-delay-300
  ">
    Subtitle appears after heading
  </p>

  <!-- CTA Button -->
  <button class="
    motion-scale-in-0
    motion-duration-500
    motion-delay-700
  ">
    Get Started
  </button>
</section>
```

---

### 2. Card Grid Entrance

```html
<div class="grid grid-cols-3 gap-4">
  <div class="motion-preset-zoom motion-delay-100">Card 1</div>
  <div class="motion-preset-zoom motion-delay-200">Card 2</div>
  <div class="motion-preset-zoom motion-delay-300">Card 3</div>
  <div class="motion-preset-zoom motion-delay-500">Card 4</div>
  <div class="motion-preset-zoom motion-delay-600">Card 5</div>
  <div class="motion-preset-zoom motion-delay-700">Card 6</div>
</div>
```

---

### 3. Modal Dialog

```html
<!-- Backdrop -->
<div class="motion-opacity-in-0 motion-duration-300">
  <div class="fixed inset-0 bg-black/50"></div>
</div>

<!-- Modal Content -->
<div class="
  motion-scale-in-90
  motion-opacity-in-0
  motion-duration-300
  motion-delay-100
">
  <div class="bg-white p-6 rounded-lg">
    Modal Content
  </div>
</div>
```

---

### 4. Toast Notification

```html
<div class="
  motion-translate-x-in-100
  motion-opacity-in-0
  motion-duration-300
">
  <div class="bg-green-500 text-white p-4 rounded">
    Success notification!
  </div>
</div>
```

---

### 5. Image Gallery

```html
<div class="grid grid-cols-4 gap-2">
  <img class="motion-preset-zoom motion-delay-100" src="1.jpg" />
  <img class="motion-preset-zoom motion-delay-150" src="2.jpg" />
  <img class="motion-preset-zoom motion-delay-200" src="3.jpg" />
  <img class="motion-preset-zoom motion-delay-250" src="4.jpg" />
</div>
```

---

## 🎨 Theme Customization

### Extend Motion Scale Values

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      motionScale: {
        "75": "75%",
        "85": "85%",
        "95": "95%",
        "105": "105%",
        "110": "110%",
        "125": "125%",
        "150": "150%",
        "200": "200%",
      },
    },
  },
}
```

### Custom Timing Functions

```typescript
export default {
  theme: {
    extend: {
      motionTimingFunction: {
        'ease-in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
}
```

### Custom Duration Values

```typescript
export default {
  theme: {
    extend: {
      motionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
        '2000': '2000ms',
      },
    },
  },
}
```

---

## 📊 Examples from Documentation

### Landing Page
**Live Example**: https://play.tailwindcss.com/uAuVF8F1vC

Features multi-dimensional animations with staggered timings for hero section, feature cards, and call-to-action buttons.

### Chat Dialog
**Live Example**: https://play.tailwindcss.com/gjGqEKswjQ

Demonstrates message bubbles with slide-in animations and typing indicators.

### Low Battery Dynamic Island
**Live Example**: https://play.tailwindcss.com/tvYFbHtNNQ

iOS-style dynamic island with smooth scale and position transitions.

### Apple Color Swatches
**Live Example**: https://play.tailwindcss.com/cvQ3Nk3v8j

Color picker with zoom and fade animations on selection.

### Rombo Loop
**Live Example**: https://play.tailwindcss.com/MLdegkb9Wq

Infinite loop animation with smooth transitions.

### Emoji Animations
**Live Example**: https://play.tailwindcss.com/86s55I4wmC

Playful emoji animations with bounce and scale effects.

---

## 🔧 Advanced Techniques

### Combining Multiple Dimensions

```html
<!-- 3D-style entrance -->
<div class="
  motion-translate-x-in-50
  motion-translate-y-in-[-25]
  motion-rotate-in-15
  motion-scale-in-80
  motion-opacity-in-0
">
  3D entrance effect
</div>
```

### Exit Animations

```html
<!-- Exit animations (use -out instead of -in) -->
<div class="
  motion-translate-x-out-100
  motion-opacity-out-0
  motion-duration-300
">
  Exits to the right
</div>
```

### Hover Animations

```html
<!-- Combined with hover states -->
<div class="
  motion-preset-fade
  hover:motion-scale-in-105
  hover:motion-duration-200
  transition-transform
">
  Hover me
</div>
```

---

## 🆚 Comparison with Alternatives

| Feature | tailwindcss-motion | tailwindcss-animated | tailwindcss-animate |
|---------|-------------------|---------------------|---------------------|
| **Syntax** | Inline (no keyframes) | Utility classes | Utility classes |
| **Presets** | ✅ Yes | ✅ Yes | ❌ No |
| **Chrome Extension** | ✅ Visual builder | ❌ No | ❌ No |
| **TypeScript** | ✅ Full support | ❌ No | ❌ No |
| **Inline Creation** | ✅ Core feature | ❌ No | ❌ No |
| **Learning Curve** | Low | Low | Medium |
| **Flexibility** | Very High | High | Medium |
| **Bundle Size** | ~3KB | ~4KB | ~2KB |
| **Best For** | Custom inline animations | Complete control | Enter/exit only |

---

## 🎓 Best Practices

### DO

- ✅ Use presets for common animations
- ✅ Combine utilities for custom effects
- ✅ Use the Chrome extension for visual design
- ✅ Respect `prefers-reduced-motion`
- ✅ Test animations on actual devices
- ✅ Use appropriate durations (<500ms for UI feedback)
- ✅ Stagger list animations for polish

### DON'T

- ❌ Overuse animations (less is more)
- ❌ Use very long durations (>1s for UI elements)
- ❌ Animate many elements simultaneously
- ❌ Ignore mobile performance
- ❌ Forget accessibility considerations
- ❌ Use exit animations without testing

---

## 📚 Additional Resources

### Official Links
- **Website**: https://rombo.co/tailwind/
- **Documentation**: https://docs.rombo.co/tailwind
- **GitHub**: https://github.com/romboHQ/tailwindcss-motion
- **Chrome Extension**: https://rombo.co/extension/
- **Animator Builder**: https://rombo.co/tailwind/#animator

### Community
- **UnoCSS Port**: https://github.com/whatnickcodes/unocss-preset-tailwindcss-motion
- **Blog Post**: "Bringing Motion to Tailwind CSS" by Kvin.me

### About Rombo
Rombo is building tools for designers and developers to animate natively inside common workflows like Tailwind, Figma, Webflow, and Shopify.

---

## 💡 Tips & Tricks

### Stagger Utility Helper

```javascript
// Generate stagger delays
const generateStagger = (count, baseDelay = 100) => {
  return Array.from({ length: count }, (_, i) => i * baseDelay)
}

// Usage in React
{items.map((item, i) => (
  <div
    key={i}
    className={`motion-preset-fade motion-delay-${i * 100}`}
  >
    {item}
  </div>
))}
```

### Scroll-Triggered Animations

```javascript
// Use Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('motion-preset-fade')
    }
  })
})

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el)
})
```

### Reduced Motion Support

```html
<div class="
  motion-preset-slide-left
  motion-reduce:motion-preset-fade
">
  Respects user preferences
</div>
```

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for tailwindcss-motion plugin
**Maintainer**: RomboHQ
**License**: MIT - Free for commercial use
