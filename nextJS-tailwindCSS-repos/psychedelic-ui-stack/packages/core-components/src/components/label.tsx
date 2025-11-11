import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Label variants using Class Variance Authority
 */
const labelVariants = cva(
  // Base styles
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: 'text-[#D4AF37]',

        // Neon Crypto style (KEKTECH)
        'neon-crypto': 'text-[#00D9FF]',

        // Organic Harmony style
        organic: 'text-[#C44569]',

        // Experimental Psychedelic style
        experimental: 'text-white font-semibold',
      },
      required: {
        true: 'after:content-["*"] after:ml-0.5 after:text-red-500',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      required: false,
    },
  }
)

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

/**
 * Label component for form inputs
 *
 * @example
 * ```tsx
 * <Label variant="conspiracy" htmlFor="secret-code">
 *   Secret Code
 * </Label>
 * <Input id="secret-code" variant="conspiracy" />
 *
 * // With required indicator
 * <Label variant="neon-crypto" htmlFor="wallet" required>
 *   Wallet Address
 * </Label>
 * ```
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant, required, className }))}
        {...props}
      />
    )
  }
)
Label.displayName = 'Label'

export { Label, labelVariants }
