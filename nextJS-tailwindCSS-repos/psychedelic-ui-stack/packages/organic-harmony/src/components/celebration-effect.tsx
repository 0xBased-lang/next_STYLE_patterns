import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface CelebrationEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Trigger the celebration (controlled)
   */
  active?: boolean
  /**
   * Auto-trigger on mount (default: false)
   */
  autoTrigger?: boolean
  /**
   * Effect type
   */
  type?: 'confetti' | 'sparkles' | 'hearts' | 'stars'
  /**
   * Number of particles (default: 50)
   */
  particleCount?: number
  /**
   * Duration in seconds (default: 3)
   */
  duration?: number
  /**
   * Particle colors (default: warm gradient colors)
   */
  colors?: string[]
  /**
   * Callback when celebration completes
   */
  onComplete?: () => void
}

/**
 * CelebrationEffect - Confetti and celebration animations
 *
 * Creates particle effects for celebrations and positive feedback
 *
 * @example
 * ```tsx
 * // Button with celebration
 * const [celebrate, setCelebrate] = useState(false)
 *
 * <div style={{ position: 'relative' }}>
 *   <Button onClick={() => setCelebrate(true)}>
 *     Celebrate!
 *   </Button>
 *   <CelebrationEffect
 *     active={celebrate}
 *     onComplete={() => setCelebrate(false)}
 *   />
 * </div>
 *
 * // Auto-trigger celebration
 * <CelebrationEffect
 *   autoTrigger
 *   type="hearts"
 *   colors={['#FF6B9D', '#FFD93D', '#C44569']}
 * />
 *
 * // Sparkles effect
 * <CelebrationEffect
 *   active={true}
 *   type="sparkles"
 *   particleCount={30}
 *   duration={2}
 * />
 * ```
 */
export const CelebrationEffect = React.forwardRef<HTMLDivElement, CelebrationEffectProps>(
  (
    {
      className,
      active: controlledActive,
      autoTrigger = false,
      type = 'confetti',
      particleCount = 50,
      duration = 3,
      colors = ['#FFD93D', '#FF6B9D', '#C44569', '#FFA500', '#FF69B4'],
      onComplete,
      ...props
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = React.useState(autoTrigger)
    const isActive = controlledActive !== undefined ? controlledActive : internalActive

    React.useEffect(() => {
      if (isActive) {
        const timer = setTimeout(() => {
          setInternalActive(false)
          onComplete?.()
        }, duration * 1000)

        return () => clearTimeout(timer)
      }
    }, [isActive, duration, onComplete])

    // Generate particles
    const particles = React.useMemo(() => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (Math.random() * 360),
        velocity: 150 + Math.random() * 200,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.1,
      }))
    }, [particleCount, colors])

    // Particle shapes based on type
    const getParticleShape = (particle: typeof particles[0]) => {
      switch (type) {
        case 'confetti':
          return (
            <div
              style={{
                width: particle.size,
                height: particle.size * 1.5,
                backgroundColor: particle.color,
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          )
        case 'sparkles':
          return (
            <div
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          )
        case 'hearts':
          return (
            <div
              style={{
                width: particle.size,
                height: particle.size,
                color: particle.color,
                fontSize: particle.size,
              }}
            >
              ❤️
            </div>
          )
        case 'stars':
          return (
            <div
              style={{
                width: particle.size,
                height: particle.size,
                color: particle.color,
                fontSize: particle.size,
              }}
            >
              ⭐
            </div>
          )
      }
    }

    return (
      <div
        ref={ref}
        className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
        {...props}
      >
        <AnimatePresence>
          {isActive &&
            particles.map((particle) => {
              const angleRad = (particle.angle * Math.PI) / 180
              const endX = Math.cos(angleRad) * particle.velocity
              const endY = Math.sin(angleRad) * particle.velocity - 100 // Gravity effect

              return (
                <motion.div
                  key={particle.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0,
                  }}
                  animate={{
                    x: endX,
                    y: endY,
                    opacity: 0,
                    scale: [0, 1, 1, 0.5],
                    rotate: particle.rotation + 360,
                  }}
                  transition={{
                    duration,
                    delay: particle.delay,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  {getParticleShape(particle)}
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    )
  }
)

CelebrationEffect.displayName = 'CelebrationEffect'
