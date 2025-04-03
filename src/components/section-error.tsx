"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface SectionErrorProps {
  error: Error
  reset: () => void
  section: string
}

export function SectionError({ error, reset, section }: SectionErrorProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Failed to Load {section}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message || "An unexpected error occurred while loading this section"}
          </p>
          <Button 
            onClick={reset}
            variant="outline"
            className="border-gray-200 dark:border-gray-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
