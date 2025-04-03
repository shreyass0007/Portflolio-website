"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  featured: boolean
  image: string
  categories: string[]
}

interface ProjectCardProps {
  project: Project
  featured?: boolean
  index?: number
}

const categories = ["All", "AI/ML", "Web Dev", "Tools", "UI/UX"]

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    github: "https://github.com/username/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true,
    image: "/projects/ecommerce.jpg",
    categories: ["Web Dev", "UI/UX"]
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI for intelligent responses, content moderation, and language translation.",
    tags: ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB"],
    github: "https://github.com/username/ai-chat",
    demo: "https://ai-chat-demo.com",
    featured: true,
    image: "/projects/ai-chat.jpg",
    categories: ["AI/ML", "Web Dev"]
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "https://github.com/username/portfolio",
    demo: "https://portfolio-demo.com",
    featured: false,
    image: "/projects/portfolio.jpg",
    categories: ["Web Dev", "UI/UX"]
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, file sharing, and team chat features.",
    tags: ["Vue.js", "Express", "MongoDB", "WebSocket", "AWS"],
    github: "https://github.com/username/task-app",
    demo: "https://task-app-demo.com",
    featured: false,
    image: "/projects/task-management.jpg",
    categories: ["Tools", "Web Dev"]
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather dashboard with interactive maps, forecast visualization, and location-based alerts.",
    tags: ["React", "D3.js", "Weather API", "Mapbox", "PWA"],
    github: "https://github.com/username/weather-dashboard",
    demo: "https://weather-dashboard-demo.com",
    featured: false,
    image: "/projects/weather-dashboard.jpg",
    categories: ["Tools", "UI/UX"]
  },
  {
    title: "Social Media Analytics",
    description: "Analytics platform for social media managers with sentiment analysis, trend tracking, and automated reporting.",
    tags: ["Python", "React", "TensorFlow", "FastAPI", "Redis"],
    github: "https://github.com/username/social-analytics",
    demo: "https://social-analytics-demo.com",
    featured: false,
    image: "/projects/social-analytics.jpg",
    categories: ["AI/ML", "Tools"]
  },
  {
    title: "Recipe Finder",
    description: "AI-powered recipe recommendation app that suggests recipes based on available ingredients and dietary preferences.",
    tags: ["React Native", "Node.js", "ML", "Firebase"],
    github: "https://github.com/username/recipe-finder",
    demo: "https://recipe-finder-demo.com",
    featured: false,
    image: "/projects/recipe-finder.jpg",
    categories: ["AI/ML", "UI/UX"]
  },
  {
    title: "Budget Tracker",
    description: "Personal finance management app with expense tracking, budget planning, and financial insights visualization.",
    tags: ["Vue.js", "Firebase", "Chart.js", "PWA"],
    github: "https://github.com/username/budget-tracker",
    demo: "https://budget-tracker-demo.com",
    featured: false,
    image: "/projects/budget-tracker.jpg",
    categories: ["Tools", "UI/UX"]
  }
]

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false, index = 0 }) => {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative h-full p-6 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800/50 rounded-xl transition-all duration-300 
        shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none
        group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:group-hover:shadow-xl dark:group-hover:shadow-blue-500/10 
        group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 
        group-hover:-translate-y-1 flex flex-col">
        {/* Project Image */}
        <div className="aspect-[16/9] relative mb-6 rounded-lg overflow-hidden border border-gray-200/80 dark:border-gray-800/50 group-hover:border-blue-500/50 transition-colors">
          {imageLoading && (
            <Skeleton className="absolute inset-0 z-10" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoadingComplete={() => setImageLoading(false)}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={index === 0}
          />
        </div>

        {/* Project Content */}
        <div className="flex-1 flex flex-col min-h-[280px]">
          {/* Title and Links */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 flex-1">
                {project.title}
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 min-h-[72px]">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-auto">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-transparent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 via-blue-50/30 to-transparent dark:from-blue-500/5 dark:via-blue-400/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
        <div className="absolute -inset-px bg-gradient-to-r from-blue-100/50 to-blue-50/50 dark:from-blue-500/10 dark:to-blue-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
      </div>
    </motion.div>
  )
}

export const ProjectsSection = () => {
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const filteredProjects = projects.filter(project => 
    activeCategory === "All" || project.categories.includes(activeCategory)
  )

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="py-16 sm:py-20 relative overflow-hidden" id="projects">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white to-white/50 dark:from-background/50 dark:via-background dark:to-background/50" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="space-y-4 mb-8">
            <Skeleton className="h-12 w-[200px]" />
            <Skeleton className="h-6 w-[300px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-xl dark:shadow-black/10 border border-gray-200/50 dark:border-white/5 overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50 dark:from-background dark:to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 dark:from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/40 dark:from-blue-400/10 via-transparent to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            A selection of my recent work in AI, web development, and more
          </p>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Scroll buttons */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollPrev ? 1 : 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/10 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollNext ? 1 : 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-white/10 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:scale-110"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1
                  }}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-22px)] min-w-0"
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* End note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl text-center max-w-3xl mx-auto mt-12 italic"
        >
          Smaller experiments, UI demos, and collaborative builds that helped me grow as a developer.
        </motion.p>
      </div>
    </section>
  )
}
