"use client"

import React from 'react'
import { AuroraFlowUltra, type AuroraFlowUltraProps } from './aurora-flow-ultra'

/**
 * AURORA FLOW: ETHEREAL - STANDARD VERSION
 *
 * Simplified Northern Lights effect with sensible defaults.
 * Perfect for quick implementation without overwhelming configuration.
 *
 * For advanced customization, use AuroraFlowUltra component.
 */

export type AuroraFlowDensity = 'low' | 'medium' | 'high'
export type AuroraFlowSpeed = 'slow' | 'medium' | 'fast'
export type AuroraFlowTheme = 'northern' | 'cosmic' | 'ocean' | 'sunset' | 'neon'

export interface AuroraFlowProps {
  /** Flow density preset */
  density?: AuroraFlowDensity
  /** Animation speed preset */
  speed?: AuroraFlowSpeed
  /** Color theme preset */
  theme?: AuroraFlowTheme
  /** Background color */
  backgroundColor?: string
  /** Canvas width */
  width?: number | string
  /** Canvas height */
  height?: number | string

  children?: React.ReactNode
}

const THEME_COLORS: Record<AuroraFlowTheme, string[]> = {
  northern: ['#00ff88', '#0099ff', '#9933ff', '#ff0088', '#00ffff'],
  cosmic: ['#ff00ff', '#00ffff', '#ffff00', '#ff3300', '#00ff00'],
  ocean: ['#0099ff', '#00ffff', '#0066ff', '#33ccff', '#0033ff'],
  sunset: ['#ff6600', '#ff3366', '#ffcc00', '#ff0099', '#ff9933'],
  neon: ['#00ff00', '#ff00ff', '#00ffff', '#ff0000', '#ffff00'],
}

const DENSITY_CONFIG: Record<AuroraFlowDensity, Pick<AuroraFlowUltraProps, 'layerCount' | 'particleDensity' | 'waveAmplitude'>> = {
  low: { layerCount: 3, particleDensity: 50, waveAmplitude: 60 },
  medium: { layerCount: 5, particleDensity: 200, waveAmplitude: 80 },
  high: { layerCount: 7, particleDensity: 400, waveAmplitude: 100 },
}

const SPEED_CONFIG: Record<AuroraFlowSpeed, Pick<AuroraFlowUltraProps, 'flowSpeed' | 'colorTransitionSpeed'>> = {
  slow: { flowSpeed: 0.5, colorTransitionSpeed: 0.5 },
  medium: { flowSpeed: 1, colorTransitionSpeed: 1 },
  fast: { flowSpeed: 2, colorTransitionSpeed: 2 },
}

export function AuroraFlow({
  density = 'medium',
  speed = 'medium',
  theme = 'northern',
  backgroundColor = '#0a0a1a',
  width = '100%',
  height = '100vh',
  children,
}: AuroraFlowProps) {
  const densityConfig = DENSITY_CONFIG[density]
  const speedConfig = SPEED_CONFIG[speed]
  const colors = THEME_COLORS[theme]

  return (
    <AuroraFlowUltra
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      colors={colors}
      {...densityConfig}
      {...speedConfig}
      waveFrequency={2}
      glowIntensity={30}
      blurAmount={20}
      shimmerFrequency={20}
      layerOpacity={70}
      blendMode="screen"
      verticalGradient={true}
      turbulence={30}
    >
      {children}
    </AuroraFlowUltra>
  )
}

export default AuroraFlow
