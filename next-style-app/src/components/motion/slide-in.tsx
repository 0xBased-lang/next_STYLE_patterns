'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { motionVariants } from '@/lib/animations'

interface SlideInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  ...props
}: SlideInProps) {
  const variantMap = {
    up: motionVariants.slideUp,
    down: motionVariants.slideDown,
    left: motionVariants.slideLeft,
    right: motionVariants.slideRight,
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variantMap[direction]}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
