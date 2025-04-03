"use client"

import React, { useRef, useEffect } from 'react'

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  layer: number
}

interface Line {
  start: Point
  end: Point
  alpha: number
}

export function GeometricAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef<{ x: number; y: number } | null>(null)
  const animationFrameId = useRef<number>()
  const isInitialized = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size with higher pixel density
    const handleResize = () => {
      if (!canvas || !ctx) return
      
      // Get the actual size of the container
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      // Set canvas size with pixel density
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr)
      
      console.log("Canvas size:", canvas.width, canvas.height, "DPR:", dpr)
      
      // Initialize points if not already done
      if (!isInitialized.current) {
        initializePoints()
        isInitialized.current = true
      }
    }

    // Animation properties
    const points: Point[] = []
    const lines: Line[] = []
    const numPoints = 120 // More points for neural network effect
    const connectionRadius = 250 // Larger connection radius
    const basePointRadius = 2.5 // Smaller base point size
    const pointSpeed = 0.4 // Slower, more deliberate movement
    const glowIntensity = 1 // Maximum glow
    const glowRadius = 40 // Larger glow radius
    const layerCount = 4 // Number of vertical layers for neural network effect
    const pointsPerLayer = Math.floor(numPoints / layerCount)

    // Initialize points with neural network-like structure
    function initializePoints() {
      if (!canvas) return
      points.length = 0
      
      // Create points in layers (like neural network)
      for (let layer = 0; layer < layerCount; layer++) {
        const layerX = (canvas.width * (layer + 1)) / (layerCount + 1)
        const layerWidth = canvas.width * 0.15 // Layer width variance
        
        for (let i = 0; i < pointsPerLayer; i++) {
          // Add vertical spacing between points in each layer
          const y = (canvas.height / (pointsPerLayer + 1)) * (i + 1) + (Math.random() - 0.5) * 100
          const x = layerX + (Math.random() - 0.5) * layerWidth
          
          // Add "data flow" effect - points move mainly horizontally
          const horizontalBias = 0.7 // 70% of movement is horizontal
          const vx = ((Math.random() - 0.5) * 2 * pointSpeed) * horizontalBias
          const vy = ((Math.random() - 0.5) * 2 * pointSpeed) * (1 - horizontalBias)
          
          // Size varies by layer to create depth
          const layerScale = 1 - (Math.abs(layer - layerCount/2) / layerCount)
          const size = (Math.random() * 2 + basePointRadius) * layerScale
          
          points.push({
            x,
            y,
            vx,
            vy,
            size,
            color: `rgba(var(--primary-rgb), ${0.7 + Math.random() * 0.3})`, // Random opacity variation
            layer // Store layer information for connection logic
          })
        }
      }
      
      // Add some random floating points for organic feel
      const floatingPoints = Math.floor(numPoints * 0.2) // 20% additional floating points
      for (let i = 0; i < floatingPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * pointSpeed * 0.5,
          vy: (Math.random() - 0.5) * pointSpeed * 0.5,
          size: Math.random() * 1.5 + basePointRadius * 0.8,
          color: `rgba(var(--primary-rgb), ${0.5 + Math.random() * 0.3})`,
          layer: -1 // Special layer for floating points
        })
      }
    }

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mousePosition.current = {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      }
    }

    function handleMouseLeave() {
      mousePosition.current = null
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    function updatePoints() {
      if (!canvas) return
      
      points.forEach((point) => {
        // Mouse repulsion with "neural activation" effect
        if (mousePosition.current) {
          const dx = mousePosition.current.x - point.x
          const dy = mousePosition.current.y - point.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 200) {
            // Create a ripple effect when mouse is near
            const force = (200 - distance) / 8000
            point.vx -= dx * force
            point.vy -= dy * force
            
            // Temporarily increase point size and glow
            point.size = point.size * 1.2
          }
        }

        // Add slight vertical oscillation for "processing" effect
        point.vy += Math.sin(Date.now() * 0.002 + point.x * 0.01) * 0.01

        // Limit velocity with layer-based constraints
        const maxSpeed = point.layer === -1 ? 1.5 : 2
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
        if (speed > maxSpeed) {
          point.vx = (point.vx / speed) * maxSpeed
          point.vy = (point.vy / speed) * maxSpeed
        }

        // Update position with boundary checks
        point.x += point.vx
        point.y += point.vy

        // Wrap around edges instead of bouncing for smoother flow
        if (point.x < 0) point.x = canvas.width
        if (point.x > canvas.width) point.x = 0
        if (point.y < 0) point.y = canvas.height
        if (point.y > canvas.height) point.y = 0
      })
    }

    function updateLines() {
      if (!ctx) return
      lines.length = 0
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        
        // Connect to points in adjacent layers
        points.forEach((otherPoint, j) => {
          if (i === j) return
          
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Connect points within same or adjacent layers more strongly
          const layerDiff = Math.abs(point.layer - otherPoint.layer)
          const isAdjacent = layerDiff <= 1
          const maxDist = isAdjacent ? connectionRadius : connectionRadius * 0.5

          if (distance < maxDist) {
            const alpha = (1 - distance / maxDist) * (isAdjacent ? 0.8 : 0.4)
            lines.push({
              start: point,
              end: otherPoint,
              alpha
            })
          }
        })
      }
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw lines with data flow effect
      lines.forEach((line) => {
        const gradient = ctx.createLinearGradient(
          line.start.x,
          line.start.y,
          line.end.x,
          line.end.y
        )
        
        // Create pulsing effect
        const pulse = (Math.sin(Date.now() * 0.003) + 1) * 0.2
        ctx.shadowBlur = glowRadius + pulse * 10
        ctx.shadowColor = `rgba(var(--primary-rgb), ${glowIntensity * line.alpha})`
        
        gradient.addColorStop(0, `rgba(var(--primary-rgb), ${line.alpha})`)
        gradient.addColorStop(1, `rgba(var(--primary-rgb), ${line.alpha * 0.7})`)
        
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2 + pulse
        ctx.stroke()
        
        ctx.shadowBlur = 0
      })

      // Draw points with neural activation effect
      points.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        
        // Pulsing glow effect
        const pulse = (Math.sin(Date.now() * 0.003 + point.x * 0.01) + 1) * 0.2
        ctx.shadowBlur = glowRadius + pulse * 10
        ctx.shadowColor = `rgba(var(--primary-rgb), ${glowIntensity})`
        
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size
        )
        gradient.addColorStop(0, `rgba(var(--primary-rgb), ${0.9 + pulse})`)
        gradient.addColorStop(1, `rgba(var(--primary-rgb), 0)`)
        
        ctx.fillStyle = gradient
        ctx.fill()
        
        ctx.shadowBlur = 0
      })

      // Draw mouse interaction effect
      if (mousePosition.current) {
        const gradient = ctx.createRadialGradient(
          mousePosition.current.x,
          mousePosition.current.y,
          0,
          mousePosition.current.x,
          mousePosition.current.y,
          150
        )
        gradient.addColorStop(0, "rgba(var(--primary-rgb), 0.2)")
        gradient.addColorStop(0.5, "rgba(var(--primary-rgb), 0.1)")
        gradient.addColorStop(1, "rgba(var(--primary-rgb), 0)")
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Animation loop
    function animate() {
      updatePoints()
      updateLines()
      draw()
      animationFrameId.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: "transparent",
          pointerEvents: "auto",
          opacity: 1,
        }}
      />
    </div>
  )
}
