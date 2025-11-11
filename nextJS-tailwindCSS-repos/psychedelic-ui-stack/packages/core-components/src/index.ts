/**
 * @psychedelic-ui/core-components
 *
 * Multi-aesthetic component library supporting 4 distinct visual styles:
 * - Conspiracy Establishment
 * - Neon Crypto
 * - Organic Harmony
 * - Experimental Psychedelic
 */

// Components
export { Button, buttonVariants, type ButtonProps } from './components/button'
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from './components/card'
export { Input, inputVariants, type InputProps } from './components/input'
export { Label, labelVariants, type LabelProps } from './components/label'
export { Badge, badgeVariants, type BadgeProps } from './components/badge'
export { Separator, separatorVariants, type SeparatorProps } from './components/separator'
export { Switch, switchVariants, type SwitchProps } from './components/switch'

// Tooltip
export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type SimpleTooltipProps,
} from './components/tooltip'

// Modal/Dialog
export {
  Modal,
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  type ModalProps,
  type ModalTriggerProps,
  type ModalOverlayProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalTitleProps,
  type ModalDescriptionProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalCloseProps,
} from './components/modal'

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
} from './components/dropdown-menu'

// Tabs
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './components/tabs'

// Avatar
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarGroupProps,
} from './components/avatar'

// Progress
export {
  Progress,
  LoadingSpinner,
  type ProgressProps,
} from './components/progress'

// Toast
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  type ToastProviderProps,
  type ToastViewportProps,
  type ToastProps,
  type ToastActionProps,
  type ToastCloseProps,
  type ToastTitleProps,
  type ToastDescriptionProps,
} from './components/toast'

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  type SkeletonProps,
} from './components/skeleton'

// Utilities
export { cn } from './utils/cn'

// Types
export type { StyleVariant, ComponentBaseProps, AnimationIntensity, AnimatableProps } from './types'
