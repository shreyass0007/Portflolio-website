"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileDown, Eye } from "lucide-react"

export function ResumeDialog() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="lg" 
          className="group relative px-8 py-4 text-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 overflow-hidden hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative z-10 flex items-center gap-2">
            View Resume
            <Eye className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="px-6 py-3 border-b">
          <DialogTitle>Resume</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 h-full">
          <iframe
            src="/resume.pdf"
            className="w-full h-[calc(90vh-4rem)]"
            onLoad={() => setIsLoading(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-background/0">
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open in New Tab
                  <Eye className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                asChild
              >
                <a href="/resume.pdf" download>
                  Download
                  <FileDown className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
