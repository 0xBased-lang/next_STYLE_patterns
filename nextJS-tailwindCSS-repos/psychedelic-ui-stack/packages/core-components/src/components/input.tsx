import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Input variants using Class Variance Authority
 */
const inputVariants = cva(
  // Base styles
  'flex w-full rounded-md px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: [
          'bg-[#3A1F1F] text-[#D4AF37] border-2 border-[#D4AF37]/50',
          'placeholder:text-[#D4AF37]/40',
          'focus-visible:border-[#00FF41] focus-visible:ring-2 focus-visible:ring-[#00FF41]/30',
          'hover:border-[#D4AF37]',
        ],

        // Neon Crypto style (KEKTECH)
        'neon-crypto': [
          'bg-[#0A0E27] text-[#00D9FF] border-2 border-[#00D9FF]/50',
          'placeholder:text-[#00D9FF]/40',
          'focus-visible:border-[#39FF14] focus-visible:ring-2 focus-visible:ring-[#39FF14]/30',
          'hover:border-[#00D9FF]',
        ],

        // Organic Harmony style
        organic: [
          'bg-white text-[#6B4E71] border-2 border-[#FFD93D]/50',
          'placeholder:text-[#6B4E71]/40',
          'focus-visible:border-[#FF6B9D] focus-visible:ring-2 focus-visible:ring-[#FF6B9D]/30',
          'hover:border-[#FFD93D]',
        ],

        // Experimental Psychedelic style
        experimental: [
          'bg-purple-900/30 text-white border-2 border-purple-500/50',
          'placeholder:text-white/40',
          'focus-visible:border-pink-500 focus-visible:ring-2 focus-visible:ring-pink-500/30',
          'hover:border-purple-500',
          'backdrop-blur-sm',
        ],
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
      state: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-500/30',
        success: 'border-green-500 focus-visible:ring-green-500/30',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500/30',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      inputSize: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Error message to display
   */
  error?: string
  /**
   * Success message to display
   */
  success?: string
  /**
   * Warning message to display
   */
  warning?: string
}

/**
 * Input component with validation states and style variants
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input variant="conspiracy" placeholder="Enter secret code..." />
 *
 * // With error state
 * <Input
 *   variant="neon-crypto"
 *   state="error"
 *   error="Invalid wallet address"
 * />
 *
 * // With success state
 * <Input
 *   variant="organic"
 *   state="success"
 *   success="Looks good!"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, state, type, error, success, warning, ...props }, ref) => {
    // Auto-detect state from messages if not explicitly set
    const computedState = state !== 'default'
      ? state
      : error
      ? 'error'
      : success
      ? 'success'
      : warning
      ? 'warning'
      : 'default'

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant, inputSize, state: computedState, className }))}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
        {success && (
          <p className="mt-1 text-xs text-green-500">{success}</p>
        )}
        {warning && (
          <p className="mt-1 text-xs text-yellow-500">{warning}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
