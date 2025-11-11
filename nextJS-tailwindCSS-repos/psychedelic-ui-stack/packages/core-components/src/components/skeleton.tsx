import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Skeleton Variants
 */
const skeletonVariants = cva('rounded-md', {
  variants: {
    variant: {
      conspiracy: [
        'bg-[#00FF41]/10',
        'data-[animation=pulse]:animate-pulse',
        'data-[animation=wave]:bg-gradient-to-r data-[animation=wave]:from-[#00FF41]/10 data-[animation=wave]:via-[#00FF41]/20 data-[animation=wave]:to-[#00FF41]/10',
        'data-[animation=wave]:bg-[length:200%_100%] data-[animation=wave]:animate-[shimmer_2s_infinite]',
      ],
      'neon-crypto': [
        'bg-[#0ff]/10',
        'data-[animation=pulse]:animate-pulse',
        'data-[animation=wave]:bg-gradient-to-r data-[animation=wave]:from-[#0ff]/10 data-[animation=wave]:via-[#0ff]/20 data-[animation=wave]:to-[#0ff]/10',
        'data-[animation=wave]:bg-[length:200%_100%] data-[animation=wave]:animate-[shimmer_2s_infinite]',
      ],
      organic: [
        'bg-gray-200',
        'data-[animation=pulse]:animate-pulse',
        'data-[animation=wave]:bg-gradient-to-r data-[animation=wave]:from-gray-200 data-[animation=wave]:via-gray-300 data-[animation=wave]:to-gray-200',
        'data-[animation=wave]:bg-[length:200%_100%] data-[animation=wave]:animate-[shimmer_2s_infinite]',
      ],
      experimental: [
        'bg-gradient-to-r from-purple-900/20 to-pink-900/20',
        'data-[animation=pulse]:animate-pulse',
        'data-[animation=wave]:bg-gradient-to-r data-[animation=wave]:from-purple-900/20 data-[animation=wave]:via-pink-900/40 data-[animation=wave]:to-purple-900/20',
        'data-[animation=wave]:bg-[length:200%_100%] data-[animation=wave]:animate-[shimmer_2s_infinite]',
      ],
    },
    shape: {
      rectangle: 'rounded-md',
      circle: 'rounded-full',
      text: 'rounded',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    shape: 'rectangle',
  },
})

/**
 * Type definitions
 */
export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: number | string
  height?: number | string
  animation?: 'pulse' | 'wave' | 'none'
}

/**
 * Skeleton Component
 *
 * Loading placeholder with shimmer animation.
 *
 * @example
 * ```tsx
 * <Skeleton variant="conspiracy" width={200} height={20} />
 * <Skeleton variant="organic" shape="circle" width={40} height={40} />
 * <Skeleton variant="neon-crypto" shape="text" width="100%" height={16} />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      shape,
      width,
      height,
      animation = 'wave',
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    }

    return (
      <div
        ref={ref}
        data-animation={animation}
        className={cn(skeletonVariants({ variant, shape }), className)}
        style={inlineStyle}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

/**
 * Skeleton Text Component
 *
 * Preset for text lines with automatic width variation.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} variant="conspiracy" />
 * ```
 */
export interface SkeletonTextProps
  extends Omit<SkeletonProps, 'width' | 'height' | 'shape'> {
  lines?: number
  lineHeight?: number
  lastLineWidth?: string
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  lineHeight = 16,
  lastLineWidth = '70%',
  variant = 'conspiracy',
  animation = 'wave',
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          shape="text"
          animation={animation}
          width={index === lines - 1 ? lastLineWidth : '100%'}
          height={lineHeight}
        />
      ))}
    </div>
  )
}

SkeletonText.displayName = 'SkeletonText'

/**
 * Skeleton Avatar Component
 *
 * Preset for circular avatar placeholder.
 *
 * @example
 * ```tsx
 * <SkeletonAvatar size={40} variant="organic" />
 * ```
 */
export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'width' | 'height' | 'shape'> {
  size?: number
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 40,
  variant = 'conspiracy',
  animation = 'pulse',
  ...props
}) => {
  return (
    <Skeleton
      variant={variant}
      shape="circle"
      animation={animation}
      width={size}
      height={size}
      {...props}
    />
  )
}

SkeletonAvatar.displayName = 'SkeletonAvatar'

/**
 * Skeleton Card Component
 *
 * Preset for card-style loading placeholders.
 *
 * @example
 * ```tsx
 * <SkeletonCard variant="neon-crypto" showAvatar />
 * ```
 */
export interface SkeletonCardProps extends Omit<SkeletonProps, 'width' | 'height' | 'shape'> {
  showAvatar?: boolean
  showImage?: boolean
  imageHeight?: number
  textLines?: number
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showAvatar = false,
  showImage = true,
  imageHeight = 200,
  textLines = 3,
  variant = 'conspiracy',
  animation = 'wave',
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-4 rounded-lg border p-4', className)} {...props}>
      {/* Image */}
      {showImage && (
        <Skeleton variant={variant} animation={animation} width="100%" height={imageHeight} />
      )}

      {/* Avatar + Text */}
      <div className="flex items-start gap-3">
        {showAvatar && <SkeletonAvatar size={40} variant={variant} animation={animation} />}
        <div className="flex-1 space-y-2">
          <Skeleton variant={variant} animation={animation} width="60%" height={20} />
          <SkeletonText
            lines={textLines}
            lineHeight={14}
            variant={variant}
            animation={animation}
          />
        </div>
      </div>
    </div>
  )
}

SkeletonCard.displayName = 'SkeletonCard'

/**
 * Skeleton Table Component
 *
 * Preset for table row loading placeholders.
 *
 * @example
 * ```tsx
 * <SkeletonTable rows={5} columns={4} variant="organic" />
 * ```
 */
export interface SkeletonTableProps extends Omit<SkeletonProps, 'width' | 'height' | 'shape'> {
  rows?: number
  columns?: number
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  variant = 'conspiracy',
  animation = 'wave',
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant={variant}
              animation={animation}
              width={colIndex === 0 ? 60 : colIndex === columns - 1 ? 100 : '100%'}
              height={16}
              className="flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

SkeletonTable.displayName = 'SkeletonTable'

/**
 * Skeleton Button Component
 *
 * Preset for button loading placeholder.
 *
 * @example
 * ```tsx
 * <SkeletonButton variant="experimental" width={120} />
 * ```
 */
export interface SkeletonButtonProps extends Omit<SkeletonProps, 'height' | 'shape'> {
  width?: number | string
}

export const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  width = 100,
  variant = 'conspiracy',
  animation = 'pulse',
  ...props
}) => {
  return (
    <Skeleton variant={variant} animation={animation} width={width} height={36} {...props} />
  )
}

SkeletonButton.displayName = 'SkeletonButton'

// Add shimmer keyframe animation to global styles
if (typeof document !== 'undefined' && !document.getElementById('skeleton-shimmer-styles')) {
  const style = document.createElement('style')
  style.id = 'skeleton-shimmer-styles'
  style.innerHTML = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `
  document.head.appendChild(style)
}
