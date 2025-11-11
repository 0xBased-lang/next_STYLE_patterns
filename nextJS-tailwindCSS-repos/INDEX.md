# Next.js + Tailwind CSS Repositories - Complete Index

**Analysis Date**: 2025-10-24  
**Total Repositories**: 29  
**Documentation Files**:
- `INDEX.md` (this file) - Overview and repository index
- `REPOSITORY_ANALYSIS.md` - Very thorough technical analysis
- `QUICK_REFERENCE.md` - Quick decision guide and cheat sheet

---

## REPOSITORY MAP

### ANIMATION LIBRARIES & FRAMEWORKS (5)

#### 1. Motion (Motion One)
- **Location**: `/motion`
- **Type**: Monorepo - Animation framework
- **Author**: Framer
- **Status**: Active development
- **Key Tech**: Turbo, Rollup, Playwright, Jest
- **Purpose**: Low-level animation tools for JavaScript/React
- **Best For**: Advanced animations, performance-critical applications
- **Package**: motion-one 12.x
- **GitHub**: https://github.com/framer/motion

#### 2. Tailwind CSS Animate
- **Location**: `/tailwindcss-animate`
- **Type**: Tailwind CSS plugin
- **Author**: Jamie Kyle (@jamiebuilds)
- **Version**: 1.0.7
- **Status**: Stable
- **Best For**: Enter/exit animations, modals, dropdowns, tooltips
- **Classes**: animate-in, animate-out, fade, spin, zoom, slide
- **Bundle**: ~2KB
- **Documentation**: Complete README with examples
- **Installation**: `npm install -D tailwindcss-animate`

#### 3. Tailwind CSS Animated
- **Location**: `/tailwindcss-animated`
- **Type**: Tailwind CSS plugin
- **Author**: new-data-services
- **Compatibility**: Tailwind v3.1+ and v4.0+
- **Status**: Active
- **Best For**: Fine-grained animation control
- **Features**: 30+ preset animations, duration/delay/easing control
- **Bundle**: ~4KB
- **Key Utilities**: animate-duration, animate-delay, animate-ease, animate-iteration
- **Installation**: `npm install tailwindcss-animated`

#### 4. Tailwind CSS Motion
- **Location**: `/tailwindcss-motion`
- **Type**: Tailwind CSS plugin
- **Author**: RomboHQ
- **Version**: 1.1.1
- **Status**: Active
- **Best For**: Inline custom animations without keyframes
- **Features**: Chrome extension visual animator, preset animations
- **Classes**: motion-translate-x-in-100, motion-scale-in-90, motion-opacity-in-0
- **Bundle**: ~3KB
- **Documentation**: https://docs.rombo.co/tailwind
- **Installation**: `npm i -D tailwindcss-motion`

#### 5. Next.js Animations
- **Location**: `/nextjs-animations`
- **Type**: Demo/Educational project
- **Framework**: Next.js 13.1.6, React 18.2.0
- **Purpose**: Scroll-triggered animations showcase
- **Key Features**: Parallax, text animations, intersection observer
- **Tech**: Framer Motion 9.1.7, Tailwind CSS 3.2.7
- **Status**: Educational/Reference

---

### COMPONENT LIBRARIES (5)

#### 6. Sera UI / SmoothUI
- **Location**: `/seraui` or `/smoothui`
- **Type**: Full component library
- **Framework**: Next.js 15.3.2+, React 19.0.0
- **Components**: 50+ pre-built components
- **Status**: Active development
- **Features**: Built-in Framer Motion animations, dark mode, responsive
- **Tech Stack**: Tailwind CSS 4, Framer Motion 12.x, Radix UI
- **Installation**: Component registry via CLI
- **Purpose**: Rapid UI development with animations included
- **GitHub**: https://github.com/seraui/seraui
- **Documentation**: https://seraui.com/docs

#### 7. shadcn/ui (UI)
- **Location**: `/ui`
- **Type**: Copy-paste component framework
- **Components**: 40+ accessibility-first components
- **Status**: Stable and widely adopted
- **Philosophy**: Own your components, not a dependency
- **Tech**: Radix UI, Tailwind CSS, TypeScript
- **Installation**: `npx shadcn@latest init` then add components
- **Monorepo**: apps/* + packages/*
- **Purpose**: Full customization with zero runtime dependencies
- **GitHub**: https://github.com/shadcn-ui/ui
- **Documentation**: https://ui.shadcn.com

#### 8. Tailwind CSS Animate (Plugin)
- **Location**: `/tailwindcss-animate`
- **Type**: Animation utility plugin
- **Focus**: Component state transitions
- **See**: Animation Libraries section above

#### 9. Tailwind CSS Animated (Plugin)
- **Location**: `/tailwindcss-animated`
- **Type**: Animation utility plugin
- **Focus**: Fine-grained control
- **See**: Animation Libraries section above

---

### TEMPLATES & STARTERS (6)

#### 10. Animated Portfolio Framer Motion
- **Location**: `/animated-portfolio-framer-motion`
- **Type**: Portfolio template
- **Framework**: Next.js 14.0.3, React 18.2.0
- **Features**: Beautiful animations, responsive design, contact form
- **Tech**: Framer Motion 10.16.5, Tailwind CSS, EmailJS
- **Best For**: Portfolio websites, personal branding
- **Status**: Production-ready

#### 11. Next.js Animated Slider
- **Location**: `/nextjs-animated-slider`
- **Type**: Component + template
- **Framework**: Next.js 13.4.4, React 18.2.0
- **Features**: Animated carousel, touch support, keyboard nav
- **Tech**: Framer Motion 10.12.16, Tailwind CSS 3.3.2
- **Best For**: Image galleries, content sliders
- **Status**: Production-ready

#### 12. Template Next App Dir Tailwind
- **Location**: `/template-next-app-dir-tailwind`
- **Type**: Advanced template with video
- **Framework**: Next.js 15.4.7, React 19.0.0
- **Special Feature**: Remotion for video generation
- **Tech**: Remotion 4.0.0, Tailwind CSS 4.0.3
- **Best For**: Projects requiring video + web integration
- **Status**: Production-ready

#### 13. Tailnext
- **Location**: `/tailnext`
- **Type**: Production-ready website template
- **Framework**: Next.js 14+, React 18
- **Features**: Blog, Storybook integration, dark mode
- **Best For**: Complete websites, blogs, marketing sites
- **Status**: Production-ready
- **Demo**: https://tailnext.vercel.app/

#### 14. Tailwind Nextjs Starter Blog
- **Location**: `/tailwind-nextjs-starter-blog`
- **Type**: Professional blogging template
- **Framework**: Next.js 15+, React 19+
- **Status**: Stable (8000+ GitHub stars)
- **Features**: MDX, analytics, comments, newsletter integration
- **Best For**: Technical blogs, content marketing
- **Author**: Timothy Lin (@timlrx)
- **Demo**: https://tailwind-nextjs-starter-blog.vercel.app/

#### 15. ts-nextjs-tailwind-starter
- **Location**: `/ts-nextjs-tailwind-starter`
- **Type**: Developer boilerplate
- **Framework**: Next.js 15, React 19
- **Features**: Jest, ESLint, Husky, pre-built components
- **Best For**: Professional projects, team development
- **Author**: Theodorus Clarence
- **Status**: Well-maintained

---

### UI LAYOUT & ADVANCED (2)

#### 16. Cursify
- **Location**: `/cursify`
- **Type**: Advanced UI layout starter kit
- **Framework**: Next.js 15.3.1, React 19.1.0
- **Features**: Custom cursor, MDX integration, carousel, resizable panels
- **Tech**: Tailwind CSS, Motion 12.9.2, React Spring 9.7.5
- **Best For**: Complex interactive layouts
- **Status**: Active development

#### 17. NIM
- **Location**: `/nim`
- **Type**: Modern documentation template
- **Framework**: Next.js 15.1.1, React 19.0.0
- **Features**: MDX support, syntax highlighting, dark mode
- **Tech**: Tailwind CSS 4.0.0, Motion 11.15.0
- **Best For**: Documentation sites, technical blogs
- **Status**: Active

---

### 3D & WEB GRAPHICS (1)

#### 18. React Three Fiber
- **Location**: `/react-three-fiber`
- **Type**: 3D graphics library (monorepo)
- **Framework**: React 19.0.0, Three.js 0.172.0
- **Status**: Stable and widely used
- **Features**: WebGL rendering, React components for 3D
- **Platforms**: Web, React Native, Expo
- **Best For**: 3D web applications, interactive graphics
- **Tech**: Preconstruct, TypeScript, Playwright
- **GitHub**: https://github.com/pmndrs/react-three-fiber

---

### MCP SERVERS (7)

#### 19. shadcn-ui-mcp-server
- **Location**: `/shadcn-ui-mcp-server`
- **Type**: MCP Server
- **Version**: 1.1.4
- **Purpose**: AI-powered component access across frameworks
- **Frameworks**: React, Svelte, Vue, React Native
- **Status**: Production-ready
- **Installation**: `npx @jpisnice/shadcn-ui-mcp-server`
- **Transport**: stdio, SSE, dual mode
- **GitHub**: https://github.com/Jpisnice/shadcn-ui-mcp-server

#### 20. Manim MCP Server
- **Location**: `/manim-mcp-server`
- **Type**: MCP Server
- **Purpose**: Mathematical animation engine
- **Tech**: Python, Manim Community Edition
- **Use**: Educational animations, math visualizations
- **Status**: Active
- **GitHub**: https://github.com/abhiemj/manim-mcp-server

#### 21. ReactBits MCP Server
- **Location**: `/reactbits-mcp-server`
- **Type**: MCP Server
- **Version**: 1.1.2
- **Purpose**: Access 135+ animated React components
- **Status**: Active
- **Installation**: `npm install -g reactbits-dev-mcp-server`
- **GitHub**: https://github.com/ceorkm/reactbits-mcp-server

#### 22. MCP Tailwind Gemini
- **Location**: `/mcp-tailwind-gemini`
- **Type**: MCP Server
- **Version**: 1.0.0
- **Purpose**: AI-powered Tailwind CSS assistant
- **Features**: Component generation, class optimization, theme creation
- **Tech**: Gemini AI, Puppeteer, Sharp
- **Status**: Active
- **GitHub**: https://github.com/Tai-DT/mcp-tailwind-gemini

#### 23. MCP TailwindPlus
- **Location**: `/mcp-tailwindplus`
- **Type**: MCP Server
- **Language**: Python
- **Purpose**: Premium TailwindUI component access
- **Status**: Requires license
- **GitHub**: https://github.com/richardkmichael/mcp-tailwindplus

#### 24. UI/UX MCP Server
- **Location**: `/ui-ux-mcp-server`
- **Type**: MCP Server
- **Version**: 1.0.0
- **Purpose**: 5-in-1 workflow automation
- **Tools**: Storybook, Tailwind, Animation, Playwright, Workflows
- **Status**: Active
- **GitHub**: https://github.com/willem4130/ui-ux-mcp-server

#### 25. MCP for Next.js
- **Location**: `/mcp-for-next.js`
- **Type**: MCP Server template
- **Framework**: Next.js 15.2.4, React 19
- **Purpose**: Vercel-provided MCP server template
- **Status**: Official template
- **Deployment**: Vercel ready
- **GitHub**: https://github.com/vercel-labs/mcp-for-next.js

---

### UTILITIES & TOOLS (2)

#### 26. Figma Tokens Example
- **Location**: `/figma-tokens-example-tailwindcss-using-css-variables-reference`
- **Type**: Design token pipeline
- **Framework**: NuxtJS 3
- **Purpose**: Figma → Tailwind CSS workflow
- **Tech**: Style Dictionary, token-transformer
- **Best For**: Design-to-code automation
- **Status**: Educational example

#### 27. MCP-UI
- **Location**: `/mcp-ui`
- **Type**: Interactive UI components for MCP
- **Version**: 5.2.0
- **Purpose**: Rich UI in AI conversations
- **Languages**: TypeScript, Ruby, Python
- **Status**: Active
- **GitHub**: https://github.com/idosal/mcp-ui
- **Documentation**: https://mcpui.dev

---

### DOCUMENTATION & REFERENCE (2)

#### 28. Tailwind Animations
- **Location**: `/tailwind-animations`
- **Type**: Animation showcase/documentation
- **Purpose**: Learn animation utilities
- **Reference**: Multiple animation plugins
- **Status**: Educational resource

#### 29. Additional Projects
- Various other starters and utilities
- Monorepo examples
- Deployment templates

---

## TECHNOLOGY ECOSYSTEM SUMMARY

### Frontend Frameworks
- **Next.js**: 13.x - 15.x (primary choice)
- **React**: 18.2.x - 19.x (latest recommended)
- **React Native**: Support via react-three-fiber, expo integration
- **Vue/Svelte**: Limited support (via shadcn-ui-mcp-server)

### Styling & CSS
- **Tailwind CSS**: 3.x (stable) to 4.x (latest, CSS-first)
- **PostCSS**: Standard processing pipeline
- **CSS-in-JS**: None required (Tailwind first)
- **SASS**: Used in some projects (optional)

### Animation Libraries
- **Framer Motion**: 9.x - 12.x (primary React choice)
- **Motion One**: 12.x (low-level tools)
- **React Spring**: 9.7.5 (physics-based)
- **GSAP**: 3.12.5 (advanced sequences)
- **Tailwind Plugins**: animate, animated, motion (CSS-based)

### Component Systems
- **Radix UI**: Foundation for most projects
- **shadcn/ui**: Copy-paste architecture
- **Sera UI / SmoothUI**: Pre-built animated components
- **Custom Components**: Built on Radix + Tailwind

### Build Tools & Monorepos
- **Next.js**: Primary build tool
- **Turbo**: Monorepo orchestration
- **Rollup**: Library bundling
- **Preconstruct**: Module building
- **Vite**: Alternative build tool (some projects)

### Quality & Development
- **TypeScript**: 4.6.3 - 5.8.2 (full coverage)
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Playwright**: E2E testing
- **Jest/Vitest**: Unit testing
- **Husky**: Git hooks

### Special Tools
- **Remotion**: Video generation (template-next-app-dir-tailwind)
- **MDX**: Content management (nim, cursify, blog templates)
- **Storybook**: Component development (tailnext, ui/ux-mcp)
- **Three.js**: 3D graphics (react-three-fiber)

---

## QUICK ACCESS BY USE CASE

### I need to...

**Build a component library**
- shadcn/ui → `/ui`
- Or Sera UI → `/seraui`

**Create animated UI**
- SmoothUI → `/smoothui`
- Or Animated Portfolio template → `/animated-portfolio-framer-motion`

**Learn animations**
- Motion → `/motion`
- Or Next.js Animations → `/nextjs-animations`
- Or Tailwind Animations → `/tailwind-animations`

**Start a blog**
- Tailwind Nextjs Starter Blog → `/tailwind-nextjs-starter-blog`
- Or NIM → `/nim`

**Build a portfolio**
- Animated Portfolio Framer Motion → `/animated-portfolio-framer-motion`

**Work with 3D graphics**
- React Three Fiber → `/react-three-fiber`

**Integrate with AI**
- shadcn-ui-mcp-server → `/shadcn-ui-mcp-server`
- Or Other MCP servers → `/mcp-*`

**Setup a new project**
- ts-nextjs-tailwind-starter → `/ts-nextjs-tailwind-starter`
- Or Tailnext → `/tailnext`

**Generate videos + web**
- Template Next App Dir Tailwind → `/template-next-app-dir-tailwind`

---

## DOCUMENTATION NAVIGATION

### Start Here
1. **`QUICK_REFERENCE.md`** - Decision guide and cheat sheet
2. **`INDEX.md`** (this file) - Repository overview

### Deep Dive
3. **`REPOSITORY_ANALYSIS.md`** - Very thorough technical analysis

### Individual Projects
- Each major project has CLAUDE.md file with detailed documentation
- ReadME files available in project directories
- Official documentation links provided for each tool

---

## FILE LOCATIONS

All analysis documents are in `/Users/seman/Desktop/nextJS-tailwindCSS-repos/`:

```
/
├── INDEX.md                      ← You are here
├── QUICK_REFERENCE.md            ← Quick guide
├── REPOSITORY_ANALYSIS.md        ← Detailed analysis
│
├── motion/                       # Animation framework
├── react-three-fiber/            # 3D graphics
├── seraui/                       # Component library
├── ui/                           # shadcn/ui
├── smoothui/                     # Animated components
├── cursify/                      # Advanced layouts
├── nim/                          # Documentation template
│
├── tailwindcss-animate/          # Animation plugin
├── tailwindcss-animated/         # Animation plugin
├── tailwindcss-motion/           # Animation plugin
│
├── animated-portfolio-framer-motion/  # Portfolio template
├── nextjs-animated-slider/           # Slider component
├── nextjs-animations/                # Animation demo
├── template-next-app-dir-tailwind/   # Remotion template
├── tailnext/                         # Website template
├── tailwind-nextjs-starter-blog/     # Blog template
├── ts-nextjs-tailwind-starter/       # Boilerplate
│
├── shadcn-ui-mcp-server/        # MCP Server
├── manim-mcp-server/            # MCP Server
├── reactbits-mcp-server/        # MCP Server
├── mcp-tailwind-gemini/         # MCP Server
├── mcp-tailwindplus/            # MCP Server
├── ui-ux-mcp-server/            # MCP Server
├── mcp-for-next.js/             # MCP Server
├── mcp-ui/                      # MCP UI Components
│
├── figma-tokens-example-tailwindcss-using-css-variables-reference/  # Design tokens
└── tailwind-animations/         # Animation reference
```

---

## RECOMMENDED READING ORDER

1. **Quick Decision** (5 min)
   - Read: `QUICK_REFERENCE.md` "Quick Start Decisions"
   - Choose: Your project type

2. **Technology Overview** (10 min)
   - Read: `QUICK_REFERENCE.md` "Priority 10 - Must Know"
   - Browse: `QUICK_REFERENCE.md` animation comparison

3. **Deep Dive** (30 min)
   - Read: `REPOSITORY_ANALYSIS.md` "Priority Repositories Analysis"
   - Focus: Your specific use cases

4. **Implementation** (ongoing)
   - Reference: `QUICK_REFERENCE.md` "Animation Techniques Cheat Sheet"
   - Use: Individual project documentation as needed

---

## SUMMARY STATISTICS

- **Total Repositories**: 29
- **Component Libraries**: 5
- **Animation Libraries**: 4 (3 Tailwind plugins + Motion)
- **Templates & Starters**: 6
- **MCP Servers**: 7
- **3D/Advanced**: 2
- **Tools & Utilities**: 2
- **Documentation/Reference**: 2

**Technology Versions**:
- Next.js: 13.x - 15.x
- React: 18.x - 19.x
- Tailwind CSS: 3.x - 4.x
- TypeScript: 4.6.3 - 5.8.2

**Primary Animation Tools**:
- Framer Motion
- Tailwind CSS plugins (3 options)
- Motion One
- React Spring
- GSAP

---

**Last Updated**: 2025-10-24  
**Analysis Level**: Very Thorough  
**For Questions**: Reference the detailed documents  
**For Quick Answers**: Check QUICK_REFERENCE.md

