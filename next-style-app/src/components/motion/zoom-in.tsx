'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { motionVariants } from '@/lib/animations'

interface ZoomInProps extends HTMLMotionProps<'div'> {
  delay?: number
  duration?: number
}

export function ZoomIn({ children, delay = 0, duration = 0.2, ...props }: ZoomInProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants.zoomIn}
      transition={{ delay, duration }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
