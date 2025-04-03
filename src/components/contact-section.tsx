"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import emailjs from '@emailjs/browser'

// Using environment variables for EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_4hpzerw'
const EMAILJS_TEMPLATE_ID = 'template_or0lh1m'
const EMAILJS_PUBLIC_KEY = 'd5zhSoY1kkMlFbHx6'

export function ContactSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const validateForm = (data: { name: string; email: string; subject: string; message: string }) => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    if (!data.name?.trim()) {
      newErrors.name = 'Name is required'
    } else if (data.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!data.subject?.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (data.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    if (!data.message?.trim()) {
      newErrors.message = 'Message is required'
    } else if (data.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(error => !error)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (isSubmitting) {
      console.log('Form is already submitting')
      return
    }

    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      const data = {
        name: formData.get("from_name") as string,
        email: formData.get("from_email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      }

      console.log('Submitting form with data:', data)

      if (!validateForm(data)) {
        console.log('Form validation failed:', errors)
        setIsSubmitting(false)
        return
      }

      console.log('Form validation passed, sending email...')

      const emailResult = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', emailResult)

      if (emailResult.status === 200) {
        setShowSuccess(true)
        form.reset()
        setErrors({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
          variant: "default",
        })

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } else {
        throw new Error(`Failed to send email: ${emailResult.text}`)
      }
    } catch (error: any) {
      console.error('Failed to send email:', error)
      
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/shreyas-078",
      color: "text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/shreyas-078",
      color: "text-[#0A66C2] dark:text-[#0A66C2]/90 hover:text-[#0A66C2]/80 dark:hover:text-[#0A66C2]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/shreyas078",
      color: "text-[#1DA1F2] dark:text-[#1DA1F2]/90 hover:text-[#1DA1F2]/80 dark:hover:text-[#1DA1F2]",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:shreyas.078btcse21@gmail.com",
      color: "text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary",
    },
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'shreyas.078btcse21@gmail.com',
      href: 'mailto:shreyas.078btcse21@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 1234567890',
      href: 'tel:+911234567890'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Pune, India',
      href: 'https://maps.google.com'
    }
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32">
      <div className="container max-w-7xl px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question, project, or collaboration in mind? Let's talk!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="from_name"
                  placeholder="Your name"
                  required
                  minLength={2}
                  className={cn(
                    "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-gray-200 dark:border-gray-800",
                    errors.name && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  name="from_email"
                  placeholder="Your email"
                  required
                  className={cn(
                    "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-gray-200 dark:border-gray-800",
                    errors.email && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  minLength={3}
                  className={cn(
                    "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-gray-200 dark:border-gray-800",
                    errors.subject && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Your message"
                  required
                  minLength={10}
                  className={cn(
                    "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-gray-200 dark:border-gray-800 min-h-[120px]",
                    errors.message && "border-red-500 dark:border-red-500"
                  )}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium py-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent! I'll get back to you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Side: Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative order-first lg:order-last"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent rounded-2xl" />
            
            {/* Content container */}
            <div className="relative space-y-8 p-6 sm:p-8 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-white/5 bg-white/50 dark:bg-gray-900/50">
              {/* Contact info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.title}
                        </div>
                        <div className="text-gray-900 dark:text-gray-100 font-medium">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Connect with Me
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 rounded-lg bg-white/80 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 backdrop-blur-sm border border-gray-200/50 dark:border-white/5 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 w-[200px] h-[200px] top-1/2 right-0 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute -z-10 w-[150px] h-[150px] bottom-0 left-1/2 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
