import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeIn } from '@/components/motion'

export default function DocsPage() {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn how to set up and use Next Style Patterns',
      links: [
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Quick Start', href: '/docs/quick-start' },
        { title: 'Project Structure', href: '/docs/structure' },
      ],
    },
    {
      title: 'Components',
      description: 'Component documentation and usage examples',
      links: [
        { title: 'Button', href: '/docs/components/button' },
        { title: 'Card', href: '/docs/components/card' },
        { title: 'Dialog', href: '/docs/components/dialog' },
        { title: 'Tabs', href: '/docs/components/tabs' },
      ],
    },
    {
      title: 'Animation System',
      description: 'Learn about the animation system and presets',
      links: [
        { title: 'Animation Presets', href: '/docs/animations/presets' },
        { title: 'Motion Components', href: '/docs/animations/components' },
        { title: 'Custom Animations', href: '/docs/animations/custom' },
      ],
    },
    {
      title: 'Theming',
      description: 'Customize the look and feel of your application',
      links: [
        { title: 'Color System', href: '/docs/theming/colors' },
        { title: 'Typography', href: '/docs/theming/typography' },
        { title: 'Dark Mode', href: '/docs/theming/dark-mode' },
      ],
    },
    {
      title: 'Advanced',
      description: 'Advanced topics and best practices',
      links: [
        { title: 'Component Registry', href: '/docs/advanced/registry' },
        { title: 'Custom Hooks', href: '/docs/advanced/hooks' },
        { title: 'Performance', href: '/docs/advanced/performance' },
      ],
    },
    {
      title: 'Contributing',
      description: 'Help improve Next Style Patterns',
      links: [
        { title: 'Contributing Guide', href: '/docs/contributing' },
        { title: 'Code of Conduct', href: '/docs/code-of-conduct' },
        { title: 'Changelog', href: '/docs/changelog' },
      ],
    },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
          <p className="mb-12 text-xl text-muted-foreground">
            Everything you need to know about Next Style Patterns
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section, index) => (
            <FadeIn key={section.title} delay={0.05 * index}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-primary hover:underline"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <Link
                href="/registry"
                className="rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold">Browse Components</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our component library
                </p>
              </Link>
              <Link
                href="/animations"
                className="rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold">View Animations</h3>
                <p className="text-sm text-muted-foreground">
                  See all animation presets
                </p>
              </Link>
              <Link
                href="/examples"
                className="rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <h3 className="mb-2 font-semibold">Examples</h3>
                <p className="text-sm text-muted-foreground">
                  Real-world implementation examples
                </p>
              </Link>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
