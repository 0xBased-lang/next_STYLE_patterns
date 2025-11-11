# Tailwind CSS Animated - Extended Animation Utilities

**Official Site**: https://tailwindcss-animated.com
**GitHub**: https://github.com/new-data-services/tailwindcss-animated
**Type**: Tailwind CSS Plugin
**License**: MIT
**Compatibility**: Tailwind CSS 3.1+ and 4.0+

---

## 🎯 What is Tailwind CSS Animated?

Tailwind CSS Animated is a **comprehensive animation utility plugin** that extends Tailwind CSS with powerful animation controls and ready-to-use CSS animations. It eliminates the need for custom keyframes by providing utility classes for every animation property.

### Core Philosophy

> "Extended animation utilities for Tailwind CSS" - Complete control over animation timing, duration, delays, and behavior through utility classes.

**Key Benefits**:
- **No Custom CSS**: All animations through utility classes
- **Tiny Bundle**: <5KB additional CSS
- **Zero JavaScript**: Pure CSS animations for performance
- **Fully Compatible**: Works with Tailwind v3.1+ and v4.0+
- **Arbitrary Values**: Support for custom values
- **Responsive**: Works with all Tailwind variants and breakpoints

---

## ✨ Complete Feature Set

### 1. Ready-to-Use Animations

**Pre-built Keyframe Animations**:

| Animation Class | Effect | Use Case |
|----------------|--------|----------|
| `animate-fade-in` | Fade in from transparent | Element entrance |
| `animate-fade-out` | Fade out to transparent | Element exit |
| `animate-fade-in-down` | Fade in while sliding down | Header/navbar entrance |
| `animate-fade-in-up` | Fade in while sliding up | Footer/CTA entrance |
| `animate-fade-in-left` | Fade in while sliding from left | Side panel entrance |
| `animate-fade-in-right` | Fade in while sliding from right | Side menu entrance |
| `animate-fade-out-down` | Fade out while sliding down | Dropdown close |
| `animate-fade-out-up` | Fade out while sliding up | Toast dismiss |
| `animate-fade-out-left` | Fade out while sliding left | Panel close |
| `animate-fade-out-right` | Fade out while sliding right | Sidebar close |
| `animate-slide-in-down` | Slide in from top | Alert/notification |
| `animate-slide-in-up` | Slide in from bottom | Mobile nav |
| `animate-slide-in-left` | Slide in from left | Drawer open |
| `animate-slide-in-right` | Slide in from right | Off-canvas menu |
| `animate-slide-out-down` | Slide out downward | Collapse panel |
| `animate-slide-out-up` | Slide out upward | Hide modal |
| `animate-slide-out-left` | Slide out to left | Swipe dismiss |
| `animate-slide-out-right` | Slide out to right | Card removal |
| `animate-zoom-in` | Scale up from small | Image expand |
| `animate-zoom-out` | Scale down to small | Image minimize |
| `animate-flip` | 3D flip effect | Card flip |
| `animate-flip-down` | Flip downward | Reveal content |
| `animate-flip-up` | Flip upward | Hide content |
| `animate-wiggle` | Subtle shake | Error indicator |
| `animate-shake` | Strong shake | Invalid input |
| `animate-bounce` | Bounce effect | Call to action |
| `animate-jump` | Jump up and down | Notification |
| `animate-jump-in` | Jump in from scale 0 | Icon appearance |
| `animate-jump-out` | Jump out to scale 0 | Icon disappearance |
| `animate-rotate-90` | Rotate 90 degrees | Icon state change |
| `animate-rotate-180` | Rotate 180 degrees | Flip indicator |
| `animate-blurred-fade-in` | Fade in with blur | Hero section |

**Extends Tailwind's Default**:
- `animate-spin` (enhanced)
- `animate-ping` (enhanced)
- `animate-pulse` (enhanced)
- `animate-bounce` (enhanced)

---

### 2. Animation Duration

**Utility Classes**:

| Class | Duration | Use Case |
|-------|----------|----------|
| `animate-duration-75` | 75ms | Instant feedback |
| `animate-duration-100` | 100ms | Quick transitions |
| `animate-duration-150` | 150ms | Fast animations |
| `animate-duration-200` | 200ms | Snappy effects |
| `animate-duration-300` | 300ms | Standard animations |
| `animate-duration-500` | 500ms | Moderate speed |
| `animate-duration-700` | 700ms | Slower transitions |
| `animate-duration-1000` | 1000ms (1s) | Long animations |

**Arbitrary Values**:
```html
<div class="animate-duration-[250ms]">Custom duration</div>
<div class="animate-duration-[2s]">2 second animation</div>
```

**Tailwind v4 Shorthand** (bare values):
```html
<div class="animate-duration-1234">1234ms animation</div>
```

**Custom Properties** (Tailwind v4):
```html
<div class="animate-duration-(--my-duration)">Uses CSS variable</div>
```

**Global Defaults**:
```css
:root {
  --default-animation-duration: 500ms;
}
```

---

### 3. Animation Delay

**Utility Classes**:

| Class | Delay | Use Case |
|-------|-------|----------|
| `animate-delay-none` | 0ms | No delay |
| `animate-delay-75` | 75ms | Slight stagger |
| `animate-delay-100` | 100ms | Small delay |
| `animate-delay-150` | 150ms | Short delay |
| `animate-delay-200` | 200ms | Quarter-second delay |
| `animate-delay-300` | 300ms | Standard delay |
| `animate-delay-500` | 500ms | Half-second delay |
| `animate-delay-700` | 700ms | Longer delay |
| `animate-delay-1000` | 1000ms (1s) | One-second delay |

**Arbitrary Values**:
```html
<div class="animate-delay-[125ms]">Custom delay</div>
<div class="animate-delay-[1.5s]">1.5 second delay</div>
```

**Tailwind v4 Shorthand**:
```html
<div class="animate-delay-375">375ms delay</div>
<div class="animate-delay-(--custom-delay)">CSS variable delay</div>
```

**Global Defaults**:
```css
:root {
  --default-animation-delay: 0s;
}
```

---

### 4. Animation Direction

**Utility Classes**:

| Class | Direction | Behavior |
|-------|-----------|----------|
| `animate-normal` | normal | Play forwards (default) |
| `animate-reverse` | reverse | Play backwards |
| `animate-alternate` | alternate | Alternate forward/backward |
| `animate-alternate-reverse` | alternate-reverse | Alternate backward/forward |

**Use Cases**:
```html
<!-- Bounce back and forth -->
<div class="animate-bounce animate-alternate">Bouncing</div>

<!-- Play animation in reverse -->
<div class="animate-fade-in animate-reverse">Reverse fade</div>

<!-- Alternate direction each cycle -->
<div class="animate-pulse animate-alternate-reverse">Pulsing</div>
```

---

### 5. Animation Iteration Count

**Utility Classes**:

| Class | Iterations | Use Case |
|-------|------------|----------|
| `animate-infinite` | infinite | Continuous animation |
| `animate-once` | 1 | Play once |
| `animate-twice` | 2 | Play twice |
| `animate-thrice` | 3 | Play three times |

**Arbitrary Values**:
```html
<div class="animate-iteration-[5]">Play 5 times</div>
<div class="animate-iteration-[10]">Play 10 times</div>
```

**Tailwind v4 Shorthand**:
```html
<div class="animate-iteration-7">Play 7 times</div>
<div class="animate-iteration-(--custom-count)">CSS variable count</div>
```

**Use Cases**:
```html
<!-- Welcome animation that plays once -->
<div class="animate-bounce animate-once animate-duration-1000">Welcome!</div>

<!-- Loading spinner that loops -->
<div class="animate-spin animate-infinite">Loading...</div>

<!-- Attention grabber that repeats 3 times -->
<div class="animate-wiggle animate-thrice">Look here!</div>
```

---

### 6. Animation Timing Function (Easing)

**Utility Classes**:

| Class | Timing Function | Curve | Use Case |
|-------|----------------|-------|----------|
| `animate-ease` | ease | Standard | General animations |
| `animate-ease-linear` | linear | Constant speed | Infinite loops |
| `animate-ease-in` | cubic-bezier(0.4,0,1,1) | Slow start | Entrance |
| `animate-ease-out` | cubic-bezier(0,0,0.2,1) | Slow end | Exit |
| `animate-ease-in-out` | cubic-bezier(0.4,0,0.2,1) | Both slow | Natural motion |

**Arbitrary Values**:
```html
<div class="animate-ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
  Custom easing (back ease)
</div>
```

**Tailwind v4 Custom Properties**:
```html
<div class="animate-ease-(--custom-easing)">CSS variable easing</div>
```

**Global Defaults**:
```css
:root {
  --default-animation-timing-function: ease;
}
```

---

### 7. Animation Fill Mode

**Utility Classes**:

| Class | Fill Mode | Behavior |
|-------|-----------|----------|
| `animate-fill-none` | normal | No fill (default) |
| `animate-fill-forwards` | forwards | Retain final state |
| `animate-fill-backwards` | backwards | Apply first keyframe before start |
| `animate-fill-both` | both | Apply both forwards and backwards |

**Use Cases**:
```html
<!-- Keep final state after animation -->
<div class="animate-fade-in animate-fill-forwards">Stays visible</div>

<!-- Apply first keyframe during delay -->
<div class="animate-slide-in-up animate-delay-500 animate-fill-backwards">
  Starts from initial state
</div>

<!-- Combine both behaviors -->
<div class="animate-zoom-in animate-delay-300 animate-fill-both">
  Complete control
</div>
```

---

### 8. Animation Play State

**Utility Classes**:

| Class | Play State | Behavior |
|-------|------------|----------|
| `animate-run` | running | Animation plays |
| `animate-play` | running | Animation plays (alias) |
| `animate-stop` | paused | Animation pauses |
| `animate-pause` | paused | Animation pauses (alias) |

**Use Cases**:
```html
<!-- Pause on hover -->
<div class="animate-spin animate-infinite hover:animate-pause">
  Pauses when hovering
</div>

<!-- Play on hover -->
<div class="animate-bounce animate-pause hover:animate-play">
  Plays when hovering
</div>

<!-- Interactive control -->
<div class="animate-pulse" :class="isPaused ? 'animate-pause' : 'animate-play'">
  Controlled animation
</div>
```

---

### 9. Animation Composition

**Utility Classes** (CSS Animation Composition - Modern browsers):

| Class | Composition | Behavior |
|-------|-------------|----------|
| `animate-replace` | replace | Replace existing animations |
| `animate-add` | add | Add to existing animations |
| `animate-accumulate` | accumulate | Accumulate values |

**Use Cases**:
```html
<!-- Combine multiple animations additively -->
<div class="animate-bounce animate-pulse animate-add">
  Both animations combine
</div>

<!-- Replace parent animation -->
<div class="animate-composition-replace">
  Replaces inherited animation
</div>
```

**Browser Support**: Modern browsers (Chrome 84+, Firefox 75+, Safari 16+)

---

## 📖 Installation & Setup

### Installation

**For Tailwind CSS v4.x** (CSS-first):
```bash
npm install tailwindcss-animated
```

```css
/* app.css */
@import "tailwindcss";
@import "tailwindcss-animated";
```

**For Tailwind CSS v3.x** (JavaScript config):
```bash
npm install tailwindcss-animated
```

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-animated')
  ],
}
```

---

## 🚀 Usage Examples

### Basic Animation

```html
<button class="animate-wiggle">
  Hej, look at me!
</button>
```

### Animation with Delay

```html
<button class="animate-jump-in animate-delay-300 animate-once">
  Wait a bit, then jump right in.
</button>
```

### Complex Animation Sequence

```html
<div class="
  animate-fade-in-up
  animate-duration-700
  animate-delay-200
  animate-ease-out
  animate-fill-forwards
  animate-once
">
  Coordinated entrance
</div>
```

### Staggered List Animation

```html
<ul>
  <li class="animate-fade-in-left animate-delay-100">Item 1</li>
  <li class="animate-fade-in-left animate-delay-200">Item 2</li>
  <li class="animate-fade-in-left animate-delay-300">Item 3</li>
  <li class="animate-fade-in-left animate-delay-500">Item 4</li>
</ul>
```

### Interactive Animations

```html
<!-- Hover animations -->
<button class="hover:animate-bounce">Hover me</button>

<!-- Focus animations -->
<input class="focus:animate-pulse" />

<!-- Conditional animations -->
<div class="lg:animate-slide-in-left motion-reduce:animate-none">
  Responsive and accessible
</div>
```

---

## 🎨 Advanced Use Cases

### 1. Loading States

```html
<!-- Spinner -->
<div class="animate-spin animate-infinite animate-duration-1000">
  <svg>...</svg>
</div>

<!-- Pulse loader -->
<div class="animate-pulse animate-infinite">
  <div class="bg-gray-200 h-4 rounded"></div>
</div>

<!-- Shimmer effect -->
<div class="animate-fade-in-right animate-infinite animate-duration-1000">
  <div class="bg-gradient-to-r from-gray-200 to-gray-300 h-4"></div>
</div>
```

---

### 2. Entrance Animations

```html
<!-- Hero section -->
<section class="animate-fade-in animate-duration-1000 animate-fill-forwards">
  <h1 class="animate-slide-in-up animate-delay-300">Welcome</h1>
  <p class="animate-slide-in-up animate-delay-500">Subtitle</p>
  <button class="animate-slide-in-up animate-delay-700">CTA</button>
</section>
```

---

### 3. Modal/Dialog Animations

```html
<!-- Modal backdrop -->
<div class="animate-fade-in animate-duration-200">
  <div class="fixed inset-0 bg-black/50"></div>
</div>

<!-- Modal content -->
<div class="animate-zoom-in animate-duration-300 animate-ease-out">
  <div class="bg-white p-6 rounded-lg">Modal Content</div>
</div>

<!-- Exit animation -->
<div class="animate-fade-out animate-zoom-out animate-duration-200">
  Closing modal
</div>
```

---

### 4. Notification/Toast

```html
<!-- Toast entrance -->
<div class="animate-slide-in-right animate-duration-300 animate-ease-out">
  <div class="bg-green-500 text-white p-4 rounded">
    Success!
  </div>
</div>

<!-- Auto-dismiss animation -->
<div class="
  animate-slide-out-right
  animate-delay-3000
  animate-duration-300
">
  Will dismiss in 3s
</div>
```

---

### 5. Attention Grabbers

```html
<!-- Wiggle for errors -->
<input class="invalid:animate-wiggle invalid:animate-once" />

<!-- Bounce call-to-action -->
<button class="animate-bounce animate-infinite animate-duration-1000">
  Click Me!
</button>

<!-- Pulse notification badge -->
<span class="
  animate-ping
  animate-infinite
  bg-red-500
  rounded-full
  h-3
  w-3
">
</span>
```

---

## 🎯 Responsive & Variants

### Breakpoint Variants

```html
<!-- Different animations per screen size -->
<div class="
  animate-fade-in-down
  md:animate-fade-in-left
  lg:animate-zoom-in
">
  Responsive animation
</div>
```

### State Variants

```html
<!-- Hover -->
<div class="hover:animate-bounce">Hover animation</div>

<!-- Focus -->
<input class="focus:animate-pulse" />

<!-- Group hover -->
<div class="group">
  <div class="group-hover:animate-wiggle">Group animation</div>
</div>

<!-- Dark mode -->
<div class="dark:animate-fade-in">Dark mode animation</div>
```

### Motion Preferences

```html
<!-- Respect user preferences -->
<div class="
  motion-safe:animate-bounce
  motion-reduce:animate-none
">
  Accessible animation
</div>
```

---

## 📊 Performance Considerations

### Best Practices

**DO**:
- ✅ Use CSS animations (hardware accelerated)
- ✅ Respect `prefers-reduced-motion`
- ✅ Limit infinite animations
- ✅ Use `will-change` sparingly
- ✅ Test on mobile devices
- ✅ Combine utilities efficiently

**DON'T**:
- ❌ Animate many elements simultaneously
- ❌ Use long durations (>1s) for UI feedback
- ❌ Ignore accessibility
- ❌ Animate layout properties (use transform instead)
- ❌ Overuse animations

### Bundle Size

- Plugin size: **~4KB** (minified + gzipped)
- No JavaScript overhead
- Tree-shakeable utilities
- Minimal performance impact

---

## 🔧 Customization

### Override Global Defaults

```css
:root {
  --default-animation-duration: 500ms;
  --default-animation-delay: 0s;
  --default-animation-timing-function: ease;
}
```

### Custom Animations

```javascript
// tailwind.config.js (v3.x)
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'custom-wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'custom-wiggle': 'custom-wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
```

---

## 🆚 Comparison with Alternatives

| Feature | tailwindcss-animated | tailwindcss-motion | tailwindcss-animate |
|---------|---------------------|-------------------|---------------------|
| **Focus** | Animation utilities | Inline motion | Enter/exit only |
| **Preset Animations** | 30+ keyframes | Presets available | None (compose) |
| **Duration Control** | ✅ Detailed | ✅ Basic | ✅ Basic |
| **Delay Control** | ✅ Detailed | ✅ Basic | ✅ Basic |
| **Easing Control** | ✅ Full | ✅ Basic | ✅ Basic |
| **Fill Mode** | ✅ Yes | ❌ No | ❌ No |
| **Play State** | ✅ Yes | ❌ No | ✅ Yes |
| **Composition** | ✅ Yes (modern) | ❌ No | ❌ No |
| **Bundle Size** | ~4KB | ~3KB | ~2KB |
| **Best For** | Complete control | Inline syntax | State transitions |

---

## 🎓 FAQ

### How to animate on scroll?

Use JavaScript Intersection Observer:

```javascript
// Using Alpine.js Intersect plugin
<div x-intersect="$el.classList.add('animate-fade-in-up')">
  Animates when scrolled into view
</div>

// Or Tailwind CSS Intersect plugin
<div class="intersect:animate-fade-in">
  Animates on intersection
</div>
```

### How to combine multiple animations?

Nest elements:

```html
<div class="animate-pulse">
  <div class="animate-bounce">
    <div class="animate-wiggle">
      Triple animation
    </div>
  </div>
</div>
```

Or use `animate-add` composition (modern browsers):

```html
<div class="animate-bounce animate-pulse animate-add">
  Combined animations
</div>
```

### Can I change keyframe values?

No, but you can:
1. Use animation composition (`animate-add`, `animate-accumulate`)
2. Create custom keyframes in your config
3. Combine with CSS variables for dynamic values

### Does this work with Play CDN?

No, the Tailwind CSS Play CDN doesn't support third-party plugins. Use local installation instead.

---

## 📚 Complete Utility Reference

### Summary Table

| Category | Utilities | Count |
|----------|-----------|-------|
| **Preset Animations** | `animate-fade-in`, `animate-wiggle`, etc. | 30+ |
| **Duration** | `animate-duration-{75-1000}` + arbitrary | 8 + ∞ |
| **Delay** | `animate-delay-{none,75-1000}` + arbitrary | 9 + ∞ |
| **Direction** | `animate-{normal,reverse,alternate,alternate-reverse}` | 4 |
| **Iteration** | `animate-{once,twice,thrice,infinite}` + arbitrary | 4 + ∞ |
| **Timing** | `animate-ease-{linear,in,out,in-out}` + arbitrary | 5 + ∞ |
| **Fill Mode** | `animate-fill-{none,forwards,backwards,both}` | 4 |
| **Play State** | `animate-{run,play,stop,pause}` | 4 |
| **Composition** | `animate-{replace,add,accumulate}` | 3 |

---

## 🌟 Use Case Examples

### Portfolio Website
```html
<section class="animate-fade-in animate-duration-1000">
  <h1 class="animate-slide-in-down animate-delay-300">Portfolio</h1>
  <div class="grid grid-cols-3 gap-4">
    <div class="animate-zoom-in animate-delay-500">Project 1</div>
    <div class="animate-zoom-in animate-delay-700">Project 2</div>
    <div class="animate-zoom-in animate-delay-1000">Project 3</div>
  </div>
</section>
```

### E-commerce Product Card
```html
<div class="group">
  <img class="group-hover:animate-zoom-in" />
  <button class="group-hover:animate-bounce">Add to Cart</button>
</div>
```

### Form Validation
```html
<input
  class="invalid:animate-shake invalid:animate-once"
  required
/>
```

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for tailwindcss-animated plugin
**Maintainer**: new-data-services
**License**: MIT - Free for commercial use
