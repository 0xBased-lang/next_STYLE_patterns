import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Children to float
   */
  children: React.ReactNode
  /**
   * Float intensity (1-10, default: 5)
   */
  intensity?: number
  /**
   * Animation speed in seconds (default: 3)
   */
  speed?: number
  /**
   * Enable rotation during float (default: true)
   */
  rotate?: boolean
  /**
   * Enable scale pulse (default: true)
   */
  pulse?: boolean
  /**
   * Float pattern (default: "gentle")
   */
  pattern?: 'gentle' | 'bounce' | 'drift' | 'wave'
}

/**
 * FloatingElement - Gentle floating animation wrapper
 *
 * Adds smooth, organic floating motion to any element
 *
 * @example
 * ```tsx
 * // Basic floating
 * <FloatingElement>
 *   <div>I float gently!</div>
 * </FloatingElement>
 *
 * // Bouncy pattern
 * <FloatingElement pattern="bounce" intensity={7}>
 *   <Button>Bouncy Button</Button>
 * </FloatingElement>
 *
 * // Wave motion
 * <FloatingElement pattern="wave" speed={5} rotate={false}>
 *   <Card>Wavy Card</Card>
 * </FloatingElement>
 * ```
 */
export const FloatingElement = React.forwardRef<HTMLDivElement, FloatingElementProps>(
  (
    {
      children,
      className,
      intensity = 5,
      speed = 3,
      rotate = true,
      pulse = true,
      pattern = 'gentle',
      ...props
    },
    ref
  ) => {
    const floatAmount = intensity * 2

    // Pattern configurations
    const patternConfig = {
      gentle: {
        y: [-floatAmount, floatAmount, -floatAmount],
        x: [-floatAmount / 2, floatAmount / 2, -floatAmount / 2],
        rotate: rotate ? [-2, 2, -2] : 0,
        scale: pulse ? [1, 1.02, 1] : 1,
        ease: 'easeInOut' as const,
      },
      bounce: {
        y: [0, -floatAmount * 2, 0],
        x: 0,
        rotate: 0,
        scale: pulse ? [1, 0.95, 1] : 1,
        ease: [0.45, 0, 0.55, 1] as [number, number, number, number],
      },
      drift: {
        y: [-floatAmount, floatAmount],
        x: [-floatAmount * 1.5, floatAmount * 1.5],
        rotate: rotate ? [-5, 5] : 0,
        scale: pulse ? [1, 1.05, 1, 1.05, 1] : 1,
        ease: 'linear' as const,
      },
      wave: {
        y: [
          0,
          -floatAmount,
          -floatAmount * 0.5,
          -floatAmount * 1.2,
          0,
        ],
        x: [
          0,
          floatAmount * 0.5,
          floatAmount,
          floatAmount * 0.3,
          0,
        ],
        rotate: rotate ? [0, 3, 0, -3, 0] : 0,
        scale: 1,
        ease: 'easeInOut' as const,
      },
    }

    const config = patternConfig[pattern]

    // Filter out props that conflict with Framer Motion
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...restProps
    } = props

    return (
      <motion.div
        ref={ref}
        className={cn('inline-block', className)}
        animate={{
          y: config.y,
          x: config.x,
          rotate: config.rotate,
          scale: config.scale,
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: config.ease,
        }}
        {...restProps}
      >
        {children}
      </motion.div>
    )
  }
)

FloatingElement.displayName = 'FloatingElement'
