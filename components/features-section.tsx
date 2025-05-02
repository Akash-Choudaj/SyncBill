"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3, ShoppingBag, CreditCard, Users, TrendingUp, Smartphone, Cloud, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: BarChart3,
    title: "Comprehensive Dashboard",
    description: "Get a bird's eye view of your business with real-time analytics and insights.",
  },
  {
    icon: ShoppingBag,
    title: "Inventory Management",
    description: "Track stock levels, set reorder points, and manage multiple locations with ease.",
  },
  {
    icon: CreditCard,
    title: "Billing & Invoicing",
    description: "Create professional invoices, accept payments, and manage your finances in one place.",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build stronger relationships with customer profiles, purchase history, and loyalty programs.",
  },
  {
    icon: TrendingUp,
    title: "Reports & Analytics",
    description: "Make data-driven decisions with customizable reports and powerful analytics tools.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Manage your business on the go with our mobile-friendly interface and dedicated app.",
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access your data from anywhere, anytime with secure cloud storage and automatic backups.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Rest easy knowing your data is protected with enterprise-grade security measures.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-zinc-900" ref={ref} id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Business</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            SyncBill comes packed with all the tools you need to streamline your operations, increase efficiency, and
            grow your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=600&h=500&auto=format&fit=crop"
              alt="SyncBill Inventory Management"
              width={600}
              height={500}
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-zinc-800 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors"
              >
                <div className="bg-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 md:order-1"
          >
            {features.slice(4, 8).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-zinc-800 p-6 rounded-lg hover:bg-zinc-800/80 transition-colors"
              >
                <div className="bg-orange-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-xl order-1 md:order-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&h=500&auto=format&fit=crop"
              alt="SyncBill Billing & Invoicing"
              width={600}
              height={500}
              className="w-full h-auto rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8"
            asChild
          >
            <Link href="/signup">Explore All Features</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
