'use client'

import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@psychedelic-ui/core-components'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Psychedelic UI Showcase
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore 23 production-ready components with 4 unique aesthetic variants
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Badge variant="default" className="text-lg px-4 py-2">23 Components</Badge>
            <Badge variant="default" className="text-lg px-4 py-2">4 Aesthetics</Badge>
            <Badge variant="default" className="text-lg px-4 py-2">88.80 KB Bundle</Badge>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Playground */}
          <Link href="/playground">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-2xl">🎨 Component Playground</CardTitle>
                <CardDescription>
                  Interactive component explorer with live editing and variant switching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  • All 23 components<br/>
                  • Live variant switcher<br/>
                  • Copy code snippets<br/>
                  • Interactive examples
                </p>
                <Button className="w-full">Explore Components</Button>
              </CardContent>
            </Card>
          </Link>

          {/* Scientist Market Template */}
          <Link href="/templates/scientist-market">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-[#00FF41]/30 bg-black/5">
              <CardHeader>
                <CardTitle className="text-2xl">🔬 Scientist Market</CardTitle>
                <CardDescription>
                  AI-powered prediction marketplace with conspiracy theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  • Prediction cards<br/>
                  • AI confidence meters<br/>
                  • Researcher profiles<br/>
                  • Real-time updates
                </p>
                <Button variant="outline" className="w-full">View Template</Button>
              </CardContent>
            </Card>
          </Link>

          {/* Happy Market Template */}
          <Link href="/templates/happy-market">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-2xl">🛍️ Happy Market</CardTitle>
                <CardDescription>
                  E-commerce marketplace with organic harmony theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  • Product grids<br/>
                  • Seller profiles<br/>
                  • Upload progress<br/>
                  • Shopping cart
                </p>
                <Button variant="outline" className="w-full">View Template</Button>
              </CardContent>
            </Card>
          </Link>

          {/* KEKTECH Template */}
          <Link href="/templates/kektech">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-2xl">🎭 KEKTECH</CardTitle>
                <CardDescription>
                  NFT marketplace with experimental psychedelic theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  • NFT collections<br/>
                  • Minting progress<br/>
                  • Rarity badges<br/>
                  • Owner avatars
                </p>
                <Button variant="outline" className="w-full">View Template</Button>
              </CardContent>
            </Card>
          </Link>

          {/* Documentation */}
          <Link href="/docs">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-2xl">📚 Documentation</CardTitle>
                <CardDescription>
                  Complete API reference and usage guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  • Component APIs<br/>
                  • Usage examples<br/>
                  • Best practices<br/>
                  • Accessibility guide
                </p>
                <Button variant="outline" className="w-full">Read Docs</Button>
              </CardContent>
            </Card>
          </Link>

          {/* GitHub */}
          <Card className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="text-2xl">💻 GitHub</CardTitle>
              <CardDescription>
                View source code and contribute
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                • 100% Open Source<br/>
                • MIT Licensed<br/>
                • TypeScript<br/>
                • Fully Documented
              </p>
              <Button variant="outline" className="w-full">View on GitHub</Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-purple-600">23</div>
              <div className="text-sm text-slate-600 mt-2">Components</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-pink-600">92</div>
              <div className="text-sm text-slate-600 mt-2">Variants</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-green-600">88.80 KB</div>
              <div className="text-sm text-slate-600 mt-2">Bundle Size</div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-slate-600 mt-2">Accessible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
