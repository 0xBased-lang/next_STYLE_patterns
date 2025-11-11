import * as React from 'react'
import { cn } from '@psychedelic-ui/core-components'

export interface MatrixCodeRainProps extends React.HTMLAttributes<HTMLCanvasElement> {
  /**
   * Color of the Matrix code (default: Matrix green #00FF41)
   */
  color?: string
  /**
   * Speed of the falling code (1-10, default: 5)
   */
  speed?: number
  /**
   * Density of code columns (0.1-1, default: 0.8)
   */
  density?: number
  /**
   * Opacity of the effect (0-1, default: 0.8)
   */
  opacity?: number
  /**
   * Characters to use (default: Matrix-style characters)
   */
  characters?: string
  /**
   * Font size in pixels (default: 16)
   */
  fontSize?: number
}

/**
 * MatrixCodeRain - Animated Matrix-style falling code effect
 *
 * Perfect for Conspiracy Establishment backgrounds
 *
 * @example
 * ```tsx
 * // Basic usage (full screen background)
 * <div style={{ position: 'relative', minHeight: '100vh' }}>
 *   <MatrixCodeRain
 *     style={{
 *       position: 'absolute',
 *       top: 0,
 *       left: 0,
 *       width: '100%',
 *       height: '100%',
 *       zIndex: -1
 *     }}
 *   />
 *   <div>Your content here</div>
 * </div>
 *
 * // Custom colors and speed
 * <MatrixCodeRain
 *   color="#D4AF37"
 *   speed={7}
 *   density={0.6}
 *   opacity={0.5}
 * />
 * ```
 */
export const MatrixCodeRain = React.forwardRef<HTMLCanvasElement, MatrixCodeRainProps>(
  (
    {
      className,
      color = '#00FF41',
      speed = 5,
      density = 0.8,
      opacity = 0.8,
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
      fontSize = 16,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const animationRef = React.useRef<number>()
    const columnsRef = React.useRef<number[]>([])

    React.useImperativeHandle(ref, () => canvasRef.current!)

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size to match container
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        // Initialize columns
        const columnCount = Math.floor(canvas.width / fontSize) * density
        columnsRef.current = Array(Math.floor(columnCount)).fill(1)
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Animation loop
      const draw = () => {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = `rgba(0, 0, 0, ${0.05})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Matrix code
        ctx.fillStyle = color
        ctx.font = `${fontSize}px monospace`
        ctx.globalAlpha = opacity

        // Draw characters
        for (let i = 0; i < columnsRef.current.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length))
          const x = i * fontSize
          const y = columnsRef.current[i] * fontSize

          ctx.fillText(text, x, y)

          // Reset column to top randomly or continue falling
          if (y > canvas.height && Math.random() > 0.975) {
            columnsRef.current[i] = 0
          }

          // Move column down based on speed
          columnsRef.current[i] += speed / 10
        }

        ctx.globalAlpha = 1

        animationRef.current = requestAnimationFrame(draw)
      }

      draw()

      return () => {
        window.removeEventListener('resize', resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [color, speed, density, opacity, characters, fontSize])

    return (
      <canvas
        ref={canvasRef}
        className={cn('block', className)}
        {...props}
      />
    )
  }
)

MatrixCodeRain.displayName = 'MatrixCodeRain'
