import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface RedactedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Text to redact/reveal
   */
  children: string
  /**
   * Initial redacted state (default: true)
   */
  redacted?: boolean
  /**
   * Reveal on hover (default: false)
   */
  revealOnHover?: boolean
  /**
   * Reveal on click (default: true)
   */
  revealOnClick?: boolean
  /**
   * Redaction bar color (default: black)
   */
  barColor?: string
  /**
   * Text color when revealed (default: Matrix green)
   */
  revealColor?: string
  /**
   * Animation duration in seconds (default: 0.5)
   */
  animationDuration?: number
  /**
   * Callback when revealed
   */
  onReveal?: () => void
  /**
   * Callback when redacted again
   */
  onRedact?: () => void
}

/**
 * RedactedText - Censored text with reveal animation
 *
 * Creates black bar censorship effects with progressive reveals
 *
 * @example
 * ```tsx
 * // Basic redacted text (click to reveal)
 * <RedactedText>Secret Information</RedactedText>
 *
 * // Reveal on hover
 * <RedactedText revealOnHover revealOnClick={false}>
 *   Hover to peek
 * </RedactedText>
 *
 * // Custom colors
 * <RedactedText
 *   barColor="#DC2626"
 *   revealColor="#D4AF37"
 * >
 *   Classified Data
 * </RedactedText>
 *
 * // Controlled state
 * const [revealed, setRevealed] = useState(false)
 * <RedactedText
 *   redacted={!revealed}
 *   revealOnClick={false}
 *   onClick={() => setRevealed(!revealed)}
 * >
 *   Toggle reveal
 * </RedactedText>
 * ```
 */
export const RedactedText = React.forwardRef<HTMLSpanElement, RedactedTextProps>(
  (
    {
      children,
      className,
      redacted: controlledRedacted,
      revealOnHover = false,
      revealOnClick = true,
      barColor = '#000000',
      revealColor = '#00FF41',
      animationDuration = 0.5,
      onReveal,
      onRedact,
      ...props
    },
    ref
  ) => {
    const [internalRedacted, setInternalRedacted] = React.useState(true)
    const [isHovering, setIsHovering] = React.useState(false)

    const isRedacted =
      controlledRedacted !== undefined ? controlledRedacted : internalRedacted

    const isRevealed = revealOnHover ? isHovering : !isRedacted

    const handleClick = () => {
      if (!revealOnClick) return

      const newState = !internalRedacted
      setInternalRedacted(newState)

      if (newState) {
        onRedact?.()
      } else {
        onReveal?.()
      }
    }

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
      <motion.span
        ref={ref}
        className={cn(
          'relative inline-block',
          (revealOnClick || revealOnHover) && 'cursor-pointer',
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => revealOnHover && setIsHovering(true)}
        onMouseLeave={() => revealOnHover && setIsHovering(false)}
        {...restProps}
      >
        {/* Actual text (visible when revealed) */}
        <motion.span
          className="relative inline-block"
          initial={false}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.95,
          }}
          transition={{ duration: animationDuration }}
          style={{
            color: revealColor,
            fontWeight: isRevealed ? 600 : 400,
          }}
        >
          {children}
        </motion.span>

        {/* Redaction bar overlay */}
        <motion.span
          className="absolute top-0 left-0 right-0 bottom-0 inline-block pointer-events-none"
          initial={false}
          animate={{
            scaleX: isRevealed ? 0 : 1,
            opacity: isRevealed ? 0 : 1,
          }}
          transition={{
            duration: animationDuration,
            ease: 'easeInOut',
          }}
          style={{
            backgroundColor: barColor,
            transformOrigin: 'left center',
            height: '100%',
            minWidth: '100%',
          }}
        />

        {/* Glitch effect during transition */}
        {!isRevealed && (
          <motion.span
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
            animate={{
              opacity: [0, 0.3, 0],
              x: [-2, 2, -2, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            style={{
              backgroundColor: revealColor,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </motion.span>
    )
  }
)

RedactedText.displayName = 'RedactedText'
