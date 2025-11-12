'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps {
  items: {
    title: string
    href: string
    items?: {
      title: string
      href: string
    }[]
  }[]
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-y-auto py-6 pr-6 lg:py-8">
      <nav className="space-y-6">
        {items.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
            {section.items && (
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
