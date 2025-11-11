import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Separator variants using Class Variance Authority
 */
const separatorVariants = cva('shrink-0', {
  variants: {
    variant: {
      // Conspiracy Establishment style
      conspiracy: 'bg-[#D4AF37]/30',

      // Neon Crypto style (KEKTECH)
      'neon-crypto': 'bg-[#00D9FF]/30',

      // Organic Harmony style
      organic: 'bg-[#FFD93D]/40',

      // Experimental Psychedelic style
      experimental: 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500',
    },
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    orientation: 'horizontal',
  },
})

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /**
   * Make the separator decorative (for screen readers)
   */
  decorative?: boolean
}

/**
 * Separator component for dividing content
 *
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <Separator variant="conspiracy" />
 *
 * // Vertical separator
 * <div className="flex h-10">
 *   <span>Left</span>
 *   <Separator orientation="vertical" variant="neon-crypto" />
 *   <span>Right</span>
 * </div>
 * ```
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, variant, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const { 'aria-orientation': _, ...restProps } = props as any

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        {...(!decorative && { 'aria-orientation': orientation })}
        className={cn(separatorVariants({ variant, orientation, className }))}
        {...restProps}
      />
    )
  }
)
Separator.displayName = 'Separator'

export { Separator, separatorVariants }
