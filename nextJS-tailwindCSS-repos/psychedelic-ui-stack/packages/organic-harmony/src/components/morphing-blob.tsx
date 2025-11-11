import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@psychedelic-ui/core-components'

export interface MorphingBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Primary blob color (default: #FFD93D yellow)
   */
  color?: string
  /**
   * Secondary blob color for gradient (default: #FF6B9D pink)
   */
  color2?: string
  /**
   * Blob size (default: "md")
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Animation speed in seconds (default: 8)
   */
  speed?: number
  /**
   * Blur amount in pixels (default: 40)
   */
  blur?: number
  /**
   * Opacity (0-1, default: 0.6)
   */
  opacity?: number
}

/**
 * MorphingBlob - Organic shape-shifting blob effect
 *
 * Creates smooth, flowing blob animations for backgrounds
 *
 * @example
 * ```tsx
 * // Background blob
 * <div style={{ position: 'relative', minHeight: '100vh' }}>
 *   <MorphingBlob
 *     style={{
 *       position: 'absolute',
 *       top: '20%',
 *       left: '10%',
 *       zIndex: -1
 *     }}
 *     size="xl"
 *   />
 *   <div>Your content</div>
 * </div>
 *
 * // Multiple blobs with custom colors
 * <MorphingBlob
 *   color="#FF6B9D"
 *   color2="#C44569"
 *   speed={10}
 *   blur={60}
 * />
 * ```
 */
export const MorphingBlob = React.forwardRef<HTMLDivElement, MorphingBlobProps>(
  (
    {
      className,
      color = '#FFD93D',
      color2 = '#FF6B9D',
      size = 'md',
      speed = 8,
      blur = 40,
      opacity = 0.6,
      style,
      ...props
    },
    ref
  ) => {
    // Size configurations
    const sizeConfig = {
      sm: 200,
      md: 400,
      lg: 600,
      xl: 800,
    }

    const blobSize = sizeConfig[size]

    // Generate random blob path
    const generateBlobPath = () => {
      const points = 6
      const radius = blobSize / 2
      const variation = 0.3 // How much the blob can vary

      let path = 'M'
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        const randomRadius = radius * (1 + (Math.random() - 0.5) * variation)
        const x = radius + Math.cos(angle) * randomRadius
        const y = radius + Math.sin(angle) * randomRadius

        if (i === 0) {
          path += `${x},${y}`
        } else {
          // Use quadratic curves for smooth organic shapes
          const prevAngle = ((i - 1) / points) * Math.PI * 2
          const cpAngle = (prevAngle + angle) / 2
          const cpRadius = radius * (1 + (Math.random() - 0.5) * variation * 0.5)
          const cpX = radius + Math.cos(cpAngle) * cpRadius
          const cpY = radius + Math.sin(cpAngle) * cpRadius
          path += ` Q${cpX},${cpY} ${x},${y}`
        }
      }
      path += ' Z'
      return path
    }

    const [paths] = React.useState(() => [
      generateBlobPath(),
      generateBlobPath(),
      generateBlobPath(),
      generateBlobPath(),
    ])

    return (
      <div
        ref={ref}
        className={cn('pointer-events-none', className)}
        style={{
          width: blobSize,
          height: blobSize,
          ...style,
        }}
        {...props}
      >
        <motion.svg
          width={blobSize}
          height={blobSize}
          viewBox={`0 0 ${blobSize} ${blobSize}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: `blur(${blur}px)`,
            opacity,
          }}
        >
          <defs>
            <linearGradient id={`blob-gradient-${Math.random()}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
          </defs>

          <motion.path
            fill={`url(#blob-gradient-${Math.random()})`}
            animate={{
              d: paths,
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      </div>
    )
  }
)

MorphingBlob.displayName = 'MorphingBlob'
