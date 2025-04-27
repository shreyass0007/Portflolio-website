"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiOpenjdk,
  SiCplusplus,
  SiOpencv
} from 'react-icons/si'

export function SkillsSection() {
  // Always default to AI/ML skills
  const [activeTab, setActiveTab] = React.useState<'aiml' | 'webdev' | 'other'>('aiml')

  // Define category configurations
  const categories = [
    {
      id: 'aiml',
      label: 'AI/ML',
      icon: <span className="text-2xl"></span>,
      activeColor: 'text-blue-600 dark:text-blue-400',
      hoverColor: 'hover:text-blue-500 dark:hover:text-blue-300'
    },
    {
      id: 'webdev',
      label: 'Web Dev',
      icon: <span className="text-2xl"></span>,
      activeColor: 'text-purple-600 dark:text-purple-400',
      hoverColor: 'hover:text-purple-500 dark:hover:text-purple-300'
    },
    {
      id: 'other',
      label: 'Other',
      icon: <span className="text-2xl"></span>,
      activeColor: 'text-indigo-600 dark:text-indigo-400',
      hoverColor: 'hover:text-indigo-500 dark:hover:text-indigo-300'
    }
  ]
  const webDevSkills = [
    {
      name: 'React',
      icon: SiReact,
      description: 'Building interactive user interfaces with modern React and hooks',
      color: 'text-[#61DAFB] dark:text-[#61DAFB]/90',
      tooltip: 'Built multiple production apps with React 18, Redux, and React Query'
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      description: 'Creating fast, SEO-friendly web applications with server-side rendering',
      color: 'text-gray-900 dark:text-white',
      tooltip: 'Developed high-performance apps with Next.js 13+ App Router'
    },
    {
      name: 'TypeScript',
      icon: SiTypescript,
      description: 'Writing type-safe code for better development experience',
      color: 'text-[#3178C6] dark:text-[#3178C6]/90',
      tooltip: 'Used in all recent projects for type safety and better DX'
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      description: 'Crafting beautiful UIs with utility-first CSS framework',
      color: 'text-[#06B6D4] dark:text-[#06B6D4]/90',
      tooltip: 'Primary styling solution for modern web projects'
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      description: 'Building scalable backend services and APIs',
      color: 'text-[#339933] dark:text-[#339933]/90',
      tooltip: 'Built microservices and REST APIs with Node.js'
    },
    {
      name: 'Express',
      icon: SiExpress,
      description: 'Creating robust web servers and RESTful APIs',
      color: 'text-gray-900 dark:text-white',
      tooltip: 'Created multiple backend services with Express.js'
    },
    {
      name: 'MongoDB',
      icon: SiMongodb,
      description: 'Working with NoSQL databases for flexible data storage',
      color: 'text-[#47A248] dark:text-[#47A248]/90',
      tooltip: 'Experienced with MongoDB Atlas and Mongoose ODM'
    }
  ]

  const otherSkills = [
    {
      name: 'Java',
      icon: SiOpenjdk,
      description: 'Object-oriented programming and enterprise applications',
      color: 'text-[#007396] dark:text-[#007396]/90',
      tooltip: 'Enterprise application development and Spring Boot'
    },
    {
      name: 'DSA in C++',
      icon: SiCplusplus,
      description: 'Data Structures and Algorithms implementation',
      color: 'text-[#00599C] dark:text-[#00599C]/90',
      tooltip: 'Competitive programming and system design'
    }
  ]

  const aiMlSkills = [
    {
      name: 'Python',
      icon: SiPython,
      description: 'Developing scripts and backend services',
      color: 'text-[#3776AB] dark:text-[#3776AB]/90',
      tooltip: 'Used in ML projects and automation scripts'
    },
    {
      name: 'TensorFlow',
      icon: SiTensorflow,
      description: 'Deep learning and machine learning model development',
      color: 'text-[#FF6F00] dark:text-[#FF6F00]/90',
      tooltip: 'Used in image classification and NLP projects'
    },
    {
      name: 'PyTorch',
      icon: SiPytorch,
      description: 'Building and training neural networks',
      color: 'text-[#EE4C2C] dark:text-[#EE4C2C]/90',
      tooltip: 'Deep learning research and computer vision projects'
    },
    {
      name: 'OpenCV',
      icon: SiOpencv,
      description: 'Computer vision and image processing',
      color: 'text-gray-900 dark:text-white',
      tooltip: 'Image processing and computer vision applications'
    }
  ]

  return (
    <section id="skills" className="relative w-screen py-16 sm:py-24 md:py-32 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 overflow-hidden">
      {/* Background color and gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 dark:from-purple-400/5 dark:to-blue-400/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] opacity-20" />

      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="relative w-[800px] h-[800px]">
          <Image
            src="/images/tech-circuit.svg"
            alt="Technology Pattern"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Technical Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            A comprehensive set of skills and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="flex justify-center gap-8 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id as typeof activeTab)}
              className={`group transition-all duration-300 flex flex-col items-center gap-2 ${activeTab === category.id
                ? `${category.activeColor} scale-110`
                : `text-gray-400 dark:text-gray-500 ${category.hoverColor}`
              }`}
            >
              <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                {category.icon}
              </div>
              <span className="text-sm font-medium tracking-wide">{category.label}</span>
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-3 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {(activeTab === 'webdev' ? webDevSkills : activeTab === 'aiml' ? aiMlSkills : otherSkills).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl shadow-black/5 dark:shadow-black/10 border border-gray-200/50 dark:border-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/20 hover:border-blue-500/20 dark:hover:border-blue-500/10">
                <div className="flex flex-col items-center text-center">
                  <skill.icon className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-max max-w-[200px] px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs sm:text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:-translate-y-0 pointer-events-none z-50 shadow-xl">
                {skill.tooltip}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl text-center max-w-4xl mx-auto mt-12 italic"
        >
          This blend of technologies allows me to build intelligent, full-stack AI-driven applications — from idea to deployment.
        </motion.p>
      </div>
    </section>
  )
}
