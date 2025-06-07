"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isOpen, setIsOpen] = useState(false)
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <motion.header
      role="banner"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b",
        "transition-colors duration-200 shadow-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      onKeyDown={handleKeyDown}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold" aria-label="Shrey - Back to home">
            Shrey
          </Link>
          
          {/* Skip to main content link - visible only on keyboard focus */}
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background px-4 py-2 rounded-md"
          >
            Skip to main content
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Desktop navigation">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                  side="left" 
                  className="w-[300px] sm:w-[400px]"
                  role="dialog"
                  aria-label="Mobile navigation menu"
                >
                <nav 
                  id="mobile-menu"
                  className="flex flex-col space-y-4 mt-8"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="#projects"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    href="#testimonials"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#skills"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Skills
                  </Link>
                  <Link
                    href="#contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
