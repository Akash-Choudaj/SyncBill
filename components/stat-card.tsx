"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  delay?: number
}

export function StatCard({ title, value, description, icon: Icon, delay = 0 }: StatCardProps) {
  // For animated counter
  const [isInView, setIsInView] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  // Extract numeric value for animation
  const numericValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 1.5,
        delay: delay + 0.3,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [count, numericValue, delay, isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
        transition: { duration: 0.2 },
      }}
      onViewportEnter={() => setIsInView(true)}
    >
      <Card className="border-zinc-800 bg-zinc-900 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">{title}</p>
              <p className="text-2xl font-bold text-white mt-1">
                {value.startsWith("$") ? "$" : ""}
                <motion.span>{rounded}</motion.span>
                {value.includes(".") ? value.substring(value.indexOf(".")) : ""}
              </p>
              <p className="text-xs text-zinc-400 mt-1">{description}</p>
            </div>
            <motion.div
              className="rounded-full p-2 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20"
              whileHover={{
                scale: 1.1,
                background: "linear-gradient(to bottom right, rgba(124, 58, 237, 0.3), rgba(192, 38, 211, 0.3))",
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-5 w-5 text-violet-400" />
            </motion.div>
          </div>
          <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
