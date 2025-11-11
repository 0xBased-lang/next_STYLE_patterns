import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

/**
 * Tabs List Variants
 */
const tabsListVariants = cva(
  'inline-flex items-center justify-center rounded-md p-1 gap-1',
  {
    variants: {
      variant: {
        conspiracy: 'bg-black/50 border border-[#00FF41]/20',
        'neon-crypto': 'bg-gray-900/50 border border-[#0ff]/20',
        organic: 'bg-gray-100 border border-gray-200',
        experimental:
          'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-white/10',
      },
      tabStyle: {
        pills: '',
        underline: 'bg-transparent border-0 border-b-2 rounded-none gap-0',
      },
    },
    compoundVariants: [
      {
        tabStyle: 'underline',
        variant: 'conspiracy',
        className: 'border-b-[#00FF41]/20',
      },
      {
        tabStyle: 'underline',
        variant: 'neon-crypto',
        className: 'border-b-[#0ff]/20',
      },
      {
        tabStyle: 'underline',
        variant: 'organic',
        className: 'border-b-gray-200',
      },
      {
        tabStyle: 'underline',
        variant: 'experimental',
        className: 'border-b-white/10',
      },
    ],
    defaultVariants: {
      variant: 'conspiracy',
      tabStyle: 'pills',
    },
  }
)

/**
 * Tabs Trigger Variants
 */
const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium',
    'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        conspiracy: [
          'text-[#00FF41]/70 hover:text-[#00FF41]',
          'data-[state=active]:text-[#00FF41] focus-visible:ring-[#00FF41]',
        ],
        'neon-crypto': [
          'text-[#0ff]/70 hover:text-[#0ff]',
          'data-[state=active]:text-[#0ff] focus-visible:ring-[#0ff]',
        ],
        organic: [
          'text-gray-600 hover:text-gray-900',
          'data-[state=active]:text-gray-900 focus-visible:ring-gray-400',
        ],
        experimental: [
          'text-white/70 hover:text-white',
          'data-[state=active]:text-white focus-visible:ring-purple-400',
        ],
      },
      tabStyle: {
        pills: 'rounded-md',
        underline: 'rounded-none border-b-2 border-transparent',
      },
    },
    compoundVariants: [
      // Pills tabStyle active states
      {
        tabStyle: 'pills',
        variant: 'conspiracy',
        className: 'data-[state=active]:bg-[#00FF41]/10 data-[state=active]:shadow-sm',
      },
      {
        tabStyle: 'pills',
        variant: 'neon-crypto',
        className: 'data-[state=active]:bg-[#0ff]/10 data-[state=active]:shadow-sm',
      },
      {
        tabStyle: 'pills',
        variant: 'organic',
        className: 'data-[state=active]:bg-white data-[state=active]:shadow-sm',
      },
      {
        tabStyle: 'pills',
        variant: 'experimental',
        className:
          'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-pink-600/20',
      },
      // Underline tabStyle active states
      {
        tabStyle: 'underline',
        variant: 'conspiracy',
        className: 'data-[state=active]:border-b-[#00FF41]',
      },
      {
        tabStyle: 'underline',
        variant: 'neon-crypto',
        className: 'data-[state=active]:border-b-[#0ff]',
      },
      {
        tabStyle: 'underline',
        variant: 'organic',
        className: 'data-[state=active]:border-b-gray-900',
      },
      {
        tabStyle: 'underline',
        variant: 'experimental',
        className: 'data-[state=active]:border-b-purple-500',
      },
    ],
    defaultVariants: {
      variant: 'conspiracy',
      tabStyle: 'pills',
    },
  }
)

/**
 * Tabs Content Variants
 */
const tabsContentVariants = cva(
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        conspiracy: 'text-[#00FF41]/90 focus-visible:ring-[#00FF41]',
        'neon-crypto': 'text-[#0ff]/90 focus-visible:ring-[#0ff]',
        organic: 'text-gray-700 focus-visible:ring-gray-400',
        experimental: 'text-white/90 focus-visible:ring-purple-400',
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
export interface TabsProps extends TabsPrimitive.TabsProps {}

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

/**
 * Tabs Root Component
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
export const Tabs = TabsPrimitive.Root

/**
 * Tabs List Component
 *
 * @example With different styles
 * ```tsx
 * <TabsList variant="conspiracy" tabStyle="pills">Pills style</TabsList>
 * <TabsList variant="organic" tabStyle="underline">Underline style</TabsList>
 * ```
 */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, tabStyle, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, tabStyle, className }))}
    {...props}
  />
))

TabsList.displayName = TabsPrimitive.List.displayName

/**
 * Tabs Trigger Component
 *
 * @example With different aesthetics
 * ```tsx
 * <TabsTrigger variant="conspiracy">Matrix tab</TabsTrigger>
 * <TabsTrigger variant="neon-crypto">Cyberpunk tab</TabsTrigger>
 * <TabsTrigger variant="organic">Friendly tab</TabsTrigger>
 * <TabsTrigger variant="experimental">Psychedelic tab</TabsTrigger>
 * ```
 */
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, tabStyle, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, tabStyle, className }))}
    {...props}
  />
))

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Tabs Content Component
 */
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant, className }))}
    {...props}
  />
))

TabsContent.displayName = TabsPrimitive.Content.displayName
