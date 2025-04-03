"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$><"
const colors = [
  "rgba(var(--primary-rgb), 0.8)",
  "rgba(var(--primary-rgb), 0.6)",
  "rgba(var(--primary-rgb), 0.4)",
  "rgba(var(--primary-rgb), 0.2)",
]

class Column {
  x: number
  characters: string[]
  speed: number
  y: number
  height: number
  color: string

  constructor(x: number, height: number) {
    this.x = x
    this.y = Math.random() * -1000
    this.speed = Math.random() * 2 + 1
    this.height = height
    this.characters = Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () =>
      characters[Math.floor(Math.random() * characters.length)]
    )
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.y += this.speed
    if (this.y > this.height) {
      this.y = Math.random() * -1000
      this.speed = Math.random() * 2 + 1
      this.characters = Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () =>
        characters[Math.floor(Math.random() * characters.length)]
      )
      this.color = colors[Math.floor(Math.random() * colors.length)]
    }
  }
}

export function MatrixAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let columns: Column[] = []
    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      // Initialize columns
      const fontSize = 14
      const columnWidth = fontSize
      const numColumns = Math.floor(canvas.width / columnWidth)
      columns = Array.from({ length: numColumns }, (_, i) => new Column(i * columnWidth, canvas.height))
    }

    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px monospace"
      ctx.textAlign = "center"

      columns.forEach((column) => {
        column.characters.forEach((char, i) => {
          const y = column.y + i * 20
          if (y > 0 && y < canvas.height) {
            ctx.fillStyle = column.color
            ctx.fillText(char, column.x, y)
          }
        })
        column.update()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle resize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    // Add mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      columns.forEach((column) => {
        const dx = x - column.x
        const dy = y - column.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          column.speed = 5
          column.color = colors[0]
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full rounded-3xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/50 pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-primary/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Tech badges */}
      <div className="absolute bottom-6 right-6 flex gap-3">
        <motion.div
          className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-primary border border-primary/20"
          whileHover={{ scale: 1.05 }}
        >
          Full Stack
        </motion.div>
        <motion.div
          className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium text-primary border border-primary/20"
          whileHover={{ scale: 1.05 }}
        >
          Developer
        </motion.div>
      </div>
    </motion.div>
  )
}
