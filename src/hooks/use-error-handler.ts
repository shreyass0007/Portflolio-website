"use client"

import { useState, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ErrorState {
  hasError: boolean
  error: Error | null
}

interface UseErrorHandlerReturn extends ErrorState {
  handleError: (error: unknown) => void
  clearError: () => void
  withErrorHandling: <T extends (...args: any[]) => Promise<any>>(fn: T) => (...args: Parameters<T>) => Promise<ReturnType<T>>
}

/**
 * Custom hook for consistent error handling throughout the application
 * 
 * @param options.showToast Whether to show a toast notification when an error occurs
 * @param options.logError Whether to log the error to the console
 * @returns Object with error state and handling functions
 */
export function useErrorHandler({
  showToast = true,
  logError = true
}: {
  showToast?: boolean
  logError?: boolean
} = {}): UseErrorHandlerReturn {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null
  })
  const { toast } = useToast()

  const handleError = useCallback((error: unknown) => {
    // Ensure we have a proper Error object
    const normalizedError = error instanceof Error 
      ? error 
      : new Error(typeof error === 'string' ? error : 'An unknown error occurred')
    
    // Set the error state
    setErrorState({
      hasError: true,
      error: normalizedError
    })

    // Optionally log to console
    if (logError) {
      console.error('Error caught by useErrorHandler:', normalizedError)
    }

    // Optionally show toast notification
    if (showToast) {
      toast({
        title: 'Error',
        description: normalizedError.message || 'An unexpected error occurred',
        variant: 'destructive'
      })
    }

    return normalizedError
  }, [logError, showToast, toast])

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null
    })
  }, [])

  /**
   * Higher-order function that wraps async functions with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(fn: T) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        return await fn(...args)
      } catch (error) {
        handleError(error)
        throw error // Re-throw so calling code can handle if needed
      }
    }
  }, [handleError])

  return {
    ...errorState,
    handleError,
    clearError,
    withErrorHandling
  }
}
