import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">Components</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/registry" className="hover:text-foreground">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/registry?category=ui" className="hover:text-foreground">
                  UI Components
                </Link>
              </li>
              <li>
                <Link href="/registry?category=layout" className="hover:text-foreground">
                  Layout
                </Link>
              </li>
              <li>
                <Link href="/registry?category=motion" className="hover:text-foreground">
                  Motion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Documentation</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/docs/getting-started" className="hover:text-foreground">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="hover:text-foreground">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/docs/theming" className="hover:text-foreground">
                  Theming
                </Link>
              </li>
              <li>
                <Link href="/docs/animations" className="hover:text-foreground">
                  Animations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/examples" className="hover:text-foreground">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-foreground">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-foreground">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-foreground">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Community</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com" className="hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="hover:text-foreground">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:text-foreground">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            Built with Next.js 15, Tailwind CSS 4, and Motion 12. © 2024 0xBased. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
