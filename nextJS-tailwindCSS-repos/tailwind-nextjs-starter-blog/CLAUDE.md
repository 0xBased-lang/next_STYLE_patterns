# Tailwind Nextjs Starter Blog - Feature-Rich Blogging Template

**GitHub**: https://github.com/timlrx/tailwind-nextjs-starter-blog
**Demo**: https://tailwind-nextjs-starter-blog.vercel.app/
**Type**: Professional Blogging Template
**Author**: Timothy Lin (timlrx)
**License**: MIT
**Version**: 2.4.0
**Tech Stack**: Next.js 15, React 19, Tailwind CSS 4, TypeScript, Contentlayer 2

---

## 🎯 Purpose

**Probably the most feature-rich Next.js markdown blogging template out there.** Perfect as a replacement to existing Jekyll and Hugo individual blogs. Built on Next.js App Router with React Server Components and Contentlayer for markdown management.

⭐ **Extremely Popular**: Over 8,000+ GitHub stars, used by hundreds of production blogs worldwide.

## ⚡ Key Features

### Core Blogging Features
- **Next.js 15 with App Router**: Latest Next.js features with React Server Components
- **Contentlayer**: Type-safe markdown content management
- **MDX Support**: Write JSX in markdown documents
- **Multiple Layouts**: 3 post layouts, 2 listing layouts
- **Tag System**: Automatic tag pages generation
- **Multiple Authors**: Support for multiple blog authors
- **Nested Routing**: Organize posts in folders with nested routes
- **Projects Page**: Showcase your projects
- **Search**: Kbar or Algolia integration

### Content Features
- **Markdown Guide**: Complete markdown styling support
- **Syntax Highlighting**: Server-side with line numbers via rehype-prism-plus
- **Math Display**: KaTeX support for mathematical formulas
- **Citations**: Bibliography support via rehype-citation
- **GitHub Alerts**: Native GitHub-style alerts support
- **Image Optimization**: Automatic optimization via next/image
- **Table of Contents**: Automatic TOC generation

### Analytics & Engagement
- **Multiple Analytics**: Umami, Plausible, Simple Analytics, Posthog, Google Analytics
- **Comments**: Giscus, Utterances, or Disqus support
- **Newsletter**: Mailchimp, Buttondown, Convertkit, Klaviyo, Revue, Emailoctopus, Beehiiv
- **Command Palette**: Kbar search with keyboard shortcuts
- **RSS Feed**: Automatic RSS feed generation

### Performance & SEO
- **Near Perfect Lighthouse**: 95+ across all metrics
- **Lightweight**: 85kB first load JS
- **Mobile-Friendly**: Responsive design
- **Font Optimization**: next/font support
- **SEO Friendly**: Sitemaps, robots.txt, structured data
- **Security Headers**: Preconfigured security headers

### Design & Customization
- **Light/Dark Theme**: Built-in theme switching
- **Tailwind 4**: Latest Tailwind with primary color customization
- **Multiple Layouts**: Choose layouts per post
- **Responsive**: Mobile-first design
- **Customizable**: Easy styling via Tailwind

## 📦 Installation

### Quick Start

```bash
# Using degit (recommended)
npx degit 'timlrx/tailwind-nextjs-starter-blog' my-blog

# Using create-next-app
npx create-next-app -e https://github.com/timlrx/tailwind-nextjs-starter-blog my-blog

# Install dependencies
cd my-blog
yarn install

# Start development
yarn dev
```

### Configuration Steps

1. **Personalize Site Metadata** (`siteMetadata.js`)
2. **Configure Security Policy** (`next.config.js`)
3. **Personalize Author** (`authors/default.md`)
4. **Customize Projects** (`projectsData.ts`)
5. **Update Navigation** (`headerNavLinks.ts`)
6. **Add Blog Posts** (`data/blog/`)
7. **Deploy** (Vercel, Netlify, or static)

## 🏗️ Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── Main.tsx           # Main layout wrapper
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── blog/              # Blog listing
│   ├── projects/          # Projects page
│   ├── tags/              # Tag pages
│   └── [slug]/            # Dynamic blog posts
├── components/
│   ├── MDXComponents.tsx  # Custom MDX components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── ThemeSwitch.tsx    # Dark mode toggle
│   └── ...
├── layouts/               # Post layouts
│   ├── PostLayout.tsx     # Default 2-column layout
│   ├── PostSimple.tsx     # Simplified layout
│   └── PostBanner.tsx     # Layout with banner
├── data/
│   ├── blog/              # Markdown blog posts
│   ├── authors/           # Author profiles
│   ├── projectsData.ts    # Projects data
│   ├── headerNavLinks.ts  # Navigation links
│   └── siteMetadata.js    # Site configuration
├── public/static/         # Static assets
├── contentlayer.config.ts # Contentlayer configuration
└── tailwind.config.js     # Tailwind configuration
```

## 📝 Creating Blog Posts

### Post Frontmatter

Create markdown files in `data/blog/`:

```markdown
---
title: 'Your Post Title'
date: '2025-01-15'
lastmod: '2025-01-20'
tags: ['next-js', 'tailwind', 'guide']
draft: false
summary: 'Post summary for preview and SEO'
images: ['/static/images/post-cover.jpg']
authors: ['default', 'sparrowhawk']
layout: PostLayout
canonicalUrl: https://yoursite.com/blog/post-slug
---

Your post content here...
```

### Supported Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date
- `tags` (optional): Post tags
- `lastmod` (optional): Last modified date
- `draft` (optional): Draft status
- `summary` (optional): Post summary
- `images` (optional): Cover images
- `authors` (optional): Author list
- `layout` (optional): Layout component
- `canonicalUrl` (optional): Canonical URL

### Post Layouts

**PostLayout** (Default):
- 2-column layout
- Meta information sidebar
- Author information
- Related posts

**PostSimple**:
- Single column
- Minimalist design
- Focus on content

**PostBanner**:
- Banner image header
- Full-width design
- Visual emphasis

## 🎨 Customization

### Site Metadata

Edit `data/siteMetadata.js`:

```javascript
const siteMetadata = {
  title: 'Your Blog Name',
  author: 'Your Name',
  headerTitle: 'YourBlog',
  description: 'Blog description',
  language: 'en-us',
  theme: 'system', // system, dark, or light
  siteUrl: 'https://yourblog.com',
  siteRepo: 'https://github.com/you/your-blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'your@email.com',
  github: 'https://github.com/you',
  twitter: 'https://twitter.com/you',
  linkedin: 'https://linkedin.com/in/you',
  // Analytics
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: 'your-id'
    },
    googleAnalytics: {
      googleAnalyticsId: 'G-XXXXXXX'
    }
  },
  // Comments
  comments: {
    provider: 'giscus', // giscus, utterances, or disqus
    giscusConfig: {
      repo: 'your-repo',
      repositoryId: 'your-repo-id',
      category: 'Announcements',
      categoryId: 'your-category-id'
    }
  },
  // Newsletter
  newsletter: {
    provider: 'buttondown'
  }
}
```

### Tailwind Customization

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#your-color',
          600: '#your-darker-color'
        }
      }
    }
  }
}
```

### Navigation Links

Edit `data/headerNavLinks.ts`:

```typescript
const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/blog', title: 'Blog' },
  { href: '/tags', title: 'Tags' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' }
]
```

## 🔌 Integrations

### Analytics

**Supported Providers**:
- Umami Analytics
- Plausible Analytics
- Simple Analytics
- Posthog
- Google Analytics

Configuration in `siteMetadata.js`:

```javascript
analytics: {
  umamiAnalytics: {
    umamiWebsiteId: 'xxx',
    src: 'https://analytics.umami.is/script.js'
  }
}
```

### Comments

**Supported Providers**:
- **Giscus**: GitHub Discussions-powered
- **Utterances**: GitHub Issues-powered
- **Disqus**: Traditional comments

Configuration in `siteMetadata.js`:

```javascript
comments: {
  provider: 'giscus',
  giscusConfig: {
    repo: 'your/repo',
    repositoryId: 'R_xxx',
    category: 'General',
    categoryId: 'DIC_xxx'
  }
}
```

### Newsletter

**Supported Providers**:
- Mailchimp
- Buttondown
- Convertkit
- Klaviyo
- Revue (archived)
- Emailoctopus
- Beehiiv

Configuration in `siteMetadata.js`:

```javascript
newsletter: {
  provider: 'buttondown',
  buttondownConfig: {
    username: 'your-username'
  }
}
```

### Search

**Command Palette (Kbar)**:
- Keyboard shortcut: `Cmd/Ctrl + K`
- Fast local search
- No external dependencies

**Algolia**:
- External search service
- Advanced search features
- Requires Algolia account

## 🚀 Deployment

### Vercel (Recommended)

One-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/timlrx/tailwind-nextjs-starter-blog)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/timlrx/tailwind-nextjs-starter-blog)

### GitHub Pages

Use the provided `.github/workflows/pages.yml`:

1. Go to Settings > Pages
2. Select "GitHub Actions" as source
3. Push to main branch to trigger deployment

### Static Export

For static hosting (S3, Firebase, etc.):

```bash
# Build with static export
EXPORT=1 UNOPTIMIZED=1 yarn build

# Output in ./out folder
# Deploy ./out to hosting service
```

With base path:

```bash
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build
```

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

[View Lighthouse Report](https://www.webpagetest.org/result/230805_BiDcBQ_4H7)

### Bundle Size
- **First Load JS**: 85kB
- **Shared chunks**: Optimized code splitting
- **Image optimization**: Automatic WebP conversion
- **Font optimization**: next/font subsetting

## 🎯 Use Cases & Examples

### Personal Blogs
- Technical blogs
- Writing portfolios
- Thought leadership
- Knowledge sharing

### Professional Blogs
- Company engineering blogs
- Product updates
- Documentation sites
- Developer relations

### Community Examples

**Notable Users** (100+ production sites):
- [Timothy Lin's Blog](https://www.timlrx.com)
- [Karhdo's Blog](https://karhdo.dev)
- [SOTO's Blog](https://www.atksoto.com/)
- [enscribe.dev](https://enscribe.dev)
- [dalelarroder.com](https://dalelarroder.com)
- [leohuynh.dev](https://www.leohuynh.dev/)
- ... and 90+ more listed in README

## 💎 Advanced Features

### Custom MDX Components

Edit `components/MDXComponents.tsx`:

```typescript
const MDXComponents = {
  Image: CustomImage,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  // Add your custom components
  MyComponent: MyCustomComponent
}
```

Use in MDX posts:

```mdx
<MyComponent prop="value">
  Content
</MyComponent>
```

### Contentlayer Configuration

Edit `contentlayer.config.ts`:

```typescript
export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      rehypePrismPlus
    ]
  }
})
```

### Math Support (KaTeX)

Write mathematical formulas:

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Citations & Bibliography

Add citations:

```markdown
This is a citation [@smith2020]

## References
```

Configure in `contentlayer.config.ts` with rehype-citation.

## 🛠️ Development

### Local Development

```bash
# Start dev server
yarn dev

# Open http://localhost:3000

# Edit content in data/blog/
# Pages auto-update with live reloading
```

### Scripts

```bash
yarn dev      # Development server
yarn build    # Production build
yarn start    # Start production server
yarn analyze  # Analyze bundle size
yarn lint     # Run ESLint
```

### Environment Setup

Windows users may need:

```bash
$env:PWD = $(Get-Location).Path
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Contentlayer build errors
```bash
# Solution: Clear cache
rm -rf .contentlayer .next
yarn build
```

**Issue**: Image optimization errors
```bash
# Solution: Install sharp
yarn add sharp
```

**Issue**: Math rendering issues
```bash
# Solution: Check rehype-katex configuration
# Ensure KaTeX CSS is imported
```

## 📚 FAQ

### Common Questions

**Q: Can I use this with a CMS?**
A: Yes! Contentlayer can be configured to work with various content sources.

**Q: How do I add custom pages?**
A: Create new files in the `app/` directory following Next.js App Router conventions.

**Q: Can I customize the design?**
A: Absolutely! Tailwind makes it easy to customize colors, typography, spacing, etc.

**Q: Is it compatible with Vercel Analytics?**
A: Yes, add `@vercel/analytics` and configure it in your layout.

**Q: How do I add more social links?**
A: Edit `siteMetadata.js` and update the Footer component.

## 🎓 Learning Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Contentlayer Documentation](https://www.contentlayer.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

### Sample Posts
- [Markdown Guide](https://tailwind-nextjs-starter-blog.vercel.app/blog/github-markdown-guide)
- [Images in Next.js](https://tailwind-nextjs-starter-blog.vercel.app/blog/guide-to-using-images-in-nextjs)
- [Math Typesetting](https://tailwind-nextjs-starter-blog.vercel.app/blog/deriving-ols-estimator)

## 🤝 Contributing

Contributions welcome! This is a community-driven project with 100+ contributors.

### How to Contribute
1. Check existing issues and discussions
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Add tests if applicable
6. Submit a pull request

## 🌟 Community Variations

**Framework Alternatives**:
- [Astro Version](https://github.com/wanoo21/tailwind-astro-starting-blog)
- [Remix Version](https://github.com/SangeetAgarwal/tailwind-remix-run-mdxjs-typescript-starter-blog)
- [Internationalization](https://github.com/PxlSyl/tailwind-nextjs-starter-blog-i18n)

## 💖 Support

Using the template? Support this effort by:
- ⭐ Giving a star on GitHub
- 📝 Sharing your blog
- 🐦 Giving a shoutout on Twitter
- 💰 Becoming a [project sponsor](https://github.com/sponsors/timlrx)

---

**Last Updated**: 2025-10-24
**Status**: Active Development
**Version**: 2.4.0 (V2 with App Router)
**Stars**: 8,000+
**Used By**: 100+ production blogs

**Perfect For**: Professional blogging, technical writing, personal websites, portfolio blogs, content marketing
