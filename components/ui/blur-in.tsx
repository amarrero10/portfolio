'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlurInProps {
  word: string
  className?: string
  style?: React.CSSProperties
  variant?: {
    hidden: { filter: string; opacity: number }
    visible: { filter: string; opacity: number }
  }
  duration?: number
  /** When true the animation plays; defaults to true for standalone use */
  triggered?: boolean
  delay?: number
}

const BlurIn = ({
  word,
  className,
  style,
  variant,
  duration = 1,
  triggered = true,
  delay = 0,
}: BlurInProps) => {
  const defaultVariants = {
    hidden: { filter: 'blur(12px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  }
  const combinedVariants = variant || defaultVariants

  return (
    <motion.div
      initial="hidden"
      animate={triggered ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      variants={combinedVariants}
      className={cn('inline-block', className)}
      style={style}
    >
      {word}
    </motion.div>
  )
}

export { BlurIn }
