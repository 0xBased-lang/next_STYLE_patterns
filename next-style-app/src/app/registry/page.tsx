'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  getAllComponents,
  getAllCategories,
  getAllTags,
  searchComponents,
  getComponentsByCategory,
} from '@/lib/registry'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion'
import type { ComponentCategory } from '@/types/registry'

export default function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all')

  const categories = getAllCategories()
  const allComponents = getAllComponents()

  const filteredComponents =
    selectedCategory === 'all'
      ? searchQuery
        ? searchComponents(searchQuery)
        : allComponents
      : searchQuery
        ? searchComponents(searchQuery).filter((c) => c.meta.category === selectedCategory)
        : getComponentsByCategory(selectedCategory)

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Component Registry</h1>
          <p className="text-xl text-muted-foreground">
            Browse and discover our comprehensive collection of UI components
          </p>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.1} className="mb-8">
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn delay={0.2}>
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
                All ({allComponents.length})
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} (
                  {getComponentsByCategory(category).length})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredComponents.map((component, index) => (
                  <FadeIn key={component.meta.id} delay={0.05 * index}>
                    <Card className="h-full transition-shadow hover:shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{component.meta.name}</CardTitle>
                            <CardDescription className="mt-2">
                              {component.meta.description}
                            </CardDescription>
                          </div>
                          {component.meta.experimental && (
                            <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500">
                              Experimental
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="mb-2 flex flex-wrap gap-1">
                            {component.meta.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            v{component.meta.version}
                          </span>
                          <Link href={`/registry/${component.meta.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>

              {filteredComponents.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No components found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </FadeIn>
      </div>
    </div>
  )
}
