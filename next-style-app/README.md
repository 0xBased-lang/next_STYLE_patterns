# Next Style Patterns

> Comprehensive component library and animation system built with Next.js 15, Tailwind CSS 4, and Motion 12

## 🚀 Features

### Core Technologies
- ⚡ **Next.js 15** - Latest App Router with React Server Components
- 🎨 **Tailwind CSS 4** - Modern utility-first CSS framework
- 🎬 **Motion 12 & Framer Motion** - Advanced animation system
- 📦 **Component Registry** - Centralized component management
- 🔒 **TypeScript Strict Mode** - Full type safety
- ♿ **Radix UI** - Accessible component primitives

### Key Features
- ✅ **Component Registry System** - Browse, search, and install components
- ✅ **Unified Animation API** - Consistent animations across the app
- ✅ **Type-Safe Development** - Strict TypeScript configuration
- ✅ **Modern Tooling** - ESLint, Prettier, and automatic formatting
- ✅ **Comprehensive Documentation** - Examples and guides for all components
- ✅ **MCP Integration Ready** - Model Context Protocol support

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/0xBased-lang/next_STYLE_patterns.git

# Navigate to the app
cd next_STYLE_patterns/next-style-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
next-style-app/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # UI components
│   │   ├── motion/            # Animation components
│   │   ├── layout/            # Layout components
│   │   └── registry/          # Registry components
│   ├── lib/
│   │   ├── utils.ts           # Utility functions
│   │   ├── animations/        # Animation system
│   │   └── registry/          # Component registry
│   ├── hooks/                 # React hooks
│   ├── styles/
│   │   └── globals.css        # Global styles
│   ├── types/                 # TypeScript types
│   └── registry/              # Component registry data
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.ts             # Next.js configuration
```

## 🎨 Component Registry

The component registry is a centralized system for managing all UI components. Each component includes:

- **Metadata** - Name, description, category, tags
- **Source Code** - Component implementation
- **Examples** - Usage examples and demos
- **Dependencies** - Required packages
- **Related Components** - Suggested alternatives

### Using the Registry

```typescript
import { getComponent, searchComponents } from '@/lib/registry'

// Get a specific component
const buttonComponent = getComponent('button')

// Search for components
const results = searchComponents('button')

// Get all components by category
const uiComponents = getComponentsByCategory('ui')
```

## 🎬 Animation System

Comprehensive animation system with presets and utilities:

```typescript
import { animationPresets, motionVariants } from '@/lib/animations'

// Use animation presets
const fadeConfig = animationPresets.fade

// Apply motion variants
<motion.div
  initial="hidden"
  animate="visible"
  variants={motionVariants.slideUp}
>
  Content
</motion.div>
```

### Available Animation Presets

- **Fade** - Smooth fade in/out
- **Slide** - Slide from any direction
- **Zoom** - Scale animations
- **Bounce** - Spring-based bouncy animations
- **Spin** - Rotation animations
- **Shake** - Vibration effects
- **Scale** - Smooth scaling
- **Flip** - 3D flip animations

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking
npm run format           # Format with Prettier
npm run format:check     # Check formatting
```

### TypeScript Configuration

This project uses **strict mode** TypeScript with additional safety checks:

- ✅ `noUnusedLocals` - No unused variables
- ✅ `noUnusedParameters` - No unused parameters
- ✅ `noUncheckedIndexedAccess` - Safe array/object access
- ✅ `noImplicitReturns` - Explicit return types
- ✅ `exactOptionalPropertyTypes` - Exact optional types

## 📝 Creating Components

### Component Template

```typescript
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Your props here
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('your-classes', className)}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component }
```

### Registering a Component

```typescript
import type { ComponentRegistryItem } from '@/types/registry'
import { createComponentMeta } from '@/lib/registry'

export const myComponentItem: ComponentRegistryItem = {
  meta: createComponentMeta({
    id: 'my-component',
    name: 'My Component',
    description: 'A great component',
    category: 'ui',
    tags: ['tag1', 'tag2'],
  }),
  files: [
    {
      path: 'components/ui/my-component.tsx',
      type: 'component',
      content: '...',
      target: 'components/ui/my-component.tsx',
    },
  ],
  examples: [
    {
      name: 'Basic',
      description: 'Basic usage',
      code: `import { MyComponent } from '@/components/ui/my-component'

export function Demo() {
  return <MyComponent />
}`,
    },
  ],
}
```

## 🎯 Roadmap

### Immediate (Week 1) ✅
- [x] Next.js 15 + Tailwind CSS 4 setup
- [x] TypeScript strict mode configuration
- [x] Component registry system
- [x] Animation system
- [x] Base UI components

### Short-term (Weeks 2-3)
- [ ] shadcn/ui CLI integration
- [ ] Sera UI component reference
- [ ] MCP server setup
- [ ] Comprehensive docs site
- [ ] More UI components

### Medium-term (Month 1)
- [ ] 3D graphics integration
- [ ] GIF animation tools
- [ ] Starter templates
- [ ] Performance optimization
- [ ] Testing setup

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Documentation](./docs)
- [Component Registry](./src/registry)
- [Examples](./examples)
- [GitHub](https://github.com/0xBased-lang/next_STYLE_patterns)

## 💬 Support

For questions and support:
- Open an issue on [GitHub](https://github.com/0xBased-lang/next_STYLE_patterns/issues)
- Join our [Discord](https://discord.gg/0xBased)

---

**Built with ❤️ by 0xBased**
