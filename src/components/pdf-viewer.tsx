"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface PDFViewerProps {
  url: string
}

export function PDFViewer({ url }: PDFViewerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check if the browser supports PDF viewing
  const isPDFSupported = () => {
    const nav = window.navigator as any
    return nav.mimeTypes && nav.mimeTypes["application/pdf"]
  }

  if (!isPDFSupported()) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          PDF viewing is not supported in your browser.
        </p>
        <Button asChild>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Open in New Tab
            <Eye className="w-4 h-4" />
          </a>
        </Button>
      </div>
    )
  }

  return (
    <embed
      src={url}
      type="application/pdf"
      className="w-full h-full"
      style={{ minHeight: "500px" }}
    />
  )
}
