# Next.js + Tailwind CSS Repositories - Master Documentation

**Collection Purpose**: Comprehensive reference library for modern UI development with Next.js, React, and Tailwind CSS featuring animation-focused component libraries, design systems, and AI-powered development tools.

**Total Repositories**: 29
**Last Updated**: 2025-10-24
**Documentation Files**:
- `CLAUDE.md` (this file) - Master documentation
- `INDEX.md` - Complete repository map
- `QUICK_REFERENCE.md` - Quick decision guide and cheat sheet
- `REPOSITORY_ANALYSIS.md` - Very thorough technical analysis

---

## 📚 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Collection Overview](#collection-overview)
3. [Repository Categories](#repository-categories)
4. [Technology Stack](#technology-stack)
5. [Integration Workflows](#integration-workflows)
6. [Decision Guides](#decision-guides)
7. [Usage Patterns](#usage-patterns)
8. [Performance & Best Practices](#performance--best-practices)
9. [Learning Path](#learning-path)
10. [Documentation Navigation](#documentation-navigation)

---

## 🚀 QUICK START

### For Beginners
```bash
# 1. Start with complete UI system
cd seraui
npm install
npm run dev

# 2. Or use copy-paste components
cd ui
npx shadcn@latest init
npx shadcn@latest add button
```

### For Experienced Developers
```bash
# 1. Choose your stack (Latest Next.js 15 + React 19 + Tailwind 4)
cd ts-nextjs-tailwind-starter
pnpm install

# 2. Add animation plugins
npm install -D tailwindcss-animated tailwindcss-motion tailwindcss-animate

# 3. Start building
pnpm dev
```

### For AI-Assisted Development
```bash
# 1. Set up MCP servers for AI component access
npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_your_token

# 2. Or access 135+ animated components
npm install -g reactbits-dev-mcp-server

# 3. Let AI build UIs for you!
```

---

## 📖 COLLECTION OVERVIEW

### What's Inside

This collection contains **29 cutting-edge repositories** organized into 7 categories:

| Category | Count | Purpose |
|----------|-------|---------|
| **Component Libraries** | 5 | Pre-built UI components with animations |
| **Animation Libraries** | 4 | Animation frameworks and utilities |
| **Templates & Starters** | 6 | Production-ready project templates |
| **MCP Servers** | 7 | AI-powered development tools |
| **3D/Advanced** | 2 | WebGL 3D graphics and advanced layouts |
| **Tools & Utilities** | 2 | Design tokens and interactive UI |
| **Documentation** | 2 | Documentation templates and references |

---

## 🎯 REPOSITORY CATEGORIES

### 1. Component Libraries (5)

#### **Sera UI / SmoothUI** - Complete UI System
- **Path**: `/seraui` or `/smoothui`
- **Tech**: Next.js 15.5.4, React 19.1.1, Tailwind 4.1.13, Motion 12.0.11
- **Components**: 50+ pre-built animated components
- **Best For**: Rapid development, startups, MVPs
- **Key Features**: Built-in animations, dark mode, Radix UI primitives, responsive
- **Installation**: Component registry via CLI

#### **shadcn/ui** - Copy-Paste Components
- **Path**: `/ui`
- **Tech**: Radix UI, Tailwind CSS, TypeScript
- **Components**: 40+ accessibility-first components
- **Best For**: Custom design systems, full ownership
- **Philosophy**: Own your components, zero runtime dependencies
- **Installation**: `npx shadcn@latest init`

#### **Tailwind CSS Animate** - Enter/Exit Animations
- **Path**: `/tailwindcss-animate`
- **Version**: 1.0.7
- **Bundle Size**: ~2KB
- **Best For**: Modal/dropdown animations, state transitions
- **Classes**: `animate-in`, `animate-out`, `fade-in`, `slide-in-from`, `zoom-in`

#### **Tailwind CSS Animated** - Extended Animation Control
- **Path**: `/tailwindcss-animated`
- **Bundle Size**: ~4KB
- **Best For**: Fine-grained animation control
- **Features**: 30+ presets, duration/delay/easing control
- **Classes**: `animate-duration-300`, `animate-delay-150`, `animate-wiggle`

#### **Tailwind CSS Motion** - Inline Motion Syntax
- **Path**: `/tailwindcss-motion`
- **Version**: 1.1.1
- **Bundle Size**: ~3KB
- **Best For**: Inline custom animations without keyframes
- **Features**: Chrome extension visual animator
- **Classes**: `motion-translate-x-in-100`, `motion-preset-fade`

---

### 2. Animation Libraries (4)

#### **Motion (Motion One)** - Advanced Animation Framework
- **Path**: `/motion`
- **Type**: Monorepo (multiple packages)
- **Version**: 12.x
- **Best For**: Advanced animations, performance-critical applications
- **Key Features**: Low-level animation tools, GSAP integration
- **GitHub**: https://github.com/framer/motion

#### **React Three Fiber** - 3D Web Graphics
- **Path**: `/react-three-fiber`
- **Type**: Monorepo (3D graphics library)
- **Tech**: React 19.0.0, Three.js 0.172.0
- **Best For**: 3D web applications, WebGL graphics
- **Platforms**: Web, React Native, Expo
- **GitHub**: https://github.com/pmndrs/react-three-fiber

#### **Next.js Animations** - Scroll Animation Examples
- **Path**: `/nextjs-animations`
- **Type**: Demo/Educational
- **Tech**: Next.js 13.1.6, Framer Motion 9.1.7
- **Best For**: Learning scroll-triggered animations
- **Features**: Parallax, text animations, intersection observer

#### **Next.js Animated Slider** - Carousel Component
- **Path**: `/nextjs-animated-slider`
- **Type**: Component + Template
- **Tech**: Next.js 13.4.4, Framer Motion 10.12.16
- **Best For**: Image galleries, content sliders
- **Features**: Touch support, keyboard nav, auto-play

---

### 3. Templates & Starters (6)

#### **Animated Portfolio Framer Motion**
- **Path**: `/animated-portfolio-framer-motion`
- **Tech**: Next.js 14.0.3, Framer Motion 10.16.5
- **Best For**: Portfolio websites
- **Features**: Beautiful animations, contact form (EmailJS), responsive

#### **Template Next App Dir Tailwind + Remotion**
- **Path**: `/template-next-app-dir-tailwind`
- **Tech**: Next.js 15.4.7, React 19.0.0, Remotion 4.0.0
- **Best For**: Projects requiring video + web integration
- **Special**: Video generation with Remotion

#### **Tailnext** - Production Website Template
- **Path**: `/tailnext`
- **Tech**: Next.js 14+, Storybook 7
- **Best For**: Complete websites, blogs, marketing sites
- **Features**: Blog, Storybook integration, perfect Lighthouse scores
- **Demo**: https://tailnext.vercel.app/

#### **Tailwind Nextjs Starter Blog** ⭐ 8K+ stars
- **Path**: `/tailwind-nextjs-starter-blog`
- **Tech**: Next.js 15, React 19, Tailwind 4, Contentlayer 2
- **Best For**: Professional blogging, technical writing
- **Features**: MDX, analytics, comments, newsletter, search (Kbar/Algolia)
- **Demo**: https://tailwind-nextjs-starter-blog.vercel.app/

#### **ts-nextjs-tailwind-starter** 🔋 Battery-Packed
- **Path**: `/ts-nextjs-tailwind-starter`
- **Tech**: Next.js 15, React 19, TypeScript, Tailwind 4, Jest
- **Best For**: Developer productivity, professional projects
- **Features**: ESLint, Prettier, Husky, Jest, auto-adapting components
- **Demo**: https://tsnext-tw.thcl.dev/

#### **Cursify** - Advanced UI Layout
- **Path**: `/cursify`
- **Tech**: Next.js 15.3.1, Motion 12.9.2, React Spring 9.7.5
- **Best For**: Complex interactive layouts
- **Features**: Custom cursor, MDX integration, carousel, resizable panels

#### **NIM** - Modern Documentation
- **Path**: `/nim`
- **Tech**: Next.js 15.1.1, React 19.0.0, Tailwind 4.0.0
- **Best For**: Documentation sites, technical blogs
- **Features**: MDX support, syntax highlighting, dark mode

---

### 4. MCP Servers (7) - AI-Powered Development Tools

#### **shadcn-ui-mcp-server**
- **Path**: `/shadcn-ui-mcp-server`
- **Version**: 1.1.4
- **Purpose**: AI-powered component access (React, Svelte, Vue, React Native)
- **Best For**: Let AI build UIs with shadcn components
- **Installation**: `npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_token`

#### **Manim MCP Server**
- **Path**: `/manim-mcp-server`
- **Purpose**: Mathematical animation engine (Manim + MCP)
- **Best For**: Educational animations, math visualizations
- **Tech**: Python, Manim Community Edition

#### **ReactBits MCP Server**
- **Path**: `/reactbits-mcp-server`
- **Version**: 1.1.2
- **Purpose**: Access 135+ animated React components
- **Installation**: `npm install -g reactbits-dev-mcp-server`

#### **MCP Tailwind Gemini**
- **Path**: `/mcp-tailwind-gemini`
- **Version**: 1.0.0
- **Purpose**: AI-powered Tailwind CSS assistant with Gemini
- **Features**: Component generation, class optimization, theme creation
- **Tech**: Gemini AI, Puppeteer, Sharp

#### **MCP TailwindPlus**
- **Path**: `/mcp-tailwindplus`
- **Purpose**: Premium TailwindUI component access
- **Tech**: Python, FastMCP
- **Note**: Requires TailwindUI license

#### **UI/UX MCP Server** - 5-in-1 Workflow Tool
- **Path**: `/ui-ux-mcp-server`
- **Version**: 1.0.0
- **Purpose**: Comprehensive UI/UX workflow automation
- **Tools**: Storybook, Tailwind, Animation, Playwright, Workflows

#### **MCP for Next.js** - Vercel Template
- **Path**: `/mcp-for-next.js`
- **Tech**: Next.js 15.2.4, mcp-handler, Redis (optional)
- **Purpose**: Build MCP servers with Next.js on Vercel
- **Author**: Vercel Labs

---

### 5. Advanced Tools (4)

#### **MCP-UI** - Interactive UI Components
- **Path**: `/mcp-ui`
- **Version**: 5.2.0
- **Purpose**: Rich UI components in AI conversations
- **Languages**: TypeScript, Ruby, Python
- **Documentation**: https://mcpui.dev

#### **Figma Tokens Example** - Design Token Pipeline
- **Path**: `/figma-tokens-example-tailwindcss-using-css-variables-reference`
- **Tech**: NuxtJS 3, Style Dictionary, token-transformer
- **Purpose**: Automated Figma → Tailwind CSS workflow
- **Best For**: Design-to-code automation

#### **React Three Fiber** - 3D Graphics
- **Path**: `/react-three-fiber`
- **Tech**: React 19.0.0, Three.js 0.172.0
- **Best For**: 3D web applications, interactive graphics

#### **Tailwind Animations** - Animation Showcase
- **Path**: `/tailwind-animations`
- **Purpose**: Learn animation utilities
- **Best For**: Reference and education

---

## 💻 TECHNOLOGY STACK

### Frontend Frameworks
```
Latest Stack (Recommended):
├─ Next.js 15.x (App Router, Server Components)
├─ React 19.x (Concurrent rendering, improved performance)
├─ Tailwind CSS 4.x (CSS-first, better DX)
├─ TypeScript 5.8+ (Full type safety)
└─ Framer Motion 12.x (Latest animations)

Stable Stack (Still Very Good):
├─ Next.js 14.x
├─ React 18.x
├─ Tailwind CSS 3.x
└─ Framer Motion 10.x
```

### Animation Libraries
```
Primary Animation Tools:
1. Framer Motion (9.x - 12.x) - React component animations
2. Motion One (12.x) - Low-level animation engine
3. Tailwind Plugins:
   - tailwindcss-animate (1.0.7) - Enter/exit
   - tailwindcss-animated - Fine control
   - tailwindcss-motion (1.1.1) - Inline syntax
4. React Spring (9.7.5) - Physics-based
5. GSAP (3.12.5) - Timeline animations
```

### Build Tools & Testing
```
Build Tools:
├─ Next.js (primary)
├─ Turbo (monorepo orchestration)
├─ Rollup (library bundling)
└─ Preconstruct (module building)

Testing & Quality:
├─ Playwright (E2E testing)
├─ Jest/Vitest (unit testing)
├─ ESLint (code quality)
├─ Prettier (formatting)
└─ Husky (git hooks)
```

### UI Component Systems
```
Component Foundations:
├─ Radix UI Primitives (accessibility-first)
├─ shadcn/ui (copy-paste architecture)
├─ Sera UI (50+ pre-built components)
└─ Custom components (Radix + Tailwind + Motion)
```

---

## 🔀 INTEGRATION WORKFLOWS

### Complete Animation Stack

**Layer 1: Simple Animations** (Tailwind CSS)
```html
<!-- Using tailwindcss-animate -->
<div class="animate-in fade-in slide-in-from-left duration-300">
  Modal entrance
</div>
```

**Layer 2: Component Animations** (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Animated component
</motion.div>
```

**Layer 3: Advanced Effects** (Motion One / GSAP)
```javascript
import { animate } from "motion"

animate(
  element,
  { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
  { duration: 0.3, easing: "ease-out" }
)
```

### Component Development Workflow

**Option A: Pre-Built (Fastest)**
```bash
# Use Sera UI
npx shadcn@latest add "https://seraui.com/registry/button.json"

# Use immediately
<Button>Click me</Button>
```

**Option B: Copy-Paste (Most Control)**
```bash
# Use shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button

# Customize components/ui/button.tsx
<Button variant="custom">Click me</Button>
```

**Option C: Build Custom**
```tsx
// Use Radix UI + Tailwind + Framer Motion
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

---

## 🎯 DECISION GUIDES

### Choose Your Project Type

```
Need                          Use
────────────────────────────────────────────────────
Complete UI system           → Sera UI
Custom component library     → shadcn/ui
3D graphics                  → React Three Fiber
Professional blog            → Tailwind Nextjs Starter Blog
Portfolio                    → Animated Portfolio Framer Motion
Documentation site           → NIM
Production website           → Tailnext
Developer productivity       → ts-nextjs-tailwind-starter
Video + web                  → Template Next App Dir Tailwind
AI-assisted development      → MCP Servers
Design-to-code automation    → Figma Tokens Example
```

### Choose Your Animation Strategy

```
Animation Complexity         Use
────────────────────────────────────────────────────
Simple (fade, slide)         → tailwindcss-animate
Fine-tuned timing            → tailwindcss-animated
Inline custom                → tailwindcss-motion
React component sequences    → Framer Motion
Timeline animations          → Motion One or GSAP
3D animations                → React Three Fiber
```

### Choose Your Starter Template

```
Project Requirement          Use
────────────────────────────────────────────────────
Comprehensive tooling        → ts-nextjs-tailwind-starter
Feature-rich blog (8K stars) → Tailwind Nextjs Starter Blog
Production website           → Tailnext
Beautiful portfolio          → Animated Portfolio Framer Motion
Documentation site           → NIM
Video generation             → Template Next App Dir Tailwind
```

---

## 📚 USAGE PATTERNS

### Pattern 1: Complete Animation Stack

Combine all animation plugins for maximum flexibility:

```bash
# Install all animation tools
npm install -D tailwindcss-animated tailwindcss-motion tailwindcss-animate
npm install framer-motion
```

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-animated'),
    require('tailwindcss-motion'),
    require('tailwindcss-animate'),
  ],
}
```

```tsx
// Use multiple techniques
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="animate-in fade-in motion-preset-bounce animate-duration-500"
>
  Complex animation with multiple layers
</motion.div>
```

### Pattern 2: AI-Assisted Component Development

```bash
# 1. Set up MCP servers
npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_your_token

# 2. Let AI generate components
"Create a button with hover animation using shadcn/ui"

# 3. AI returns complete component code with animations
<Button variant="default" className="hover:scale-105 transition-transform">
  Animated Button
</Button>
```

### Pattern 3: Design-to-Code Workflow

```bash
# 1. Design in Figma with tokens
# 2. Export tokens to JSON
# 3. Run transformation pipeline
cd figma-tokens-example-tailwindcss-using-css-variables-reference
npm run build-styles

# 4. Generated Tailwind config and CSS variables ready to use
<div className="bg-brand-primary text-foreground">
  Theme-aware component
</div>
```

---

## ⚡ PERFORMANCE & BEST PRACTICES

### Bundle Size Optimization

**Component Libraries**:
- **Sera UI**: Moderate bundle (Framer Motion included) ~100-200KB
- **shadcn/ui**: Minimal bundle (only what you copy) ~50-100KB
- **Best Practice**: Use selective imports and dynamic loading

**Animation Plugins**:
- All plugins: <5KB each
- CSS-only (no JS overhead)
- Best Practice: Combine with `motion-safe` and `motion-reduce`

### Animation Performance

```tsx
// ✅ DO: Animate transform and opacity (GPU-accelerated)
<motion.div
  animate={{
    transform: "translateX(100px)",
    opacity: 1
  }}
/>

// ❌ DON'T: Animate width, height, top, left (causes layout recalc)
<motion.div
  animate={{
    width: 200,
    height: 200
  }}
/>

// ✅ DO: Respect user preferences
<div className="motion-safe:animate-bounce motion-reduce:animate-none">
  Content
</div>
```

### Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation working
- [ ] Focus indicators visible
- [ ] Color contrast ≥4.5:1
- [ ] Motion-safe animations (`prefers-reduced-motion`)
- [ ] Screen reader tested
- [ ] All interactive elements keyboard accessible

---

## 🎓 LEARNING PATH

### Beginner Path (2-4 weeks)
1. **Week 1**: Install and explore **Sera UI**
   - Complete UI system with ready components
   - Learn how animations work
   - Build first project with pre-built components

2. **Week 2**: Add **tailwindcss-animate** for customization
   - Learn enter/exit animations
   - Understand modal and dropdown patterns
   - Practice with animation timing

3. **Week 3**: Explore **Next.js templates**
   - Use Tailnext or ts-nextjs-tailwind-starter
   - Understand project structure
   - Deploy first application

4. **Week 4**: Build complete project
   - Combine learnings
   - Add custom animations
   - Deploy to production

### Intermediate Path (4-8 weeks)
1. **Weeks 1-2**: Migrate to **shadcn/ui**
   - Learn copy-paste architecture
   - Understand component ownership
   - Customize components

2. **Weeks 3-4**: Master **Framer Motion**
   - Complex animation sequences
   - Gesture handling
   - Layout animations

3. **Weeks 5-6**: Combine animation plugins
   - Mix Tailwind plugins with Framer Motion
   - Create animation presets
   - Optimize performance

4. **Weeks 7-8**: Build production application
   - Complete design system
   - Optimized animations
   - Professional deployment

### Advanced Path (8+ weeks)
1. **Weeks 1-4**: Build custom component library
   - Use shadcn/ui as foundation
   - Create reusable components
   - Publish to npm

2. **Weeks 5-8**: Master advanced animations
   - Motion One / GSAP timelines
   - 3D with React Three Fiber
   - Performance optimization

3. **Weeks 9-12**: AI-powered workflows
   - Set up MCP servers
   - Automate component generation
   - Design-to-code pipeline

4. **Ongoing**: Contribute to open source
   - Fix bugs in repositories
   - Add features
   - Share knowledge

---

## 📖 DOCUMENTATION NAVIGATION

### Quick Reference Documents

1. **THIS FILE** (`CLAUDE.md`) - Master documentation with complete overview
2. **`QUICK_REFERENCE.md`** - Decision flowcharts, cheat sheets, quick commands
3. **`INDEX.md`** - Complete repository map with all 29 projects
4. **`REPOSITORY_ANALYSIS.md`** - Very thorough technical analysis of top 10 repositories

### Individual Repository Documentation

Each major repository has its own `CLAUDE.md` file:
- `/seraui/CLAUDE.md` - Complete UI system documentation
- `/ui/CLAUDE.md` - shadcn/ui component library
- `/motion/CLAUDE.md` - Animation framework details
- `/react-three-fiber/CLAUDE.md` - 3D graphics documentation
- And more...

### Official External Documentation

- **Sera UI**: https://seraui.com/docs
- **shadcn/ui**: https://ui.shadcn.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev

---

## 🔗 QUICK LINKS TABLE

| Repository | Type | Path | GitHub | Status |
|------------|------|------|--------|--------|
| **Sera UI** | Components | `./seraui/` | [Link](https://github.com/seraui/seraui) | ✅ Active |
| **shadcn/ui** | Components | `./ui/` | [Link](https://github.com/shadcn-ui/ui) | ✅ Active |
| **Motion** | Animation | `./motion/` | [Link](https://github.com/framer/motion) | ✅ Active |
| **React Three Fiber** | 3D | `./react-three-fiber/` | [Link](https://github.com/pmndrs/react-three-fiber) | ✅ Active |
| **Tailwind CSS Animate** | Animation | `./tailwindcss-animate/` | [Link](https://github.com/jamiebuilds/tailwindcss-animate) | ✅ Stable |
| **Tailwind CSS Animated** | Animation | `./tailwindcss-animated/` | [Link](https://github.com/new-data-services/tailwindcss-animated) | ✅ Active |
| **Tailwind CSS Motion** | Animation | `./tailwindcss-motion/` | [Link](https://github.com/romboHQ/tailwindcss-motion) | ✅ Active |
| **Animated Portfolio** | Template | `./animated-portfolio-framer-motion/` | — | ✅ Ready |
| **Next.js Animations** | Demo | `./nextjs-animations/` | — | ✅ Educational |
| **Next.js Animated Slider** | Component | `./nextjs-animated-slider/` | — | ✅ Ready |
| **Template + Remotion** | Template | `./template-next-app-dir-tailwind/` | [Link](https://github.com/remotion-dev/template-next-app-dir-tailwind) | ✅ Active |
| **Tailnext** | Template | `./tailnext/` | [Link](https://github.com/arthelokyo/tailnext) | ✅ Active |
| **Starter Blog** ⭐ | Template | `./tailwind-nextjs-starter-blog/` | [Link](https://github.com/timlrx/tailwind-nextjs-starter-blog) | ✅ Active |
| **TS Starter** 🔋 | Template | `./ts-nextjs-tailwind-starter/` | [Link](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter) | ✅ Active |
| **Cursify** | Advanced | `./cursify/` | [Link](https://github.com/ui-layouts/cursify) | ✅ Active |
| **NIM** | Docs | `./nim/` | [Link](https://github.com/ibelick/nim) | ✅ Active |
| **shadcn-ui MCP** | MCP | `./shadcn-ui-mcp-server/` | [Link](https://github.com/Jpisnice/shadcn-ui-mcp-server) | ✅ Active |
| **Manim MCP** | MCP | `./manim-mcp-server/` | [Link](https://github.com/abhiemj/manim-mcp-server) | ✅ Active |
| **ReactBits MCP** | MCP | `./reactbits-mcp-server/` | [Link](https://github.com/ceorkm/reactbits-mcp-server) | ✅ Active |
| **Tailwind Gemini MCP** | MCP | `./mcp-tailwind-gemini/` | [Link](https://github.com/Tai-DT/mcp-tailwind-gemini) | ✅ Active |
| **TailwindPlus MCP** | MCP | `./mcp-tailwindplus/` | [Link](https://github.com/richardkmichael/mcp-tailwindplus) | ✅ Active |
| **UI/UX MCP** | MCP | `./ui-ux-mcp-server/` | [Link](https://github.com/willem4130/ui-ux-mcp-server) | ✅ Active |
| **MCP for Next.js** | MCP | `./mcp-for-next.js/` | [Link](https://github.com/vercel-labs/mcp-for-next.js) | ✅ Official |
| **MCP-UI** | Tools | `./mcp-ui/` | [Link](https://github.com/idosal/mcp-ui) | ✅ Active |
| **Figma Tokens** | Tools | `./figma-tokens-example.../` | [Link](https://github.com/mirahi-io/figma-tokens-example-tailwindcss-using-css-variables-reference) | ✅ Active |
| **Tailwind Animations** | Reference | `./tailwind-animations/` | — | ✅ Educational |

---

## 📊 SUMMARY STATISTICS

- **Total Repositories**: 29
- **Component Libraries**: 5
- **Animation Libraries**: 4 (3 Tailwind plugins + Motion)
- **Templates & Starters**: 6
- **MCP Servers**: 7 (AI-powered tools)
- **3D/Advanced**: 2
- **Tools & Utilities**: 2
- **Documentation/Reference**: 2
- **Monorepos**: 3 (motion, react-three-fiber, ui)

**Technology Versions**:
- Next.js: 13.x - 15.x
- React: 18.x - 19.x
- Tailwind CSS: 3.x - 4.x
- TypeScript: 4.6.3 - 5.8.2
- Framer Motion: 9.x - 12.x

**Primary Animation Tools**: Framer Motion, Tailwind CSS plugins (3), Motion One, React Spring, GSAP

---

## 📝 LICENSE

All repositories in this collection are **MIT Licensed**:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

---

## 🤝 CONTRIBUTING

This is a reference collection. To contribute:
1. Fork individual repositories (see GitHub links above)
2. Submit PRs to respective projects
3. Share your built projects in discussions

---

## 🆘 GETTING HELP

### Resources
1. Check `QUICK_REFERENCE.md` for quick answers
2. Read `REPOSITORY_ANALYSIS.md` for deep dives
3. Browse individual repository READMEs
4. Visit official documentation links

### Community
- **Sera UI Discord**: https://discord.gg/XqQkbTptvJ
- **GitHub Discussions**: Individual repository discussions
- **Stack Overflow**: Tag with `nextjs`, `tailwindcss`, `framer-motion`

---

**Last Updated**: 2025-10-24
**Collection Version**: 1.0.0
**Maintainer**: Reference library for Next.js + Tailwind CSS development
**Purpose**: Comprehensive toolkit for building modern, animated, accessible web applications

---

**Next Steps**:
1. Browse `QUICK_REFERENCE.md` for fast decisions
2. Read `INDEX.md` for complete repository map
3. Explore `REPOSITORY_ANALYSIS.md` for technical details
4. Start building with your chosen stack!
