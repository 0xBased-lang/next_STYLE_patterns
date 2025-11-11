import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface GlitchTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text to display with glitch effect
   */
  children: string
  /**
   * Glitch intensity (1-10, default: 5)
   */
  intensity?: number
  /**
   * Glitch animation speed in seconds (default: 0.5)
   */
  speed?: number
  /**
   * Primary color (default: Matrix green #00FF41)
   */
  color?: string
  /**
   * Glitch color 1 (default: cyan)
   */
  glitchColor1?: string
  /**
   * Glitch color 2 (default: red)
   */
  glitchColor2?: string
  /**
   * Trigger glitch on hover (default: false)
   */
  glitchOnHover?: boolean
  /**
   * Continuous glitch animation (default: true)
   */
  continuous?: boolean
}

/**
 * GlitchText - Distorted text effect for conspiracy aesthetic
 *
 * Creates digital glitch/corruption effects on text
 *
 * @example
 * ```tsx
 * // Basic glitch
 * <GlitchText>CLASSIFIED</GlitchText>
 *
 * // Custom intensity and colors
 * <GlitchText
 *   intensity={8}
 *   color="#D4AF37"
 *   glitchColor1="#FF0000"
 *   glitchColor2="#00FF00"
 * >
 *   TOP SECRET
 * </GlitchText>
 *
 * // Glitch on hover only
 * <GlitchText glitchOnHover continuous={false}>
 *   Hover to reveal
 * </GlitchText>
 * ```
 */
export const GlitchText = React.forwardRef<HTMLDivElement, GlitchTextProps>(
  (
    {
      children,
      className,
      intensity = 5,
      speed = 0.5,
      color = '#00FF41',
      glitchColor1 = '#00FFFF',
      glitchColor2 = '#FF00FF',
      glitchOnHover = false,
      continuous = true,
      ...props
    },
    ref
  ) => {
    const [isGlitching, setIsGlitching] = React.useState(!glitchOnHover && continuous)

    const glitchAmount = intensity * 2

    const glitchVariants = {
      idle: {
        x: 0,
        skewX: 0,
      },
      glitch: {
        x: [0, -glitchAmount, glitchAmount, -glitchAmount, 0],
        skewX: [0, -5, 5, -5, 0],
        transition: {
          duration: speed,
          repeat: continuous ? Infinity : 0,
          repeatDelay: 0.5,
        },
      },
    }

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
        onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
        {...props}
      >
        {/* Main text */}
        <motion.span
          className="relative inline-block"
          style={{ color }}
          variants={glitchVariants}
          animate={isGlitching ? 'glitch' : 'idle'}
        >
          {children}
        </motion.span>

        {/* Glitch layer 1 (cyan) */}
        <motion.span
          className="absolute top-0 left-0 inline-block pointer-events-none"
          style={{
            color: glitchColor1,
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
          variants={glitchVariants}
          animate={isGlitching ? 'glitch' : 'idle'}
          transition={{
            duration: speed,
            repeat: continuous ? Infinity : 0,
            repeatDelay: 0.3,
          }}
        >
          {children}
        </motion.span>

        {/* Glitch layer 2 (magenta) */}
        <motion.span
          className="absolute top-0 left-0 inline-block pointer-events-none"
          style={{
            color: glitchColor2,
            mixBlendMode: 'screen',
            opacity: 0.8,
          }}
          variants={glitchVariants}
          animate={isGlitching ? 'glitch' : 'idle'}
          transition={{
            duration: speed,
            repeat: continuous ? Infinity : 0,
            repeatDelay: 0.4,
          }}
        >
          {children}
        </motion.span>
      </div>
    )
  }
)

GlitchText.displayName = 'GlitchText'
