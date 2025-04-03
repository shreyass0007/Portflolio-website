"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageViewerProps {
  isOpen: boolean
  imageUrl: string
  title: string
  onClose: () => void
}

export function ImageViewer({ isOpen, imageUrl, title, onClose }: ImageViewerProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-7xl w-full aspect-[4/3] rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            quality={100}
            priority
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium text-lg">{title}</h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
