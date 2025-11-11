# Tailnext - Production-Ready Next.js + Tailwind CSS Template

**GitHub**: https://github.com/arthelokyo/tailnext (originally https://github.com/onwidget/tailnext)
**Demo**: https://tailnext.vercel.app/
**Type**: Complete Website Template & Starter
**Author**: onWidget
**License**: MIT
**Version**: 1.0.0-beta.4
**Tech Stack**: Next.js 14, React 18, Tailwind CSS 3, TypeScript, Storybook 7

---

## 🎯 Purpose

Free and open-source template to build production-ready websites using Next.js + Tailwind CSS. Designed with best practices for performance, SEO, and modern web development.

## ⚡ Key Features

### Core Capabilities
- **✅ Tailwind CSS Integration**: Full support with dark mode out of the box
- **✅ Production-Ready**: Perfect scores in Lighthouse and PageSpeed Insights
- **✅ Image Optimization**: Next.js automatic image optimization
- **✅ Font Optimization**: Optimized font loading for performance
- **✅ SEO-Friendly Blog**: Fast and optimized blogging system
- **✅ Sitemap Generation**: Automatic project sitemap and robots.txt
- **✅ Storybook Integration**: Component development and documentation
- **✅ Markdown Support**: Blog posts written in Markdown

### Performance Features
- **Lighthouse Score**: Production-ready scores across all metrics
- **PageSpeed Insights**: Optimized for Google's PageSpeed standards
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Font Optimization**: Preloaded fonts with next/font
- **Code Splitting**: Automatic route-based code splitting

### Developer Experience
- **TypeScript Support**: Full TypeScript configuration
- **Storybook**: Component library with stories
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Atomic Design**: Components organized using atomic design principles

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/onwidget/tailnext.git

# Enter directory
cd tailnext

# Install dependencies
npm install

# Start development server
npm run dev

# View at localhost:3000
```

## 🏗️ Project Structure

```
/
├── .storybook/              # Storybook configuration
├── app/
│   ├── (blog)/
│   │   ├── [slug]/
│   │   │   └── page.js     # Dynamic blog post pages
│   │   └── blog/
│   │       └── page.js     # Blog listing page
│   ├── head.js             # HTML head metadata
│   ├── layout.js           # Root layout
│   └── page.js             # Homepage
├── public/
│   └── favicon.svg         # Site favicon
├── src/
│   ├── assets/
│   │   ├── images/         # Image assets
│   │   └── styles/
│   │       └── base.css    # Base Tailwind styles
│   ├── components/
│   │   ├── atoms/          # Atomic design: basic elements
│   │   └── widgets/        # Complex components
│   │       ├── Header.js
│   │       ├── Footer.js
│   │       └── ...
│   ├── content/
│   │   └── blog/           # Markdown blog posts
│   │       ├── demo-post-1.md
│   │       └── ...
│   ├── stories/            # Storybook stories
│   ├── utils/              # Utility functions
│   └── config.mjs          # Site configuration
├── package.json
└── ...
```

## 🛠️ Available Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:3000` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run storybook` | Open Storybook at `localhost:6006` |
| `npm run format` | Format code with Prettier |
| `npm run lint:eslint` | Run ESLint |

## 🎨 Component Architecture

### Atomic Design Principles

**Atoms** (`components/atoms/`):
- Basic UI elements (buttons, inputs, links)
- No dependencies on other components
- Highly reusable

**Widgets** (`components/widgets/`):
- Complex composed components
- Header, Footer, Navigation
- Feature sections

### Storybook Integration

View and develop components in isolation:

```bash
npm run storybook
```

Access at `http://localhost:6006` to:
- Browse component library
- Test different component states
- View component documentation
- Test responsive behavior

## 📝 Blog System

### Creating Blog Posts

Add markdown files to `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: 2025-01-15
author: "Your Name"
tags: ["nextjs", "tailwind"]
---

Your post content here...
```

### Blog Features
- **Markdown Support**: Write posts in Markdown
- **Frontmatter**: Metadata for posts (title, date, author, tags)
- **Dynamic Routes**: Automatic URL generation from filenames
- **SEO Optimized**: Meta tags and Open Graph support
- **Fast Performance**: Static generation for optimal speed

## 🎨 Customization

### 1. Site Configuration

Edit `src/config.mjs`:

```javascript
export const SITE = {
  name: 'Your Site Name',
  title: 'Your Site Title',
  description: 'Your site description',
  url: 'https://yoursite.com',
  // ... more configuration
}
```

### 2. Tailwind Customization

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your brand colors
        }
      }
    }
  }
}
```

### 3. Dark Mode

Built-in dark mode support using Tailwind CSS dark mode:

```jsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    Title
  </h1>
</div>
```

## 🚀 Deployment

### Deploy to Vercel

One-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonwidget%2Ftailnext)

### Deploy to Netlify

One-click deployment:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/onwidget/tailnext.git)

### Manual Deployment

```bash
# Build production site
npm run build

# Output in ./dist/ folder
# Deploy ./dist/ to any hosting service
```

## 📊 Performance Optimization

### Lighthouse Scores
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Optimization Techniques
1. **Image Optimization**: Automatic WebP conversion, responsive images
2. **Font Optimization**: Preloaded fonts, font-display: optional
3. **Code Splitting**: Route-based automatic splitting
4. **Static Generation**: Pre-rendered pages for optimal speed
5. **Minification**: CSS and JavaScript minification
6. **Compression**: Gzip/Brotli compression support

## 🎯 Use Cases

### Personal Portfolio
- Showcase projects and work
- Blog about your expertise
- Display contact information
- Professional online presence

### Company Website
- Corporate information pages
- Product/service descriptions
- Blog for content marketing
- Contact and inquiry forms

### Marketing Website
- Landing pages
- Feature showcases
- Blog for SEO
- Call-to-action sections

### Blog Platform
- Technical blogging
- Content publishing
- Newsletter integration
- Comment system (can be added)

## 💎 Pre-built Components

### Layout Components
- **Header**: Responsive navigation with mobile menu
- **Footer**: Multi-column footer with links
- **Layout**: Page wrapper with consistent structure

### Content Components
- **Hero Section**: Eye-catching page headers
- **Feature Grid**: Showcase features in grid layout
- **CTA (Call-to-Action)**: Conversion-focused sections
- **Blog Card**: Post preview cards

### UI Components
- **Button**: Multiple variants and sizes
- **Link**: Styled anchor tags
- **Icon**: SVG icon components
- **Image**: Optimized image wrapper

## 🔧 Technical Stack

### Core Technologies
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React features
- **TypeScript**: Type-safe development
- **Tailwind CSS 3**: Utility-first CSS framework

### Development Tools
- **Storybook 7**: Component development environment
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixes

### Dependencies
```json
{
  "next": "^14.2.6",
  "react": "^18.3.1",
  "tailwindcss": "^3.4.10",
  "@tabler/icons-react": "^3.12.0",
  "gray-matter": "^4.0.3",
  "markdown-it": "^14.1.0",
  "next-themes": "^0.3.0",
  "sharp": "^0.33.5"
}
```

## 🎓 Learning Resources

### Getting Started
1. Clone template
2. Install dependencies
3. Explore project structure
4. Customize configuration
5. Add your content
6. Deploy to production

### Best Practices
- Keep components small and focused
- Use atomic design principles
- Leverage Tailwind utilities
- Optimize images before adding
- Write semantic HTML
- Test in Storybook first

## 📚 Additional Features

### SEO Optimization
- **Meta Tags**: Comprehensive meta tag support
- **Open Graph**: Social media preview cards
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling control

### Accessibility
- **ARIA Labels**: Proper accessibility attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Screen reader optimized
- **Color Contrast**: WCAG compliant colors
- **Focus Indicators**: Visible focus states

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Module not found"
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

**Issue**: "Storybook not starting"
```bash
# Solution: Clear Storybook cache
rm -rf node_modules/.cache
npm run storybook
```

**Issue**: "Build errors"
```bash
# Solution: Clean build
rm -rf .next
npm run build
```

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- Additional pre-built components
- More blog features (categories, search)
- Integration examples (CMS, analytics)
- Additional deployment guides
- Component variations

### Development Workflow
```bash
# Fork repository
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes
# Commit with clear message
git commit -m "Add amazing feature"

# Push to branch
git push origin feature/amazing-feature

# Open Pull Request
```

## 📝 Configuration Tips

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Adding Analytics

Integrate analytics by editing `app/layout.js`:

```javascript
// Add Google Analytics, Plausible, or Umami
```

### Adding Comments

Integrate comment systems:
- Giscus (GitHub discussions)
- Utterances (GitHub issues)
- Disqus
- Custom solution

## 🌟 Notable Features

### Production Ready
- Tested for production use
- Optimized performance scores
- SEO best practices
- Security headers configured

### Developer Friendly
- Clear project structure
- Well-documented code
- TypeScript support
- Storybook integration
- Hot reloading

### Design System
- Consistent component API
- Atomic design architecture
- Tailwind utilities
- Dark mode support
- Responsive by default

---

**Last Updated**: 2025-10-24
**Status**: Beta (v1.0.0-beta.4)
**Node Version**: 18.17.0+
**Maintained**: Yes (by onWidget community)
**Stars**: Community-driven project

**Perfect For**: Complete website projects, portfolios, blogs, marketing sites, company websites
