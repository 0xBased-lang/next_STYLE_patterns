# Next.js + Tailwind CSS + TypeScript Starter - Developer-Focused Boilerplate

**GitHub**: https://github.com/theodorusclarence/ts-nextjs-tailwind-starter
**Demo**: https://tsnext-tw.thcl.dev/
**Components Demo**: https://tsnext-tw.thcl.dev/components
**Type**: Developer Boilerplate & Starter Kit
**Author**: Theodorus Clarence
**License**: MIT
**Version**: 0.1.0
**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Jest

---

## 🎯 Purpose

🔋 **Battery-packed** Next.js + Tailwind CSS + TypeScript starter focused on **developer experience** and **productivity**. Features extensive development tooling, pre-built components that adapt to your brand, and automated workflows.

**Philosophy**: One-stop starter to **maximize efficiency** on Next.js & Tailwind CSS projects.

## ⚡ Key Features

### 🔋 Battery-Packed Tooling

**Core Stack**:
- ⚡️ **Next.js 15** with App Router
- ⚛️ **React 19** with latest features
- ✨ **TypeScript** for type safety
- 💨 **Tailwind CSS 4** with CSS Variables
- 💎 **Pre-built Components** that auto-adapt to brand colors

**Development Tools**:
- 🃏 **Jest** - Configured for unit testing
- 📈 **Absolute Import** - Use `@/` prefix for imports
- 📏 **ESLint** - Auto-sort imports, find problems
- 💖 **Prettier** - Consistent code formatting
- 🐶 **Husky & Lint Staged** - Pre-commit hooks
- 🤖 **Conventional Commit Lint** - Standard commit messages
- ⏰ **Release Please** - Automated changelog generation
- 👷 **GitHub Actions** - Lint on PR
- 🚘 **Auto Branch/Issue Link** - Automated workflow
- 🔥 **Snippets** - Useful code snippets
- 👀 **Open Graph Helper** - OG image generation
- 🗺 **Site Map** - Automatic sitemap.xml
- 📦 **Expansion Pack** - Quick library installation

### 💎 Pre-built Components

**Smart Components** that automatically adapt to your primary brand color:
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Links**: Styled anchor tags with variants
- **Skeleton**: Loading skeletons
- **Typography**: Headings, paragraphs
- **Layout**: Responsive layout components

[View Component Demo](https://tsnext-tw.thcl.dev/components)

## 📦 Installation

### Method 1: Use as Template

Click "Use this template" on GitHub (includes attribution):

![Use as template](https://user-images.githubusercontent.com/55318172/129183039-1a61e68d-dd90-4548-9489-7b3ccbb35810.png)

### Method 2: create-next-app

```bash
# Using pnpm (recommended)
pnpm create next-app -e https://github.com/theodorusclarence/ts-nextjs-tailwind-starter ts-pnpm

# For pages directory (legacy, not actively maintained)
npx create-next-app -e https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/tree/pages-directory project-name
```

### Method 3: degit

```bash
npx degit theodorusclarence/ts-nextjs-tailwind-starter YOUR_APP_NAME
```

### Method 4: Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter)

## 🚀 Getting Started

### 1. Install Dependencies

**pnpm recommended** for proper husky hooks:

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

Open http://localhost:3000 to view your application.

### 3. Change Defaults

Find all `!STARTERCONF` comments and follow the guide:
- Update site title and metadata
- Change URLs and favicons
- Update package name in package.json
- Configure brand colors

### 4. Start Building

Edit `src/app/page.tsx` to start building your application.

## 🏗️ Project Structure

```
/
├── public/
│   └── favicon/           # Favicon files
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── buttons/       # Button components
│   │   ├── links/         # Link components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utility libraries
│   │   └── cn.ts          # Class name utility
│   ├── styles/            # Global styles
│   │   └── globals.css    # Tailwind imports
│   └── types/             # TypeScript types
├── .husky/                # Git hooks
├── package.json
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
└── next.config.js         # Next.js config
```

## 💎 Pre-built Components

### Auto-Adapting Components

All components automatically adapt to your primary Tailwind color:

**Button Component**:

```tsx
import Button from '@/components/buttons/Button'

// Variants automatically use your primary color
<Button variant="primary">Primary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

**Link Component**:

```tsx
import UnstyledLink from '@/components/links/UnstyledLink'
import PrimaryLink from '@/components/links/PrimaryLink'
import UnderlineLink from '@/components/links/UnderlineLink'

<PrimaryLink href="/about">Auto-styled Link</PrimaryLink>
<UnderlineLink href="/blog">Underlined Link</UnderlineLink>
```

**Skeleton Component**:

```tsx
import Skeleton from '@/components/Skeleton'

<Skeleton className="h-32 w-full" />
```

### Customizing Primary Color

Edit `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize your brand color
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          // ... other shades
        }
      }
    }
  }
}
```

Components will automatically update to use your new brand color!

## 🛠️ Development Tools

### Absolute Imports

Use `@/` prefix for clean imports:

```typescript
// Instead of ../../components/Button
import Button from '@/components/buttons/Button'

// Instead of ../../../lib/utils
import { cn } from '@/lib/cn'
```

### ESLint Configuration

Automatically sorts imports and finds problems:

```bash
# Run ESLint
pnpm lint

# Fix issues
pnpm lint:fix

# Strict mode (no warnings)
pnpm lint:strict
```

### Prettier Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Husky & Lint Staged

Automatically runs on `git commit`:
- ESLint on staged files
- Prettier formatting
- TypeScript type checking (optional)

### Conventional Commits

Commit message format enforced:

```bash
# Valid
git commit -m "feat: add new button component"
git commit -m "fix: resolve styling issue"
git commit -m "docs: update README"

# Invalid (will be rejected)
git commit -m "added stuff"
```

Format: `type(scope?): subject`

**Types**: feat, fix, docs, style, refactor, test, chore

### GitHub Actions

Automatic linting on pull requests:
- ESLint check
- Prettier check
- Type check
- Build test

### Release Please

Automatically generates changelog from conventional commits:

1. Activate `release-please` workflow
2. Commits generate changelog entries
3. Version bumps based on commit types
4. Automatic GitHub releases

## 📦 Expansion Pack

Easily add common features with single commands:

```bash
# Add React Hook Form + Components
npm run install:rhf

# Add Storybook
npm run install:storybook

# More expansions available
```

[View Expansion Pack](https://github.com/theodorusclarence/expansion-pack)

**Available Expansions**:
- React Hook Form + Pre-built form components
- Storybook for component development
- More to come...

**Note**: Currently outdated for App Router. Can be used by copying files.

## 🔥 Useful Snippets

VS Code snippets included:

### React Component Snippets

**`rcf`** - React Component Function:
```typescript
export default function ComponentName() {
  return <div>ComponentName</div>
}
```

**`rcfe`** - React Component Function Export:
```typescript
function ComponentName() {
  return <div>ComponentName</div>
}

export default ComponentName
```

### Page Snippets

**`nextpage`** - Next.js Page:
```typescript
export default function PageName() {
  return <main>PageName</main>
}
```

**`nextlayout`** - Next.js Layout:
```typescript
export default function Layout({ children }) {
  return <>{children}</>
}
```

## 👀 Open Graph Image Generator

Built-in OG image generation using [og.thcl.dev](https://og.thcl.dev):

```typescript
const openGraph = {
  title: 'Page Title',
  description: 'Page description',
  siteName: 'Your Site',
  // ... more options
}
```

Fork and deploy your own OG image service!

## 🗺 Sitemap Generation

Automatic `sitemap.xml` generation:

```bash
# Configured in next-sitemap.config.js

# Generate after build
pnpm postbuild
```

Configure in `next-sitemap.config.js`:

```javascript
module.exports = {
  siteUrl: 'https://yoursite.com',
  generateRobotsTxt: true
}
```

## 🎨 Customization

### Brand Colors

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --tw-color-primary-50: 239 246 255;
  --tw-color-primary-500: 59 130 246;
  /* ... other shades */
}
```

All components automatically update!

### Tailwind Configuration

Extend Tailwind in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
```

## 🧪 Testing

### Jest Configuration

Pre-configured for testing:

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Build for Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## 🎯 Use Cases

### Personal Projects
- Portfolio websites
- Personal blogs
- Side projects
- Experiments

### Professional Projects
- Client projects
- SaaS applications
- E-commerce sites
- Marketing sites

### Quick Prototypes
- MVP development
- Proof of concepts
- Design validation
- Feature testing

## 📚 Examples

### Projects Using This Starter

- [theodorusclarence.com](https://theodorusclarence.com) ([Source](https://github.com/theodorusclarence/theodorusclarence.com))
- [Notiolink](https://notiolink.thcl.dev/) ([Source](https://github.com/theodorusclarence/notiolink))
- [NextJs + Material UI + TypeScript](https://github.com/AlexStack/nextjs-materia-mui-typescript-hook-form-scaffold-boilerplate-starter)

**Using this starter?** Add your site via [Pull Request](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/edit/main/README.md)!

## 🎓 Learning Resources

### Blog Post

[One-stop Starter to Maximize Efficiency on Next.js & Tailwind CSS Projects](https://theodorusclarence.com/blog/one-stop-starter)

Detailed explanation of all features and best practices.

### Changelog

[View detailed changelog](https://github.com/theodorusclarence/ts-nextjs-tailwind-starter/blob/main/CHANGELOG.md)

## 🔧 Advanced Features

### Automatic Branch & Issue Linking

- Create branch from issue assignment
- Auto-link PR to issues
- Streamlined workflow

### TypeScript Strict Mode

Full type safety enabled:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### Path Alias

Configure custom import paths:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Husky hooks not working
```bash
# Solution: Ensure pnpm is used
rm -rf node_modules
pnpm install
```

**Issue**: Import sorting not working
```bash
# Solution: Run ESLint manually
pnpm lint:fix
```

**Issue**: Type errors
```bash
# Solution: Run type check
pnpm typecheck
```

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional pre-built components
- More expansion pack modules
- Documentation improvements
- Bug fixes

### Development Workflow
```bash
# Fork repository
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ts-nextjs-tailwind-starter

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes (following conventional commits)
git commit -m "feat: add amazing feature"

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request
```

## 🌟 Notable Features

### Developer Productivity
- Pre-configured tooling
- Automated workflows
- Code quality enforcement
- Fast development cycle

### Code Quality
- TypeScript strict mode
- ESLint with auto-sort imports
- Prettier formatting
- Conventional commits
- Pre-commit hooks

### Component System
- Brand-adaptive components
- Consistent API
- TypeScript support
- Accessible by default

### Deployment Ready
- Optimized builds
- Automatic sitemap
- OG image generation
- GitHub Actions CI/CD

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Maintained**: Yes (weekly dependency updates)
**Stars**: 1,500+
**Dependencies**: Updated every Sunday

**Perfect For**: Developers who want maximum productivity, type-safe development, professional tooling setup, rapid prototyping
**Author**: [Theodorus Clarence](https://theodorusclarence.com)
