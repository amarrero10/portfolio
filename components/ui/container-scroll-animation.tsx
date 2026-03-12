'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'

export const ContainerScroll = ({
  titleComponent,
  children,
  containerHeight = 'h-[45rem] md:h-[60rem]',
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
  containerHeight?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div
      className={`${containerHeight} flex items-center justify-center relative p-2 md:p-20`}
      ref={containerRef}
    >
      <div className="py-8 md:py-32 w-full relative" style={{ perspective: '1000px' }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  )
}

export const ScrollHeader = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const ScrollCard = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        border: '1px solid var(--clr-border)',
        borderRadius: '1.5rem',
        background: 'var(--clr-light-black)',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.03), 0 9px 20px rgba(0,0,0,0.4), 0 37px 37px rgba(0,0,0,0.38), 0 84px 50px rgba(0,0,0,0.28)',
      }}
      className="max-w-5xl -mt-10 mx-auto w-full p-2 md:p-3"
    >
      <div
        style={{
          width: '100%',
          borderRadius: '1rem',
          background: 'var(--clr-black)',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
