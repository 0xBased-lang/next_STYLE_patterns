"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * NEON LIGHT TRAILS: TRON - ULTRA VERSION
 *
 * Epic light cycle effects with flowing neon trails!
 * Features: Motion trails, glow effects, Tron-style grid, beam animations,
 * path complexity, intersection effects, and pure cyberpunk aesthetics.
 *
 * Perfect for: Tron themes, sci-fi UI, tech products, gaming sites,
 * futuristic designs, electric aesthetics, motion graphics.
 */

interface Trail {
  points: { x: number; y: number; vx: number; vy: number }[]
  color: string
  thickness: number
  glowRadius: number
  maxLength: number
  speed: number
  pathType: 'straight' | 'curved' | 'circular' | 'chaotic'
  angle: number
}

export interface NeonTrailsUltraProps {
  // === BASIC PROPERTIES ===
  backgroundColor?: string
  width?: number | string
  height?: number | string

  // === TRAIL SETTINGS ===
  /** Number of trails (1-50) */
  trailCount?: number
  /** Trail length in points (10-500) */
  trailLength?: number
  /** Line thickness (1-10px) */
  lineThickness?: number
  /** Glow radius (0-50px) */
  glowRadius?: number
  /** Color palette for trails */
  colors?: string[]

  // === MOTION SETTINGS ===
  /** Speed variation (0.1-10x) */
  speedVariation?: number
  /** Path complexity: straight, curved, circular, chaotic */
  pathType?: 'straight' | 'curved' | 'circular' | 'chaotic' | 'mixed'
  /** Enable sine wave motion */
  sineMotion?: boolean
  /** Wave amplitude (0-100) */
  waveAmplitude?: number

  // === GRID SETTINGS ===
  /** Show Tron grid */
  showGrid?: boolean
  /** Grid size (10-100px) */
  gridSize?: number
  /** Grid opacity (0-100) */
  gridOpacity?: number
  /** Grid color */
  gridColor?: string

  // === VISUAL EFFECTS ===
  /** Fade speed (1-100) */
  fadeSpeed?: number
  /** Trail opacity (0-100) */
  trailOpacity?: number
  /** Enable intersection glow */
  intersectionGlow?: boolean
  /** Bloom effect intensity (0-50) */
  bloomIntensity?: number
  /** Motion blur effect */
  motionBlur?: boolean

  // === INTERACTION ===
  /** Mouse creates new trails */
  mouseTrails?: boolean
  /** Click spawns trail burst */
  clickBurst?: boolean

  children?: React.ReactNode
}

export function NeonTrailsUltra({
  backgroundColor = '#000000',
  width = '100%',
  height = '100vh',
  trailCount = 8,
  trailLength = 100,
  lineThickness = 3,
  glowRadius = 20,
  colors = ['#00D4FF', '#FF0080', '#00FF88', '#FFD700', '#9D00FF'],
  speedVariation = 1,
  pathType = 'mixed',
  sineMotion = true,
  waveAmplitude = 30,
  showGrid = true,
  gridSize = 50,
  gridOpacity = 20,
  gridColor = '#00D4FF',
  fadeSpeed = 2,
  trailOpacity = 80,
  intersectionGlow = true,
  bloomIntensity = 15,
  motionBlur = true,
  mouseTrails = true,
  clickBurst = false,
  children,
}: NeonTrailsUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const [fps, setFps] = useState(60)
  const lastFrameTime = useRef(Date.now())
  const trails = useRef<Trail[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Initialize trails
      trails.current = Array.from({ length: trailCount }, () =>
        createTrail(canvas.width, canvas.height)
      )
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

      if (mouseTrails && Math.random() < 0.1) {
        const trail = createTrail(canvas.width, canvas.height)
        trail.points[0] = {
          x: mousePos.current.x,
          y: mousePos.current.y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
        }
        trails.current.push(trail)
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (clickBurst) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Create burst of trails
        for (let i = 0; i < 5; i++) {
          const trail = createTrail(canvas.width, canvas.height)
          const angle = (Math.PI * 2 * i) / 5
          trail.points[0] = {
            x,
            y,
            vx: Math.cos(angle) * 5,
            vy: Math.sin(angle) * 5,
          }
          trails.current.push(trail)
        }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    // Animation loop
    const animate = () => {
      const now = Date.now()
      const delta = now - lastFrameTime.current
      lastFrameTime.current = now
      setFps(Math.round(1000 / delta))

      // Apply fade for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeSpeed / 100})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height)
      }

      // Motion blur
      if (motionBlur) {
        ctx.globalAlpha = 0.8
      }

      // Update and draw trails
      trails.current = trails.current.filter((trail) => {
        const head = trail.points[0]

        // Update position based on path type
        if (trail.pathType === 'straight') {
          head.x += head.vx * speedVariation
          head.y += head.vy * speedVariation
        } else if (trail.pathType === 'curved') {
          trail.angle += 0.02
          head.vx = Math.cos(trail.angle) * 3 * speedVariation
          head.vy = Math.sin(trail.angle) * 3 * speedVariation
          head.x += head.vx
          head.y += head.vy
        } else if (trail.pathType === 'circular') {
          trail.angle += 0.03
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const radius = 200
          head.x = centerX + Math.cos(trail.angle) * radius
          head.y = centerY + Math.sin(trail.angle) * radius
        } else if (trail.pathType === 'chaotic') {
          head.vx += (Math.random() - 0.5) * 0.5
          head.vy += (Math.random() - 0.5) * 0.5
          head.vx *= 0.98
          head.vy *= 0.98
          head.x += head.vx * speedVariation
          head.y += head.vy * speedVariation
        }

        // Sine wave motion
        if (sineMotion) {
          head.y += Math.sin(now * 0.001 + head.x * 0.01) * (waveAmplitude * 0.1)
        }

        // Wrap around edges
        if (head.x < 0) head.x = canvas.width
        if (head.x > canvas.width) head.x = 0
        if (head.y < 0) head.y = canvas.height
        if (head.y > canvas.height) head.y = 0

        // Add current position to trail
        trail.points.unshift({ ...head })
        if (trail.points.length > trail.maxLength) {
          trail.points.pop()
        }

        // Draw trail
        drawTrail(ctx, trail)

        // Keep trail if it has points
        return trail.points.length > 1
      })

      // Maintain trail count
      while (trails.current.length < trailCount) {
        trails.current.push(createTrail(canvas.width, canvas.height))
      }

      ctx.globalAlpha = 1
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    backgroundColor,
    trailCount,
    trailLength,
    lineThickness,
    glowRadius,
    colors,
    speedVariation,
    pathType,
    sineMotion,
    waveAmplitude,
    showGrid,
    gridSize,
    gridOpacity,
    gridColor,
    fadeSpeed,
    trailOpacity,
    intersectionGlow,
    bloomIntensity,
    motionBlur,
    mouseTrails,
    clickBurst,
  ])

  function createTrail(width: number, height: number): Trail {
    const selectedPathType =
      pathType === 'mixed'
        ? (['straight', 'curved', 'circular', 'chaotic'][Math.floor(Math.random() * 4)] as Trail['pathType'])
        : pathType

    const angle = Math.random() * Math.PI * 2
    const speed = 2 + Math.random() * 3

    return {
      points: [
        {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        },
      ],
      color: colors[Math.floor(Math.random() * colors.length)],
      thickness: lineThickness,
      glowRadius: glowRadius,
      maxLength: trailLength,
      speed: speed,
      pathType: selectedPathType,
      angle: angle,
    }
  }

  function drawTrail(ctx: CanvasRenderingContext2D, trail: Trail) {
    if (trail.points.length < 2) return

    // Draw glow
    if (trail.glowRadius > 0) {
      ctx.shadowBlur = trail.glowRadius
      ctx.shadowColor = trail.color
    }

    // Draw bloom
    if (bloomIntensity > 0) {
      ctx.shadowBlur = trail.glowRadius + bloomIntensity
    }

    ctx.strokeStyle = trail.color
    ctx.lineWidth = trail.thickness
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    ctx.moveTo(trail.points[0].x, trail.points[0].y)

    for (let i = 1; i < trail.points.length; i++) {
      const point = trail.points[i]
      const alpha = (1 - i / trail.points.length) * (trailOpacity / 100)
      ctx.globalAlpha = alpha
      ctx.lineTo(point.x, point.y)
    }

    ctx.stroke()
    ctx.globalAlpha = 1
    ctx.shadowBlur = 0

    // Intersection glow (draw bright point at head)
    if (intersectionGlow) {
      const head = trail.points[0]
      ctx.fillStyle = trail.color
      ctx.shadowBlur = trail.glowRadius * 2
      ctx.shadowColor = trail.color
      ctx.beginPath()
      ctx.arc(head.x, head.y, trail.thickness * 1.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.strokeStyle = `${gridColor}${Math.floor((gridOpacity / 100) * 255).toString(16).padStart(2, '0')}`
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
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
          background: 'rgba(0,0,0,0.8)',
          color: '#00D4FF',
          padding: '5px 10px',
          fontFamily: 'monospace',
          fontSize: '12px',
          borderRadius: '4px',
          border: '1px solid #00D4FF',
          boxShadow: '0 0 10px #00D4FF',
          pointerEvents: 'none',
        }}
      >
        FPS: {fps}
      </div>
    </div>
  )
}

export default NeonTrailsUltra
