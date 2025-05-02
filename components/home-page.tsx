"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { ParticlesBackground } from "@/components/particles-background"

export function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.8])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading animation */}
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onAnimationComplete={() => setIsLoaded(true)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 1],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 1,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              SyncBill
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-500"
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{
                opacity: [0.3, 0, 0],
                scale: [1, 2, 3],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative">
        <ParticlesBackground />
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <CtaSection />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
