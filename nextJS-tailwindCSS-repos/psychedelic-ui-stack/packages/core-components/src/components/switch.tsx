import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Switch variants using Class Variance Authority
 */
const switchVariants = cva(
  // Base styles
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: [
          'border-[#D4AF37]',
          'data-[state=checked]:bg-[#D4AF37]',
          'data-[state=unchecked]:bg-[#3A1F1F]',
          'focus-visible:ring-[#00FF41]',
        ],

        // Neon Crypto style (KEKTECH)
        'neon-crypto': [
          'border-[#00D9FF]',
          'data-[state=checked]:bg-[#00D9FF]',
          'data-[state=unchecked]:bg-[#0A0E27]',
          'focus-visible:ring-[#39FF14]',
        ],

        // Organic Harmony style
        organic: [
          'border-[#FFD93D]',
          'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FFD93D] data-[state=checked]:to-[#FF6B9D]',
          'data-[state=unchecked]:bg-white',
          'focus-visible:ring-[#FF6B9D]',
        ],

        // Experimental Psychedelic style
        experimental: [
          'border-purple-500',
          'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600',
          'data-[state=unchecked]:bg-purple-900/30',
          'focus-visible:ring-pink-500',
        ],
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

const switchThumbVariants = cva(
  // Base styles
  'pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform',
  {
    variants: {
      variant: {
        conspiracy: 'bg-[#3A1F1F] data-[state=checked]:bg-[#3A1F1F]',
        'neon-crypto': 'bg-[#0A0E27] data-[state=checked]:bg-[#0A0E27]',
        organic: 'bg-[#C44569] data-[state=checked]:bg-white',
        experimental: 'bg-purple-900 data-[state=checked]:bg-white',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof switchVariants> {
  /**
   * Controlled checked state
   */
  checked?: boolean
  /**
   * Default checked state (uncontrolled)
   */
  defaultChecked?: boolean
  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Switch component for toggle controls
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Switch variant="conspiracy" defaultChecked />
 *
 * // Controlled
 * const [enabled, setEnabled] = useState(false)
 * <Switch
 *   variant="neon-crypto"
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 *
 * // With label
 * <div className="flex items-center gap-2">
 *   <Switch variant="organic" id="notifications" />
 *   <Label htmlFor="notifications">Enable notifications</Label>
 * </div>
 * ```
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      variant,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : internalChecked

    const handleClick = () => {
      if (disabled) return

      const newChecked = !checked

      if (!isControlled) {
        setInternalChecked(newChecked)
      }

      onCheckedChange?.(newChecked)
    }

    return (
      <button
        ref={ref}
        role="switch"
        type="button"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={handleClick}
        className={cn(switchVariants({ variant, className }))}
        {...props}
      >
        <span
          data-state={checked ? 'checked' : 'unchecked'}
          className={cn(
            switchThumbVariants({ variant }),
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch, switchVariants }
