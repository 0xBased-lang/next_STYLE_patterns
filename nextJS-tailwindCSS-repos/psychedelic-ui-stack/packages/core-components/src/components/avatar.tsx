import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Avatar Variants
 */
const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        conspiracy: 'border-2 border-[#00FF41]/30',
        'neon-crypto': 'border-2 border-[#0ff]/30',
        organic: 'border-2 border-gray-200',
        experimental: 'border-2 border-purple-500/50',
      },
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      size: 'md',
      shape: 'circle',
    },
  }
)

/**
 * Avatar Image Variants
 */
const avatarImageVariants = cva('aspect-square h-full w-full object-cover')

/**
 * Avatar Fallback Variants
 */
const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center font-medium',
  {
    variants: {
      variant: {
        conspiracy: 'bg-black text-[#00FF41]',
        'neon-crypto': 'bg-gray-900 text-[#0ff]',
        organic: 'bg-gray-100 text-gray-700',
        experimental: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      size: 'md',
    },
  }
)

/**
 * Avatar Status Indicator Variants
 */
const avatarStatusVariants = cva(
  [
    'absolute bottom-0 right-0 block rounded-full ring-2',
    'ring-background',
  ],
  {
    variants: {
      variant: {
        conspiracy: 'ring-black',
        'neon-crypto': 'ring-gray-900',
        organic: 'ring-white',
        experimental: 'ring-purple-900',
      },
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        busy: 'bg-red-500',
        away: 'bg-yellow-500',
      },
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-4 w-4',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      status: 'online',
      size: 'md',
      animated: false,
    },
  }
)

/**
 * Type definitions
 */
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  showStatusIndicator?: boolean
  statusAnimated?: boolean
}

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  variant?: 'conspiracy' | 'neon-crypto' | 'organic' | 'experimental'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Avatar Root Component
 *
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="User" fallback="JD" />
 * ```
 *
 * @example With status indicator
 * ```tsx
 * <Avatar
 *   src="/avatar.jpg"
 *   alt="User"
 *   fallback="JD"
 *   status="online"
 *   showStatusIndicator
 * />
 * ```
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      variant,
      size,
      shape,
      src,
      alt,
      fallback,
      status,
      showStatusIndicator = false,
      statusAnimated = false,
      ...props
    },
    ref
  ) => {
    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ variant, size, shape, className }))}
        {...props}
      >
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback variant={variant} size={size}>
          {fallback}
        </AvatarFallback>
        {showStatusIndicator && status && (
          <span
            className={cn(
              avatarStatusVariants({
                variant,
                status,
                size,
                animated: statusAnimated,
              })
            )}
          />
        )}
      </AvatarPrimitive.Root>
    )
  }
)

Avatar.displayName = 'Avatar'

/**
 * Avatar Image Component
 */
export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(avatarImageVariants({ className }))}
    {...props}
  />
))

AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * Avatar Fallback Component
 *
 * Displays when image fails to load or is not provided.
 */
export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, variant, size, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackVariants({ variant, size, className }))}
    {...props}
  />
))

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Avatar Group Component
 *
 * Displays multiple avatars in a stacked group.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="/user1.jpg" fallback="U1" />
 *   <Avatar src="/user2.jpg" fallback="U2" />
 *   <Avatar src="/user3.jpg" fallback="U3" />
 *   <Avatar src="/user4.jpg" fallback="U4" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 5, variant = 'conspiracy', size = 'md', ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const displayChildren = childArray.slice(0, max)
    const remainingCount = childArray.length - max

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {displayChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-background rounded-full">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                  variant,
                  size,
                })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <Avatar variant={variant} size={size} fallback={`+${remainingCount}`} />
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'
