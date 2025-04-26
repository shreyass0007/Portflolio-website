"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react"
import Link from "next/link"

// Typing animation hook
function useTypewriter(text: string, delay: number = 100) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return displayText
}

// Mouse follow effect hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return position
}

// Particle effect component
function ParticleEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: 0
          }}
          animate={{
            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  )
}

// Scroll indicator component
function ScrollIndicator() {
  return (
    <motion.div 
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <span className="text-sm text-gray-600 dark:text-gray-400">Scroll to explore</span>
      <motion.div
        className="w-5 h-8 border-2 border-gray-500 dark:border-gray-600 rounded-full p-1"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-1 h-1.5 bg-gray-500 dark:bg-gray-600 rounded-full"
          animate={{ 
            y: [0, 20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Floating block component with hover animation
function FloatingBlock({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ 
        duration: 0.5, 
        delay,
        hover: { duration: 0.2 }
      }}
      className={`text-sm bg-white/80 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md rounded-lg p-4 
        shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] 
        border border-gray-200/50 dark:border-white/5 
        hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)] dark:hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)] 
        hover:border-blue-500/20 dark:hover:border-blue-500/20 
        transition-all ${className}`}
    >
      {children}
    </motion.div>
  )
}

const aiSpecialties = [
  {
    title: "Machine Learning",
    description: "Training intelligent models"
  },
  {
    title: "Deep Learning",
    description: "Building neural networks"
  },
  {
    title: "Generative AI",
    description: "Creating AI content"
  },
  {
    title: "NLP",
    description: "Processing human language"
  }
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const typedText = useTypewriter("Creating intelligent systems that learn, adapt, and solve problems.")
  const mousePosition = useMousePosition()
  const titles = ["AI/ML Engineer", "Open Source Contributor", "Tech Explorer"]
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [currentAIIndex, setCurrentAIIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAIIndex((prev) => (prev + 1) % aiSpecialties.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-8 sm:py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-gray-50/50 via-gray-100/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-800/50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric pattern */}
        <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/hero-pattern.svg"
            alt="Geometric Pattern"
            fill
            className="object-contain opacity-[0.15] dark:opacity-[0.07] animate-spin-slow"
            priority
          />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] opacity-25" />
      </div>
      
      {/* Particle effect */}
      <ParticleEffect />
      
      {/* Mouse follow gradient */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        animate={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.05), transparent 80%)`
        }}
      />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-transparent dark:from-background/95 dark:via-background/80 dark:to-transparent z-10" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Left column - Main content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Status badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 dark:bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 dark:bg-green-400"></span>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Available for opportunities</span>
              </motion.div>

              {/* Main heading */}
              <div className="space-y-3 sm:space-y-4">
                <motion.h1 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="block text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-2 sm:mb-4">
                    Hi, I'm Shresh<span className="inline-block animate-wave">👋</span>
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={titles[currentTitleIndex]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 dark:from-blue-500 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent"
                    >
                      {titles[currentTitleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.h1>

                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {typedText}<span className="animate-blink">|</span>
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-600/90 dark:hover:bg-blue-700/90 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 dark:shadow-blue-600/30 transition-all duration-200"
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base bg-white hover:bg-gray-50 dark:bg-gray-900/90 dark:hover:bg-gray-800/90 text-gray-900 dark:text-gray-100 rounded-xl font-semibold 
                    shadow-[0_4px_12px_rgb(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgb(0,0,0,0.15)] dark:shadow-lg 
                    border border-gray-300 dark:border-gray-800 hover:border-blue-500/30 dark:hover:border-blue-600/30 
                    transition-all duration-200"
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* Social links */}
              <motion.div 
                className="flex items-center gap-2 sm:gap-4 justify-center xs:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.a
                  href="https://github.com/shreyass0007"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/90 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/shresh-shende/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/90 text-[#0A66C2]"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/shreyas078"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/90 text-[#1DA1F2]"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:shreshshende.777@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/90 text-red-500"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - Profile image and floating blocks */}
          <div className="hidden md:block w-full lg:w-1/2 relative">
            {/* Profile image */}
            <motion.div 
              className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl" />
              
              {/* Profile image */}
              <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-white/90 dark:ring-gray-900/90 ring-offset-4 ring-offset-white dark:ring-offset-background">
                <Image
                  src="/profile.png"
                  alt="Shresh Shende"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Decorative circles */}
              <div className="absolute -z-10 w-full h-full rounded-full border-[6px] border-dashed border-blue-200 dark:border-blue-900/50 animate-spin-slow" />
              <div className="absolute -z-10 w-[120%] h-[120%] -inset-[10%] rounded-full border-[6px] border-dashed border-purple-200 dark:border-purple-900/50 animate-reverse-spin-slow" />
            </motion.div>

            {/* Floating blocks */}
<div className="absolute inset-0 pointer-events-none hidden sm:block overflow-visible">
  <div className="relative w-full h-full">
    
    {/* Skills Code Block */}
    <FloatingBlock className="absolute top-[-10%] right-[35%] sm:right-[50%] lg:right-[55%] max-w-[160px] sm:max-w-[180px] lg:max-w-[220px] z-10" delay={0.6}>
      <div className="space-y-0.5 sm:space-y-1">
        <div className="font-mono text-blue-600 dark:text-primary text-xs sm:text-sm">{'const skills = ['}</div>
        <div className="font-mono pl-2 sm:pl-4 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{"'Python', 'TensorFlow', 'scikit-learn'"}</div>
        <div className="font-mono pl-2 sm:pl-4 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{"'Pandas', 'Matplotlib', 'Hugging Face'"}</div>
        <div className="font-mono pl-2 sm:pl-4 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">{"'Streamlit', 'Flask'"}</div>
        <div className="font-mono text-blue-600 dark:text-primary text-xs sm:text-sm">{']'}</div>
      </div>
    </FloatingBlock>

    {/* Generative AI Block */}
    <FloatingBlock className="absolute top-[15%] left-[60%] sm:left-[65%] lg:left-[70%] max-w-[140px] sm:max-w-[160px] lg:max-w-[200px] z-20" delay={0.7}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAIIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-1 transform rotate-[3deg]"
        >
          <div className="font-semibold text-purple-600 dark:text-purple-400">
            {aiSpecialties[currentAIIndex].title}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {aiSpecialties[currentAIIndex].description}
          </div>
        </motion.div>
      </AnimatePresence>
    </FloatingBlock>

    {/* Cloud Native Block */}
    <FloatingBlock className="absolute -bottom-[15%] right-[25%] sm:right-[30%] lg:right-[35%] max-w-[130px] sm:max-w-[150px] lg:max-w-[180px] z-30" delay={0.8}>
      <div className="space-y-0.5 sm:space-y-1">
        <div className="font-semibold text-blue-600 dark:text-primary">Cloud Native</div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">Building scalable solutions</div>
      </div>
    </FloatingBlock>

  </div>
</div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
