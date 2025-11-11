import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Linear Progress Variants
 */
const linearProgressVariants = cva('relative h-2 w-full overflow-hidden rounded-full', {
  variants: {
    variant: {
      conspiracy: 'bg-black/50 border border-[#00FF41]/20',
      'neon-crypto': 'bg-gray-900/50 border border-[#0ff]/20',
      organic: 'bg-gray-200',
      experimental: 'bg-gradient-to-r from-purple-900/20 to-pink-900/20',
    },
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    size: 'md',
  },
})

/**
 * Linear Progress Indicator Variants
 */
const linearIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        conspiracy: 'bg-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)]',
        'neon-crypto': 'bg-[#0ff] shadow-[0_0_10px_rgba(0,255,255,0.5)]',
        organic: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        experimental: 'bg-gradient-to-r from-purple-600 to-pink-600',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Type definitions
 */
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof linearProgressVariants> {
  value?: number
  max?: number
  type?: 'linear' | 'circular' | 'ring'
  showLabel?: boolean
  label?: string
  indeterminate?: boolean
}

/**
 * Linear Progress Component
 */
export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      variant,
      size,
      value = 0,
      max = 100,
      type = 'linear',
      showLabel = false,
      label,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    if (type === 'circular' || type === 'ring') {
      return (
        <CircularProgress
          variant={variant}
          size={size}
          value={value}
          max={max}
          type={type}
          showLabel={showLabel}
          label={label}
          indeterminate={indeterminate}
        />
      )
    }

    return (
      <div className="w-full">
        {showLabel && (
          <div className="mb-1 flex justify-between text-sm">
            <span
              className={cn(
                variant === 'conspiracy' && 'text-[#00FF41]',
                variant === 'neon-crypto' && 'text-[#0ff]',
                variant === 'organic' && 'text-gray-700',
                variant === 'experimental' && 'text-white'
              )}
            >
              {label || 'Progress'}
            </span>
            <span
              className={cn(
                'font-medium',
                variant === 'conspiracy' && 'text-[#00FF41]',
                variant === 'neon-crypto' && 'text-[#0ff]',
                variant === 'organic' && 'text-gray-700',
                variant === 'experimental' && 'text-white'
              )}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(linearProgressVariants({ variant, size, className }))}
          value={indeterminate ? undefined : value}
          max={max}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              linearIndicatorVariants({ variant }),
              indeterminate && 'animate-pulse'
            )}
            style={{
              transform: indeterminate ? 'translateX(0%)' : `translateX(-${100 - percentage}%)`,
            }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

/**
 * Circular Progress Component
 *
 * @example
 * ```tsx
 * <Progress type="circular" value={75} variant="conspiracy" />
 * <Progress type="ring" value={50} variant="organic" showLabel />
 * ```
 */
const CircularProgress: React.FC<Omit<ProgressProps, 'type'> & { type: 'circular' | 'ring' }> = ({
  variant = 'conspiracy',
  size = 'md',
  value = 0,
  max = 100,
  type,
  showLabel = false,
  label,
  indeterminate = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = type === 'ring' ? 40 : 35
  const strokeWidth = type === 'ring' ? 8 : 4
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  }

  const colors = {
    conspiracy: {
      track: 'rgba(0, 255, 65, 0.2)',
      indicator: '#00FF41',
      text: '#00FF41',
    },
    'neon-crypto': {
      track: 'rgba(0, 255, 255, 0.2)',
      indicator: '#0ff',
      text: '#0ff',
    },
    organic: {
      track: '#e5e7eb',
      indicator: '#f59e0b',
      text: '#374151',
    },
    experimental: {
      track: 'rgba(168, 85, 247, 0.2)',
      indicator: '#a855f7',
      text: '#ffffff',
    },
  }

  const color = colors[variant || 'conspiracy']

  return (
    <div className={cn('relative inline-flex items-center justify-center', sizeClasses[size!])}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color.track}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color.indicator}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? 0 : offset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-300 ease-in-out',
            indeterminate && 'animate-spin'
          )}
          style={
            indeterminate
              ? {
                  strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
                }
              : {}
          }
        />
      </svg>
      {showLabel && !indeterminate && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn('font-bold', textSizeClasses[size!])}
            style={{ color: color.text }}
          >
            {Math.round(percentage)}%
          </span>
          {label && (
            <span
              className={cn('text-xs opacity-70')}
              style={{ color: color.text }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Indeterminate Progress (Loading Spinner)
 *
 * @example
 * ```tsx
 * <Progress indeterminate variant="neon-crypto" />
 * <Progress type="circular" indeterminate variant="experimental" />
 * ```
 */
export const LoadingSpinner: React.FC<Pick<ProgressProps, 'variant' | 'size' | 'type'>> = ({
  variant = 'conspiracy',
  size = 'md',
  type = 'circular',
}) => {
  return <Progress variant={variant} size={size} type={type} indeterminate value={25} />
}

LoadingSpinner.displayName = 'LoadingSpinner'
