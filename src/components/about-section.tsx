"use client"

import Image from "next/image"
import { useMemo } from 'react'
import { AnimatedCard } from "@/components/ui/animated-card"
import { ResumeDialog } from "@/components/resume-dialog"
import { Terminal } from 'lucide-react'
import { AnimatedSection } from "@/components/animated-section"

export function AboutSection() {
  // Memoize stats to prevent unnecessary re-renders
  const stats = useMemo(() => [
    { label: "Years of Experience", value: "1+" },
    { label: "Projects Completed", value: "30+" },
    { label: "Satisfied Clients", value: "20+" },
    { label: "Technologies", value: "10+" },
  ], [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <section 
      className="py-16 sm:py-20 relative overflow-hidden bg-gray-50 dark:bg-[#0d1729]" 
      id="about"
    >
      
      <div 
        className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-indigo-400">
            Passionate About Creating
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
          I'm an AI/ML engineer and open-source contributor with a passion for building scalable, intelligent applications. 
          I enjoy exploring cutting-edge technologies and solving real-world problems through data and automation.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <AnimatedSection className="relative aspect-[4/5] w-full max-w-lg mx-auto" direction="left" delay={0.1}>
            <div className="relative w-full h-full">
              <Image
                src="/images/profile.jpg"
                alt="Profile Photo"
                fill
                className="object-cover rounded-2xl transform-gpu"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                style={{
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  perspective: '1000px',
                  opacity: 1 // Force opacity to ensure visibility
                }}
                onLoad={() => console.log('Profile image loaded successfully')}
                onError={() => console.error('Error loading profile image')}
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/20" />
            </div>
          </AnimatedSection>

          <AnimatedSection className="space-y-8" direction="right" delay={0.1}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-[#162033] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20 border border-gray-200/50 dark:border-indigo-500/20"
                  style={{
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                I specialize in building modern web applications using cutting-edge technologies. My
                goal is to create intuitive and performant solutions that solve real-world problems.
              </p>
              <div className="transition-transform hover:scale-105 active:scale-95">
                <ResumeDialog />
              </div>
              <AnimatedSection 
                className="text-gray-600 dark:text-gray-300 text-lg italic border-l-4 border-blue-500 dark:border-blue-400 pl-4 mt-6"
                direction="up"
                delay={0.2}
              >
                "I believe in creating AI that's not only powerful but also responsible, accessible, and human-centered."
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-4 right-4 z-50 opacity-0 animate-fade-in">
        <button
          className="p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110 active:scale-90"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
