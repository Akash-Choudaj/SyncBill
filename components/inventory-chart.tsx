"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Process inventory data for the chart
const processInventoryData = (inventory = []) => {
  if (!inventory.length) return []

  // Group inventory by category
  const categoryMap = {}

  inventory.forEach((item) => {
    const category = item.category || "Other"

    if (!categoryMap[category]) {
      categoryMap[category] = {
        stock: 0,
        capacity: 0,
      }
    }

    // Add current stock
    const quantity =
      typeof item.quantity === "number"
        ? item.quantity
        : typeof item.quantity === "string"
          ? Number.parseInt(item.quantity, 10)
          : 0

    categoryMap[category].stock += quantity

    // Calculate capacity (either from maxQuantity or estimate as 1.5x current stock)
    const maxQuantity = item.maxQuantity || quantity * 1.5
    categoryMap[category].capacity += maxQuantity
  })

  // Convert to array format for chart
  return Object.keys(categoryMap).map((category) => ({
    category,
    stock: categoryMap[category].stock,
    capacity: categoryMap[category].capacity,
  }))
}

// Sample data for the inventory chart
const sampleData = [
  { category: "Electronics", stock: 450, capacity: 600 },
  { category: "Clothing", stock: 300, capacity: 400 },
  { category: "Food", stock: 200, capacity: 250 },
  { category: "Home", stock: 280, capacity: 350 },
  { category: "Beauty", stock: 150, capacity: 200 },
  { category: "Sports", stock: 180, capacity: 250 },
]

export function InventoryChart({ inventory = [] }) {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState(sampleData)
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    setMounted(true)

    // Process real inventory data if available
    if (inventory.length > 0) {
      const processedData = processInventoryData(inventory)
      if (processedData.length > 0) {
        setData(processedData)
      }
    }
  }, [inventory])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  if (!mounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <motion.div
          className="h-8 w-8 rounded-full border-4 border-zinc-700 border-t-orange-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <motion.div
      ref={chartRef}
      className="h-[300px]"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="category" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              color: "#e4e4e7",
            }}
            cursor={{ fill: "rgba(39, 39, 42, 0.4)" }}
          />
          <Legend />
          <Bar
            name="Current Stock"
            dataKey="stock"
            fill="url(#stockGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Bar
            name="Total Capacity"
            dataKey="capacity"
            fill="url(#capacityGradient)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
