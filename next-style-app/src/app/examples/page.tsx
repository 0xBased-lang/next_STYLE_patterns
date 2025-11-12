import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion'

export default function ExamplesPage() {
  const examples = [
    {
      title: 'Dashboard',
      description: 'A complete dashboard with charts and data visualization',
      image: '/examples/dashboard.jpg',
      href: '/examples/dashboard',
      tags: ['Layout', 'Data Display', 'Charts'],
    },
    {
      title: 'E-commerce',
      description: 'Product listings, cart, and checkout flow',
      image: '/examples/ecommerce.jpg',
      href: '/examples/ecommerce',
      tags: ['E-commerce', 'Forms', 'Navigation'],
    },
    {
      title: 'Landing Page',
      description: 'Modern landing page with animations',
      image: '/examples/landing.jpg',
      href: '/examples/landing',
      tags: ['Marketing', 'Animation', 'Hero'],
    },
    {
      title: 'Authentication',
      description: 'Login, signup, and password reset flows',
      image: '/examples/auth.jpg',
      href: '/examples/auth',
      tags: ['Forms', 'Validation', 'Security'],
    },
    {
      title: 'Blog',
      description: 'Blog with posts, categories, and search',
      image: '/examples/blog.jpg',
      href: '/examples/blog',
      tags: ['Content', 'Typography', 'SEO'],
    },
    {
      title: 'Pricing Page',
      description: 'Pricing tables with feature comparison',
      image: '/examples/pricing.jpg',
      href: '/examples/pricing',
      tags: ['Marketing', 'Tables', 'Cards'],
    },
  ]

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h1 className="mb-4 text-4xl font-bold">Examples</h1>
          <p className="mb-12 text-xl text-muted-foreground">
            Real-world examples and implementations using Next Style Patterns
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <StaggerItem key={example.title}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video bg-muted" />
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={example.href}>
                    <Button className="w-full">View Example</Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Want to contribute an example?</CardTitle>
              <CardDescription>
                Share your implementation with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                We welcome community contributions! If you've built something amazing with Next
                Style Patterns, we'd love to feature it here.
              </p>
              <Button>Submit Your Example</Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
