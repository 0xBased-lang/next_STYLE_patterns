# Next.js + Tailwind CSS Repositories - Quick Reference Guide

**Last Updated**: 2025-10-24  
**Total Repositories**: 29  
**Analysis Focus**: Very Thorough

---

## QUICK START DECISIONS

### What Should I Use?

**For a new project - start here:**

```
Rapid Development              Custom Control
    ↓                          ↓
  Sera UI      shadcn/ui + Tailwind Animation Plugins
  or           
  SmoothUI     
  
Pre-built               Build from Foundation
components            Radix UI + Tailwind CSS
Full animations       + Framer Motion
Ready to use         + Custom animations
```

---

## PRIORITY 10 - MUST KNOW

| # | Name | Type | Best For | Tech |
|---|------|------|----------|------|
| 1 | **Motion** | Framework | Advanced animations | JavaScript/TS |
| 2 | **React Three Fiber** | 3D Library | WebGL 3D graphics | React + three.js |
| 3 | **Animated Slider** | Component | Image carousels | Next.js 13 |
| 4 | **Next.js Animations** | Demo | Learning animations | Framer Motion |
| 5 | **SmoothUI** | Components | Pre-built animated UI | Next.js 15 + React 19 |
| 6 | **Animated Portfolio** | Template | Beautiful portfolios | Framer Motion + Tailwind |
| 7 | **Cursify** | Starter Kit | Advanced layouts | Next.js 15 + MDX |
| 8 | **Tailwind Animations** | Reference | Animation utilities | Tailwind plugins |
| 9 | **Template + Remotion** | Advanced | Video + web | Remotion + Next.js |
| 10 | **NIM** | Doc Template | Modern docs | MDX + Next.js 15 |

---

## ANIMATION LIBRARY COMPARISON

### Three Plugin Option

```
┌─────────────────────────────────────────────────────┐
│         TAILWIND CSS ANIMATION PLUGINS              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  tailwindcss-animate   (1.0.7)                     │
│  ├─ Best for: Modal/Dropdown enter/exit           │
│  ├─ Classes: animate-in, animate-out              │
│  ├─ Features: Fade, spin, zoom, slide             │
│  └─ Bundle: ~2KB                                   │
│                                                     │
│  tailwindcss-animated   (Latest)                   │
│  ├─ Best for: Fine-grained control                │
│  ├─ Classes: animate-duration, animate-delay      │
│  ├─ Features: 30+ preset animations               │
│  └─ Bundle: ~4KB                                   │
│                                                     │
│  tailwindcss-motion   (1.1.1)                      │
│  ├─ Best for: Inline custom animations            │
│  ├─ Classes: motion-translate-x-in-100            │
│  ├─ Features: Dimension-based, Chrome extension   │
│  └─ Bundle: ~3KB                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Usage Decision Tree

```
Need animation?
    ↓
Simple (fade, slide, zoom, spin)?
    ├─ Yes → Use tailwindcss-animate
    └─ No → Complex sequence?
        ├─ Yes → Use Framer Motion
        └─ No → Fine-tuned timing → tailwindcss-animated

Enter/Exit state changes?
    → tailwindcss-animate

Custom inline animations?
    → tailwindcss-motion

React component sequences?
    → Framer Motion

Timeline animations?
    → Motion One or GSAP
```

---

## COMPONENT LIBRARY QUICK GUIDE

### Option A: Pre-Built (Fastest)

**Use**: Sera UI / SmoothUI

```bash
# Install components
npx shadcn@latest add "https://seraui.com/registry/button.json"

# Use immediately
<Button>Click me</Button>
```

**Pros**: Fully animated, production-ready, beautiful defaults  
**Cons**: Less customization, more dependencies

---

### Option B: Copy-Paste (Most Control)

**Use**: shadcn/ui

```bash
# Initialize
npx shadcn@latest init

# Add components
npx shadcn@latest add button

# Customize
# Edit: components/ui/button.tsx

<Button variant="custom">Click me</Button>
```

**Pros**: Full ownership, zero dependencies, complete control  
**Cons**: Manual updates, more setup

---

### Option C: Build Your Own

**Use**: Radix UI + Tailwind CSS + Framer Motion

```tsx
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const Button = React.forwardRef((props, ref) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn("px-4 py-2 rounded-md", props.className)}
    {...props}
  />
))
```

**Pros**: Completely custom, optimal performance  
**Cons**: More work, requires expertise

---

## TECHNOLOGY VERSIONS AT A GLANCE

```
LATEST STACK (Recommended for new projects):
├─ Next.js 15.x (seraui, smoothui, cursify, nim)
├─ React 19.x (latest features, better performance)
├─ Tailwind CSS 4.x (CSS-first, better DX)
├─ Framer Motion 12.x (latest animations)
└─ TypeScript 5.8+ (full type safety)

STABLE STACK (Still very good):
├─ Next.js 14.x
├─ React 18.x
├─ Tailwind CSS 3.x
├─ Framer Motion 10.x
└─ TypeScript 5.x

LEGACY (Still maintained but aging):
├─ Next.js 13.x
├─ React 18.x
├─ Tailwind CSS 3.x
└─ Framer Motion 9.x
```

---

## MCP SERVERS QUICK REFERENCE

### What's an MCP Server?

Model Context Protocol - allows AI assistants (Claude, ChatGPT) to call tools and access data.

### Available Options

| Server | Purpose | Status |
|--------|---------|--------|
| **shadcn-ui-mcp** | AI generates UI components | ✅ Active |
| **Manim MCP** | Mathematical animations | ✅ Active |
| **ReactBits MCP** | Access 135+ components | ✅ Active |
| **Tailwind Gemini MCP** | AI Tailwind assistant | ✅ Active |
| **UI/UX MCP** | 5-in-1 workflow tool | ✅ Active |
| **MCP-UI** | Interactive UI in chat | ✅ Active |

---

## PROJECT STRUCTURE TEMPLATES

### Component Library

```
src/
├── components/
│   ├── ui/               # Reusable components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── site/            # Site-specific
│   └── demos/           # Examples
├── lib/
│   ├── utils.ts         # Helpers
│   └── cn.ts            # Class merging
├── hooks/               # Custom hooks
├── config/              # Configuration
└── public/registry/     # Component registry
```

### Starter Template

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   └── nav.tsx
├── lib/
│   └── utils.ts
└── hooks/
```

---

## BUILD & DEPLOYMENT MATRIX

| Task | Tool | Command |
|------|------|---------|
| **Start Dev** | Next.js | `npm run dev` |
| **Build** | Next.js | `npm run build` |
| **Lint** | ESLint | `npm run lint` |
| **Format** | Prettier | `npm run format` |
| **Test** | Jest/Vitest | `npm run test` |
| **Bundle Analysis** | next/bundle-analyzer | Check Lighthouse |

---

## ANIMATION TECHNIQUES CHEAT SHEET

### Entrance Animation (Tailwind)
```html
<div class="
  animate-in
  fade-in
  slide-in-from-left
  zoom-in-95
  duration-300
  ease-out
">
  Content
</div>
```

### Component Animation (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Scroll Animation
```tsx
const ref = useRef(null)
const isInView = useInView(ref)

<motion.div
  ref={ref}
  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
>
  Content
</motion.div>
```

### Staggered List
```tsx
<motion.ul>
  {items.map((item, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

---

## COMMON WORKFLOWS

### Create a New Project

```bash
# Option 1: From template
npx create-next-app@latest --example https://github.com/seraui/seraui

# Option 2: Manual setup
npm create next-app@latest
npx shadcn@latest init
npm install framer-motion tailwindcss-animate

# Option 3: Use starter kit
git clone <starter-repo>
npm install
npm run dev
```

### Add Animation to Component

```bash
# 1. Install animation plugin
npm install -D tailwindcss-animate

# 2. Use animation class
<div class="animate-in fade-in">Content</div>

# 3. Or use Framer Motion
npm install framer-motion

# 4. Wrap with motion component
<motion.div animate={{ opacity: 1 }} >Content</motion.div>
```

### Deploy

```bash
# Vercel (easiest)
vercel deploy

# Or build and deploy anywhere
npm run build
npm start  # or use static host
```

---

## PERFORMANCE TIPS

### Bundle Size
```
Component libraries: ~100-200KB
Animation libs: ~20-50KB
Total reasonable: <500KB for JS

Optimize:
- Use CSS animations (Tailwind)
- Dynamic imports for large libs
- Tree-shaking enabled
```

### Animation Performance
```
✅ DO animate: transform, opacity
❌ DON'T animate: width, height, top, left

✅ DO use: will-change (sparingly)
✅ DO use: GPU acceleration
✅ DO test: on real mobile devices
```

---

## ACCESSIBILITY CHECKLIST

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation working
- [ ] Focus indicators visible
- [ ] Color contrast ≥4.5:1
- [ ] Motion-safe animations
- [ ] Screen reader tested
- [ ] All interactive elements keyboard accessible

---

## RESOURCES

### Official Docs
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Radix UI**: https://www.radix-ui.com
- **shadcn/ui**: https://ui.shadcn.com

### This Collection
- **Full Analysis**: `/REPOSITORY_ANALYSIS.md`
- **CLAUDE.md Files**: Individual project docs (when created)

---

## DECISION FLOWCHART

```
Starting a new project?
    ↓
What type?
    ├─ Dashboard/Admin → ts-nextjs-tailwind-starter
    ├─ Blog/Docs → Tailwind Nextjs Starter Blog or NIM
    ├─ Portfolio → Animated Portfolio Framer Motion
    ├─ SaaS → shadcn/ui + custom animations
    └─ Animation-heavy → Sera UI or SmoothUI
        ↓
    Need 3D?
    ├─ Yes → React Three Fiber
    └─ No → Continue
        ↓
    Animation level?
    ├─ Simple (fade/slide) → Tailwind + tailwindcss-animate
    ├─ Medium (sequences) → + Framer Motion
    └─ Advanced (timeline) → Motion One or GSAP
        ↓
    Ready to build!
```

---

**Save this file for quick reference!**  
For detailed analysis, see `/REPOSITORY_ANALYSIS.md`

