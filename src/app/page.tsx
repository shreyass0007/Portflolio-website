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
    <main className="relative w-full overflow-x-hidden">
      <Navbar />
      
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>
        
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <AboutSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
        
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <SkillsSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
        
        <MotionWrapper>
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <ProjectsSection />
            </ErrorBoundary>
          </Suspense>
        </MotionWrapper>
        
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
              <CertificationsSection />
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
