# Motion - Universal Animation Library

## Overview

**Purpose**: Declarative animation library with GPU acceleration for modern web applications
**Language**: TypeScript (React, Vue, JavaScript)
**Performance**: 120fps capable, GPU-accelerated transforms
**Status**: ⭐ Production-used by Figma, Linear, Tailwind, and many others
**License**: MIT

## Key Features

- ⚡ **120fps Performance**: GPU-accelerated transforms and opacity
- 🎯 **Declarative API**: Simple, readable animation definitions
- 🔧 **Component-Based**: Built for React, Vue, and vanilla JS
- 🎨 **Spring Physics**: Natural motion with spring animations
- 🎭 **Gesture Support**: Drag, pan, hover, tap animations
- 📱 **Responsive**: Works across desktop and mobile
- 🎮 **Animation Controls**: Play, pause, reverse, repeat
- 🔄 **Orchestration**: Sequence, stagger, and coordinate animations
- 📦 **Tree-Shakeable**: Import only what you need (~5KB gzipped core)

## Installation

### React (Framer Motion)

```bash
npm install framer-motion
# or
yarn add framer-motion
# or
pnpm add framer-motion
```

### Vue (Motion One for Vue)

```bash
npm install @motionone/vue
```

### Vanilla JavaScript (Motion One)

```bash
npm install motion
```

## Quick Start

### React Example

```tsx
import { motion } from "framer-motion"

function Component() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      Animated Content
    </motion.div>
  )
}
```

### Vue Example

```vue
<script setup>
import { Motion } from "@motionone/vue"
</script>

<template>
  <Motion
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.3 }"
  >
    Animated Content
  </Motion>
</template>
```

### Vanilla JS Example

```javascript
import { animate } from "motion"

animate(
  ".element",
  { opacity: [0, 1], y: [20, 0] },
  { duration: 0.3 }
)
```

## Core Concepts

### 1. Declarative Animations

```tsx
<motion.div
  animate={{ x: 100, rotate: 360 }}
  transition={{ duration: 2 }}
/>
```

### 2. Variants (Animation States)

```tsx
const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
/>
```

### 3. Spring Animations

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 10
  }}
/>
```

### 4. Gestures

```tsx
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  drag
  dragConstraints={{ left: 0, right: 300 }}
/>
```

### 5. Animation Orchestration

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item} variants={item}>
      {item}
    </motion.li>
  ))}
</motion.ul>
```

## Advanced Features

### AnimatePresence (Enter/Exit Animations)

```tsx
import { motion, AnimatePresence } from "framer-motion"

function List({ items }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {item.content}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
```

### Layout Animations

```tsx
<motion.div layout>
  {/* Content changes automatically animate */}
</motion.div>
```

### Scroll Animations

```tsx
import { motion, useScroll, useTransform } from "framer-motion"

function Component() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div style={{ opacity }}>
      Fades out on scroll
    </motion.div>
  )
}
```

### Custom Animation Controls

```tsx
import { motion, useAnimation } from "framer-motion"

function Component() {
  const controls = useAnimation()

  return (
    <>
      <button onClick={() => controls.start({ x: 100 })}>
        Animate
      </button>
      <motion.div animate={controls} />
    </>
  )
}
```

## Performance Optimization

### GPU-Accelerated Properties

**Always GPU-accelerated** (60fps+):
- `x`, `y`, `scale`, `rotate`
- `opacity`

**Use `transform` instead of layout properties**:
```tsx
// ✅ Good (GPU-accelerated)
<motion.div animate={{ x: 100 }} />

// ❌ Bad (triggers layout)
<motion.div animate={{ left: 100 }} />
```

### Will-Change Optimization

```tsx
<motion.div
  style={{ willChange: "transform" }}
  animate={{ x: 100 }}
/>
```

### Reduce Motion for Accessibility

```tsx
import { motion, useReducedMotion } from "framer-motion"

function Component() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ x: shouldReduceMotion ? 0 : 100 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  )
}
```

## Real-World Examples

### Modal Animation

```tsx
function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            Modal Content
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Notification Toast

```tsx
const toast = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 }
}

<AnimatePresence>
  {notifications.map(note => (
    <motion.div
      key={note.id}
      variants={toast}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      {note.message}
    </motion.div>
  ))}
</AnimatePresence>
```

### Infinite Scroll Loader

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }}
>
  <Spinner />
</motion.div>
```

### Parallax Scroll

```tsx
function ParallaxSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  return (
    <motion.div style={{ y }}>
      Background Layer
    </motion.div>
  )
}
```

## Integration Patterns

### With React Router

```tsx
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          {/* Routes */}
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
```

### With Tailwind CSS

```tsx
<motion.div
  className="bg-blue-500 rounded-lg p-4"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated Card
</motion.div>
```

### With Three.js / React Three Fiber

```tsx
import { motion } from "framer-motion-3d"
import { Canvas } from "@react-three/fiber"

<Canvas>
  <motion.mesh
    animate={{ rotateY: Math.PI * 2 }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <boxGeometry />
    <meshStandardMaterial />
  </motion.mesh>
</Canvas>
```

## Best Practices

### 1. Use GPU-Accelerated Properties

```tsx
// ✅ Good
animate={{ x: 100, scale: 1.2, opacity: 0.8 }}

// ❌ Bad
animate={{ left: 100, width: 200, backgroundColor: "red" }}
```

### 2. Variants for Complex Animations

```tsx
// ✅ Good (reusable, readable)
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// ❌ Bad (repetitive, hard to maintain)
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />
```

### 3. Accessibility

```tsx
// Always respect user's motion preferences
const shouldReduceMotion = useReducedMotion()

<motion.div
  animate={shouldReduceMotion ? {} : { x: 100 }}
/>
```

### 4. Clean Up Animations

```tsx
// AnimatePresence automatically handles cleanup
<AnimatePresence>
  {isVisible && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

## Performance Benchmarks

### Bundle Size
- **Core**: ~5KB gzipped
- **Full (Framer Motion)**: ~30KB gzipped
- **Tree-shakeable**: Import only what you need

### Runtime Performance
- **120fps capable** for transform/opacity
- **60fps** for layout animations
- **GPU-accelerated** by default
- **Minimal React re-renders**

## Troubleshooting

### Animations Not Working

```tsx
// Ensure AnimatePresence wraps exit animations
<AnimatePresence>
  {show && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>

// Ensure unique keys for list animations
{items.map(item => (
  <motion.div key={item.id} />  // Must have stable key
))}
```

### Performance Issues

```tsx
// Avoid animating layout properties
// ❌ Bad
animate={{ width: 200, height: 300 }}

// ✅ Good
animate={{ scale: 1.5 }}

// Use layoutId for shared element transitions
<motion.div layoutId="shared-element" />
```

### TypeScript Issues

```bash
# Ensure types are installed
npm install @types/react @types/react-dom
```

## Documentation Links

- **Official Site**: https://www.framer.com/motion/
- **Motion One**: https://motion.dev/
- **Repository**: https://github.com/motiondivision/motion
- **Examples**: https://www.framer.com/motion/examples/
- **API Docs**: https://www.framer.com/motion/api/

## Related Projects in Collection

### Comparison with Other Animation Tools

| Tool | Domain | Performance | Ease of Use |
|------|--------|-------------|-------------|
| **motion** | Web (React/Vue/JS) | Excellent (120fps) | Easy |
| svgMotion | SVG Editor | Good | Visual Editor |
| thorvg | C++ Graphics | Excellent | Complex |

### Use Case Selection
- **motion**: Modern web apps, React/Vue projects
- **svgMotion**: Quick SVG animation editing
- **thorvg**: Embedded systems, native apps

## Project Status

- ✅ **Production Ready**: Used by Figma, Linear, Tailwind, etc.
- ✅ **Active Development**: Regular updates
- ✅ **Large Community**: 25K+ GitHub stars
- ✅ **Well Documented**: Comprehensive docs and examples
- ✅ **TypeScript**: Full type safety

## License

MIT License - See LICENSE file in repository
