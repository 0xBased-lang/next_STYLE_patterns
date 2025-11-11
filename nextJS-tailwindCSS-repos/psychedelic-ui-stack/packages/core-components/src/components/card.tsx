import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Card variants using Class Variance Authority
 */
const cardVariants = cva(
  // Base styles
  'rounded-lg transition-all',
  {
    variants: {
      variant: {
        // Conspiracy Establishment style
        conspiracy: [
          'bg-[#3A1F1F] border-2 border-[#D4AF37]',
          'shadow-[0_0_10px_rgba(0,255,65,0.2)]',
          'hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]',
        ],

        // Neon Crypto style (KEKTECH)
        'neon-crypto': [
          'bg-[#0A0E27] border-2 border-[#00D9FF]',
          'shadow-[0_0_10px_rgba(0,217,255,0.3)]',
          'hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]',
        ],

        // Organic Harmony style
        organic: [
          'bg-gradient-to-br from-[#FFF5E1] to-[#FFE5EC]',
          'border border-[#FFD93D]/30',
          'shadow-lg shadow-[#FFD93D]/20',
          'hover:shadow-xl hover:shadow-[#FF6B9D]/30',
        ],

        // Experimental Psychedelic style
        experimental: [
          'bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-blue-900/50',
          'border-2 border-purple-500',
          'shadow-xl shadow-purple-500/30',
          'hover:shadow-2xl hover:shadow-pink-500/40',
          'backdrop-blur-sm',
        ],
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      hoverable: {
        true: 'cursor-pointer hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'conspiracy',
      padding: 'md',
      hoverable: false,
    },
  }
)

const cardHeaderVariants = cva('flex flex-col space-y-1.5', {
  variants: {
    variant: {
      conspiracy: 'text-[#D4AF37] border-b border-[#D4AF37]/30',
      'neon-crypto': 'text-[#00D9FF] border-b border-[#00D9FF]/30',
      organic: 'text-[#C44569] border-b border-[#FFD93D]/30',
      experimental: 'text-white border-b border-purple-500/30',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3 pb-2',
      md: 'p-4 pb-3',
      lg: 'p-6 pb-4',
      xl: 'p-8 pb-6',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    padding: 'md',
  },
})

const cardTitleVariants = cva('font-semibold leading-none tracking-tight', {
  variants: {
    variant: {
      conspiracy: 'text-[#D4AF37]',
      'neon-crypto': 'text-[#00D9FF]',
      organic: 'text-[#C44569]',
      experimental: 'text-white',
    },
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    size: 'md',
  },
})

const cardDescriptionVariants = cva('text-sm', {
  variants: {
    variant: {
      conspiracy: 'text-[#D4AF37]/70',
      'neon-crypto': 'text-[#00D9FF]/70',
      organic: 'text-[#C44569]/70',
      experimental: 'text-white/70',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
  },
})

const cardContentVariants = cva('', {
  variants: {
    variant: {
      conspiracy: 'text-[#D4AF37]/90',
      'neon-crypto': 'text-[#00D9FF]/90',
      organic: 'text-[#6B4E71]',
      experimental: 'text-white/90',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3 pt-2',
      md: 'p-4 pt-3',
      lg: 'p-6 pt-4',
      xl: 'p-8 pt-6',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    padding: 'md',
  },
})

const cardFooterVariants = cva('flex items-center', {
  variants: {
    variant: {
      conspiracy: 'text-[#D4AF37] border-t border-[#D4AF37]/30',
      'neon-crypto': 'text-[#00D9FF] border-t border-[#00D9FF]/30',
      organic: 'text-[#C44569] border-t border-[#FFD93D]/30',
      experimental: 'text-white border-t border-purple-500/30',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3 pt-2',
      md: 'p-4 pt-3',
      lg: 'p-6 pt-4',
      xl: 'p-8 pt-6',
    },
  },
  defaultVariants: {
    variant: 'conspiracy',
    padding: 'md',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

/**
 * Card component - Container for content with style variants
 *
 * @example
 * ```tsx
 * <Card variant="conspiracy">
 *   <CardHeader>
 *     <CardTitle>Classified Information</CardTitle>
 *     <CardDescription>Top Secret</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Confidential data here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>View Details</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(cardTitleVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(cardDescriptionVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
