"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useKeyPressEvent } from "react-use"
import { ImageViewer } from "./image-viewer"

interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  image: string
  skills: string[]
  credentialUrl?: string
}

const certifications: Certification[] = [
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "28/03/2025",
    description: "Comprehensive specialization covering supervised learning, neural networks, and deep learning applications.",
    image: "/certifications/ML stanford.jpg",
    skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
    credentialUrl: "https://coursera.org/share/2c920dc93eed9ab7eeb1694e1c649fbf"
  },
  {
    title: "Fundamental of Deep LEarning",
    issuer: "NVIDIA",
    date: "30/01/2025",
    description: "Completed the Fundamentals of Deep Learning course by NVIDIA, where I gained a strong foundation in deep learning concepts and applications. The course covered core topics such as neural networks, forward and backward propagation, optimization techniques, and how to train and deploy deep learning models. I also worked on practical exercises using GPUs for model training and inference.",
    image: "/certifications/NVDIA DL.jpg",
    skills: ["Neural Networks", "Convolutional Neural Networks"],
    credentialUrl: "https://your-credential-url.com/cert1"
  },
  {
    title: "Certification Title 2",
    issuer: "Organization Name",
    date: "2024",
    description: "Brief description of what you learned and achieved in this certification.",
    image: "/certifications/cert2.jpg",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    credentialUrl: "https://your-credential-url.com/cert2"
  },
  {
    title: "Certification Title 3",
    issuer: "Organization Name",
    date: "2024",
    description: "Brief description of what you learned and achieved in this certification.",
    image: "/certifications/cert3.jpg",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    credentialUrl: "https://your-credential-url.com/cert3"
  },
  {
    title: "Certification Title 4",
    issuer: "Organization Name",
    date: "2024",
    description: "Brief description of what you learned and achieved in this certification.",
    image: "/certifications/cert4.jpg",
    skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    credentialUrl: "https://your-credential-url.com/cert4"
  }
]

export function CertificationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    const newIndex = direction === "left"
      ? (currentIndex === 0 ? certifications.length - 1 : currentIndex - 1)
      : (currentIndex === certifications.length - 1 ? 0 : currentIndex + 1);
    
    setCurrentIndex(newIndex);
    const cards = containerRef.current?.children;
    if (cards && cards[newIndex]) {
      cards[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  useKeyPressEvent("ArrowLeft", () => handleScroll("left"));
  useKeyPressEvent("ArrowRight", () => handleScroll("right"));

  return (
    <section id="certifications" className="relative w-screen py-16 sm:py-24 md:py-32 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 overflow-hidden">
      {/* Background color and gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] opacity-20" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16">Certifications</h2>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-2 sm:px-4 pb-4"
            style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer w-[280px] sm:w-[300px] md:w-[350px] flex-shrink-0 snap-start"
              >
                <div className="relative h-full p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/50 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 group-hover:-translate-y-1">
                  <div className="aspect-[4/3] relative mb-6 rounded-lg overflow-hidden border border-gray-200/80 dark:border-gray-700/50 group-hover:border-blue-500/50 transition-colors">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white line-clamp-1">{cert.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">{cert.issuer}</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-400/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-3 py-1 text-sm bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-sm pt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-4 md:px-6 z-20">
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black border-0 shadow-lg -translate-x-10"
              onClick={(e) => {
                e.stopPropagation();
                handleScroll("left");
              }}
              aria-label="Previous certificate"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black border-0 shadow-lg translate-x-10"
              onClick={(e) => {
                e.stopPropagation();
                handleScroll("right");
              }}
              aria-label="Next certificate"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  const cards = containerRef.current?.children;
                  if (cards && cards[index]) {
                    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400/50 dark:hover:bg-blue-400/50"
                )}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[90vw] md:max-w-5xl h-[90vh] bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6 max-w-5xl mx-auto">
                <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{selectedCert.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{selectedCert.issuer}</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedCert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <p className="text-gray-500 dark:text-gray-400">{selectedCert.date}</p>
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors w-full md:w-auto mt-4"
                    >
                      View Credential
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageViewer
        isOpen={!!selectedImage}
        imageUrl={selectedImage?.url || ""}
        title={selectedImage?.title || ""}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  )
}
