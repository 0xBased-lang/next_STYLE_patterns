'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { motionVariants } from '@/lib/animations'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
}

export function FadeIn({ children, delay = 0, duration = 0.3, ...props }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants.fadeIn}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
