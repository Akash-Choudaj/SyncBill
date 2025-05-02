"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/stat-card"
import { RecentSales } from "@/components/recent-sales"
import { SalesChart } from "@/components/sales-chart"
import { InventoryChart } from "@/components/inventory-chart"
import { LowStockAlerts } from "@/components/low-stock-alerts"
import { useToast } from "@/components/ui/use-toast"

export function DashboardOverview() {
  const { toast } = useToast()
  const [inventory, setInventory] = useState([])
  const [invoices, setInvoices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    activeInventory: 0,
    lowStockItems: 0,
  })

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Add timestamp to prevent caching
        const timestamp = new Date().getTime()

        // Use Promise.allSettled to handle potential failures gracefully
        const results = await Promise.allSettled([
          fetch(`/api/inventory?t=${timestamp}`),
          fetch(`/api/invoices?t=${timestamp}`),
        ])

        // Process inventory data
        if (results[0].status === "fulfilled") {
          const response = results[0].value

          if (response.ok) {
            const inventoryData = await response.json()
            setInventory(inventoryData.items || [])
          } else {
            if (response.status === 401) {
              // Handle unauthorized - might want to redirect to login
              console.warn("User not authenticated for inventory data")
            } else {
              console.error("Failed to fetch inventory data:", await response.text())
            }
            setInventory([])
          }
        } else {
          console.error("Failed to fetch inventory data:", results[0].reason)
          setInventory([])
        }

        // Process invoices data
        if (results[1].status === "fulfilled") {
          const response = results[1].value

          if (response.ok) {
            const invoicesData = await response.json()
            setInvoices(invoicesData.invoices || [])
          } else {
            if (response.status === 401) {
              // Handle unauthorized - might want to redirect to login
              console.warn("User not authenticated for invoices data")
            } else {
              console.error("Failed to fetch invoices data:", await response.text())
            }
            setInvoices([])
          }
        } else {
          console.error("Failed to fetch invoices data:", results[1].reason)
          setInvoices([])
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Failed to load dashboard data. Please try again later.")
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Calculate dashboard statistics
  useEffect(() => {
    // Calculate total revenue
    const revenue = invoices.reduce((sum, invoice) => {
      // Ensure we have a valid number before adding
      const total =
        typeof invoice.total === "number"
          ? invoice.total
          : typeof invoice.total === "string"
            ? Number.parseFloat(invoice.total)
            : 0
      return sum + total
    }, 0)

    // Set stats
    setStats({
      totalRevenue: revenue,
      totalSales: invoices.length,
      activeInventory: inventory.length,
      lowStockItems: inventory.filter((item) => item.quantity < (item.lowStockThreshold || 10)).length,
    })
  }, [inventory, invoices])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-400">Welcome back, here's what's happening with your business today.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toFixed(2)}`}
          description="+20.1% from last month"
          icon={DollarSign}
          delay={0.2}
        />
        <StatCard
          title="Sales"
          value={stats.totalSales.toString()}
          description="+12.3% from last month"
          icon={ShoppingCart}
          delay={0.3}
        />
        <StatCard
          title="Active Inventory"
          value={stats.activeInventory.toString()}
          description={`${stats.lowStockItems} items low stock`}
          icon={Package}
          delay={0.4}
        />
        <StatCard title="Active Customers" value="573" description="+201 since last month" icon={Users} delay={0.5} />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-zinc-800 text-zinc-400">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white">
            Invoices
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <motion.div
              className="col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-zinc-100">Sales Overview</CardTitle>
                    <CardDescription className="text-zinc-400">Monthly revenue by product category</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <SalesChart invoices={invoices} inventory={inventory} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Recent Sales</CardTitle>
                  <CardDescription className="text-zinc-400">Latest customer transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales invoices={invoices} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <motion.div
              className="col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-zinc-100">Inventory Status</CardTitle>
                    <CardDescription className="text-zinc-400">Stock levels by category</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <InventoryChart inventory={inventory} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Low Stock Alerts</CardTitle>
                  <CardDescription className="text-zinc-400">Items that need reordering</CardDescription>
                </CardHeader>
                <CardContent>
                  <LowStockAlerts inventory={inventory} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
