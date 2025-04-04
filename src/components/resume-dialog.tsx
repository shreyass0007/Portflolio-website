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
import { FileDown, Eye, ExternalLink } from "lucide-react"
import { PDFViewer } from "@/components/pdf-viewer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

export function ResumeDialog() {
  const [isLoading, setIsLoading] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

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
      <DialogContent className={cn(
        "p-0",
        isDesktop ? "max-w-[90vw] h-[95vh] w-[90vw]" : "w-[95vw] max-w-[400px]"
      )}>
        <DialogHeader className="px-4 sm:px-6 py-3 border-b">
          <DialogTitle>Resume</DialogTitle>
        </DialogHeader>
        {isDesktop ? (
          // Desktop view with embedded PDF
          <div className="relative flex-1 h-full">
            <div className="w-full h-[calc(90vh-4rem)]">
              <PDFViewer url="/resume.pdf" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-background/0">
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  size="default"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Open in New Tab
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                </Button>
                <Button 
                  variant="default" 
                  size="default"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  asChild
                >
                  <a href="/resume.pdf" download className="flex items-center justify-center">
                    Download
                    <FileDown className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Mobile view with action buttons
          <div className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Choose how you'd like to view the resume:
              </p>
              <div className="grid gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  asChild
                >
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <Eye className="mr-2 h-5 w-5" />
                    View in Browser
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full border-2"
                  asChild
                >
                  <a href="/resume.pdf" download className="flex items-center justify-center">
                    <FileDown className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
