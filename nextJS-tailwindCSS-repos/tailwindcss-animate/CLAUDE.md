# Tailwind CSS Animate - Enter/Exit Animation Plugin

**GitHub**: https://github.com/jamiebuilds/tailwindcss-animate
**Type**: Tailwind CSS Plugin
**Author**: Jamie Kyle (@jamiebuilds)
**License**: MIT
**Version**: 1.0.7
**Compatibility**: Tailwind CSS 3.0+ and insiders

---

## 🎯 What is Tailwind CSS Animate?

Tailwind CSS Animate is a **specialized animation plugin** focused on component enter and exit animations. Created by Jamie Kyle (Babel core team member), it provides a composable system for creating beautiful entrance and exit effects through utility classes.

### Core Philosophy

> "Beautiful animations through composition" - Build complex animations by combining simple utility classes for fade, spin, zoom, and slide effects.

**Key Features**:
- **Enter/Exit Focus**: Specialized for component state transitions
- **Composable System**: Combine utilities for custom effects
- **State-Based**: Designed for modal, dropdown, tooltip, toast animations
- **Minimal API**: Small learning curve with powerful results
- **Direction Control**: Precise control over animation directions
- **Property Control**: Duration, delay, timing function utilities

---

## ✨ Complete Feature Set

### 1. Enter Animations (`animate-in`)

**Base Class**: `animate-in`
Triggers entrance animation. Must be combined with specific animation utilities.

**Fade Animations**:

| Class | Effect | Starting Opacity | Use Case |
|-------|--------|------------------|----------|
| `fade-in` | Fade from transparent | 0% | Default fade |
| `fade-in-0` | No fade | 100% (visible) | Reference point |
| `fade-in-25` | Fade from 25% | 25% | Subtle fade |
| `fade-in-50` | Fade from half | 50% | Medium fade |
| `fade-in-75` | Fade from 75% | 75% | Minimal fade |
| `fade-in-100` | Fade from visible | 100% | No fade |

**Spin Animations** (Rotation):

| Class | Starting Rotation | Effect |
|-------|-------------------|--------|
| `spin-in` | 30 degrees | Subtle rotate entrance |
| `spin-in-1` | 1 degree | Minimal rotation |
| `spin-in-6` | 6 degrees | Small rotation |
| `spin-in-12` | 12 degrees | Noticeable rotation |
| `spin-in-45` | 45 degrees | Quarter rotation |
| `spin-in-90` | 90 degrees | Full quarter turn |
| `spin-in-180` | 180 degrees | Half rotation |

**Zoom Animations** (Scale):

| Class | Starting Scale | Effect | Use Case |
|-------|---------------|--------|----------|
| `zoom-in` | 95% | Subtle zoom | Default modal |
| `zoom-in-0` | 0% | Full zoom from nothing | Dramatic entrance |
| `zoom-in-50` | 50% | Half size zoom | Medium zoom |
| `zoom-in-75` | 75% | Three-quarter zoom | Gentle zoom |
| `zoom-in-90` | 90% | Minimal zoom | Subtle effect |
| `zoom-in-95` | 95% | Tiny zoom | Modal standard |

**Slide Animations** (Translate):

| Class | Direction | Distance | Use Case |
|-------|-----------|----------|----------|
| `slide-in-from-top` | From top | 100% | Header entrance |
| `slide-in-from-top-{px}` | From top | Custom pixels | Precise control |
| `slide-in-from-bottom` | From bottom | 100% | Footer/toast |
| `slide-in-from-bottom-{px}` | From bottom | Custom pixels | Mobile nav |
| `slide-in-from-left` | From left | 100% | Drawer/sidebar |
| `slide-in-from-left-{px}` | From left | Custom pixels | Slide panel |
| `slide-in-from-right` | From right | 100% | Off-canvas |
| `slide-in-from-right-{px}` | From right | Custom pixels | Side menu |

**Slide Distance Values**:
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)
- `24` = 6rem (96px)
- `32` = 8rem (128px)
- `48` = 12rem (192px)
- `96` = 24rem (384px)

---

### 2. Exit Animations (`animate-out`)

**Base Class**: `animate-out`
Triggers exit animation. Must be combined with specific animation utilities.

**Fade Out Animations**:

| Class | Effect | Ending Opacity |
|-------|--------|----------------|
| `fade-out` | Fade to transparent | 0% |
| `fade-out-0` | No fade | 100% |
| `fade-out-25` | Fade to 25% | 25% |
| `fade-out-50` | Fade to half | 50% |
| `fade-out-75` | Fade to 75% | 75% |

**Spin Out Animations**:

| Class | Ending Rotation |
|-------|-----------------|
| `spin-out` | 30 degrees |
| `spin-out-1` | 1 degree |
| `spin-out-6` | 6 degrees |
| `spin-out-45` | 45 degrees |
| `spin-out-90` | 90 degrees |
| `spin-out-180` | 180 degrees |

**Zoom Out Animations**:

| Class | Ending Scale | Use Case |
|-------|--------------|----------|
| `zoom-out` | 95% | Subtle shrink |
| `zoom-out-0` | 0% | Disappear completely |
| `zoom-out-50` | 50% | Half size |
| `zoom-out-75` | 75% | Gentle shrink |
| `zoom-out-90` | 90% | Minimal shrink |
| `zoom-out-95` | 95% | Tiny shrink |

**Slide Out Animations**:

| Class | Direction | Use Case |
|-------|-----------|----------|
| `slide-out-to-top` | To top | Dismiss upward |
| `slide-out-to-top-{px}` | To top | Custom distance |
| `slide-out-to-bottom` | To bottom | Dismiss downward |
| `slide-out-to-bottom-{px}` | To bottom | Custom distance |
| `slide-out-to-left` | To left | Swipe left |
| `slide-out-to-left-{px}` | To left | Custom distance |
| `slide-out-to-right` | To right | Swipe right |
| `slide-out-to-right-{px}` | To right | Custom distance |

---

### 3. Animation Control Properties

**Duration** (`duration-{amount}`):

| Class | Duration | Use Case |
|-------|----------|----------|
| `duration-75` | 75ms | Instant |
| `duration-100` | 100ms | Very fast |
| `duration-150` | 150ms | Fast |
| `duration-200` | 200ms | Quick |
| `duration-300` | 300ms | Standard |
| `duration-500` | 500ms | Moderate |
| `duration-700` | 700ms | Slow |
| `duration-1000` | 1000ms | Very slow |

**Delay** (`delay-{amount}`):

| Class | Delay | Use Case |
|-------|-------|----------|
| `delay-0` | 0ms | No delay |
| `delay-75` | 75ms | Tiny delay |
| `delay-100` | 100ms | Small delay |
| `delay-150` | 150ms | Short delay |
| `delay-200` | 200ms | Quarter-second |
| `delay-300` | 300ms | Standard delay |
| `delay-500` | 500ms | Half-second |
| `delay-700` | 700ms | Long delay |
| `delay-1000` | 1000ms | One second |

**Timing Function** (`ease-{function}`):

| Class | Function | Effect |
|-------|----------|--------|
| `ease-linear` | linear | Constant speed |
| `ease-in` | ease-in | Slow start |
| `ease-out` | ease-out | Slow end |
| `ease-in-out` | ease-in-out | Slow start & end |

**Direction** (`direction-{keyword}`):

| Class | Direction | Effect |
|-------|-----------|--------|
| `direction-normal` | normal | Play forwards |
| `direction-reverse` | reverse | Play backwards |
| `direction-alternate` | alternate | Alternate direction |
| `direction-alternate-reverse` | alternate-reverse | Alternate reverse |

**Iteration Count** (`repeat-{amount}`):

| Class | Iterations | Use Case |
|-------|------------|----------|
| `repeat-0` | 0 | No animation |
| `repeat-1` | 1 | Play once |
| `repeat-infinite` | infinite | Loop forever |

**Fill Mode** (`fill-mode-{keyword}`):

| Class | Fill Mode | Effect |
|-------|-----------|--------|
| `fill-mode-none` | none | No fill |
| `fill-mode-forwards` | forwards | Retain final state |
| `fill-mode-backwards` | backwards | Apply first keyframe |
| `fill-mode-both` | both | Both forwards & backwards |

**Play State** (`running` / `paused`):

| Class | State | Use Case |
|-------|-------|----------|
| `running` | running | Animation plays |
| `paused` | paused | Animation pauses |

---

## 📖 Installation & Setup

### Installation

```bash
npm install -D tailwindcss-animate
```

### Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    // Your theme customizations
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
```

---

## 🚀 Usage Examples

### Basic Entrance Animation

```html
<!-- Simple fade in -->
<div class="animate-in fade-in">
  Fades in
</div>

<!-- Fade with zoom -->
<div class="animate-in fade-in zoom-in">
  Fades and zooms in
</div>

<!-- Slide from top -->
<div class="animate-in slide-in-from-top">
  Slides down from top
</div>
```

### Complex Entrance

```html
<!-- Multiple effects combined -->
<div class="
  animate-in
  fade-in
  zoom-in-95
  slide-in-from-top-4
  duration-500
">
  Smooth multi-dimensional entrance
</div>
```

### Exit Animation

```html
<!-- Fade out -->
<div class="animate-out fade-out">
  Fades out
</div>

<!-- Slide out to right -->
<div class="animate-out slide-out-to-right fade-out">
  Slides right and fades
</div>

<!-- Complete exit -->
<div class="
  animate-out
  fade-out
  zoom-out-95
  slide-out-to-bottom-4
  duration-300
">
  Complex exit animation
</div>
```

---

## 🎯 Common Use Cases

### 1. Modal Dialog

**Modal Backdrop**:
```html
<div class="
  fixed inset-0 bg-black/50
  animate-in fade-in duration-200
">
</div>
```

**Modal Content**:
```html
<div class="
  animate-in
  fade-in
  zoom-in-95
  duration-300
">
  <div class="bg-white p-6 rounded-lg">
    Modal Content
  </div>
</div>
```

**Modal Exit**:
```html
<div class="
  animate-out
  fade-out
  zoom-out-95
  duration-200
">
  Closing modal
</div>
```

---

### 2. Dropdown Menu

**Dropdown Entrance**:
```html
<div class="
  animate-in
  fade-in
  slide-in-from-top-2
  duration-200
">
  <div class="bg-white shadow-lg rounded">
    <!-- Menu items -->
  </div>
</div>
```

**Dropdown Exit**:
```html
<div class="
  animate-out
  fade-out
  slide-out-to-top-2
  duration-150
">
  Menu closing
</div>
```

---

### 3. Toast Notification

**Toast Entrance** (slide from right):
```html
<div class="
  animate-in
  slide-in-from-right
  fade-in
  duration-300
">
  <div class="bg-green-500 text-white p-4 rounded">
    Success!
  </div>
</div>
```

**Toast Exit**:
```html
<div class="
  animate-out
  slide-out-to-right
  fade-out
  duration-200
">
  Toast dismissing
</div>
```

---

### 4. Tooltip

```html
<div class="
  animate-in
  fade-in
  zoom-in-95
  slide-in-from-bottom-2
  duration-150
">
  <div class="bg-gray-800 text-white text-sm px-2 py-1 rounded">
    Tooltip text
  </div>
</div>
```

---

### 5. Page Transition

```html
<!-- Page entering -->
<div class="
  animate-in
  fade-in
  slide-in-from-right-4
  duration-500
">
  New page content
</div>

<!-- Page exiting -->
<div class="
  animate-out
  fade-out
  slide-out-to-left-4
  duration-500
">
  Old page content
</div>
```

---

## 🎨 Advanced Techniques

### Staggered List Items

```html
<ul>
  <li class="animate-in fade-in slide-in-from-left delay-100">Item 1</li>
  <li class="animate-in fade-in slide-in-from-left delay-200">Item 2</li>
  <li class="animate-in fade-in slide-in-from-left delay-300">Item 3</li>
  <li class="animate-in fade-in slide-in-from-left delay-500">Item 4</li>
</ul>
```

### Directional Slide Combinations

```html
<!-- Diagonal slide (top-left) -->
<div class="
  animate-in
  slide-in-from-top-4
  slide-in-from-left-4
  fade-in
">
  Diagonal entrance
</div>

<!-- Diagonal exit (bottom-right) -->
<div class="
  animate-out
  slide-out-to-bottom-4
  slide-out-to-right-4
  fade-out
">
  Diagonal exit
</div>
```

### Interactive Animations

```html
<!-- Hover trigger -->
<button class="hover:animate-in hover:fade-in hover:zoom-in duration-200">
  Hover me
</button>

<!-- Focus trigger -->
<input class="focus:animate-in focus:fade-in" />

<!-- With JavaScript (React example) -->
<div className={isOpen ? 'animate-in fade-in' : 'animate-out fade-out'}>
  Conditional animation
</div>
```

---

## ♿ Accessibility Features

### Reduced Motion Support

```html
<div class="
  motion-safe:animate-in
  motion-safe:fade-in
  motion-reduce:opacity-100
">
  Respects user preferences
</div>

<!-- Complete example -->
<div class="
  motion-safe:animate-in
  motion-safe:slide-in-from-right
  motion-safe:fade-in
  motion-safe:duration-300
  motion-reduce:animate-none
">
  Accessible animation
</div>
```

### Best Practices

**DO**:
- ✅ Always include `motion-reduce:animate-none` for accessibility
- ✅ Use appropriate durations (<300ms for UI feedback)
- ✅ Test with reduced motion preferences
- ✅ Provide instant fallbacks for critical interactions
- ✅ Use semantic HTML with animations

**DON'T**:
- ❌ Force animations on users with motion sensitivity
- ❌ Use very long durations (>500ms) for UI elements
- ❌ Animate essential content without fallbacks
- ❌ Ignore keyboard focus during animations

---

## 🔧 Framework Integration

### React Example

```tsx
import { useState } from 'react'

function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div className={`
        fixed inset-0 bg-black/50
        ${isOpen ? 'animate-in fade-in' : 'animate-out fade-out'}
        duration-200
      `} onClick={onClose} />

      {/* Modal */}
      <div className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        ${isOpen
          ? 'animate-in fade-in zoom-in-95'
          : 'animate-out fade-out zoom-out-95'
        }
        duration-300
      `}>
        <div className="bg-white p-6 rounded-lg">
          {children}
        </div>
      </div>
    </>
  )
}
```

### Vue Example

```vue
<template>
  <div
    :class="[
      isOpen ? 'animate-in fade-in' : 'animate-out fade-out',
      'duration-300'
    ]"
  >
    Modal content
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>
```

### Alpine.js Example

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>

  <div
    x-show="open"
    x-transition:enter="animate-in fade-in duration-300"
    x-transition:leave="animate-out fade-out duration-200"
  >
    Content
  </div>
</div>
```

---

## 🆚 Comparison with Alternatives

| Feature | tailwindcss-animate | tailwindcss-animated | tailwindcss-motion |
|---------|---------------------|---------------------|-------------------|
| **Focus** | Enter/exit only | Full animation control | Inline motion syntax |
| **Preset Animations** | None (compose) | 30+ presets | Presets available |
| **Composability** | ✅ Core feature | Limited | ✅ High |
| **Enter/Exit Specific** | ✅ Optimized | ✅ Supported | ✅ Supported |
| **Learning Curve** | Low | Low | Low |
| **Bundle Size** | ~2KB | ~4KB | ~3KB |
| **Best For** | Modal/dropdown/tooltip | General animations | Custom inline effects |

---

## 📊 Performance Considerations

### Best Practices

- **Hardware Acceleration**: Animations use transform (GPU accelerated)
- **Minimal Repaints**: Only animates transform and opacity
- **Small Bundle**: ~2KB minified and gzipped
- **CSS-Only**: No JavaScript overhead
- **Optimized Keyframes**: Predefined for efficiency

### Performance Tips

```html
<!-- ✅ Good: GPU-accelerated properties -->
<div class="animate-in fade-in zoom-in slide-in-from-left">
  Fast animation
</div>

<!-- ❌ Avoid: Non-GPU properties (use transforms instead) -->
<div style="animation: slideWidth 300ms">
  <!-- Avoid animating width, height, top, left directly -->
</div>

<!-- ✅ Use will-change for complex animations -->
<div class="animate-in fade-in will-change-transform">
  Optimized animation
</div>
```

---

## 🎓 Quick Reference

### Entrance Pattern

```html
<div class="
  animate-in
  [fade/spin/zoom]-in[-variant]
  [slide-in-from-{direction}[-distance]]
  duration-{ms}
  delay-{ms}
  ease-{function}
">
  Content
</div>
```

### Exit Pattern

```html
<div class="
  animate-out
  [fade/spin/zoom]-out[-variant]
  [slide-out-to-{direction}[-distance]]
  duration-{ms}
  delay-{ms}
  ease-{function}
">
  Content
</div>
```

### Complete Example

```html
<div class="
  animate-in
  fade-in
  zoom-in-95
  slide-in-from-top-4
  duration-300
  delay-100
  ease-out
  motion-reduce:animate-none
">
  Fully configured entrance
</div>
```

---

## 📚 Additional Resources

### Official Resources
- **GitHub**: https://github.com/jamiebuilds/tailwindcss-animate
- **Documentation**: Comprehensive README with examples
- **Issues**: Active issue tracker for bugs and features
- **Author**: Jamie Kyle (@jamiebuilds) - Babel core team

### Community
- **Used By**: Many popular UI libraries including shadcn/ui
- **Discussions**: GitHub discussions for questions
- **Examples**: Community-contributed examples

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for tailwindcss-animate plugin
**Maintainer**: Jamie Kyle
**License**: MIT - Free for commercial use
