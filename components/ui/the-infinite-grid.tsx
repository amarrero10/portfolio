'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from 'framer-motion'

export const InfiniteGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  // Track mouse at window level so pointer-events-none doesn't block it
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const { left, top } = el.getBoundingClientRect()
      mouseX.set(e.clientX - left)
      mouseY.set(e.clientY - top)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
    >
      {/* Base dim grid — always visible */}
      <div className="absolute inset-0 z-0" style={{ opacity: 0.05 }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-revealed bright grid */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ maskImage, WebkitMaskImage: maskImage, opacity: 0.7 }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
}) => {
  return (
    <svg className="w-full h-full" style={{ color: '#9AB55C' }}>
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}
