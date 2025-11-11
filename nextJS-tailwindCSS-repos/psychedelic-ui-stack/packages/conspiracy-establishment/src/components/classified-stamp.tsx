import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface ClassifiedStampProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stamp text (default: "TOP SECRET")
   */
  text?: string
  /**
   * Stamp color (default: red #DC2626)
   */
  color?: string
  /**
   * Size of stamp (default: "md")
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Rotation angle in degrees (default: -15)
   */
  rotation?: number
  /**
   * Animate stamp appearance (default: true)
   */
  animated?: boolean
  /**
   * Show stamp immediately or delay (ms, default: 0)
   */
  delay?: number
  /**
   * Stamp style variant
   */
  variant?: 'classified' | 'approved' | 'denied' | 'urgent' | 'confidential'
}

/**
 * ClassifiedStamp - Document stamp animation effect
 *
 * Creates official-looking stamp effects for classified documents
 *
 * @example
 * ```tsx
 * // Basic classified stamp
 * <ClassifiedStamp />
 *
 * // Custom stamp
 * <ClassifiedStamp
 *   text="APPROVED"
 *   variant="approved"
 *   color="#00FF41"
 *   size="lg"
 *   rotation={10}
 * />
 *
 * // Delayed animation
 * <ClassifiedStamp
 *   variant="urgent"
 *   delay={1000}
 *   text="URGENT"
 * />
 * ```
 */
export const ClassifiedStamp = React.forwardRef<HTMLDivElement, ClassifiedStampProps>(
  (
    {
      className,
      text,
      color,
      size = 'md',
      rotation = -15,
      animated = true,
      delay = 0,
      variant = 'classified',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(!animated)

    React.useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => setIsVisible(true), delay)
        return () => clearTimeout(timer)
      }
    }, [animated, delay])

    // Variant presets
    const variantConfig = {
      classified: {
        text: text || 'TOP SECRET',
        color: color || '#DC2626', // red
      },
      approved: {
        text: text || 'APPROVED',
        color: color || '#00FF41', // Matrix green
      },
      denied: {
        text: text || 'DENIED',
        color: color || '#DC2626', // red
      },
      urgent: {
        text: text || 'URGENT',
        color: color || '#F59E0B', // orange
      },
      confidential: {
        text: text || 'CONFIDENTIAL',
        color: color || '#D4AF37', // gold
      },
    }

    const config = variantConfig[variant]

    // Size configurations
    const sizeConfig = {
      sm: {
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        border: '3px',
        letterSpacing: '0.1em',
      },
      md: {
        fontSize: '1.25rem',
        padding: '0.75rem 1.5rem',
        border: '4px',
        letterSpacing: '0.15em',
      },
      lg: {
        fontSize: '1.75rem',
        padding: '1rem 2rem',
        border: '5px',
        letterSpacing: '0.2em',
      },
      xl: {
        fontSize: '2.5rem',
        padding: '1.5rem 3rem',
        border: '6px',
        letterSpacing: '0.25em',
      },
    }

    const stampSize = sizeConfig[size]

    return (
      <div
        ref={ref}
        className={cn('inline-block', className)}
        {...props}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={animated ? { scale: 0, rotate: 0, opacity: 0 } : false}
              animate={{
                scale: [0, 1.2, 0.9, 1.05, 1],
                rotate: rotation,
                opacity: [0, 0.8, 0.9, 0.85, 0.8],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: 'easeOut',
              }}
              style={{
                display: 'inline-block',
                fontSize: stampSize.fontSize,
                fontWeight: 900,
                fontFamily: 'monospace',
                color: config.color,
                padding: stampSize.padding,
                border: `${stampSize.border} solid ${config.color}`,
                borderRadius: '0.5rem',
                letterSpacing: stampSize.letterSpacing,
                textTransform: 'uppercase',
                transform: `rotate(${rotation}deg)`,
                boxShadow: `0 0 0 ${stampSize.border} ${config.color}20`,
                userSelect: 'none',
              }}
            >
              {config.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

ClassifiedStamp.displayName = 'ClassifiedStamp'
