import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Badge variants using Class Variance Authority
 */
const badgeVariants = cva(
  // Base styles
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: [
          'bg-[#3A1F1F] text-[#D4AF37] border border-[#D4AF37]',
          'shadow-[0_0_5px_rgba(212,175,55,0.3)]',
        ],

        // Neon Crypto style (KEKTECH)
        'neon-crypto': [
          'bg-[#0A0E27] text-[#00D9FF] border border-[#00D9FF]',
          'shadow-[0_0_5px_rgba(0,217,255,0.4)]',
        ],

        // Organic Harmony style
        organic: [
          'bg-gradient-to-r from-[#FFD93D] to-[#FF6B9D] text-white',
          'shadow-sm',
        ],

        // Experimental Psychedelic style
        experimental: [
          'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          'shadow-md shadow-purple-500/40',
        ],
      },
      badgeType: {
        default: '',
        success: 'bg-green-600 border-green-500 text-white',
        error: 'bg-red-600 border-red-500 text-white',
        warning: 'bg-yellow-600 border-yellow-500 text-white',
        info: 'bg-blue-600 border-blue-500 text-white',
      },
      size: {
        sm: 'text-[10px] px-2 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      badgeType: 'default',
      size: 'md',
    },
    compoundVariants: [
      // Override variant colors when badgeType is set
      {
        badgeType: ['success', 'error', 'warning', 'info'],
        className: 'shadow-md',
      },
    ],
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component for status indicators and labels
 *
 * @example
 * ```tsx
 * // Basic badges
 * <Badge variant="conspiracy">Top Secret</Badge>
 * <Badge variant="neon-crypto">New</Badge>
 *
 * // Status badges (override style variant)
 * <Badge variant="organic" badgeType="success">Active</Badge>
 * <Badge variant="experimental" badgeType="error">Failed</Badge>
 *
 * // Sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, badgeType, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, badgeType, size, className }))}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
