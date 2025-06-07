"use client"

import { memo, ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useIntersection } from '@/hooks/use-intersection'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { SectionError } from './section-error'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  style?: React.CSSProperties
}

const baseStyles = {
  willChange: 'transform',
  transform: 'translate3d(0,0,0)',
  backfaceVisibility: 'hidden' as const,
  WebkitBackfaceVisibility: 'hidden' as const,
  perspective: '1000px'
}

function AnimatedSectionComponent({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  style
}: AnimatedSectionProps) {
  // Initialize error handling
  const { hasError, error, handleError, clearError } = useErrorHandler()
  
  // Use intersection observer
  const { ref, isIntersecting } = useIntersection({
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px',
    once: true
  })

  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  } as const

  // Force elements to be visible initially - fixes the display issue
  const [hasRendered, setHasRendered] = useState(false)
  
  useEffect(() => {
    // This ensures elements are visible on first render
    setHasRendered(true)
  }, [])

  // If there's an error, show the error component
  if (hasError && error) {
    return (
      <SectionError 
        error={error} 
        reset={clearError} 
        section="Animation" 
      />
    )
  }

  try {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ ...baseStyles, ...style }}
        initial={{ 
          opacity: 0,
          ...directionMap[direction]
        }}
        animate={{
          opacity: isIntersecting || hasRendered ? 1 : 0,
          x: isIntersecting || hasRendered ? 0 : (directionMap[direction].x || 0),
          y: isIntersecting || hasRendered ? 0 : (directionMap[direction].y || 0)
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          delay: delay
        }}
        viewport={{
          once: true,
          margin: "-100px"
        }}
      >
        {children}
      </motion.div>
    )
  } catch (err) {
    handleError(err)
    return (
      <SectionError 
        error={error || new Error("An unexpected error occurred")} 
        reset={clearError} 
        section="Animation" 
      />
    )
  }
}

export const AnimatedSection = memo(AnimatedSectionComponent)
