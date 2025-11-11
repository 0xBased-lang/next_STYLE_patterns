"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * AURORA FLOW: ETHEREAL - ULTRA VERSION
 *
 * Mesmerizing Northern Lights effect with flowing gradients!
 * Features: Smooth wave motion, atmospheric glow, particle overlay,
 * ethereal shimmer, and stunning color transitions.
 *
 * Perfect for: Hero sections, backgrounds, cosmic themes, meditation apps,
 * luxury brands, ambient effects, immersive experiences.
 */

interface WaveLayer {
  offset: number
  speed: number
  amplitude: number
  frequency: number
  colors: string[]
}

export interface AuroraFlowUltraProps {
  /** Background base color */
  backgroundColor?: string
  /** Canvas width */
  width?: number | string
  /** Canvas height */
  height?: number | string

  /** Color palette for aurora */
  colors?: string[]
  /** Flow speed multiplier (0.1-5) */
  flowSpeed?: number
  /** Wave amplitude (0-200) */
  waveAmplitude?: number
  /** Wave frequency (0.1-10) */
  waveFrequency?: number
  /** Number of wave layers (1-8) */
  layerCount?: number
  /** Glow intensity (0-100) */
  glowIntensity?: number
  /** Blur amount (0-50px) */
  blurAmount?: number
  /** Particle overlay density (0-1000) */
  particleDensity?: number
  /** Color transition speed (0.1-5) */
  colorTransitionSpeed?: number
  /** Shimmer frequency (0-100) */
  shimmerFrequency?: number
  /** Opacity of layers (0-100) */
  layerOpacity?: number
  /** Blend mode: normal, screen, lighten, overlay */
  blendMode?: 'normal' | 'screen' | 'lighten' | 'overlay'
  /** Vertical gradient (boolean) */
  verticalGradient?: boolean
  /** Turbulence strength (0-100) */
  turbulence?: number

  children?: React.ReactNode
}

export function AuroraFlowUltra({
  backgroundColor = '#0a0a1a',
  width = '100%',
  height = '100vh',
  colors = ['#00ff88', '#0099ff', '#9933ff', '#ff0088', '#00ffff'],
  flowSpeed = 1,
  waveAmplitude = 80,
  waveFrequency = 2,
  layerCount = 5,
  glowIntensity = 30,
  blurAmount = 20,
  particleDensity = 200,
  colorTransitionSpeed = 1,
  shimmerFrequency = 20,
  layerOpacity = 70,
  blendMode = 'screen',
  verticalGradient = true,
  turbulence = 30,
  children,
}: AuroraFlowUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const [fps, setFps] = useState(60)
  const lastFrameTime = useRef(Date.now())
  const waveLayers = useRef<WaveLayer[]>([])
  const particles = useRef<Array<{ x: number; y: number; size: number; alpha: number }>>([])
  const colorCycleOffset = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Initialize wave layers
      waveLayers.current = Array.from({ length: layerCount }, (_, i) => ({
        offset: (i * Math.PI * 2) / layerCount,
        speed: flowSpeed * (0.3 + Math.random() * 0.7),
        amplitude: waveAmplitude * (0.5 + Math.random() * 0.5),
        frequency: waveFrequency * (0.8 + Math.random() * 0.4),
        colors: [
          colors[i % colors.length],
          colors[(i + 1) % colors.length],
        ],
      }))

      // Initialize particles
      particles.current = Array.from({ length: particleDensity }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      }))
    }
    updateSize()
    window.addEventListener('resize', updateSize)

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

      // Color cycle
      colorCycleOffset.current += colorTransitionSpeed * 0.001

      // Draw aurora layers
      waveLayers.current.forEach((layer, layerIndex) => {
        layer.offset += layer.speed * 0.001

        const gradient = verticalGradient
          ? ctx.createLinearGradient(0, 0, 0, canvas.height)
          : ctx.createLinearGradient(0, 0, canvas.width, 0)

        // Create gradient with cycling colors
        const colorOffset = (colorCycleOffset.current + layerIndex * 0.3) % 1
        const color1Index = Math.floor(colorOffset * colors.length) % colors.length
        const color2Index = (color1Index + 1) % colors.length

        gradient.addColorStop(0, colors[color1Index] + '00')
        gradient.addColorStop(0.3, colors[color1Index] + Math.floor(layerOpacity * 2.55).toString(16).padStart(2, '0'))
        gradient.addColorStop(0.7, colors[color2Index] + Math.floor(layerOpacity * 2.55).toString(16).padStart(2, '0'))
        gradient.addColorStop(1, colors[color2Index] + '00')

        ctx.fillStyle = gradient

        // Draw wave
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 5) {
          const normalizedX = x / canvas.width
          const wave1 = Math.sin(normalizedX * layer.frequency + layer.offset) * layer.amplitude
          const wave2 = Math.sin(normalizedX * layer.frequency * 2 + layer.offset * 1.5) * (layer.amplitude * 0.5)
          const turbulenceOffset = Math.sin(normalizedX * 10 + layer.offset * 2) * (turbulence / 10)
          const y = canvas.height / 2 + wave1 + wave2 + turbulenceOffset

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()

        // Shimmer effect
        if (shimmerFrequency > 0 && Math.random() < shimmerFrequency / 1000) {
          ctx.globalAlpha = 0.3
          ctx.shadowBlur = glowIntensity
          ctx.shadowColor = layer.colors[0]
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
        }
      })

      // Reset filter and blend mode
      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'

      // Draw particles
      if (particleDensity > 0) {
        particles.current.forEach((p) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
          ctx.shadowBlur = p.size * 2
          ctx.shadowColor = '#ffffff'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()

          // Drift particles
          p.y -= 0.2
          p.x += Math.sin(now * 0.001 + p.y * 0.01) * 0.5
          if (p.y < 0) p.y = canvas.height
          if (p.x < 0) p.x = canvas.width
          if (p.x > canvas.width) p.x = 0
        })
        ctx.shadowBlur = 0
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    backgroundColor,
    colors,
    flowSpeed,
    waveAmplitude,
    waveFrequency,
    layerCount,
    glowIntensity,
    blurAmount,
    particleDensity,
    colorTransitionSpeed,
    shimmerFrequency,
    layerOpacity,
    blendMode,
    verticalGradient,
    turbulence,
  ])

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
          color: '#00ff88',
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

export default AuroraFlowUltra
