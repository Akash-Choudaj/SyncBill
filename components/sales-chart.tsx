"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Process invoice data to generate chart data
const processInvoiceData = (invoices = [], inventory = []) => {
  // Create a map of inventory items by ID for quick lookup
  const inventoryMap = inventory.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})

  // Default data structure with months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const defaultData = months.map((month) => ({
    month,
    electronics: 0,
    clothing: 0,
    food: 0,
    home: 0,
    other: 0,
  }))

  // If no invoices, return default data
  if (!invoices.length) return defaultData

  // Process invoices to aggregate sales by category and month
  const salesByMonth = {}

  // Initialize the sales data structure
  months.forEach((month) => {
    salesByMonth[month] = {
      electronics: 0,
      clothing: 0,
      food: 0,
      home: 0,
      other: 0,
    }
  })

  // Process each invoice
  invoices.forEach((invoice) => {
    if (!invoice.items || !invoice.date) return

    // Get month from invoice date
    const date = new Date(invoice.date)
    const month = months[date.getMonth()]

    // Process each item in the invoice
    invoice.items.forEach((item) => {
      // Try to find the category from inventory
      const inventoryItem = inventoryMap[item.inventory_id] || {}
      const category = (inventoryItem.category || "other").toLowerCase()

      // Map category to one of our chart categories
      let chartCategory = "other"
      if (category.includes("electronic")) chartCategory = "electronics"
      else if (category.includes("cloth")) chartCategory = "clothing"
      else if (category.includes("food")) chartCategory = "food"
      else if (category.includes("home") || category.includes("furniture")) chartCategory = "home"

      // Add the item amount to the appropriate category
      const amount = Number.parseFloat(item.amount || 0)
      if (!isNaN(amount)) {
        salesByMonth[month][chartCategory] += amount
      }
    })
  })

  // Convert the aggregated data to the format expected by the chart
  return months.map((month) => ({
    month,
    ...salesByMonth[month],
  }))
}

// If no data is available, use sample data
const sampleData = [
  { month: "Jan", electronics: 40000, clothing: 24000, food: 18000, home: 12000 },
  { month: "Feb", electronics: 45000, clothing: 28000, food: 19000, home: 13000 },
  { month: "Mar", electronics: 60000, clothing: 32000, food: 21000, home: 15000 },
  { month: "Apr", electronics: 55000, clothing: 30000, food: 20000, home: 14000 },
  { month: "May", electronics: 70000, clothing: 35000, food: 22000, home: 16000 },
  { month: "Jun", electronics: 85000, clothing: 40000, food: 24000, home: 18000 },
  { month: "Jul", electronics: 90000, clothing: 42000, food: 25000, home: 19000 },
  { month: "Aug", electronics: 80000, clothing: 38000, food: 23000, home: 17000 },
  { month: "Sep", electronics: 82000, clothing: 39000, food: 23500, home: 17500 },
  { month: "Oct", electronics: 95000, clothing: 43000, food: 26000, home: 20000 },
  { month: "Nov", electronics: 100000, clothing: 45000, food: 27000, home: 21000 },
  { month: "Dec", electronics: 120000, clothing: 50000, food: 30000, home: 24000 },
]

export function SalesChart({ invoices = [], inventory = [] }) {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState(sampleData)
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    setMounted(true)

    // Process real data if available
    if (invoices.length > 0) {
      const processedData = processInvoiceData(invoices, inventory)

      // Check if we have any real sales data
      const hasRealData = processedData.some(
        (month) => month.electronics > 0 || month.clothing > 0 || month.food > 0 || month.home > 0 || month.other > 0,
      )

      // Use processed data if it has values, otherwise keep sample data
      if (hasRealData) {
        setData(processedData)
      }
    }
  }, [invoices, inventory])

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
          transition: { duration: 0.5 },
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="electronicsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="clothingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="foodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="homeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
          <XAxis dataKey="month" stroke="#a1a1aa" />
          <YAxis stroke="#a1a1aa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              color: "#e4e4e7",
            }}
            cursor={{ stroke: "#f97316", strokeWidth: 1, strokeDasharray: "5 5" }}
            formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="electronics"
            name="Electronics"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#f97316", stroke: "#1e1b4b", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="clothing"
            name="Clothing"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#22c55e", stroke: "#1e1b4b", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="food"
            name="Food & Beverage"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#1e1b4b", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="home"
            name="Home & Kitchen"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#a855f7", stroke: "#1e1b4b", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
