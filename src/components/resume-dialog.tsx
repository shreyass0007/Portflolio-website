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
          className="bg-background hover:bg-background/90"
        >
          <span className="flex items-center">
            View Resume
            <Eye className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogHeader className="px-6 py-3 border-b">
          <DialogTitle>Resume</DialogTitle>
        </DialogHeader>
        <div className="relative flex-1 h-full">
          <iframe
            src="/resume.pdf"
            className="w-full h-[calc(80vh-4rem)]"
            onLoad={() => setIsLoading(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-background/0">
            <div className="flex justify-end gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Open in New Tab
                  <Eye className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="default" size="sm" asChild>
                <a href="/resume.pdf" download>
                  Download
                  <FileDown className="ml-2 h-4 w-4" />
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
