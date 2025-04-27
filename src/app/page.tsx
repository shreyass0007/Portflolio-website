"use client"

import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Navbar } from "@/components/navbar"
import { CertificationsSection } from "@/components/certifications-section"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorBoundary } from "@/components/error-boundary"
import { MotionWrapper } from "@/components/motion-wrapper"
import { Footer } from "@/components/footer"
import { useResponsive } from "@/hooks/use-responsive"

// Loading components
const SectionLoader = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <Skeleton className="w-full h-[400px]" />
  </div>
)

export default function Home() {
  const { isMobile } = useResponsive()

  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      <Navbar />
      
      {/* Full-width sections */}
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      {/* Contained sections */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-24">
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <AboutSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
      </div>

      {/* Full-width technical sections */}
      <ErrorBoundary>
        <SkillsSection />
      </ErrorBoundary>

      {/* Contained sections */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-24">
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <ProjectsSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
      </div>

      <ErrorBoundary>
        <CertificationsSection />
      </ErrorBoundary>

      {/* Final contained sections */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-24">
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <TestimonialsSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
        
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <ContactSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
      </div>
      
      <Footer />
    </main>
  )
}
