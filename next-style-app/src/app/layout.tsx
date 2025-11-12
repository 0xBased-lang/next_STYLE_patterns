import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Next Style Patterns',
    template: '%s | Next Style Patterns',
  },
  description:
    'Comprehensive component library and animation system built with Next.js 15, Tailwind CSS 4, and Motion 12',
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Motion',
    'Framer Motion',
    'Component Library',
    'Animation System',
    'TypeScript',
  ],
  authors: [
    {
      name: '0xBased',
    },
  ],
  creator: '0xBased',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Next Style Patterns',
    description: 'Comprehensive component library and animation system',
    siteName: 'Next Style Patterns',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next Style Patterns',
    description: 'Comprehensive component library and animation system',
    creator: '@0xBased',
  },
  metadataBase: new URL('https://nextjs-style-patterns.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
