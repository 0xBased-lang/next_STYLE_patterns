import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Toast Viewport Variants
 */
const toastViewportVariants = cva(
  'fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]',
  {
    variants: {
      position: {
        'top-right': 'top-0 right-0',
        'top-left': 'top-0 left-0',
        'bottom-right': 'bottom-0 right-0',
        'bottom-left': 'bottom-0 left-0',
      },
    },
    defaultVariants: {
      position: 'top-right',
    },
  }
)

/**
 * Toast Variants
 */
const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-4',
    'overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[swipe=end]:animate-out data-[state=closed]:fade-out-80',
    'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
    'data-[state=open]:sm:slide-in-from-bottom-full',
  ],
  {
    variants: {
      variant: {
        conspiracy: 'border-[#00FF41]/30 bg-black/95 text-[#00FF41] backdrop-blur-sm',
        'neon-crypto': 'border-[#0ff]/30 bg-gray-900/95 text-[#0ff] backdrop-blur-sm',
        organic: 'border-gray-200 bg-white text-gray-900',
        experimental:
          'border-white/20 bg-gradient-to-br from-purple-900/95 to-pink-900/95 text-white backdrop-blur-sm',
      },
      toastType: {
        success: '',
        error: '',
        warning: '',
        info: '',
      },
    },
    compoundVariants: [
      // Success variants
      {
        variant: 'conspiracy',
        toastType: 'success',
        className: 'border-[#00FF41]/50 shadow-[0_0_20px_rgba(0,255,65,0.2)]',
      },
      {
        variant: 'neon-crypto',
        toastType: 'success',
        className: 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]',
      },
      {
        variant: 'organic',
        toastType: 'success',
        className: 'border-green-500/50 bg-green-50',
      },
      // Error variants
      {
        variant: 'conspiracy',
        toastType: 'error',
        className: 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
      },
      {
        variant: 'neon-crypto',
        toastType: 'error',
        className: 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
      },
      {
        variant: 'organic',
        toastType: 'error',
        className: 'border-red-500/50 bg-red-50',
      },
      // Warning variants
      {
        variant: 'conspiracy',
        toastType: 'warning',
        className: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
      },
      {
        variant: 'neon-crypto',
        toastType: 'warning',
        className: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
      },
      {
        variant: 'organic',
        toastType: 'warning',
        className: 'border-yellow-500/50 bg-yellow-50',
      },
    ],
    defaultVariants: {
      variant: 'conspiracy',
      toastType: 'info',
    },
  }
)

/**
 * Type definitions
 */
export interface ToastProviderProps extends ToastPrimitive.ToastProviderProps {}

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>,
    VariantProps<typeof toastViewportVariants> {}

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {}

export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {}

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {}

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {}

/**
 * Toast Provider Component
 *
 * Wraps your app to provide toast functionality.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 *   <ToastViewport />
 * </ToastProvider>
 * ```
 */
export const ToastProvider = ToastPrimitive.Provider

/**
 * Toast Viewport Component
 *
 * Container where toasts will appear.
 */
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, position, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(toastViewportVariants({ position, className }))}
    {...props}
  />
))

ToastViewport.displayName = ToastPrimitive.Viewport.displayName

/**
 * Toast Component
 *
 * @example
 * ```tsx
 * <Toast variant="conspiracy" toastType="success">
 *   <ToastTitle>Success!</ToastTitle>
 *   <ToastDescription>Your prediction was saved.</ToastDescription>
 *   <ToastClose />
 * </Toast>
 * ```
 */
export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, toastType, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant, toastType }), className)}
      {...props}
    />
  )
})

Toast.displayName = ToastPrimitive.Root.displayName

/**
 * Toast Action Component
 *
 * Action button within toast.
 */
export const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium',
      'ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2',
      'focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'group-[.conspiracy]:border-[#00FF41] group-[.conspiracy]:hover:bg-[#00FF41]/10',
      'group-[.neon-crypto]:border-[#0ff] group-[.neon-crypto]:hover:bg-[#0ff]/10',
      'group-[.organic]:border-gray-300 group-[.organic]:hover:bg-gray-100',
      'group-[.experimental]:border-white/20 group-[.experimental]:hover:bg-white/10',
      className
    )}
    {...props}
  />
))

ToastAction.displayName = ToastPrimitive.Action.displayName

/**
 * Toast Close Component
 *
 * Close button for toast.
 */
export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'group-[.conspiracy]:text-[#00FF41] group-[.conspiracy]:focus:ring-[#00FF41]',
      'group-[.neon-crypto]:text-[#0ff] group-[.neon-crypto]:focus:ring-[#0ff]',
      'group-[.organic]:text-gray-500 group-[.organic]:focus:ring-gray-400',
      'group-[.experimental]:text-white group-[.experimental]:focus:ring-white',
      className
    )}
    toast-close=""
    {...props}
  >
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </ToastPrimitive.Close>
))

ToastClose.displayName = ToastPrimitive.Close.displayName

/**
 * Toast Title Component
 */
export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))

ToastTitle.displayName = ToastPrimitive.Title.displayName

/**
 * Toast Description Component
 */
export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))

ToastDescription.displayName = ToastPrimitive.Description.displayName

/**
 * Toast Icon Component (helper for status icons)
 */
export const ToastIcon: React.FC<{
  type: 'success' | 'error' | 'warning' | 'info'
  className?: string
}> = ({ type, className }) => {
  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  }

  return <span className={cn('shrink-0', className)}>{icons[type]}</span>
}

ToastIcon.displayName = 'ToastIcon'

/**
 * Simple Toast Helper (convenience wrapper)
 *
 * @example
 * ```tsx
 * <SimpleToast
 *   variant="conspiracy"
 *   toastType="success"
 *   title="Prediction Saved"
 *   description="Your prediction was successfully saved."
 *   open={showToast}
 *   onOpenChange={setShowToast}
 * />
 * ```
 */
export interface SimpleToastProps extends ToastProps {
  title: string
  description?: string
  showIcon?: boolean
  showClose?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export const SimpleToast: React.FC<SimpleToastProps> = ({
  title,
  description,
  showIcon = true,
  showClose = true,
  action,
  variant = 'conspiracy',
  toastType = 'info',
  ...props
}) => {
  return (
    <Toast variant={variant} toastType={toastType} {...props}>
      <div className="flex gap-3">
        {showIcon && <ToastIcon type={toastType || 'info'} />}
        <div className="grid gap-1">
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
      </div>
      {action && (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      )}
      {showClose && <ToastClose />}
    </Toast>
  )
}

SimpleToast.displayName = 'SimpleToast'
