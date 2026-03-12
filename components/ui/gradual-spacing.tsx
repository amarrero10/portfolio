'use client'

import React from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradualSpacingProps {
  text: string
  duration?: number
  delayMultiple?: number
  framerProps?: Variants
  className?: string
  style?: React.CSSProperties
  /** When true the animation plays; defaults to true for standalone use */
  triggered?: boolean
}

function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
  style,
  triggered = true,
}: GradualSpacingProps) {
  return (
    <div className="flex justify-start" style={style}>
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate={triggered ? 'visible' : 'hidden'}
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple, ease: [0.25, 0.4, 0.25, 1] }}
            className={cn('drop-shadow-sm', className)}
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

export { GradualSpacing }
