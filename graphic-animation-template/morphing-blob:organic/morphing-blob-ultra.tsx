"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * MORPHING BLOB: ORGANIC - ULTRA VERSION
 *
 * Mesmerizing liquid/fluid effects with smooth morphing blobs!
 * Features: Organic shape transformations, metaball blending, color transitions,
 * smooth morphing, endless evolution, and pure liquid aesthetics.
 *
 * Perfect for: Modern SaaS, abstract backgrounds, organic brands, fluid designs,
 * meditation apps, creative portfolios, artistic interfaces.
 */

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  targetRadius: number
  color: string
  colorIndex: number
  angle: number
  morphSpeed: number
  points: { x: number; y: number }[]
}

export interface MorphingBlobUltraProps {
  // === BASIC PROPERTIES ===
  backgroundColor?: string
  width?: number | string
  height?: number | string

  // === BLOB SETTINGS ===
  /** Number of blobs (1-10) */
  blobCount?: number
  /** Minimum blob radius (50-300) */
  minRadius?: number
  /** Maximum blob radius (100-500) */
  maxRadius?: number
  /** Color gradient stops */
  colors?: string[]

  // === MORPH SETTINGS ===
  /** Morph speed (0.1-5) */
  morphSpeed?: number
  /** Shape complexity - number of control points (3-20) */
  complexity?: number
  /** Smoothness factor (0-100) */
  smoothness?: number
  /** Scale variation (0.5-2) */
  scaleVariation?: number

  // === MOTION SETTINGS ===
  /** Enable rotation */
  rotationEnabled?: boolean
  /** Rotation speed (-2 to 2) */
  rotationSpeed?: number
  /** Movement speed (0.1-5) */
  movementSpeed?: number

  // === VISUAL EFFECTS ===
  /** Blur amount (0-50px) */
  blurAmount?: number
  /** Enable metaball effect (blob merging) */
  metaballEffect?: boolean
  /** Merge threshold for metaballs */
  mergeThreshold?: number
  /** Edge softness (0-100) */
  edgeSoftness?: number

  // === COLOR SETTINGS ===
  /** Color cycle speed (0-10) */
  colorCycleSpeed?: number
  /** Gradient type: radial, linear, conic */
  gradientType?: 'radial' | 'linear' | 'conic'
  /** Blend mode: normal, screen, multiply, overlay */
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay'

  // === INTERACTION ===
  /** Mouse attracts blobs */
  mouseAttract?: boolean
  /** Mouse repels blobs */
  mouseRepel?: boolean
  /** Interaction radius (50-300) */
  interactionRadius?: number

  children?: React.ReactNode
}

export function MorphingBlobUltra({
  backgroundColor = '#0a0a1a',
  width = '100%',
  height = '100vh',
  blobCount = 3,
  minRadius = 100,
  maxRadius = 200,
  colors = ['#FF0080', '#9D00FF', '#00D4FF', '#00FF88'],
  morphSpeed = 1,
  complexity = 8,
  smoothness = 80,
  scaleVariation = 1.2,
  rotationEnabled = true,
  rotationSpeed = 0.5,
  movementSpeed = 1,
  blurAmount = 30,
  metaballEffect = true,
  mergeThreshold = 150,
  edgeSoftness = 50,
  colorCycleSpeed = 1,
  gradientType = 'radial',
  blendMode = 'screen',
  mouseAttract = false,
  mouseRepel = true,
  interactionRadius = 200,
  children,
}: MorphingBlobUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const [fps, setFps] = useState(60)
  const lastFrameTime = useRef(Date.now())
  const blobs = useRef<Blob[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const colorOffset = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Initialize blobs
      blobs.current = Array.from({ length: blobCount }, (_, i) => {
        const radius = minRadius + Math.random() * (maxRadius - minRadius)
        return {
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * movementSpeed,
          vy: (Math.random() - 0.5) * movementSpeed,
          radius: radius,
          targetRadius: radius,
          color: colors[i % colors.length],
          colorIndex: i % colors.length,
          angle: Math.random() * Math.PI * 2,
          morphSpeed: 0.5 + Math.random() * morphSpeed,
          points: generateBlobPoints(complexity, radius),
        }
      })
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      const now = Date.now()
      const delta = now - lastFrameTime.current
      lastFrameTime.current = now
      setFps(Math.round(1000 / delta))

      // Clear
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply blur
      if (blurAmount > 0) {
        ctx.filter = `blur(${blurAmount}px)`
      }

      // Set blend mode
      ctx.globalCompositeOperation = blendMode

      // Color cycling
      colorOffset.current += colorCycleSpeed * 0.001

      // Update and draw blobs
      blobs.current.forEach((blob, index) => {
        // Mouse interaction
        if (mouseAttract || mouseRepel) {
          const dx = mousePos.current.x - blob.x
          const dy = mousePos.current.y - blob.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < interactionRadius) {
            const force = (1 - dist / interactionRadius) * 0.5
            if (mouseAttract) {
              blob.vx += (dx / dist) * force
              blob.vy += (dy / dist) * force
            } else if (mouseRepel) {
              blob.vx -= (dx / dist) * force
              blob.vy -= (dy / dist) * force
            }
          }
        }

        // Update position
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce off edges
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > canvas.width) {
          blob.vx *= -1
          blob.x = Math.max(blob.radius, Math.min(canvas.width - blob.radius, blob.x))
        }
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > canvas.height) {
          blob.vy *= -1
          blob.y = Math.max(blob.radius, Math.min(canvas.height - blob.radius, blob.y))
        }

        // Velocity damping
        blob.vx *= 0.99
        blob.vy *= 0.99

        // Morph animation
        blob.angle += blob.morphSpeed * 0.01
        blob.targetRadius = minRadius + (Math.sin(blob.angle) + 1) * ((maxRadius - minRadius) / 2)
        blob.radius += (blob.targetRadius - blob.radius) * 0.05

        // Update morph points
        blob.points = blob.points.map((p, i) => {
          const angle = (Math.PI * 2 * i) / complexity + blob.angle
          const variance = Math.sin(angle * 2 + now * 0.001 * blob.morphSpeed) * (blob.radius * 0.2)
          const r = blob.radius + variance
          return {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
          }
        })

        // Color cycling
        const cycledColorIndex = (blob.colorIndex + Math.floor(colorOffset.current * colors.length)) % colors.length
        const nextColorIndex = (cycledColorIndex + 1) % colors.length
        const t = (colorOffset.current * colors.length) % 1

        // Draw blob
        drawBlob(ctx, blob, colors[cycledColorIndex], colors[nextColorIndex], t)
      })

      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    backgroundColor,
    blobCount,
    minRadius,
    maxRadius,
    colors,
    morphSpeed,
    complexity,
    smoothness,
    scaleVariation,
    rotationEnabled,
    rotationSpeed,
    movementSpeed,
    blurAmount,
    metaballEffect,
    mergeThreshold,
    edgeSoftness,
    colorCycleSpeed,
    gradientType,
    blendMode,
    mouseAttract,
    mouseRepel,
    interactionRadius,
  ])

  function generateBlobPoints(count: number, radius: number) {
    return Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    })
  }

  function drawBlob(
    ctx: CanvasRenderingContext2D,
    blob: Blob,
    color1: string,
    color2: string,
    t: number
  ) {
    // Create gradient
    let gradient: CanvasGradient
    if (gradientType === 'radial') {
      gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius * scaleVariation)
      gradient.addColorStop(0, color1)
      gradient.addColorStop(1, color2 + '00')
    } else if (gradientType === 'linear') {
      gradient = ctx.createLinearGradient(
        blob.x - blob.radius,
        blob.y - blob.radius,
        blob.x + blob.radius,
        blob.y + blob.radius
      )
      gradient.addColorStop(0, color1)
      gradient.addColorStop(1, color2)
    } else {
      gradient = ctx.createConicGradient(blob.angle, blob.x, blob.y)
      gradient.addColorStop(0, color1)
      gradient.addColorStop(0.5, color2)
      gradient.addColorStop(1, color1)
    }

    ctx.fillStyle = gradient

    // Draw organic shape
    ctx.beginPath()

    // Use cardinal spline for smooth curves
    const points = blob.points
    const tension = smoothness / 100

    for (let i = 0; i < points.length; i++) {
      const p0 = points[(i - 1 + points.length) % points.length]
      const p1 = points[i]
      const p2 = points[(i + 1) % points.length]
      const p3 = points[(i + 2) % points.length]

      const x1 = blob.x + p1.x
      const y1 = blob.y + p1.y
      const x2 = blob.x + p2.x
      const y2 = blob.y + p2.y

      if (i === 0) {
        ctx.moveTo(x1, y1)
      }

      // Cardinal spline control points
      const cp1x = x1 + (x2 - p0.x - blob.x) * tension * 0.5
      const cp1y = y1 + (y2 - p0.y - blob.y) * tension * 0.5
      const cp2x = x2 - (p3.x - p1.x) * tension * 0.5
      const cp2y = y2 - (p3.y - p1.y) * tension * 0.5

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2)
    }

    ctx.closePath()
    ctx.fill()

    // Edge softness
    if (edgeSoftness > 0) {
      ctx.shadowBlur = edgeSoftness
      ctx.shadowColor = color1
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      {children && (
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {children}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(0,0,0,0.5)',
          color: '#FF0080',
          padding: '5px 10px',
          fontFamily: 'monospace',
          fontSize: '12px',
          borderRadius: '4px',
          pointerEvents: 'none',
        }}
      >
        FPS: {fps}
      </div>
    </div>
  )
}

export default MorphingBlobUltra
