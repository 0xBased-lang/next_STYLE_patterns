'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {}

export function StaggerItem({ children, ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
