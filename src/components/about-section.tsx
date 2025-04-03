"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ResumeDialog } from "@/components/resume-dialog"
import { Terminal } from 'lucide-react'

export function AboutSection() {
  const stats = [
    { label: "Years of Experience", value: "1+" },
    { label: "Projects Completed", value: "30+" },
    { label: "Satisfied Clients", value: "20+" },
    { label: "Technologies", value: "10+" },
  ]

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" id="about">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white to-white/50 dark:from-background/30 dark:via-gray-900/40 dark:to-background/30" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Passionate About Creating
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">
          I'm an AI/ML engineer and open-source contributor with a passion for building scalable, intelligent applications. 
          I enjoy exploring cutting-edge technologies and solving real-world problems through data and automation.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] w-full max-w-lg mx-auto"
          >
            <Image
              src="/images/profile.jpg"
              alt="profile Photo"
              fill
              className="object-cover rounded-2xl"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/10 border border-gray-200/50 dark:border-white/10"
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
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ResumeDialog />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 dark:text-gray-300 text-lg italic border-l-4 border-blue-500/30 pl-4 mt-6"
              >
                "I believe in creating AI that's not only powerful but also responsible, accessible, and human-centered."
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          animate={{ 
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gray-400 dark:text-gray-500"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transform rotate-180"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
