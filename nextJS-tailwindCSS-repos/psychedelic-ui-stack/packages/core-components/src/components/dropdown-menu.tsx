import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Dropdown Menu Content Variants
 */
const dropdownMenuContentVariants = cva(
  [
    'z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      variant: {
        conspiracy: [
          'bg-black/95 border border-[#00FF41]/30 backdrop-blur-sm',
          'shadow-[0_0_20px_rgba(0,255,65,0.2)]',
        ],
        'neon-crypto': [
          'bg-gray-900/95 border border-[#0ff]/30 backdrop-blur-sm',
          'shadow-[0_0_20px_rgba(0,255,255,0.2)]',
        ],
        organic: [
          'bg-white border border-gray-200',
          'shadow-[0_8px_24px_rgba(0,0,0,0.12)]',
        ],
        experimental: [
          'bg-gradient-to-br from-purple-900/95 to-pink-900/95',
          'border border-white/20 backdrop-blur-sm',
          'shadow-[0_0_24px_rgba(168,85,247,0.3)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Dropdown Menu Item Variants
 */
const dropdownMenuItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
    'transition-colors focus:outline-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ],
  {
    variants: {
      variant: {
        conspiracy: [
          'text-[#00FF41]/90 focus:bg-[#00FF41]/10 focus:text-[#00FF41]',
          'data-[highlighted]:bg-[#00FF41]/10',
        ],
        'neon-crypto': [
          'text-[#0ff]/90 focus:bg-[#0ff]/10 focus:text-[#0ff]',
          'data-[highlighted]:bg-[#0ff]/10',
        ],
        organic: [
          'text-gray-700 focus:bg-gray-100 focus:text-gray-900',
          'data-[highlighted]:bg-gray-100',
        ],
        experimental: [
          'text-white/90 focus:bg-white/10 focus:text-white',
          'data-[highlighted]:bg-white/10',
        ],
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Dropdown Menu Label Variants
 */
const dropdownMenuLabelVariants = cva('px-2 py-1.5 text-sm font-semibold', {
  variants: {
    variant: {
      conspiracy: 'text-[#00FF41]',
      'neon-crypto': 'text-[#0ff]',
      organic: 'text-gray-900',
      experimental: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

/**
 * Dropdown Menu Separator Variants
 */
const dropdownMenuSeparatorVariants = cva('-mx-1 my-1 h-px', {
  variants: {
    variant: {
      conspiracy: 'bg-[#00FF41]/20',
      'neon-crypto': 'bg-[#0ff]/20',
      organic: 'bg-gray-200',
      experimental: 'bg-white/20',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

/**
 * Dropdown Menu Shortcut Variants
 */
const dropdownMenuShortcutVariants = cva('ml-auto text-xs tracking-widest', {
  variants: {
    variant: {
      conspiracy: 'text-[#00FF41]/50',
      'neon-crypto': 'text-[#0ff]/50',
      organic: 'text-gray-500',
      experimental: 'text-white/50',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

/**
 * Type definitions
 */
export interface DropdownMenuProps extends DropdownMenuPrimitive.DropdownMenuProps {}

export interface DropdownMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {}

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    VariantProps<typeof dropdownMenuContentVariants> {
  sideOffset?: number
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownMenuItemVariants> {
  inset?: boolean
}

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    VariantProps<typeof dropdownMenuItemVariants> {}

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>,
    VariantProps<typeof dropdownMenuItemVariants> {}

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
    VariantProps<typeof dropdownMenuLabelVariants> {
  inset?: boolean
}

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>,
    VariantProps<typeof dropdownMenuSeparatorVariants> {}

export interface DropdownMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dropdownMenuShortcutVariants> {}

/**
 * Dropdown Menu Root Component
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = DropdownMenuPrimitive.Root

/**
 * Dropdown Menu Trigger Component
 */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/**
 * Dropdown Menu Group Component
 */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

/**
 * Dropdown Menu Portal Component
 */
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/**
 * Dropdown Menu Sub Component
 */
export const DropdownMenuSub = DropdownMenuPrimitive.Sub

/**
 * Dropdown Menu Radio Group Component
 */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * Dropdown Menu Sub Trigger Component
 */
export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
    variant?: 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'
  }
>(({ className, variant = 'conspiracy', inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      dropdownMenuItemVariants({ variant }),
      inset && 'pl-8',
      'data-[state=open]:bg-accent',
      className
    )}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-auto h-4 w-4"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

/**
 * Dropdown Menu Sub Content Component
 */
export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
    variant?: 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'
  }
>(({ className, variant = 'conspiracy', ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownMenuContentVariants({ variant, className }))}
    {...props}
  />
))

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

/**
 * Dropdown Menu Content Component
 *
 * @example With different aesthetics
 * ```tsx
 * <DropdownMenuContent variant="conspiracy">Matrix menu</DropdownMenuContent>
 * <DropdownMenuContent variant="neon-crypto">Cyberpunk menu</DropdownMenuContent>
 * <DropdownMenuContent variant="organic">Friendly menu</DropdownMenuContent>
 * <DropdownMenuContent variant="experimental">Psychedelic menu</DropdownMenuContent>
 * ```
 */
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, variant, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentVariants({ variant, className }))}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

/**
 * Dropdown Menu Item Component
 */
export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, variant, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(dropdownMenuItemVariants({ variant }), inset && 'pl-8', className)}
    {...props}
  />
))

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

/**
 * Dropdown Menu Checkbox Item Component
 */
export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, variant, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(dropdownMenuItemVariants({ variant }), 'pl-8 pr-2', className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

/**
 * Dropdown Menu Radio Item Component
 */
export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, variant, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(dropdownMenuItemVariants({ variant }), 'pl-8 pr-2', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

/**
 * Dropdown Menu Label Component
 */
export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, variant, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(dropdownMenuLabelVariants({ variant }), inset && 'pl-8', className)}
    {...props}
  />
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * Dropdown Menu Separator Component
 */
export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, variant, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(dropdownMenuSeparatorVariants({ variant, className }))}
    {...props}
  />
))

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * Dropdown Menu Shortcut Component
 */
export const DropdownMenuShortcut = React.forwardRef<
  HTMLSpanElement,
  DropdownMenuShortcutProps
>(({ className, variant, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(dropdownMenuShortcutVariants({ variant, className }))}
      {...props}
    />
  )
})

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'
