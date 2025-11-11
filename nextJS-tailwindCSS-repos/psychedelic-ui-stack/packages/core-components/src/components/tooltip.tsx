import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Tooltip variants using Class Variance Authority
 */
const tooltipContentVariants = cva(
  // Base styles
  'z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        conspiracy: [
          'bg-black/95 text-[#00FF41] border border-[#00FF41]/30',
          'shadow-[0_0_15px_rgba(0,255,65,0.3)]',
          'backdrop-blur-sm',
        ],
        'neon-crypto': [
          'bg-black/95 text-[#0ff] border border-[#0ff]/30',
          'shadow-[0_0_15px_rgba(0,255,255,0.3)]',
          'backdrop-blur-sm',
        ],
        organic: [
          'bg-white/95 text-gray-900 border border-gray-200',
          'shadow-[0_4px_12px_rgba(0,0,0,0.1)]',
          'backdrop-blur-sm',
        ],
        experimental: [
          'bg-gradient-to-br from-purple-600/95 to-pink-600/95',
          'text-white border border-white/20',
          'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
          'backdrop-blur-sm',
        ],
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Tooltip Provider Props
 */
export interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
}

/**
 * Tooltip Root Props
 */
export interface TooltipProps {
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
  disableHoverableContent?: boolean
}

/**
 * Tooltip Trigger Props
 */
export interface TooltipTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

/**
 * Tooltip Content Props
 */
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  sideOffset?: number
}

/**
 * Tooltip Provider Component
 *
 * Wraps your app or component tree to provide tooltip functionality.
 * Must be an ancestor of all tooltip components.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <App />
 * </TooltipProvider>
 * ```
 */
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  ...props
}) => {
  return <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>
}

TooltipProvider.displayName = 'TooltipProvider'

/**
 * Tooltip Root Component
 *
 * Contains all parts of a tooltip.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Tooltip text</TooltipContent>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
  return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
}

Tooltip.displayName = 'Tooltip'

/**
 * Tooltip Trigger Component
 *
 * The button or element that triggers the tooltip.
 */
export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ ...props }, ref) => {
  return <TooltipPrimitive.Trigger ref={ref} {...props} />
})

TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName

/**
 * Tooltip Content Component
 *
 * The content shown in the tooltip.
 *
 * @example
 * ```tsx
 * <TooltipContent variant="conspiracy" side="top">
 *   This is a tooltip
 * </TooltipContent>
 * ```
 *
 * @example With different aesthetics
 * ```tsx
 * <TooltipContent variant="neon-crypto">Cyberpunk tooltip</TooltipContent>
 * <TooltipContent variant="organic">Friendly tooltip</TooltipContent>
 * <TooltipContent variant="experimental">Psychedelic tooltip</TooltipContent>
 * ```
 */
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant, className }))}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
})

TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * Simple Tooltip Component (all-in-one convenience wrapper)
 *
 * Combines Tooltip, TooltipTrigger, and TooltipContent for simple use cases.
 *
 * @example
 * ```tsx
 * <SimpleTooltip content="Click to copy" variant="conspiracy">
 *   <Button>Copy</Button>
 * </SimpleTooltip>
 * ```
 */
export interface SimpleTooltipProps extends Omit<TooltipProps, 'children'> {
  content: React.ReactNode
  children: React.ReactNode
  variant?: 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
  content,
  children,
  variant = 'conspiracy',
  side = 'top',
  sideOffset = 4,
  ...tooltipProps
}) => {
  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent variant={variant} side={side} sideOffset={sideOffset}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

SimpleTooltip.displayName = 'SimpleTooltip'
