import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Modal Overlay Variants
 */
const modalOverlayVariants = cva(
  'fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      variant: {
        conspiracy: 'bg-black/80 backdrop-blur-sm',
        'neon-crypto': 'bg-black/85 backdrop-blur-md',
        organic: 'bg-black/50 backdrop-blur-sm',
        experimental: 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Modal Content Variants
 */
const modalContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  ],
  {
    variants: {
      variant: {
        conspiracy: [
          'bg-black border-2 border-[#00FF41]/30 rounded-lg',
          'shadow-[0_0_30px_rgba(0,255,65,0.2)]',
        ],
        'neon-crypto': [
          'bg-gray-900 border-2 border-[#0ff]/30 rounded-lg',
          'shadow-[0_0_30px_rgba(0,255,255,0.2)]',
        ],
        organic: [
          'bg-white border border-gray-200 rounded-2xl',
          'shadow-[0_20px_60px_rgba(0,0,0,0.15)]',
        ],
        experimental: [
          'bg-gradient-to-br from-purple-900/95 to-pink-900/95',
          'border-2 border-white/20 rounded-2xl',
          'shadow-[0_0_40px_rgba(168,85,247,0.4)]',
        ],
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      size: 'md',
    },
  }
)

/**
 * Modal Header Variants
 */
const modalHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left', {
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
 * Modal Title Variants
 */
const modalTitleVariants = cva('text-lg font-semibold leading-none tracking-tight', {
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
 * Modal Description Variants
 */
const modalDescriptionVariants = cva('text-sm', {
  variants: {
    variant: {
      conspiracy: 'text-[#00FF41]/70',
      'neon-crypto': 'text-[#0ff]/70',
      organic: 'text-gray-600',
      experimental: 'text-white/80',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

/**
 * Modal Body Variants
 */
const modalBodyVariants = cva('', {
  variants: {
    variant: {
      conspiracy: 'text-[#00FF41]/90',
      'neon-crypto': 'text-[#0ff]/90',
      organic: 'text-gray-700',
      experimental: 'text-white/90',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

/**
 * Modal Footer Variants
 */
const modalFooterVariants = cva(
  'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  {
    variants: {
      variant: {
        conspiracy: '',
        'neon-crypto': '',
        organic: '',
        experimental: '',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
    },
  }
)

/**
 * Modal Close Button Variants
 */
const modalCloseVariants = cva(
  [
    'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
    'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        conspiracy: 'text-[#00FF41] hover:text-[#00FF41] focus:ring-[#00FF41]',
        'neon-crypto': 'text-[#0ff] hover:text-[#0ff] focus:ring-[#0ff]',
        organic: 'text-gray-500 hover:text-gray-700 focus:ring-gray-400',
        experimental: 'text-white hover:text-white focus:ring-white',
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
export interface ModalProps extends DialogPrimitive.DialogProps {}

export interface ModalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

export interface ModalOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
    VariantProps<typeof modalOverlayVariants> {}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showClose?: boolean
}

export interface ModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalHeaderVariants> {}

export interface ModalTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    VariantProps<typeof modalTitleVariants> {}

export interface ModalDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
    VariantProps<typeof modalDescriptionVariants> {}

export interface ModalBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalBodyVariants> {}

export interface ModalFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalFooterVariants> {}

export interface ModalCloseProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>,
    VariantProps<typeof modalCloseVariants> {}

/**
 * Modal Root Component
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Title</ModalTitle>
 *     </ModalHeader>
 *     <ModalBody>Content</ModalBody>
 *   </ModalContent>
 * </Modal>
 * ```
 */
export const Modal = DialogPrimitive.Root

/**
 * Modal Trigger Component
 */
export const ModalTrigger = DialogPrimitive.Trigger

/**
 * Modal Overlay Component
 */
export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(modalOverlayVariants({ variant, className }))}
    {...props}
  />
))

ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * Modal Content Component
 *
 * @example With different aesthetics
 * ```tsx
 * <ModalContent variant="conspiracy">Classified content</ModalContent>
 * <ModalContent variant="neon-crypto">Cyberpunk content</ModalContent>
 * <ModalContent variant="organic">Friendly content</ModalContent>
 * <ModalContent variant="experimental">Psychedelic content</ModalContent>
 * ```
 */
export const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, variant, size, showClose = true, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <ModalOverlay variant={variant} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {showClose && (
        <ModalClose variant={variant}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
          <span className="sr-only">Close</span>
        </ModalClose>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

ModalContent.displayName = DialogPrimitive.Content.displayName

/**
 * Modal Header Component
 */
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(modalHeaderVariants({ variant, className }))} {...props} />
  )
)

ModalHeader.displayName = 'ModalHeader'

/**
 * Modal Title Component
 */
export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  ModalTitleProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(modalTitleVariants({ variant, className }))}
    {...props}
  />
))

ModalTitle.displayName = DialogPrimitive.Title.displayName

/**
 * Modal Description Component
 */
export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(modalDescriptionVariants({ variant, className }))}
    {...props}
  />
))

ModalDescription.displayName = DialogPrimitive.Description.displayName

/**
 * Modal Body Component
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(modalBodyVariants({ variant, className }))} {...props} />
  )
)

ModalBody.displayName = 'ModalBody'

/**
 * Modal Footer Component
 */
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(modalFooterVariants({ variant, className }))} {...props} />
  )
)

ModalFooter.displayName = 'ModalFooter'

/**
 * Modal Close Component
 */
export const ModalClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  ModalCloseProps
>(({ className, variant, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(modalCloseVariants({ variant, className }))}
    {...props}
  />
))

ModalClose.displayName = DialogPrimitive.Close.displayName
