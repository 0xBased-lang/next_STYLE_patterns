import type { AnimationConfig, AnimationPreset } from '@/types/registry'

/**
 * Animation presets for Motion/Framer Motion
 */
export const animationPresets: Record<AnimationPreset, AnimationConfig> = {
  fade: {
    name: 'Fade',
    description: 'Smooth fade in/out animation',
    preset: 'fade',
    duration: 0.3,
    easing: 'ease-in-out',
  },
  slide: {
    name: 'Slide',
    description: 'Slide in from direction',
    preset: 'slide',
    duration: 0.4,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zoom: {
    name: 'Zoom',
    description: 'Scale/zoom animation',
    preset: 'zoom',
    duration: 0.2,
    easing: 'ease-out',
  },
  bounce: {
    name: 'Bounce',
    description: 'Bouncy spring animation',
    preset: 'bounce',
    duration: 0.6,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  spin: {
    name: 'Spin',
    description: 'Rotation animation',
    preset: 'spin',
    duration: 1,
    easing: 'linear',
    repeat: true,
  },
  flip: {
    name: 'Flip',
    description: '3D flip animation',
    preset: 'flip',
    duration: 0.6,
    easing: 'ease-in-out',
  },
  scale: {
    name: 'Scale',
    description: 'Scale up/down animation',
    preset: 'scale',
    duration: 0.3,
    easing: 'ease-in-out',
  },
  shake: {
    name: 'Shake',
    description: 'Shake/vibrate animation',
    preset: 'shake',
    duration: 0.5,
    easing: 'ease-in-out',
  },
}

/**
 * Framer Motion variants for common animations
 */
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeOut: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  zoomOut: {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.8 },
  },
  bounce: {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        bounce: 0.5,
        duration: 0.6,
      },
    },
  },
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  shake: {
    animate: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
      },
    },
  },
}

/**
 * Spring configurations for Framer Motion
 */
export const springConfigs = {
  default: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
  },
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
  },
  stiff: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 40,
  },
  slow: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 20,
  },
  molasses: {
    type: 'spring' as const,
    stiffness: 50,
    damping: 20,
  },
}

/**
 * Easing functions
 */
export const easings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  sharp: [0.4, 0, 0.6, 1],
  anticipate: [0.68, -0.55, 0.265, 1.55],
}

/**
 * Get animation variant by preset name
 */
export function getAnimationVariant(preset: AnimationPreset) {
  const variantMap: Record<AnimationPreset, keyof typeof motionVariants> = {
    fade: 'fadeIn',
    slide: 'slideUp',
    zoom: 'zoomIn',
    bounce: 'bounce',
    spin: 'spin',
    flip: 'fadeIn', // Fallback
    scale: 'zoomIn',
    shake: 'shake',
  }

  return motionVariants[variantMap[preset]]
}

/**
 * Create custom animation config
 */
export function createAnimationConfig(
  preset: AnimationPreset,
  overrides?: Partial<AnimationConfig>
): AnimationConfig {
  return {
    ...animationPresets[preset],
    ...overrides,
  }
}
