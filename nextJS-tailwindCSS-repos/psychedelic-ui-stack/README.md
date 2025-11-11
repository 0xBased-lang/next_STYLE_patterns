# 🎨 Psychedelic UI Stack

**Multi-Aesthetic Component Library & Template System**

A comprehensive UI component library supporting 4 distinct visual aesthetics, built with Next.js 15, React 19, Tailwind CSS 4, and advanced animation libraries.

---

## 🎯 Project Vision

Build a master component library with style variants that can power multiple distinct aesthetics, enabling rapid development of visually unique projects while maintaining code reusability and consistency.

### Supported Aesthetics

1. **🔮 Conspiracy Establishment** - Traditional boardroom meets Matrix conspiracy tech
2. **🌈 Neon Crypto** - Playful Web3/crypto with vibrant neon accents (KEKTECH style)
3. **🧬 Organic Harmony** - Soft, flowing, uplifting morphing shapes
4. **🌌 Experimental Psychedelic** - Full-spectrum psychedelic with 3D and shaders

---

## 📁 Project Structure

```
psychedelic-ui-stack/
├── docs/                              # BMAD documentation
│   ├── prd/                           # Product Requirements Documents
│   ├── architecture/                  # Technical architecture docs
│   └── stories/                       # User stories and implementation tasks
│
├── packages/                          # Monorepo packages
│   ├── core-components/               # Shared base components (Button, Card, etc.)
│   ├── conspiracy-establishment/      # Conspiracy aesthetic components
│   ├── neon-crypto/                   # KEKTECH-style components
│   ├── organic-harmony/               # Soft, uplifting components
│   └── experimental/                  # Full psychedelic with 3D
│
├── templates/                         # Full page templates
│   ├── conspiracy-prediction-market/  # Scientist Market template
│   ├── nft-collection/                # KEKTECH-style NFT template
│   └── ...                            # More templates
│
├── demos/                             # Live demo applications
│   └── showcase/                      # Interactive showcase of all styles
│
├── tools/                             # Build tools and utilities
│   └── style-variant-generator/       # CLI for generating style variants
│
└── .bmad/                             # BMAD Method configuration (from parent)
```

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.x** - Latest App Router with Server Components
- **React 19.x** - Latest React with Concurrent Features
- **TypeScript 5.8+** - Full type safety
- **Tailwind CSS 4.x** - Utility-first styling

### Animation Libraries
- **Framer Motion 12.x** - Primary animation framework
- **Motion One** - Low-level animation engine
- **GSAP 3.x** - Complex timeline animations (Conspiracy style)
- **React Spring 9.x** - Physics-based animations (Organic style)
- **Tailwind Plugins**:
  - `tailwindcss-animated` - Fine-grained control
  - `tailwindcss-motion` - Inline animation syntax
  - `tailwindcss-animate` - Enter/exit animations

### 3D & Advanced Effects
- **React Three Fiber** - 3D WebGL graphics (Experimental style)
- **Three.js** - Core 3D library
- **Custom Shaders** - GLSL shaders for psychedelic effects

### Component System
- **Radix UI** - Accessible primitive components
- **CVA (Class Variance Authority)** - Style variant management
- **shadcn/ui patterns** - Copy-paste architecture inspiration

### Build Tools
- **Turbo** - Monorepo task orchestration
- **tsup** - TypeScript library bundler
- **Changeset** - Version management and changelogs

---

## 🎨 Style Variant System

All core components support 4 aesthetic variants through a unified API:

```tsx
import { Button } from '@psychedelic-ui/core'

// Conspiracy Establishment style
<Button variant="conspiracy">
  Access Classified Files
</Button>

// Neon Crypto style
<Button variant="neon-crypto">
  Connect Wallet
</Button>

// Organic Harmony style
<Button variant="organic">
  Join Community
</Button>

// Experimental Psychedelic style
<Button variant="experimental">
  Enter Experience
</Button>
```

### Style Variant Architecture

Each style variant includes:
- **Color palette** - Custom Tailwind theme
- **Typography** - Font families and type scale
- **Animation presets** - Style-specific motion patterns
- **Component variants** - Visual style overrides
- **Effects library** - Unique animations (Matrix rain, glitch, morphing, etc.)

---

## 📦 Package Overview

### `@psychedelic-ui/core-components`
Shared base components with style variant support:
- `Button` - All button variations with animations
- `Card` - Container component with style-specific effects
- `Input` - Form inputs with validation states
- `Navigation` - Nav components (header, sidebar, mobile)
- `Modal` - Dialog/modal with entrance animations
- `Tooltip` - Context-aware tooltips
- ... and 30+ more core components

### `@psychedelic-ui/conspiracy-establishment`
Conspiracy aesthetic-specific components:
- `MatrixCodeRain` - Background Matrix-style code animation
- `ClassifiedStamp` - Document stamp animation effect
- `GlitchText` - Text distortion and corruption effects
- `RedactedText` - Black bar reveal animations
- `MahoganyCard` - Textured card with leather/wood feel
- `SecretDossier` - Document-style content container
- `CRTOverlay` - Vintage monitor scan line effect

### `@psychedelic-ui/neon-crypto`
KEKTECH-style crypto/Web3 components:
- `WalletConnectButton` - Web3Modal integration
- `NFTCard` - NFT display with hover effects
- `SlimeDrip` - Brand-specific animation element
- `CryptoStats` - Animated number displays
- `ChainSelector` - Network switching UI
- `TokenBalance` - Balance display with animations

### `@psychedelic-ui/organic-harmony`
Soft, uplifting components:
- `MorphingBlob` - Shape-shifting background element
- `FloatingElement` - Gentle hover animations
- `SoftGradientCard` - Smooth color transitions
- `BubbleButton` - Bouncy, playful interactions
- `HarmonyNav` - Smooth, flowing navigation
- `CelebrationEffect` - Confetti/sparkle animations

### `@psychedelic-ui/experimental`
Full psychedelic with 3D:
- All core components + extreme variations
- 3D elements with React Three Fiber
- WebGL shader effects
- Particle systems
- Advanced interaction patterns

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+ (recommended for monorepos)

### Installation

```bash
# Clone or navigate to project
cd psychedelic-ui-stack

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
```

### Using in Your Project

```bash
# Install specific style package
pnpm add @psychedelic-ui/conspiracy-establishment

# Or install core + multiple styles
pnpm add @psychedelic-ui/core-components \
         @psychedelic-ui/conspiracy-establishment \
         @psychedelic-ui/neon-crypto
```

---

## 📚 Documentation

- **[PRD](./docs/prd/)** - Product Requirements Documents
- **[Architecture](./docs/architecture/)** - Technical architecture and decisions
- **[Component Docs](./packages/core-components/README.md)** - Component API reference
- **[Style Guide](./docs/style-guide.md)** - Design system documentation
- **[Examples](./demos/)** - Live examples and demos

---

## 🎯 Current Focus: Phase 1 - Foundation

**Status**: 🚧 In Progress

### Completed
- ✅ Project structure created
- ✅ Directory organization established

### In Progress
- 🔄 BMAD PRD creation
- 🔄 Core component architecture design
- 🔄 Style variant system design

### Next Steps
1. Complete PRD with detailed requirements
2. Design component API and architecture
3. Build core shared components
4. Implement style variant system
5. Create Conspiracy Establishment components (highest priority)

---

## 🗺️ Roadmap

### Phase 1: Foundation (Weeks 1-3)
- Design master component architecture
- Build core shared components (Button, Card, Input, etc.)
- Implement style variant system
- Set up build tooling and monorepo configuration

### Phase 2: Conspiracy Establishment (Weeks 4-6)
- Build Conspiracy-specific components
- Create Scientist Market template
- Test with real project implementation
- Refine based on feedback

### Phase 3: Additional Styles (Weeks 7-9)
- Enhance KEKTECH/Neon Crypto components
- Build Organic Harmony components
- Create templates for each style

### Phase 4: Experimental & Polish (Weeks 10-12)
- Add 3D/WebGL experimental components
- Polish all packages
- Complete documentation
- Build showcase demo site

### Phase 5: Launch (Week 13+)
- Public release
- npm package publishing
- Documentation site launch
- Community building

---

## 🤝 Development Approach

This project follows **BMAD Method** (BMad Agile Development):
- **Product Manager (PM)**: Creates PRDs and manages requirements
- **Architect**: Designs technical architecture
- **Developer (Dev)**: Implements features with context awareness
- **QA**: Ensures quality and testing coverage

All agents work collaboratively through structured workflows defined in `.bmad-core/`.

---

## 📄 License

MIT License - Free for commercial and personal use

---

## 🔗 Related Projects

- **KEKTECH** - NFT collection using Neon Crypto style
- **Scientist Market** - Prediction market using Conspiracy Establishment style
- **Happy Market** - Future prediction market using Organic Harmony style

---

## 📞 Contact

For questions or collaboration:
- Project maintained as part of Next.js/Tailwind CSS repository collection
- BMAD Method powered development
- Built with ❤️ and psychedelic vibes ✨

---

**Last Updated**: 2025-10-24
**Version**: 0.1.0 (Foundation Phase)
**Status**: 🚧 Active Development
