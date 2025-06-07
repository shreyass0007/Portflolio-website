"use client"

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useIntersection({ 
  threshold = 0.1, 
  rootMargin = '0px 0px 100px 0px', 
  once = true 
}: UseIntersectionOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (targetRef.current && !observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting)
          if (entry.isIntersecting && once && observerRef.current) {
            observerRef.current.disconnect()
          }
        },
        {
          threshold,
          rootMargin,
        }
      )

      observerRef.current.observe(targetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, once])

  return { ref: targetRef, isIntersecting }
}
