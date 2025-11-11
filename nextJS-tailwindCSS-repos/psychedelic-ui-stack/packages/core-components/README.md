# @psychedelic-ui/core-components

Core UI component library with multi-aesthetic style variant support.

## Features

- 🎨 **4 Visual Aesthetics**: Conspiracy, Neon Crypto, Organic, Experimental
- ⚡ **Performance Optimized**: Tree-shakeable, code-splittable, <100KB gzipped
- ♿ **Accessible**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 🎭 **Flexible**: CVA-based variants, composable with Radix UI primitives
- 📦 **TypeScript**: Full type safety with exported definitions
- 🌙 **Dark Mode**: Built-in support across all aesthetics

## Installation

```bash
pnpm add @psychedelic-ui/core-components
```

## Quick Start

```tsx
import { Button } from '@psychedelic-ui/core-components'

export function App() {
  return (
    <div>
      {/* Conspiracy Establishment style (default) */}
      <Button>Access Classified Files</Button>

      {/* Neon Crypto style */}
      <Button variant="neon-crypto">Connect Wallet</Button>

      {/* Organic Harmony style */}
      <Button variant="organic">Join Community</Button>

      {/* Experimental Psychedelic style */}
      <Button variant="experimental">Enter Experience</Button>
    </div>
  )
}
```

## Available Components

Currently available:
- **Button** - Multi-variant button with hover animations

Coming soon:
- Card
- Input
- Modal
- Navigation
- Tooltip
- ... and 25+ more

## Style Variants

### Conspiracy Establishment 🔮
Traditional boardroom meets Matrix conspiracy tech. Dark mahogany, Matrix green code, gold accents, classified document aesthetics.

**Use cases**: Prediction markets, exclusive clubs, mystery games, investigative journalism

### Neon Crypto 🌈
Playful Web3 with vibrant neon accents. Dark backgrounds, glowing effects, clean modern design.

**Use cases**: NFT collections, crypto apps, Web3 platforms, meme tokens

### Organic Harmony 🧬
Soft, flowing, uplifting. Warm gradients, morphing shapes, gentle animations.

**Use cases**: Wellness apps, community platforms, SaaS products, creative services

### Experimental Psychedelic 🌌
Full-spectrum psychedelic with 3D and shaders. Rainbow gradients, extreme animations, boundary-pushing visuals.

**Use cases**: Art portfolios, music sites, experimental projects, interactive experiences

## API

### Button

```tsx
interface ButtonProps {
  variant?: 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  // ... extends HTMLButtonElement props
}
```

**Props**:
- `variant` - Visual aesthetic (default: `'conspiracy'`)
- `size` - Button size (default: `'md'`)
- `asChild` - Render as child element for composition
- All standard HTML button attributes supported

**Example**:
```tsx
<Button
  variant="neon-crypto"
  size="lg"
  onClick={() => console.log('Clicked!')}
>
  Connect Wallet
</Button>
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { StyleVariant, ButtonProps } from '@psychedelic-ui/core-components'

const variant: StyleVariant = 'conspiracy'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

## Accessibility

All components meet WCAG 2.1 AA compliance:
- ✅ Keyboard navigation
- ✅ ARIA labels and roles
- ✅ Color contrast ≥4.5:1
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ Respects `prefers-reduced-motion`

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari iOS 15+
- Chrome Android 120+

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm type-check
```

## License

MIT

## Links

- [Documentation](../../README.md)
- [GitHub](https://github.com/yourusername/psychedelic-ui-stack)
- [npm](https://www.npmjs.com/package/@psychedelic-ui/core-components)
