import * as React from 'react'
import { cn } from '@psychedelic-ui/core-components'

export interface CRTOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Intensity of scan lines (0-1, default: 0.15)
   */
  intensity?: number
  /**
   * Flicker effect intensity (0-1, default: 0.05)
   */
  flicker?: number
  /**
   * Scan line color (default: rgba(0, 255, 65, 0.1))
   */
  scanlineColor?: string
  /**
   * Enable vignette effect (default: true)
   */
  vignette?: boolean
  /**
   * Enable screen curvature (default: false)
   */
  curvature?: boolean
}

/**
 * CRTOverlay - Vintage CRT monitor effects
 *
 * Creates scan lines, flicker, and vintage monitor aesthetics
 *
 * @example
 * ```tsx
 * // Basic CRT effect (full screen overlay)
 * <div style={{ position: 'relative' }}>
 *   <CRTOverlay
 *     style={{
 *       position: 'fixed',
 *       top: 0,
 *       left: 0,
 *       width: '100vw',
 *       height: '100vh',
 *       pointerEvents: 'none',
 *       zIndex: 9999,
 *     }}
 *   />
 *   <div>Your content here</div>
 * </div>
 *
 * // Intense retro effect
 * <CRTOverlay
 *   intensity={0.3}
 *   flicker={0.15}
 *   curvature
 * />
 *
 * // Subtle effect
 * <CRTOverlay
 *   intensity={0.05}
 *   flicker={0}
 *   vignette={false}
 * />
 * ```
 */
export const CRTOverlay = React.forwardRef<HTMLDivElement, CRTOverlayProps>(
  (
    {
      className,
      intensity = 0.15,
      flicker = 0.05,
      scanlineColor = 'rgba(0, 255, 65, 0.1)',
      vignette = true,
      curvature = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('pointer-events-none', className)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        {...props}
      >
        {/* Scan lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `repeating-linear-gradient(
              0deg,
              ${scanlineColor} 0px,
              transparent 1px,
              transparent 2px,
              ${scanlineColor} 3px
            )`,
            opacity: intensity,
            animation: flicker > 0 ? `crt-flicker ${2 + Math.random()}s infinite` : 'none',
          }}
        />

        {/* Vignette effect */}
        {vignette && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
              opacity: 0.7,
            }}
          />
        )}

        {/* Screen curvature simulation */}
        {curvature && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `
                radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                radial-gradient(ellipse at 20% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
              `,
            }}
          />
        )}

        {/* Flicker overlay */}
        {flicker > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.02)',
              animation: `crt-flicker-overlay ${1.5 + Math.random()}s infinite`,
              opacity: flicker,
            }}
          />
        )}

        {/* Add keyframe animations */}
        <style>{`
          @keyframes crt-flicker {
            0%, 100% { opacity: ${intensity}; }
            50% { opacity: ${intensity * 0.8}; }
          }

          @keyframes crt-flicker-overlay {
            0%, 100% { opacity: 0; }
            50% { opacity: ${flicker}; }
          }
        `}</style>
      </div>
    )
  }
)

CRTOverlay.displayName = 'CRTOverlay'
