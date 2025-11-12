import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-8 text-center text-6xl font-bold">
          Next Style Patterns
        </h1>

        <p className="mb-12 text-center text-xl text-muted-foreground">
          Comprehensive component library and animation system built with{' '}
          <span className="font-semibold">Next.js 15</span>,{' '}
          <span className="font-semibold">Tailwind CSS 4</span>, and{' '}
          <span className="font-semibold">Motion 12</span>
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Component Registry"
            description="Browse and explore our comprehensive collection of UI components"
            href="/registry"
          />

          <FeatureCard
            title="Animation System"
            description="Discover powerful animation utilities and presets"
            href="/animations"
          />

          <FeatureCard
            title="Documentation"
            description="Learn how to use and customize components"
            href="/docs"
          />

          <FeatureCard
            title="Examples"
            description="See real-world implementations and patterns"
            href="/examples"
          />

          <FeatureCard
            title="Playground"
            description="Experiment with components and animations live"
            href="/playground"
          />

          <FeatureCard
            title="Templates"
            description="Get started quickly with pre-built templates"
            href="/templates"
          />
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Features</h2>
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Next.js 15 with App Router & React Server Components</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Tailwind CSS 4 with modern utility classes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Motion 12 & Framer Motion for advanced animations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Radix UI primitives for accessible components</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>TypeScript strict mode for type safety</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Component registry for easy discovery and reuse</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border p-6 transition-all hover:border-primary hover:shadow-lg"
    >
      <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
