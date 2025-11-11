import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider, ToastViewport } from '@psychedelic-ui/core-components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Psychedelic UI - Component Showcase',
  description: 'Interactive showcase of the Psychedelic UI component library with 4 unique aesthetic variants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  )
}
