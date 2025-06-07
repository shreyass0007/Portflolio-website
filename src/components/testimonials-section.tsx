"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from 'embla-carousel-react'

const testimonials = [
  {
    content: "Shresh is an exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are impressive.",
    author: "John Doe",
    position: "Tech Lead at InnovateX",
    image: "/images/T2.jpg",
    rating: 5
  },
  {
    content: "Working with Shresh was a great experience. They have a deep understanding of modern web technologies and always find elegant solutions.",
    author: "Michael Chen",
    position: "CTO at WebFlow Solutions",
    image: "/images/client.jpg",
    rating: 5
  },
  {
    content: "Shresh's ability to translate complex requirements into beautiful, functional interfaces is remarkable. A true professional!",
    author: "Emily Rodriguez",
    position: "Product Manager at TechCorp",
    image: "/placeholder-user.jpg",
    rating: 5
  }
]

export function TestimonialsSection() {
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

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
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-16 sm:py-20" id="testimonials">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block p-2 mb-4 rounded-lg bg-blue-100 dark:bg-blue-500/10 backdrop-blur-sm"
              >
                <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </motion.span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Client Testimonials
            </h2>
            <p className="text-gray-600 dark:text-gray-400 md:text-lg max-w-[600px] mx-auto">
              Here's what people are saying about working with me
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Mobile Scroll Buttons */}
          <div className="md:hidden">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollPrev ? 1 : 0 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 active:scale-95 touch-manipulation shadow-sm"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollNext ? 1 : 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 p-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 active:scale-95 touch-manipulation shadow-sm"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>

          {/* Mobile Carousel / Desktop Grid */}
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <div className="overflow-hidden md:contents" ref={emblaRef}>
              <div className="flex md:contents gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group flex-[0_0_100%] min-w-0 md:w-full min-h-[280px] md:min-h-[320px]"
                  >
                    <div className="relative h-full p-4 md:p-6 bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800/50 rounded-xl transition-all duration-300 
                      shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none
                      group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:group-hover:shadow-xl dark:group-hover:shadow-blue-500/10 
                      group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 
                      group-hover:-translate-y-1">
                      {/* Quote Icon */}
                      <div className="absolute -top-4 -left-2">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-lg shadow-blue-500/20">
                          <Quote className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="text-center space-y-4 mb-12">
                        <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed text-sm md:text-base line-clamp-4 min-h-[84px] md:min-h-[96px]">
                          "{testimonial.content}"
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200/80 dark:border-gray-800/50 group-hover:border-blue-500/50 transition-colors duration-300 shadow-lg flex-shrink-0">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.author}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                              {testimonial.author}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots indicator for mobile */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full'
                    : 'w-2 h-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-500/50 rounded-full'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
