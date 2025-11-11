# Sera UI - Complete Component Library Documentation

**Official Site**: https://seraui.com
**GitHub**: https://github.com/seraui/seraui
**Type**: Full-featured React/Next.js component library
**License**: MIT
**Version**: 0.1.0

---

## 🎯 What is Sera UI?

Sera UI is a **modern, production-ready UI component library** for React and Next.js applications. It's a **developer-first toolkit** that eliminates repetitive boilerplate code by providing 50+ pre-built, animated, accessible components with built-in theming and responsive design.

### Core Philosophy

> "Built by developers, for developers" - Sera UI prioritizes clean code, modularity, extensibility, and developer experience above all else.

**Key Differentiators**:
- **Animation-First**: Framer Motion animations built into every component
- **Visual Polish**: Components look professional out-of-the-box
- **Next.js Optimized**: Specifically designed for React 19 and Next.js 15
- **All-in-One**: Mixes utility effects, components, and motion in one package

---

## ✨ Complete Feature Set

### 1. Technical Foundation

**Framework Stack**:
- **Next.js**: 15.3.2 (App Router, Static Export, Turbopack)
- **React**: 19.0.0 (Latest with concurrent features)
- **TypeScript**: 5.x (Full type safety)
- **Tailwind CSS**: 4.x (Latest version with CSS-first config)

**Animation & Motion**:
- **Framer Motion**: 12.19.1 (Primary animation engine)
- **Motion**: 12.11.3 (Alternative motion library)
- **OGL**: 1.0.11 (WebGL for advanced effects)
- **Simplex Noise**: 4.0.3 (Procedural noise generation)

**UI Foundations**:
- **Radix UI**: Accessible primitive components
  - `@radix-ui/react-scroll-area`: 1.2.8
  - `@radix-ui/react-tabs`: 1.1.11
- **Class Variance Authority**: 0.7.1 (Component variants)
- **Clsx**: 2.1.1 (Conditional classes)
- **Tailwind Merge**: 3.3.1 (Smart class merging)

**Icon System**:
- **Lucide React**: 0.510.0 (8000+ SVG icons)
- **React Icons**: 4.12.0 (Additional icon sets)

**Theming & Styling**:
- **next-themes**: 0.4.6 (Dark/light mode)
- **tinycolor2**: 1.6.0 (Color manipulation)
- **Geist Font**: 1.4.2 (Modern typography)

**Documentation**:
- **MDX**: 3.1.0 (@next/mdx, @mdx-js/react)
- **React Live**: 4.1.8 (Live code examples)
- **Shiki**: 3.4.0 (Syntax highlighting)
- **Remark GFM**: 4.0.1 (GitHub-flavored markdown)

**Build & Performance**:
- **Bundle Analyzer**: 15.4.5 (Performance monitoring)
- **@vercel/analytics**: 1.5.0 (Usage analytics)
- **Lighthouse**: Built-in performance auditing
- **Turbopack**: Next.js native bundler

---

## 🧩 Complete Component Catalog (50+ Components)

### Essential UI Components

**Button Variants**:
- Primary, Secondary, Outline, Ghost, Link
- Loading states with spinners
- Icon buttons (left/right icon placement)
- Size variants: xs, sm, md, lg, xl
- Disabled states
- Full-width option
- Animation on hover/click

**Card System**:
- Basic card with header/body/footer
- Elevated card with shadows
- Interactive card with hover effects
- Card with image header
- Pricing card template
- Testimonial card template
- Feature card template

**Navigation**:
- **Navbar**: Responsive with mobile menu
- **Footer**: Multi-column layout
- **Dock**: macOS-style dock navigation
- **Breadcrumbs**: Navigation path indicator
- **Pagination**: Page navigation controls

**Tabs & Accordions**:
- **Tabs**: Classic horizontal tabs
- **Fancy Tabs**: Animated tab switching
- **Accordion**: Collapsible content sections
- **Vertical Tabs**: Sidebar-style navigation

### Form Components

**Input Elements**:
- **Login Form**: Email/password with validation
- **Signin Form**: Social auth integration
- **Password Input**: Show/hide toggle, strength indicator
- **Forgot Password**: Recovery form
- **Two-Step Auth**: 2FA code input
- **Multi Selector**: Advanced multi-select dropdown
- **Search**: Autocomplete search input
- **Combo Box**: Searchable select dropdown

**Form Features**:
- Real-time validation
- Error message display
- Success states
- Loading states
- Placeholder animations
- Focus management
- Keyboard navigation

### Animation Components

**Text Animations**:
- **Flip Words**: Rotating text effect
- **Text Reveal**: Progressive text appearance
- **Sparkles Text**: Animated sparkle particles
- **Decrypting**: Matrix-style text decryption
- **Typewriter**: Typing effect
- **Text Gradient**: Animated gradient text
- **Text Shimmer**: Shimmer effect on text

**Visual Effects**:
- **Shimmer**: Loading shimmer skeleton
- **Loaders**: 15+ loading spinner variants
- **Retro**: Retro-style animations
- **Particle Effects**: Canvas-based particles
- **Background Effects**: Animated backgrounds
- **Gradient Animations**: Animated color gradients

### Layout Components

**Grid Systems**:
- **Masonry**: Pinterest-style grid
- **Bento Grid**: Modern dashboard layout
- **Responsive Grid**: Auto-responsive columns
- **Feature Grid**: Feature showcase layout

**Content Organization**:
- **Carousel**: Image/content slider with controls
- **Marquee**: Infinite scrolling content
- **Divider**: Visual content separators (horizontal/vertical)
- **Spacer**: Consistent spacing utility

### Feedback & Notifications

**User Feedback**:
- **Toast**: Notification toasts (success/error/info/warning)
- **Alert**: Inline alert messages
- **Modal/Dialog**: Accessible modal dialogs
- **Drawer**: Side panel component
- **Tooltip**: Contextual information tooltips
- **Popover**: Floating information panels

**Toast Features**:
- Auto-dismiss with timer
- Custom duration
- Dismiss on click
- Position control (top/bottom, left/right/center)
- Stack management
- Animations (slide-in, fade)

### Data Display

**Visual Elements**:
- **Badge**: Status indicators and labels
- **Avatar**: User profile images with fallback
- **Avatar Group**: Stacked avatars
- **Progress Bar**: Loading progress indicator
- **Skeleton**: Loading state placeholders
- **Stat Card**: Statistical data display

**Interactive Elements**:
- **Dropdown Menu**: Context menus and select
- **Select**: Custom select dropdown
- **Checkbox**: Custom checkbox input
- **Radio**: Custom radio button
- **Switch**: Toggle switch control
- **Slider**: Range input slider

### Specialized Components

**Advanced Features**:
- **Infinite Scroll**: Automatic content loading
- **Virtual List**: Performance-optimized lists
- **Data Table**: Advanced table with sorting/filtering
- **Calendar**: Date picker component
- **Time Picker**: Time selection
- **Color Picker**: Color selection tool

**Utilities**:
- **Copy to Clipboard**: One-click copy
- **Image Lightbox**: Full-screen image viewer
- **Video Player**: Custom video controls
- **Audio Player**: Audio playback controls

---

## 🎨 Theming & Customization

### Built-in Theme System

**Dark/Light Mode**:
- Automatic system detection
- Manual toggle control
- Persistent user preference
- Smooth transitions between themes
- Per-component theme override

**Color Palette**:
```css
/* CSS Variables */
--primary: /* Primary brand color */
--secondary: /* Secondary color */
--accent: /* Accent color */
--background: /* Background color */
--foreground: /* Text color */
--muted: /* Muted background */
--muted-foreground: /* Muted text */
--border: /* Border color */
--input: /* Input background */
--ring: /* Focus ring color */
```

### Tailwind CSS Configuration

**Custom Animations**:
- 20+ custom animation keyframes
- Configurable duration/delay
- Easing function library
- Animation composition support

**Responsive Breakpoints**:
```js
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

### Component Customization

**Variant System** (Class Variance Authority):
```typescript
const buttonVariants = cva("base-button-classes", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background",
      secondary: "bg-secondary text-secondary-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
})
```

---

## 🚀 Installation & Setup

### Quick Start

**1. Install via CLI (Recommended)**:
```bash
# Install individual component
npx shadcn@latest add "https://seraui.com/registry/button.json"

# Using pnpm
pnpm dlx shadcn@latest add "https://seraui.com/registry/button.json"

# Using yarn
yarn dlx shadcn@latest add "https://seraui.com/registry/button.json"

# Using bun
bunx shadcn@latest add "https://seraui.com/registry/button.json"
```

**2. Manual Installation**:
1. Browse component library at https://seraui.com
2. Copy component code from documentation
3. Paste into your project
4. Install required dependencies
5. Customize as needed

**3. Clone Full Repository**:
```bash
git clone https://github.com/seraui/seraui.git
cd seraui
npm install
npm run dev
```

### Project Setup

**Prerequisites**:
- Node.js 18+ and npm
- Basic React/Next.js knowledge
- Tailwind CSS understanding
- TypeScript (optional but recommended)

**Configuration Files**:

**tailwind.config.js**:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
      animation: {
        // Custom animations
      },
    },
  },
  plugins: [],
}
```

**components.json** (shadcn/ui compatibility):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 📖 Usage Examples

### Basic Component Usage

**Button**:
```tsx
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button loading>Loading...</Button>
    </>
  )
}
```

**Card**:
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Animation Examples

**Flip Words**:
```tsx
import { FlipWords } from "@/components/ui/flip-words"

export default function Example() {
  const words = ["modern", "beautiful", "accessible", "performant"]

  return (
    <div className="text-4xl font-bold">
      Build <FlipWords words={words} /> websites
    </div>
  )
}
```

**Text Reveal**:
```tsx
import { TextReveal } from "@/components/ui/text-reveal"

export default function Example() {
  return (
    <TextReveal text="Revealed text animation" className="text-2xl" />
  )
}
```

### Form Examples

**Login Form**:
```tsx
import { LoginForm } from "@/components/forms/login-form"

export default function LoginPage() {
  const handleLogin = async (data) => {
    console.log(data) // { email, password }
  }

  return (
    <div className="container max-w-md mx-auto">
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}
```

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-toast"

export default function Example() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success!",
          description: "Your action was completed successfully.",
          variant: "success",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
```

---

## 🏗 Project Structure

```
seraui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (landing)/               # Landing page group
│   │   ├── docs/                    # Documentation pages
│   │   │   └── [component]/         # Dynamic component pages
│   │   │       ├── page.mdx         # MDX documentation
│   │   │       ├── [component].tsx  # Component source
│   │   │       └── [component]-view.tsx # Live demo
│   │   ├── standalone/              # Standalone previews
│   │   ├── sponsor/                 # Sponsorship page
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── not-found.tsx            # 404 page
│   │
│   ├── components/
│   │   ├── analytics/               # Analytics components
│   │   ├── core/                    # Core UI building blocks
│   │   ├── docs/                    # Documentation-specific
│   │   ├── performance/             # Performance monitoring
│   │   ├── seo/                     # SEO optimization
│   │   ├── site/                    # Site-specific (header, footer)
│   │   └── ui/                      # Reusable UI components
│   │       ├── button.tsx           # Button component
│   │       ├── card.tsx             # Card component
│   │       ├── toast.tsx            # Toast component
│   │       └── ...                  # 50+ components
│   │
│   ├── config/
│   │   ├── site.ts                  # Site configuration
│   │   └── theme.ts                 # Theme configuration
│   │
│   ├── constants/
│   │   ├── navigation.ts            # Navigation structure
│   │   └── components.ts            # Component registry
│   │
│   ├── contexts/
│   │   ├── theme-context.tsx        # Theme provider
│   │   └── toast-context.tsx        # Toast provider
│   │
│   ├── hooks/
│   │   ├── use-toast.ts             # Toast hook
│   │   ├── use-theme.ts             # Theme hook
│   │   └── use-media-query.ts       # Responsive hook
│   │
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   └── cn.ts                    # Class name merger
│   │
│   └── scripts/
│       ├── auto-generate-components.ts  # Component generator
│       ├── build-registry.ts           # Registry builder
│       ├── build-md-files.ts          # Markdown processor
│       └── generate-sitemap.ts        # Sitemap generator
│
├── public/
│   ├── registry/                    # Component registry JSON
│   │   ├── button.json              # Button registry
│   │   ├── card.json                # Card registry
│   │   └── ...                      # All components
│   ├── docs-md/                     # Generated markdown
│   └── assets/                      # Static assets
│
├── package.json                     # Dependencies
├── next.config.ts                   # Next.js config
├── tailwind.config.js               # Tailwind config
├── tsconfig.json                    # TypeScript config
├── components.json                  # Shadcn config
└── README.md                        # Documentation
```

---

## ⚡ Performance Features

### Build Optimizations

**Static Export**:
```typescript
// next.config.ts
const nextConfig = {
  output: "export",           // Generate static HTML
  trailingSlash: false,
  reactStrictMode: true,
  compress: true,             // Gzip compression
  poweredByHeader: false,     // Remove X-Powered-By header

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-icons",
    ],
    scrollRestoration: true,
  },
}
```

**Bundle Analysis**:
```bash
# Analyze bundle size
npm run build:analyze

# Performance audit
npm run perf:audit

# Bundle optimization
npm run perf:optimize
```

### Performance Metrics

**Target Scores**:
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

**Optimization Strategies**:
- Code splitting per route
- Dynamic imports for heavy components
- Image optimization (Next.js Image)
- Font optimization (Geist with subset)
- CSS-in-JS eliminated (Tailwind only)
- Tree-shaking enabled
- Minification and compression

---

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

**Keyboard Navigation**:
- Tab navigation support
- Focus visible indicators
- Escape key handling
- Arrow key navigation (menus, tabs)
- Enter/Space activation
- Focus trapping (modals)

**Screen Reader Support**:
- Semantic HTML elements
- ARIA labels and descriptions
- ARIA live regions for dynamic content
- Proper heading hierarchy
- Alt text for images
- Form label associations

**Visual Accessibility**:
- Color contrast ratios >4.5:1
- Focus indicators visible
- No content only in color
- Text resizable up to 200%
- No flashing content

**Implementation Example**:
```tsx
<button
  aria-label="Close dialog"
  aria-describedby="dialog-description"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>
```

---

## 🧪 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run export          # Export static site

# Component Development
npm run generate:components    # Auto-generate component registry
npm run build:registry        # Build component registry
npm run watch:components      # Watch for changes
npm run build:md             # Build markdown docs

# Performance & Analysis
npm run build:analyze         # Analyze bundle size
npm run perf:audit           # Run Lighthouse audit
npm run perf:bundle          # Analyze bundle composition
npm run perf:optimize        # Optimize build output
```

### Adding New Components

**1. Create Component Structure**:
```bash
src/app/docs/my-component/
├── page.mdx                 # Documentation
├── my-component.tsx         # Implementation
└── my-component-view.tsx    # Demo component
```

**2. Component Template**:
```tsx
// my-component.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

**3. Update Navigation**:
```typescript
// src/constants/navigation.ts
export const navigation = [
  {
    title: "My Component",
    href: "/docs/my-component",
    items: [],
  },
]
```

**4. Build Registry**:
```bash
npm run build:registry
```

---

## 📊 Component Registry System

### Registry Structure

**Component Registry JSON**:
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "title": "Button",
  "description": "A customizable button component with multiple variants",
  "type": "registry:ui",
  "dependencies": ["class-variance-authority", "lucide-react"],
  "devDependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ]
}
```

### CLI Installation Flow

```bash
# User runs CLI
npx shadcn@latest add "https://seraui.com/registry/button.json"

# CLI fetches JSON
# Parses dependencies
# Downloads component files
# Installs npm packages
# Places files in project

# Result:
# - components/ui/button.tsx created
# - Dependencies installed
# - Ready to use
```

---

## 🎓 Best Practices

### Component Usage

**DO**:
- ✅ Use TypeScript for type safety
- ✅ Leverage variant system for customization
- ✅ Follow existing naming conventions
- ✅ Use `cn()` utility for conditional classes
- ✅ Support both themes (dark/light)
- ✅ Include ARIA attributes
- ✅ Test keyboard navigation
- ✅ Optimize component performance

**DON'T**:
- ❌ Modify core component files directly
- ❌ Override Tailwind classes without `cn()`
- ❌ Ignore accessibility requirements
- ❌ Skip TypeScript types
- ❌ Hardcode colors (use CSS variables)
- ❌ Forget responsive design
- ❌ Neglect loading states

### Performance Tips

1. **Code Splitting**: Use dynamic imports for large components
2. **Lazy Loading**: Load components on-demand
3. **Memoization**: Use React.memo for expensive components
4. **Image Optimization**: Always use Next.js Image component
5. **Bundle Analysis**: Regularly check bundle size
6. **Tree Shaking**: Import only what you need

---

## 🔧 Advanced Customization

### Theme Extension

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          // ... custom color scale
          900: '#7f1d1d',
        },
      },
      animation: {
        'custom-bounce': 'bounce 1s ease-in-out infinite',
        'custom-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
}
```

### Custom Component Variants

```tsx
import { cva } from "class-variance-authority"

const customButtonVariants = cva("base-button", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-500 text-white",
      danger: "bg-red-500 text-white",
    },
    size: {
      small: "text-sm py-1 px-2",
      medium: "text-base py-2 px-4",
      large: "text-lg py-3 px-6",
    },
  },
  compoundVariants: [
    {
      intent: "primary",
      size: "large",
      class: "uppercase",
    },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
})
```

---

## 📚 Complete Use Cases

### 1. SaaS Dashboard
- **Components**: Navbar, Sidebar, Card, Data Table, Stats, Charts
- **Features**: User authentication, data visualization, responsive layout
- **Performance**: Static export, code splitting

### 2. Marketing Website
- **Components**: Hero section, Feature grid, Pricing cards, Testimonials, CTA buttons
- **Features**: SEO optimization, animations, responsive design
- **Performance**: Lighthouse 95+, fast loading

### 3. E-commerce Platform
- **Components**: Product cards, Carousel, Shopping cart, Checkout forms
- **Features**: Product filtering, search, cart management
- **Performance**: Image optimization, lazy loading

### 4. Documentation Site
- **Components**: Sidebar navigation, Code blocks, Tabs, Search
- **Features**: MDX support, syntax highlighting, dark mode
- **Performance**: Static generation, instant navigation

### 5. Admin Panel
- **Components**: Data tables, Forms, Modals, Notifications
- **Features**: CRUD operations, role management, analytics
- **Performance**: Optimistic updates, caching

---

## 🚨 Common Issues & Solutions

### Issue: Styles Not Applying

**Solution**:
```bash
# Ensure Tailwind config includes component paths
# tailwind.config.js
content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx}",
]

# Rebuild
npm run dev
```

### Issue: TypeScript Errors

**Solution**:
```bash
# Install type definitions
npm install -D @types/react @types/react-dom @types/node

# Update tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Dark Mode Not Working

**Solution**:
```tsx
// Ensure ThemeProvider is in root layout
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 🌟 Sera UI vs Competitors

| Feature | Sera UI | shadcn/ui | Material-UI | Chakra UI |
|---------|---------|-----------|-------------|-----------|
| **Philosophy** | Pre-built + animated | Copy-paste | Component library | Component library |
| **Animations** | Built-in (Framer Motion) | Add separately | Basic | Basic |
| **Bundle Size** | Medium | Minimal | Large | Medium |
| **Customization** | Theme-based | Full source | Theme-based | Theme-based |
| **TypeScript** | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Accessibility** | ✅ WCAG AA | ✅ WCAG AA | ✅ WCAG AA | ✅ WCAG AA |
| **Dark Mode** | ✅ Built-in | ✅ Manual | ✅ Built-in | ✅ Built-in |
| **Next.js Support** | ✅ Optimized | ✅ Native | ✅ Yes | ✅ Yes |
| **Learning Curve** | Low | Low | Medium | Medium |
| **Component Count** | 50+ | 40+ | 100+ | 50+ |
| **Best For** | Rapid dev | Custom systems | Enterprise | Flexibility |

---

## 📖 Additional Resources

### Official Links
- **Website**: https://seraui.com
- **Documentation**: https://seraui.com/docs
- **GitHub**: https://github.com/seraui/seraui
- **Discord**: https://discord.gg/XqQkbTptvJ
- **Twitter**: @pimjoHQ

### Community
- **Product Hunt**: Featured with positive reviews
- **GitHub Discussions**: Active community support
- **Issues**: Bug reports and feature requests

### Learning Resources
- Component documentation with live examples
- Copy-paste code snippets
- Usage examples for every component
- Best practices guide
- Performance optimization tips

---

**Last Updated**: 2025-10-24
**Purpose**: Complete reference for Sera UI component library
**Maintainer**: Sera UI Team
**License**: MIT - Free for commercial use
