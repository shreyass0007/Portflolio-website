import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ScrollProgress } from "@/components/scroll-progress"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shresh's Portfolio",
  description: "AI/ML developer portfolio showcasing my projects and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth light">
      <body className={`${inter.className} antialiased`}>
        <ScrollProgress />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
