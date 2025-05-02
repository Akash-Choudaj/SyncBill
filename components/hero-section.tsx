"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="pt-32 pb-20 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-orange-500 text-xl md:text-2xl font-medium mb-4">
            Introducing SyncBill: The modern inventory & billing solution
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-5xl mx-auto">
            Beyond sales. Beyond walls.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              In one hour or less.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto">
            Running a business is easier with SyncBill. We help you sell better, manage your entire business, and join
            the digital revolution in one hour or less. Welcome to the Modern Inventory & Billing System.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-8 py-6 rounded-full"
            asChild
          >
            <Link href="/signup">GET STARTED FOR FREE</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=600&auto=format&fit=crop"
            alt="SyncBill Dashboard"
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>
    </section>
  )
}
