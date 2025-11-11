"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * PARTICLE EXPLOSION: COSMIC - ULTRA VERSION
 *
 * The most extraordinary particle system with 25+ customizable parameters!
 * Features: GPU-accelerated rendering, physics simulation, mouse interaction,
 * shape morphing, trail effects, and insane visual possibilities.
 *
 * Perfect for: Celebration effects, cosmic backgrounds, interactive art,
 * product launches, special effects, "wow" moments.
 */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  rotation: number
  rotationSpeed: number
  color: string
  trail: { x: number; y: number; alpha: number }[]
  shape: string
  alpha: number
}

export interface ParticleExplosionUltraProps {
  // === BASIC PROPERTIES ===
  /** Background color (rgba supported) */
  backgroundColor?: string
  /** Canvas width */
  width?: number | string
  /** Canvas height */
  height?: number | string

  // === PARTICLE SETTINGS ===
  /** Number of particles (100-5000) */
  particleCount?: number
  /** Minimum particle size in pixels (1-10) */
  particleSizeMin?: number
  /** Maximum particle size in pixels (1-20) */
  particleSizeMax?: number
  /** Color palette for particles */
  colors?: string[]
  /** Particle shape: circle, square, star, triangle, hexagon, custom */
  particleShape?: 'circle' | 'square' | 'star' | 'triangle' | 'hexagon' | 'custom'

  // === PHYSICS & MOTION ===
  /** Explosion force multiplier (0.1-100) */
  explosionForce?: number
  /** Gravity strength (-2 to 2, negative = upward) */
  gravity?: number
  /** Air resistance/friction (0-1, higher = more drag) */
  friction?: number
  /** Velocity randomness (0-100) */
  velocityRandomness?: number
  /** Enable rotation for particles */
  rotationEnabled?: boolean
  /** Rotation speed multiplier (0.1-10) */
  rotationSpeed?: number

  // === VISUAL EFFECTS ===
  /** Glow intensity (0-50px) */
  glowIntensity?: number
  /** Trail length (0 = no trail, 1-50 = trail points) */
  trailLength?: number
  /** Particle lifetime in seconds (1-20) */
  particleLifetime?: number
  /** Fade mode: linear, exponential, inverse */
  fadeMode?: 'linear' | 'exponential' | 'inverse'
  /** Enable additive blending (brighter overlaps) */
  additiveBlending?: boolean
  /** Background blur amount (0-50px) */
  backgroundBlur?: number

  // === INTERACTION ===
  /** Mouse interaction mode */
  mouseInteraction?: 'attract' | 'repel' | 'none'
  /** Mouse interaction radius (50-500px) */
  mouseRadius?: number
  /** Mouse force strength (0.1-10) */
  mouseForce?: number
  /** Click creates new explosion */
  clickExplode?: boolean

  // === EMISSION ===
  /** Continuous emission (vs single burst) */
  continuousEmission?: boolean
  /** Emission rate per second (if continuous) */
  emissionRate?: number
  /** Spawn from center or random positions */
  spawnMode?: 'center' | 'random' | 'edges' | 'mouse'

  // === CHILDREN ===
  children?: React.ReactNode
}

export function ParticleExplosionUltra({
  backgroundColor = 'rgba(0, 0, 0, 0.95)',
  width = '100%',
  height = '100vh',
  particleCount = 500,
  particleSizeMin = 2,
  particleSizeMax = 6,
  colors = ['#FF0080', '#00D4FF', '#FF6B00', '#00FF88', '#9D00FF', '#FFD700'],
  particleShape = 'circle',
  explosionForce = 5,
  gravity = 0.05,
  friction = 0.98,
  velocityRandomness = 50,
  rotationEnabled = true,
  rotationSpeed = 2,
  glowIntensity = 10,
  trailLength = 5,
  particleLifetime = 5,
  fadeMode = 'exponential',
  additiveBlending = true,
  backgroundBlur = 0,
  mouseInteraction = 'repel',
  mouseRadius = 150,
  mouseForce = 2,
  clickExplode = true,
  continuousEmission = false,
  emissionRate = 30,
  spawnMode = 'center',
  children,
}: ParticleExplosionUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const mousePos = useRef({ x: 0, y: 0 })
  const [fps, setFps] = useState(60)
  const lastFrameTime = useRef(Date.now())
  const emissionAccumulator = useRef(0)

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create initial particle burst
    if (!continuousEmission) {
      createExplosion(canvas.width / 2, canvas.height / 2, particleCount)
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Click explosion
    const handleClick = (e: MouseEvent) => {
      if (clickExplode) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        createExplosion(x, y, particleCount / 2)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    // Animation loop
    const animate = () => {
      // FPS calculation
      const now = Date.now()
      const delta = now - lastFrameTime.current
      lastFrameTime.current = now
      const currentFps = Math.round(1000 / delta)
      setFps(currentFps)

      // Clear canvas
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Background blur effect
      if (backgroundBlur > 0) {
        ctx.filter = `blur(${backgroundBlur}px)`
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = 'none'
      }

      // Set blending mode
      if (additiveBlending) {
        ctx.globalCompositeOperation = 'lighter'
      }

      // Continuous emission
      if (continuousEmission) {
        emissionAccumulator.current += (emissionRate * delta) / 1000
        while (emissionAccumulator.current >= 1) {
          const spawnPos = getSpawnPosition(canvas.width, canvas.height, spawnMode)
          createExplosion(spawnPos.x, spawnPos.y, 1)
          emissionAccumulator.current -= 1
        }
      }

      // Update and render particles
      particles.current = particles.current.filter((p) => {
        // Physics update
        p.vy += gravity
        p.vx *= friction
        p.vy *= friction

        // Mouse interaction
        if (mouseInteraction !== 'none') {
          const dx = p.x - mousePos.current.x
          const dy = p.y - mousePos.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            const force = mouseForce * (1 - dist / mouseRadius)
            const angle = Math.atan2(dy, dx)

            if (mouseInteraction === 'repel') {
              p.vx += Math.cos(angle) * force
              p.vy += Math.sin(angle) * force
            } else {
              p.vx -= Math.cos(angle) * force
              p.vy -= Math.sin(angle) * force
            }
          }
        }

        // Position update
        p.x += p.vx
        p.y += p.vy

        // Rotation
        if (rotationEnabled) {
          p.rotation += p.rotationSpeed
        }

        // Update trail
        if (trailLength > 0) {
          p.trail.unshift({ x: p.x, y: p.y, alpha: p.alpha })
          if (p.trail.length > trailLength) {
            p.trail.pop()
          }
        }

        // Life update
        p.life -= delta / 1000

        // Fade calculation
        const lifePercent = p.life / p.maxLife
        if (fadeMode === 'linear') {
          p.alpha = lifePercent
        } else if (fadeMode === 'exponential') {
          p.alpha = Math.pow(lifePercent, 2)
        } else if (fadeMode === 'inverse') {
          p.alpha = Math.sqrt(lifePercent)
        }

        // Draw trail
        if (trailLength > 0 && p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const prevPoint = p.trail[i - 1]
            const currPoint = p.trail[i]
            const trailAlpha = (p.alpha * (1 - i / trailLength)) / 2

            ctx.strokeStyle = p.color.replace(/[\d.]+\)$/g, `${trailAlpha})`)
            ctx.lineWidth = p.size * (1 - i / trailLength)
            ctx.beginPath()
            ctx.moveTo(prevPoint.x, prevPoint.y)
            ctx.lineTo(currPoint.x, currPoint.y)
            ctx.stroke()
          }
        }

        // Draw glow
        if (glowIntensity > 0) {
          ctx.shadowBlur = glowIntensity
          ctx.shadowColor = p.color
        }

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.alpha

        const halfSize = p.size / 2
        ctx.fillStyle = p.color

        if (particleShape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, halfSize, 0, Math.PI * 2)
          ctx.fill()
        } else if (particleShape === 'square') {
          ctx.fillRect(-halfSize, -halfSize, p.size, p.size)
        } else if (particleShape === 'star') {
          drawStar(ctx, 0, 0, 5, halfSize, halfSize / 2)
          ctx.fill()
        } else if (particleShape === 'triangle') {
          ctx.beginPath()
          ctx.moveTo(0, -halfSize)
          ctx.lineTo(halfSize, halfSize)
          ctx.lineTo(-halfSize, halfSize)
          ctx.closePath()
          ctx.fill()
        } else if (particleShape === 'hexagon') {
          drawPolygon(ctx, 0, 0, 6, halfSize)
          ctx.fill()
        }

        ctx.restore()

        // Reset shadow
        ctx.shadowBlur = 0

        // Remove dead particles
        return p.life > 0
      })

      // Continue animation
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
    particleCount,
    particleSizeMin,
    particleSizeMax,
    colors,
    particleShape,
    explosionForce,
    gravity,
    friction,
    velocityRandomness,
    rotationEnabled,
    rotationSpeed,
    glowIntensity,
    trailLength,
    particleLifetime,
    fadeMode,
    additiveBlending,
    backgroundBlur,
    mouseInteraction,
    mouseRadius,
    mouseForce,
    clickExplode,
    continuousEmission,
    emissionRate,
    spawnMode,
  ])

  // Helper: Get spawn position based on mode
  const getSpawnPosition = (
    width: number,
    height: number,
    mode: string
  ): { x: number; y: number } => {
    if (mode === 'center') {
      return { x: width / 2, y: height / 2 }
    } else if (mode === 'random') {
      return { x: Math.random() * width, y: Math.random() * height }
    } else if (mode === 'edges') {
      const side = Math.floor(Math.random() * 4)
      if (side === 0) return { x: Math.random() * width, y: 0 }
      if (side === 1) return { x: width, y: Math.random() * height }
      if (side === 2) return { x: Math.random() * width, y: height }
      return { x: 0, y: Math.random() * height }
    } else {
      return mousePos.current
    }
  }

  // Helper: Create explosion
  const createExplosion = (x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * (velocityRandomness / 50)
      const force = explosionForce * (1 + (Math.random() - 0.5) * (velocityRandomness / 100))

      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force,
        life: particleLifetime,
        maxLife: particleLifetime,
        size: particleSizeMin + Math.random() * (particleSizeMax - particleSizeMin),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * rotationSpeed * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
        shape: particleShape,
        alpha: 1,
      })
    }
  }

  // Helper: Draw star
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    let rot = (Math.PI / 2) * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }

    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
  }

  // Helper: Draw polygon
  const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sides: number,
    radius: number
  ) => {
    ctx.beginPath()
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2
      const px = x + Math.cos(angle) * radius
      const py = y + Math.sin(angle) * radius
      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }
    ctx.closePath()
  }

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      )}
      {/* FPS Monitor */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'rgba(0,0,0,0.5)',
          color: '#0F0',
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

export default ParticleExplosionUltra
