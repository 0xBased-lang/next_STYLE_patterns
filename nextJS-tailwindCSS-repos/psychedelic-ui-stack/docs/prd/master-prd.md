# Psychedelic UI Stack - Product Requirements Document (PRD)

**Document Version**: 1.0
**Date**: 2025-10-24
**Status**: Draft
**Author**: Mary (BMAD Analyst) & John (BMAD PM)
**Project**: Multi-Aesthetic Component Library & Template System

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-24 | 1.0 | Initial PRD creation | Mary & John (BMAD) |

---

## Goals and Background Context

### Goals

1. **Build reusable component library** supporting 4 distinct visual aesthetics with shared architecture
2. **Enable rapid development** of visually unique projects while maintaining code consistency
3. **Support real projects** (Scientist Market, KEKTECH, Happy Market) with production-ready components
4. **Create commercial value** through unique aesthetic combinations not available in existing markets
5. **Establish foundation** for potential marketplace product ($150-$300 per template tier)
6. **Demonstrate capabilities** as portfolio pieces showcasing animation and design expertise

### Background Context

The project emerges from a collection of 29+ Next.js/Tailwind CSS repositories containing animation libraries, component systems, and UI frameworks. Three specific projects require distinct visual aesthetics:

1. **Scientist Market** (Conspiracy prediction market) - Needs "traditional establishment meets Matrix conspiracy" aesthetic
2. **KEKTECH** (Existing NFT collection) - Already uses playful neon crypto style, needs enhancement
3. **Happy Market** (Future prediction market) - Requires uplifting, organic, harmonic visual style

Rather than building components separately for each project, this PRD defines a unified component library with style variant system that serves all projects while remaining commercially viable as standalone product.

**Current landscape**: No existing template marketplace offers "Conspiracy Establishment" aesthetic. Most animation-focused component libraries focus on single styles rather than multi-aesthetic approaches. This creates unique market opportunity.

---

## Requirements

### Functional Requirements

#### Core Component Library
- **FR1**: System shall provide 30+ core UI components (Button, Card, Input, Modal, Navigation, Tooltip, etc.)
- **FR2**: Each core component shall support 4 aesthetic variants: conspiracy, neon-crypto, organic, experimental
- **FR3**: Components shall be framework-agnostic at core level with React 19 implementation
- **FR4**: System shall use CVA (Class Variance Authority) for style variant management
- **FR5**: All components shall support dark mode and light mode where applicable
- **FR6**: Components shall expose consistent API across all aesthetic variants

#### Style Variant System
- **FR7**: System shall implement unified theming architecture for all 4 aesthetics
- **FR8**: Each aesthetic shall include: color palette, typography, animation presets, effects library
- **FR9**: Style variants shall be tree-shakeable (users only bundle what they use)
- **FR10**: System shall allow runtime style switching for demo/showcase purposes
- **FR11**: Each aesthetic shall maintain visual consistency across all components

#### Aesthetic-Specific Components

**Conspiracy Establishment**:
- **FR12**: MatrixCodeRain component with configurable speed, density, and color
- **FR13**: GlitchText component with distortion effects and timing controls
- **FR14**: ClassifiedStamp component with reveal animations
- **FR15**: RedactedText component with progressive reveal on interaction
- **FR16**: MahoganyCard with texture overlays (leather, wood) and gold accents
- **FR17**: CRTOverlay with scan line effects and vintage monitor aesthetic

**Neon Crypto**:
- **FR18**: WalletConnectButton with Web3Modal integration and connection states
- **FR19**: NFTCard with hover 3D tilt effects and image optimization
- **FR20**: SlimeDrip animation component for brand integration
- **FR21**: CryptoStats with animated number counters and trend indicators
- **FR22**: ChainSelector for blockchain network switching
- **FR23**: TokenBalance display with formatting and animation

**Organic Harmony**:
- **FR24**: MorphingBlob with SVG shape-shifting animations
- **FR25**: FloatingElement with gentle physics-based hover
- **FR26**: SoftGradientCard with smooth color transitions
- **FR27**: BubbleButton with bouncy interaction feedback
- **FR28**: CelebrationEffect with confetti/sparkle particle systems

**Experimental Psychedelic**:
- **FR29**: All core components with extreme animation variations
- **FR30**: 3D components using React Three Fiber integration
- **FR31**: WebGL shader effects (kaleidoscope, distortion, color shifts)
- **FR32**: Particle systems with configurable behaviors
- **FR33**: Advanced scroll-driven animations

#### Templates
- **FR34**: System shall provide full-page template for Conspiracy Prediction Market
- **FR35**: System shall provide NFT Collection Landing Page template (Neon Crypto style)
- **FR36**: System shall provide Community Platform template (Organic style)
- **FR37**: Each template shall be fully responsive (mobile, tablet, desktop)
- **FR38**: Templates shall include production-ready code (error handling, loading states, etc.)

#### Developer Experience
- **FR39**: All packages shall be published to npm with proper versioning
- **FR40**: System shall provide CLI tool for generating new components with style variants
- **FR41**: Each component shall have TypeScript definitions exported
- **FR42**: System shall include Storybook for component documentation and testing
- **FR43**: All components shall include usage examples and code snippets
- **FR44**: System shall provide migration guide between versions

#### Build System
- **FR45**: Monorepo shall use Turbo for task orchestration
- **FR46**: Each package shall be independently buildable and publishable
- **FR47**: System shall use Changeset for version management and changelogs
- **FR48**: Build output shall be optimized for tree-shaking (ESM + CJS)
- **FR49**: System shall generate TypeScript declaration files automatically

### Non-Functional Requirements

#### Performance
- **NFR1**: Initial bundle size for core components shall be <100KB (gzipped)
- **NFR2**: Animation frame rate shall maintain ≥60fps on modern devices
- **NFR3**: Time to Interactive (TTI) for templates shall be <3 seconds on 3G
- **NFR4**: Largest Contentful Paint (LCP) shall be <2.5 seconds
- **NFR5**: Core component imports shall support code splitting
- **NFR6**: Heavy animations (3D, shaders) shall lazy load on interaction

#### Accessibility
- **NFR7**: All components shall meet WCAG 2.1 AA compliance minimum
- **NFR8**: Animations shall respect `prefers-reduced-motion` system setting
- **NFR9**: All interactive elements shall be keyboard accessible
- **NFR10**: Components shall include proper ARIA labels and roles
- **NFR11**: Color contrast ratios shall meet AA standards (4.5:1 text, 3:1 UI)
- **NFR12**: Focus indicators shall be clearly visible on all interactive elements

#### Browser Support
- **NFR13**: System shall support last 2 versions of Chrome, Firefox, Safari, Edge
- **NFR14**: Mobile Safari iOS 15+ and Chrome Android 120+ shall be supported
- **NFR15**: Graceful degradation shall be implemented for older browsers
- **NFR16**: WebGL/3D features shall have non-3D fallbacks for unsupported browsers

#### Quality & Testing
- **NFR17**: Core components shall have ≥80% unit test coverage
- **NFR18**: Critical user paths in templates shall have E2E test coverage
- **NFR19**: All components shall pass ESLint strict configuration
- **NFR20**: Build shall fail on TypeScript errors
- **NFR21**: Visual regression testing shall be implemented for component variations

#### Documentation
- **NFR22**: Each component shall have JSDoc comments for TypeScript IntelliSense
- **NFR23**: README files shall include installation, usage, and API reference
- **NFR24**: Storybook shall document all component variants and props
- **NFR25**: Architecture documentation shall explain design decisions
- **NFR26**: Migration guides shall be provided for breaking changes

#### Maintainability
- **NFR27**: Code shall follow consistent formatting (Prettier configuration)
- **NFR28**: Git commits shall use conventional commits format
- **NFR29**: Pull requests shall require review and passing CI checks
- **NFR30**: Dependencies shall be kept up-to-date (automated Dependabot)
- **NFR31**: Security vulnerabilities shall be addressed within 7 days

#### Scalability
- **NFR32**: System architecture shall support adding new aesthetic styles without refactoring core
- **NFR33**: Component API shall remain stable across minor versions (semver)
- **NFR34**: Style variant system shall support unlimited variants without performance degradation
- **NFR35**: Monorepo structure shall scale to 20+ packages without build performance issues

---

## User Interface Design Goals

### Overall UX Vision

The component library serves dual audiences:
1. **Developers** who integrate components into projects
2. **End users** who experience the final applications

For **developers**, UX focuses on:
- Intuitive API design (consistent props, predictable behavior)
- Excellent TypeScript IntelliSense
- Clear documentation with copy-paste examples
- Fast iteration cycles (hot reload, minimal rebuild time)

For **end users**, UX focuses on:
- Smooth, delightful animations that enhance rather than distract
- Fast, responsive interactions (no jank, no lag)
- Accessible, inclusive design (keyboard, screen readers, reduced motion)
- Aesthetic consistency within each style variant

### Key Interaction Paradigms

1. **Style Variant Selection**: Developers choose aesthetic at import/component level
2. **Composition over Configuration**: Complex components built from simple primitives
3. **Progressive Enhancement**: Basic functionality works, animations enhance
4. **Responsive by Default**: Mobile-first approach, desktop enhancement
5. **Accessibility First**: Keyboard navigation, ARIA, semantic HTML as foundation

### Core Screens and Views

From product perspective, critical views for component library:

1. **Storybook Component Explorer** - Browse all components with live previews
2. **Style Variant Comparison** - Side-by-side view of same component in 4 styles
3. **Template Showcases** - Full-page template demos for each aesthetic
4. **Interactive Playground** - Live code editor with instant preview
5. **Getting Started Guide** - Step-by-step setup and first component

For **end-user templates** (Scientist Market, KEKTECH, Happy Market):

**Conspiracy Establishment** (Scientist Market):
- Prediction Market Dashboard (main view)
- Market Detail Page (individual predictions)
- User Profile & Portfolio
- Leaderboard & Statistics

**Neon Crypto** (KEKTECH enhancement):
- NFT Collection Landing (already exists, enhance)
- Marketplace Browse & Filter
- NFT Detail Modal
- User Wallet Dashboard

**Organic Harmony** (Happy Market):
- Community Landing Page
- Prediction Market Explorer (bright, uplifting)
- User Dashboard (stats, activity)
- Celebration/Results Page

### Accessibility

**Target**: WCAG 2.1 AA Compliance

Specific requirements:
- All animations respect `prefers-reduced-motion`
- Keyboard navigation for all interactive elements
- ARIA labels for icon buttons and complex widgets
- Color contrast ≥4.5:1 for text, ≥3:1 for UI components
- Focus indicators clearly visible
- Screen reader testing for critical components

### Branding

**Conspiracy Establishment**:
- Color palette: Dark mahogany (#3A1F1F), Matrix green (#00FF41), gold accents (#D4AF37)
- Typography: Serif headers (Playfair Display), monospace code (JetBrains Mono)
- Textures: Leather, wood grain, paper
- Effects: Glitch, distortion, scan lines, classified stamps

**Neon Crypto** (KEKTECH):
- Color palette: Dark navy/black (#0A0E27), vibrant green (#39FF14), cyan (#00D9FF)
- Typography: Bold sans-serif (Montserrat), clean body (Inter)
- Effects: Neon glow, slime drip, smooth transitions
- Brand: Playful but professional, meme culture integrated

**Organic Harmony**:
- Color palette: Soft pastels (yellows, oranges, pinks), warm gradients
- Typography: Rounded sans-serif (Comfortaa), friendly body (Nunito)
- Effects: Morphing blobs, floating elements, smooth color shifts
- Brand: Uplifting, inclusive, welcoming

**Experimental Psychedelic**:
- Color palette: Full spectrum, high saturation, rainbow gradients
- Typography: Variable fonts, creative type treatments
- Effects: 3D, shaders, particles, extreme animations
- Brand: Boundary-pushing, artistic, showcase capabilities

### Target Device and Platforms

**Web Responsive** (all platforms):
- Desktop (1920x1080 primary, 2560x1440 secondary)
- Tablet (768x1024 portrait, 1024x768 landscape)
- Mobile (375x667 minimum, 414x896 primary)

**Performance targets by device**:
- Desktop: Full experience, all effects enabled
- Tablet: Optimize heavy animations, maintain 60fps
- Mobile: Progressive enhancement, reduce complexity for battery/performance

---

## Technical Assumptions

### Repository Structure

**Monorepo** using pnpm workspaces + Turbo

Rationale:
- Shared code (core components) used by multiple packages
- Consistent versioning and dependency management
- Unified build and test pipeline
- Easier cross-package changes (refactoring core affects all styles)

Alternative considered: Polyrepo (separate repos per package)
- Rejected: Too much overhead managing dependencies, harder to refactor

### Service Architecture

**Component Library** (not a service/API)

Architecture: Publish standalone npm packages that client applications import

Structure:
```
@psychedelic-ui/core-components       → Core shared components
@psychedelic-ui/conspiracy-establishment → Conspiracy aesthetic
@psychedelic-ui/neon-crypto           → KEKTECH aesthetic
@psychedelic-ui/organic-harmony       → Happy market aesthetic
@psychedelic-ui/experimental          → Full psychedelic

Templates (separate from packages):
- Not published to npm initially
- Distributed as code repositories or paid downloads
```

Rationale: Component libraries are client-side only, no backend services needed

### Testing Requirements

**Full Testing Pyramid**:

1. **Unit Tests** (80%+ coverage target)
   - Jest + React Testing Library
   - Test core component logic, style variants
   - Test utility functions, hooks, helpers
   - Fast execution (<10 seconds for all unit tests)

2. **Integration Tests** (critical paths)
   - Test component combinations (forms, navigation flows)
   - Test style variant switching
   - Test animation sequences

3. **E2E Tests** (Playwright)
   - Test templates on real browsers (Chrome, Firefox, Safari)
   - Test responsive behavior across device sizes
   - Test accessibility with axe-core
   - Visual regression testing for component variations

4. **Manual Testing Convenience**
   - Storybook for visual QA
   - Interactive playground for testing edge cases
   - Hot reload for rapid iteration

Rationale: Component libraries need comprehensive testing due to reuse across projects. Bugs in shared components affect all consumers.

### Additional Technical Assumptions and Requests

#### Frontend Stack
- **Next.js 15.x** (App Router, Server Components for templates)
- **React 19.x** (Latest concurrent features, improved performance)
- **TypeScript 5.8+** (Strict mode enabled)
- **Tailwind CSS 4.x** (CSS-first architecture, better DX)

Rationale: Latest stable versions provide best performance and developer experience. Next.js App Router allows Server Components for templates (faster initial loads).

#### Animation Libraries
- **Primary**: Framer Motion 12.x (declarative, React-first)
- **Complex sequences**: GSAP 3.x (Conspiracy style timeline animations)
- **Physics**: React Spring 9.x (Organic style blob morphing)
- **Tailwind plugins**: tailwindcss-animated, tailwindcss-motion, tailwindcss-animate (CSS-only animations)
- **3D**: React Three Fiber + Three.js (Experimental style)

Rationale: Different animation libraries excel at different tasks. Using best tool for each aesthetic ensures optimal performance and maintainability.

#### Component Foundation
- **Radix UI** primitives for accessibility (Dialog, Dropdown, etc.)
- **CVA** (Class Variance Authority) for style variant management
- **shadcn/ui patterns** (copy-paste architecture) as inspiration

Rationale: Radix provides accessible primitives, CVA handles variants elegantly, shadcn patterns proven in production.

#### Build Tools
- **Turbo** for monorepo task orchestration
- **tsup** for fast TypeScript library bundling
- **Changeset** for version management
- **Prettier + ESLint** for code quality
- **Husky** for git hooks (lint on commit)

Rationale: Industry-standard tools with excellent monorepo support and performance.

#### Package Manager
- **pnpm** (required for monorepo)

Rationale: Faster than npm/yarn, better disk space usage, excellent monorepo support with workspaces.

#### Development Tools
- **Storybook 8.x** for component documentation and testing
- **Playwright** for E2E testing
- **Jest + React Testing Library** for unit/integration tests
- **Chromatic** (optional) for visual regression testing

#### Deployment Targets
- **npm Registry** for package publishing
- **Vercel** for template demos and documentation site
- **GitHub** for repository hosting and CI/CD (GitHub Actions)

#### Code Quality
- **Conventional Commits** for commit messages
- **Semantic Versioning** (semver) for releases
- **ESLint** strict configuration with TypeScript rules
- **Prettier** for consistent formatting
- **TypeScript** strict mode enabled

#### Design Tokens
- **Tailwind configuration** as source of truth for design tokens
- **CSS custom properties** for runtime theming (where needed)
- **Token JSON exports** for design tool integration (Figma)

---

## Epic List

The project is organized into 6 major epics delivering sequential, testable functionality:

### Epic 1: Project Foundation & Core Infrastructure
**Goal**: Establish monorepo structure, build system, and foundational tooling that enables all subsequent development.

**Deliverables**: Fully configured monorepo with build pipeline, testing infrastructure, and development tools ready for component development.

### Epic 2: Core Component Architecture
**Goal**: Design and implement the base component system with style variant architecture that all aesthetic packages will use.

**Deliverables**: 10-15 core components (Button, Card, Input, etc.) with working style variant system, full TypeScript support, and comprehensive tests.

### Epic 3: Conspiracy Establishment Aesthetic
**Goal**: Build complete Conspiracy Establishment component package and Scientist Market template.

**Deliverables**: Conspiracy-specific components (Matrix rain, glitch effects, etc.), full Scientist Market template, tested and production-ready.

### Epic 4: Neon Crypto & Organic Harmony Aesthetics
**Goal**: Build Neon Crypto and Organic Harmony component packages and templates for KEKTECH and Happy Market.

**Deliverables**: Both aesthetic packages complete with templates, enabling all 3 real projects to use the library.

### Epic 5: Experimental Aesthetic & Advanced Features
**Goal**: Build Experimental psychedelic package with 3D/WebGL features, showcasing full animation capabilities.

**Deliverables**: Experimental package with 3D components, shaders, particle systems, and showcase demo.

### Epic 6: Documentation, Publishing & Launch
**Goal**: Polish all packages, complete documentation, publish to npm, launch documentation site.

**Deliverables**: Published npm packages, comprehensive documentation, live demo site, ready for public use and commercial distribution.

---

## Epic Details

*(Epic details with stories and acceptance criteria will be expanded in individual epic documents as development progresses)*

### Epic 1: Project Foundation & Core Infrastructure

**Epic Goal**: Establish the foundational monorepo structure, build system, testing infrastructure, and development tooling that will support all subsequent component and template development. This epic delivers a fully functional development environment with CI/CD, code quality tools, and the ability to build, test, and publish packages.

**Success Criteria**:
- Monorepo builds successfully with Turbo orchestration
- Unit and E2E test infrastructure operational
- Code quality tools (ESLint, Prettier, TypeScript) configured and enforced
- CI/CD pipeline running on GitHub Actions
- Documentation framework (Storybook, docs site) initialized

**Dependencies**: None (foundational epic)

*(Individual stories for Epic 1 will be detailed in `docs/prd/epic-01-foundation.md`)*

---

### Epic 2: Core Component Architecture

**Epic Goal**: Design and implement the foundational component system with style variant architecture. Build 10-15 core UI components that work across all 4 aesthetic styles, establishing patterns and APIs that all aesthetic-specific packages will follow. This epic creates the reusable foundation that enables rapid development of style-specific variations.

**Success Criteria**:
- CVA-based style variant system fully functional
- Core components (Button, Card, Input, Modal, Navigation, etc.) complete
- All components support 4 aesthetic variants
- TypeScript definitions exported for excellent DX
- Storybook documentation shows all variants
- Test coverage ≥80% for core components

**Dependencies**: Epic 1 complete (build system and tooling ready)

*(Individual stories for Epic 2 will be detailed in `docs/prd/epic-02-core-architecture.md`)*

---

### Epic 3: Conspiracy Establishment Aesthetic

**Epic Goal**: Build the complete Conspiracy Establishment aesthetic package with all specific components (Matrix rain, glitch effects, textured cards, etc.) and create the Scientist Market prediction market template. This is the highest priority aesthetic due to real project need and commercial uniqueness.

**Success Criteria**:
- All Conspiracy-specific components built and tested
- Scientist Market template fully functional
- Template responsive across all devices
- Performance targets met (LCP <2.5s, FPS ≥60)
- Deployed demo site showing template in action
- Ready for production use in Scientist Market project

**Dependencies**: Epic 2 complete (core components available)

*(Individual stories for Epic 3 will be detailed in `docs/prd/epic-03-conspiracy.md`)*

---

### Epic 4: Neon Crypto & Organic Harmony Aesthetics

**Epic Goal**: Build Neon Crypto package (KEKTECH enhancement) and Organic Harmony package (Happy Market), including aesthetic-specific components and templates for both. This epic enables all 3 real projects to use the component library.

**Success Criteria**:
- Neon Crypto package complete with Web3 components
- Organic Harmony package complete with morphing/floating effects
- Templates for both aesthetics deployed
- KEKTECH site enhancement using Neon Crypto components
- Happy Market template ready for future project
- All packages tested and documented

**Dependencies**: Epic 2 complete (core architecture), Epic 3 recommended (patterns established)

*(Individual stories for Epic 4 will be detailed in `docs/prd/epic-04-neon-organic.md`)*

---

### Epic 5: Experimental Aesthetic & Advanced Features

**Epic Goal**: Build the Experimental psychedelic package showcasing full animation capabilities with 3D WebGL, shaders, particle systems, and extreme visual effects. Create portfolio-quality showcase demonstrating the library's full potential.

**Success Criteria**:
- Experimental package with 3D components (React Three Fiber)
- WebGL shader effects functional
- Particle systems implemented
- Interactive showcase/demo site deployed
- Performance optimized (lazy loading, code splitting)
- Documentation for advanced usage patterns

**Dependencies**: Epics 1-4 complete (all foundation and core aesthetics ready)

*(Individual stories for Epic 5 will be detailed in `docs/prd/epic-05-experimental.md`)*

---

### Epic 6: Documentation, Publishing & Launch

**Epic Goal**: Polish all packages, complete comprehensive documentation, publish to npm registry, launch public documentation site, and prepare for commercial distribution (if desired). This epic makes the library publicly available and production-ready.

**Success Criteria**:
- All packages published to npm with proper versioning
- Comprehensive documentation site live
- API reference complete for all components
- Migration guides and changelogs published
- Example projects/templates available
- Ready for community use and commercial sales

**Dependencies**: Epics 1-5 complete (all functionality built)

*(Individual stories for Epic 6 will be detailed in `docs/prd/epic-06-launch.md`)*

---

## Checklist Results Report

*(To be completed after running pm-checklist)*

---

## Next Steps

### UX Expert Prompt

*[Reserved for UX Expert activation prompt after PRD approval]*

### Architect Prompt

**Prompt for Architect**:

Using this PRD (`docs/prd/master-prd.md`) as input, create comprehensive technical architecture for the Psychedelic UI Stack component library.

**Focus areas**:
1. Monorepo structure and package organization
2. Component API design and style variant system architecture
3. Animation library integration strategy
4. Build system and bundling configuration
5. Testing architecture (unit, integration, E2E)
6. TypeScript configuration and type safety approach
7. Performance optimization strategies (code splitting, tree-shaking)
8. Scalability considerations for adding new aesthetics

**Deliverables**:
- `docs/architecture/system-architecture.md` - Overall system design
- `docs/architecture/component-api.md` - Component API patterns
- `docs/architecture/style-variants.md` - Style variant system design
- `docs/architecture/tech-stack.md` - Technology decisions and rationale
- `docs/architecture/source-tree.md` - Directory structure and file organization

**Note**: Architecture should support all 6 epics defined in this PRD and enable Epic 1 (Foundation) implementation to begin immediately.

---

**END OF PRD**
