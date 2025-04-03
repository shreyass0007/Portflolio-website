"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
}))

const nodes = [
  { x: 50, y: 20, label: "AI" },
  { x: 20, y: 50, label: "ML" },
  { x: 80, y: 50, label: "DL" },
  { x: 35, y: 80, label: "NLP" },
  { x: 65, y: 80, label: "CV" },
]

const connections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3]
]

export function AIIllustration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particlePositions = particles.map(p => ({
      x: p.initialX,
      y: p.initialY,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }))

    const drawNode = (x: number, y: number, label: string) => {
      ctx.beginPath()
      ctx.arc(x * canvas.width / 100, y * canvas.height / 100, 20, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(var(--primary-rgb), 0.1)"
      ctx.fill()
      ctx.strokeStyle = "rgba(var(--primary-rgb), 0.5)"
      ctx.stroke()
      
      ctx.fillStyle = "rgba(var(--primary-rgb), 0.9)"
      ctx.font = "14px system-ui"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, x * canvas.width / 100, y * canvas.height / 100)
    }

    const drawConnection = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath()
      ctx.moveTo(x1 * canvas.width / 100, y1 * canvas.height / 100)
      ctx.lineTo(x2 * canvas.width / 100, y2 * canvas.height / 100)
      ctx.strokeStyle = "rgba(var(--primary-rgb), 0.2)"
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach(([i, j]) => {
        drawConnection(
          nodes[i].x, nodes[i].y,
          nodes[j].x, nodes[j].y
        )
      })

      // Update and draw particles
      particlePositions = particlePositions.map((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > 100) p.vx *= -1
        if (p.y < 0 || p.y > 100) p.vy *= -1

        ctx.beginPath()
        ctx.arc(
          p.x * canvas.width / 100,
          p.y * canvas.height / 100,
          particles[i].size,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = "rgba(var(--primary-rgb), 0.1)"
        ctx.fill()

        return p
      })

      // Draw nodes
      nodes.forEach(node => {
        drawNode(node.x, node.y, node.label)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl bg-card/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      {/* Neural Network Icons */}
      <div className="absolute bottom-4 right-4 flex gap-3">
        <motion.div
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6C3 6 3 18 12 18C21 18 21 6 12 6" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </motion.div>
        <motion.div
          className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
