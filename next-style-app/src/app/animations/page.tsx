'use client'

import { useState } from 'react'
import { animationPresets, motionVariants } from '@/lib/animations'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FadeIn, SlideIn, ZoomIn, StaggerContainer, StaggerItem } from '@/components/motion'

export default function AnimationsPage() {
  const [showDemo, setShowDemo] = useState(true)

  const resetDemo = () => {
    setShowDemo(false)
    setTimeout(() => setShowDemo(true), 100)
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Animation System</h1>
          <p className="text-xl text-muted-foreground">
            Explore our comprehensive animation presets and motion components
          </p>
        </FadeIn>

        {/* Animation Presets */}
        <FadeIn delay={0.1} className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Animation Presets</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(animationPresets).map(([key, preset], index) => (
              <FadeIn key={key} delay={0.05 * index}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{preset.name}</CardTitle>
                    <CardDescription>{preset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-mono">{preset.duration}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Easing:</span>
                        <span className="font-mono text-xs">{preset.easing}</span>
                      </div>
                      {preset.repeat && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Repeat:</span>
                          <span className="font-mono">
                            {preset.repeat === true ? '∞' : preset.repeat}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Motion Components Demo */}
        <FadeIn delay={0.2} className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Motion Components</h2>
            <Button onClick={resetDemo}>Replay Animation</Button>
          </div>

          <Tabs defaultValue="fade">
            <TabsList>
              <TabsTrigger value="fade">Fade</TabsTrigger>
              <TabsTrigger value="slide">Slide</TabsTrigger>
              <TabsTrigger value="zoom">Zoom</TabsTrigger>
              <TabsTrigger value="stagger">Stagger</TabsTrigger>
            </TabsList>

            <TabsContent value="fade" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fade In Component</CardTitle>
                  <CardDescription>Smooth fade in animation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {showDemo && (
                      <>
                        <FadeIn delay={0}>
                          <div className="rounded-lg bg-primary p-4 text-primary-foreground">
                            Fade In (0s)
                          </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                          <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">
                            Fade In (0.2s)
                          </div>
                        </FadeIn>
                        <FadeIn delay={0.4}>
                          <div className="rounded-lg bg-accent p-4 text-accent-foreground">
                            Fade In (0.4s)
                          </div>
                        </FadeIn>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="slide" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Slide In Component</CardTitle>
                  <CardDescription>Slide from different directions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {showDemo && (
                      <>
                        <SlideIn direction="up">
                          <div className="rounded-lg bg-primary p-4 text-center text-primary-foreground">
                            Slide Up
                          </div>
                        </SlideIn>
                        <SlideIn direction="down">
                          <div className="rounded-lg bg-secondary p-4 text-center text-secondary-foreground">
                            Slide Down
                          </div>
                        </SlideIn>
                        <SlideIn direction="left">
                          <div className="rounded-lg bg-accent p-4 text-center text-accent-foreground">
                            Slide Left
                          </div>
                        </SlideIn>
                        <SlideIn direction="right">
                          <div className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
                            Slide Right
                          </div>
                        </SlideIn>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zoom" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zoom In Component</CardTitle>
                  <CardDescription>Scale animation with fade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {showDemo && (
                      <>
                        <ZoomIn delay={0}>
                          <div className="rounded-lg bg-primary p-4 text-primary-foreground">
                            Zoom In (0s)
                          </div>
                        </ZoomIn>
                        <ZoomIn delay={0.2}>
                          <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">
                            Zoom In (0.2s)
                          </div>
                        </ZoomIn>
                        <ZoomIn delay={0.4}>
                          <div className="rounded-lg bg-accent p-4 text-accent-foreground">
                            Zoom In (0.4s)
                          </div>
                        </ZoomIn>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stagger" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stagger Container</CardTitle>
                  <CardDescription>Animated list with stagger effect</CardDescription>
                </CardHeader>
                <CardContent>
                  {showDemo && (
                    <StaggerContainer staggerDelay={0.1}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <StaggerItem key={i}>
                          <div className="mb-2 rounded-lg bg-muted p-4">
                            Staggered Item {i}
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeIn>

        {/* Usage Examples */}
        <FadeIn delay={0.3}>
          <h2 className="mb-6 text-2xl font-semibold">Usage Examples</h2>
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>Import and use motion components in your app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">FadeIn Component</h4>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  <code>{`import { FadeIn } from '@/components/motion'

<FadeIn delay={0.2} duration={0.5}>
  <div>Your content</div>
</FadeIn>`}</code>
                </pre>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">SlideIn Component</h4>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  <code>{`import { SlideIn } from '@/components/motion'

<SlideIn direction="up" delay={0.1}>
  <div>Your content</div>
</SlideIn>`}</code>
                </pre>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Stagger Container</h4>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  <code>{`import { StaggerContainer, StaggerItem } from '@/components/motion'

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <div>{item.content}</div>
    </StaggerItem>
  ))}
</StaggerContainer>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
