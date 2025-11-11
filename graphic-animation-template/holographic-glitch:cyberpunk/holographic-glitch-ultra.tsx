"use client"

import React, { useEffect, useRef, useState } from 'react'

/**
 * HOLOGRAPHIC GLITCH: CYBERPUNK - ULTRA VERSION
 *
 * The most insane glitch effect with RGB split, scan lines, data corruption!
 * Features: Chromatic aberration, CRT effects, digital glitches, holographic shimmer,
 * VHS distortion, matrix code overlay, and complete cyberpunk aesthetics.
 *
 * Perfect for: Cyberpunk themes, hacker aesthetics, error states, loading screens,
 * futuristic UI, digital art, vaporwave vibes, glitch art.
 */

export interface HolographicGlitchUltraProps {
  // === BASIC PROPERTIES ===
  /** Background color */
  backgroundColor?: string
  /** Canvas width */
  width?: number | string
  /** Canvas height */
  height?: number | string

  // === GLITCH SETTINGS ===
  /** Glitch intensity (0-100) */
  glitchIntensity?: number
  /** RGB split distance in pixels (0-50) */
  rgbSplitDistance?: number
  /** Glitch frequency in milliseconds (100-5000) */
  glitchFrequency?: number
  /** Glitch duration in milliseconds (50-1000) */
  glitchDuration?: number
  /** Which color channels to affect: r, g, b, rg, rb, gb, rgb */
  colorChannels?: 'r' | 'g' | 'b' | 'rg' | 'rb' | 'gb' | 'rgb'

  // === SCAN LINES (CRT Effect) ===
  /** Number of scan lines (10-200) */
  scanLineCount?: number
  /** Scan line opacity (0-100) */
  scanLineOpacity?: number
  /** Animate scan lines */
  animateScanLines?: boolean
  /** Scan line scroll speed (0.1-10) */
  scanLineSpeed?: number

  // === CHROMATIC ABERRATION ===
  /** Chromatic shift amount (0-20px) */
  chromaticShift?: number
  /** Aberration angle in degrees (0-360) */
  aberrationAngle?: number

  // === DISTORTION ===
  /** Wave distortion amplitude (0-50) */
  distortionAmplitude?: number
  /** Distortion frequency (0.1-5) */
  distortionFrequency?: number
  /** VHS tape distortion effect */
  vhsDistortion?: boolean

  // === DIGITAL EFFECTS ===
  /** Data corruption density (0-100) */
  corruptionDensity?: number
  /** Noise intensity (0-100) */
  noiseIntensity?: number
  /** Digital artifacts (blocky glitches) */
  digitalArtifacts?: boolean

  // === HOLOGRAPHIC EFFECTS ===
  /** Hologram flicker effect */
  hologramFlicker?: boolean
  /** Flicker rate in milliseconds (50-500) */
  flickerRate?: number
  /** Hologram color shift */
  hologramColorShift?: boolean

  // === CODE OVERLAY ===
  /** Matrix-style code overlay */
  codeOverlay?: boolean
  /** Code scroll speed (0.1-5) */
  codeSpeed?: number
  /** Code density (0-100) */
  codeDensity?: number
  /** Code color */
  codeColor?: string

  // === CHILDREN ===
  children?: React.ReactNode
}

export function HolographicGlitchUltra({
  backgroundColor = '#000000',
  width = '100%',
  height = '100vh',
  glitchIntensity = 50,
  rgbSplitDistance = 5,
  glitchFrequency = 2000,
  glitchDuration = 200,
  colorChannels = 'rgb',
  scanLineCount = 100,
  scanLineOpacity = 30,
  animateScanLines = true,
  scanLineSpeed = 1,
  chromaticShift = 3,
  aberrationAngle = 0,
  distortionAmplitude = 10,
  distortionFrequency = 1,
  vhsDistortion = false,
  corruptionDensity = 20,
  noiseIntensity = 10,
  digitalArtifacts = true,
  hologramFlicker = true,
  flickerRate = 150,
  hologramColorShift = true,
  codeOverlay = false,
  codeSpeed = 1,
  codeDensity = 30,
  codeColor = '#00FF00',
  children,
}: HolographicGlitchUltraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameId = useRef<number>()
  const [fps, setFps] = useState(60)
  const lastFrameTime = useRef(Date.now())
  const glitchActive = useRef(false)
  const lastGlitchTime = useRef(Date.now())
  const scanLineOffset = useRef(0)
  const codeColumns = useRef<Array<{ chars: string[]; y: number; speed: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Create offscreen canvas for effects
    const offscreen = document.createElement('canvas')
    offscreenCanvasRef.current = offscreen
    const offscreenCtx = offscreen.getContext('2d')
    if (!offscreenCtx) return

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      offscreen.width = rect.width
      offscreen.height = rect.height

      // Initialize code columns
      if (codeOverlay) {
        const columnCount = Math.floor(rect.width / 20)
        codeColumns.current = Array.from({ length: columnCount }, () => ({
          chars: Array.from({ length: 50 }, () =>
            String.fromCharCode(0x30A0 + Math.random() * 96)
          ),
          y: Math.random() * rect.height,
          speed: 0.5 + Math.random() * codeSpeed,
        }))
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Animation loop
    const animate = () => {
      const now = Date.now()
      const delta = now - lastFrameTime.current
      lastFrameTime.current = now
      const currentFps = Math.round(1000 / delta)
      setFps(currentFps)

      // Clear
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw content to offscreen canvas first
      offscreenCtx.fillStyle = backgroundColor
      offscreenCtx.fillRect(0, 0, offscreen.width, offscreen.height)

      // Glitch timing
      if (now - lastGlitchTime.current > glitchFrequency) {
        glitchActive.current = true
        lastGlitchTime.current = now
        setTimeout(() => {
          glitchActive.current = false
        }, glitchDuration)
      }

      // Base image (could be your content)
      offscreenCtx.fillStyle = '#1a1a2e'
      offscreenCtx.fillRect(
        canvas.width * 0.2,
        canvas.height * 0.2,
        canvas.width * 0.6,
        canvas.height * 0.6
      )

      // Apply effects based on what's active
      let finalImageData = offscreenCtx.getImageData(0, 0, offscreen.width, offscreen.height)

      // RGB Split / Chromatic Aberration
      if (glitchActive.current && rgbSplitDistance > 0) {
        finalImageData = applyRGBSplit(
          finalImageData,
          rgbSplitDistance,
          aberrationAngle,
          colorChannels
        )
      }

      // Chromatic shift (always active if > 0)
      if (chromaticShift > 0) {
        finalImageData = applyRGBSplit(finalImageData, chromaticShift, aberrationAngle, colorChannels)
      }

      // Noise
      if (noiseIntensity > 0) {
        finalImageData = applyNoise(finalImageData, noiseIntensity)
      }

      // Corruption
      if (glitchActive.current && corruptionDensity > 0) {
        finalImageData = applyCorruption(finalImageData, corruptionDensity, canvas.width)
      }

      // Digital artifacts
      if (glitchActive.current && digitalArtifacts) {
        finalImageData = applyDigitalArtifacts(finalImageData, canvas.width, canvas.height)
      }

      // Put processed image data
      ctx.putImageData(finalImageData, 0, 0)

      // Wave distortion
      if (glitchActive.current && distortionAmplitude > 0) {
        applyWaveDistortion(ctx, canvas, distortionAmplitude, distortionFrequency, now)
      }

      // VHS distortion
      if (vhsDistortion && Math.random() < 0.1) {
        applyVHSDistortion(ctx, canvas)
      }

      // Scan lines
      if (scanLineCount > 0) {
        drawScanLines(
          ctx,
          canvas.width,
          canvas.height,
          scanLineCount,
          scanLineOpacity,
          scanLineOffset.current
        )
        if (animateScanLines) {
          scanLineOffset.current += scanLineSpeed * 0.5
        }
      }

      // Hologram flicker
      if (hologramFlicker && Math.random() < 0.05) {
        ctx.globalAlpha = 0.5 + Math.random() * 0.5
        ctx.fillStyle = hologramColorShift
          ? `rgba(${Math.random() * 100}, ${Math.random() * 100}, 255, 0.1)`
          : 'rgba(0, 255, 255, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
      }

      // Code overlay
      if (codeOverlay) {
        drawCodeOverlay(ctx, canvas.width, canvas.height, codeColor, codeDensity)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    backgroundColor,
    glitchIntensity,
    rgbSplitDistance,
    glitchFrequency,
    glitchDuration,
    colorChannels,
    scanLineCount,
    scanLineOpacity,
    animateScanLines,
    scanLineSpeed,
    chromaticShift,
    aberrationAngle,
    distortionAmplitude,
    distortionFrequency,
    vhsDistortion,
    corruptionDensity,
    noiseIntensity,
    digitalArtifacts,
    hologramFlicker,
    flickerRate,
    hologramColorShift,
    codeOverlay,
    codeSpeed,
    codeDensity,
    codeColor,
  ])

  // Effect functions
  function applyRGBSplit(
    imageData: ImageData,
    distance: number,
    angle: number,
    channels: string
  ): ImageData {
    const data = new Uint8ClampedArray(imageData.data)
    const width = imageData.width
    const angleRad = (angle * Math.PI) / 180

    const offsetX = Math.cos(angleRad) * distance
    const offsetY = Math.sin(angleRad) * distance

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const i = (y * width + x) * 4

        if (channels.includes('r')) {
          const srcX = Math.round(x + offsetX)
          const srcY = Math.round(y + offsetY)
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < imageData.height) {
            const srcI = (srcY * width + srcX) * 4
            data[i] = imageData.data[srcI]
          }
        }

        if (channels.includes('b')) {
          const srcX = Math.round(x - offsetX)
          const srcY = Math.round(y - offsetY)
          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < imageData.height) {
            const srcI = (srcY * width + srcX) * 4
            data[i + 2] = imageData.data[srcI + 2]
          }
        }
      }
    }

    return new ImageData(data, imageData.width, imageData.height)
  }

  function applyNoise(imageData: ImageData, intensity: number): ImageData {
    const data = new Uint8ClampedArray(imageData.data)
    const noiseAmount = (intensity / 100) * 50

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * noiseAmount
      data[i] = Math.max(0, Math.min(255, data[i] + noise))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
    }

    return new ImageData(data, imageData.width, imageData.height)
  }

  function applyCorruption(imageData: ImageData, density: number, width: number): ImageData {
    const data = new Uint8ClampedArray(imageData.data)
    const corruptionChance = density / 1000

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < corruptionChance) {
        // Corrupt this pixel
        const mode = Math.floor(Math.random() * 3)
        if (mode === 0) {
          // Invert
          data[i] = 255 - data[i]
          data[i + 1] = 255 - data[i + 1]
          data[i + 2] = 255 - data[i + 2]
        } else if (mode === 1) {
          // Random color
          data[i] = Math.random() * 255
          data[i + 1] = Math.random() * 255
          data[i + 2] = Math.random() * 255
        } else {
          // Black
          data[i] = 0
          data[i + 1] = 0
          data[i + 2] = 0
        }
      }
    }

    return new ImageData(data, imageData.width, imageData.height)
  }

  function applyDigitalArtifacts(
    imageData: ImageData,
    width: number,
    height: number
  ): ImageData {
    const data = new Uint8ClampedArray(imageData.data)

    // Create random rectangular glitches
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      const w = Math.floor(Math.random() * 50 + 10)
      const h = Math.floor(Math.random() * 20 + 5)

      for (let py = y; py < Math.min(y + h, height); py++) {
        for (let px = x; px < Math.min(x + w, width); px++) {
          const i = (py * width + px) * 4
          data[i] = Math.random() * 255
          data[i + 1] = Math.random() * 255
          data[i + 2] = Math.random() * 255
        }
      }
    }

    return new ImageData(data, imageData.width, imageData.height)
  }

  function applyWaveDistortion(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    amplitude: number,
    frequency: number,
    time: number
  ) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < canvas.height; y++) {
      const offsetX = Math.sin(y * frequency * 0.01 + time * 0.001) * amplitude
      ctx.putImageData(
        imageData,
        offsetX,
        0,
        0,
        y,
        canvas.width,
        1
      )
    }
  }

  function applyVHSDistortion(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const sliceHeight = 5 + Math.random() * 20
    const y = Math.random() * canvas.height
    const imageData = ctx.getImageData(0, y, canvas.width, sliceHeight)
    ctx.putImageData(imageData, Math.random() * 20 - 10, y)
  }

  function drawScanLines(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    count: number,
    opacity: number,
    offset: number
  ) {
    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity / 100})`
    ctx.lineWidth = 1

    const spacing = height / count
    for (let i = 0; i < count; i++) {
      const y = ((i * spacing + offset) % height)
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }

  function drawCodeOverlay(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
    density: number
  ) {
    ctx.fillStyle = color
    ctx.font = '14px monospace'
    ctx.globalAlpha = density / 200

    codeColumns.current.forEach((col, i) => {
      const x = i * 20
      col.y += col.speed
      if (col.y > height) col.y = 0

      col.chars.forEach((char, j) => {
        const y = col.y - j * 20
        if (y > 0 && y < height) {
          ctx.fillText(char, x, y)
        }
      })
    })

    ctx.globalAlpha = 1
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
          background: 'rgba(0,0,0,0.8)',
          color: '#0FF',
          padding: '5px 10px',
          fontFamily: 'monospace',
          fontSize: '12px',
          borderRadius: '4px',
          border: '1px solid #0FF',
          pointerEvents: 'none',
        }}
      >
        FPS: {fps}
      </div>
    </div>
  )
}

export default HolographicGlitchUltra
