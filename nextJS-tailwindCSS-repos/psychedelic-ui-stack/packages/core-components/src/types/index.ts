/**
 * Style variant types for multi-aesthetic support
 */
export type StyleVariant = 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'

/**
 * Common component props
 */
export interface ComponentBaseProps {
  /**
   * CSS class name
   */
  className?: string

  /**
   * Style variant aesthetic
   * @default 'conspiracy'
   */
  variant?: StyleVariant
}

/**
 * Animation intensity levels
 */
export type AnimationIntensity = 'none' | 'subtle' | 'moderate' | 'heavy' | 'extreme'

/**
 * Props for components with animations
 */
export interface AnimatableProps extends ComponentBaseProps {
  /**
   * Animation intensity level
   * @default 'moderate'
   */
  animationIntensity?: AnimationIntensity

  /**
   * Disable animations (respects prefers-reduced-motion)
   */
  disableAnimation?: boolean
}
