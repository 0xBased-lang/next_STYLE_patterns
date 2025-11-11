import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Button variants using Class Variance Authority
 */
const buttonVariants = cva(
  // Base styles (shared across all variants)
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: [
          'bg-[#3A1F1F] text-[#D4AF37] border-2 border-[#D4AF37]',
          'hover:bg-[#D4AF37] hover:text-[#3A1F1F]',
          'focus-visible:ring-[#00FF41]',
          'shadow-[0_0_10px_rgba(0,255,65,0.3)]',
          'hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]',
        ],

        // Neon Crypto style (KEKTECH)
        'neon-crypto': [
          'bg-[#0A0E27] text-[#00D9FF] border-2 border-[#00D9FF]',
          'hover:bg-[#00D9FF] hover:text-[#0A0E27]',
          'focus-visible:ring-[#39FF14]',
          'shadow-[0_0_15px_rgba(0,217,255,0.5)]',
          'hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]',
        ],

        // Organic Harmony style
        organic: [
          'bg-gradient-to-r from-[#FFD93D] to-[#FF6B9D] text-white',
          'hover:from-[#FF6B9D] hover:to-[#C44569]',
          'focus-visible:ring-[#FFD93D]',
          'shadow-lg shadow-[#FFD93D]/30',
          'hover:shadow-xl hover:shadow-[#FF6B9D]/40',
        ],

        // Experimental Psychedelic style
        experimental: [
          'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600',
          'hover:from-blue-600 hover:via-purple-600 hover:to-pink-600',
          'text-white font-bold',
          'focus-visible:ring-4 focus-visible:ring-rainbow',
          'shadow-xl shadow-purple-500/50',
          'hover:shadow-2xl hover:shadow-pink-500/50',
          'animate-gradient-x',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as child element (for composition)
   */
  asChild?: boolean
}

/**
 * Button component with multi-aesthetic style variant support
 *
 * @example
 * ```tsx
 * // Conspiracy style (default)
 * <Button>Access Files</Button>
 *
 * // Neon Crypto style
 * <Button variant="neon-crypto">Connect Wallet</Button>
 *
 * // Organic Harmony style
 * <Button variant="organic" size="lg">Join Community</Button>
 *
 * // Experimental style
 * <Button variant="experimental">Enter Experience</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
