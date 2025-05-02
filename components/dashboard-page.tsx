"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion"
import {
  BarChart3,
  Box,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Search,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryTable } from "@/components/inventory-table"
import { InvoicesList } from "@/components/invoices-list"
import { RecentSales } from "@/components/recent-sales"
import { StatCard } from "@/components/stat-card"
import { UserNav } from "@/components/user-nav"
import { SalesChart } from "@/components/sales-chart"
import { InventoryChart } from "@/components/inventory-chart"
import { NotificationsPopover } from "@/components/notifications-popover"
import { useMobile } from "@/hooks/use-mobile"

export function DashboardPage() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [loading, setLoading] = useState(true)

  // Simulate loading for the intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Add scroll animation
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const scale = useTransform(scrollY, [0, 100], [1, 0.98])

  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.5, 1],
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Box className="h-16 w-16 text-violet-500" />
              <motion.div
                className="absolute inset-0 rounded-full bg-violet-500"
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
            <motion.h1
              className="absolute mt-24 text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              NexusERP
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Parallax Effect */}
      <motion.div
        className="flex min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: loading ? 2 : 0 }}
        style={{ opacity, scale }}
      >
        {/* Rest of the component remains the same */}
        {/* Sidebar */}
        <motion.div
          className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 ${isMobile ? "left-0" : ""}`}
          initial={isMobile ? { x: "-100%" } : { x: 0 }}
          animate={sidebarOpen ? { x: 0 } : { x: "-100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          {/* Sidebar content remains the same */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
            <motion.div
              className="flex items-center gap-2 text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box className="h-6 w-6 text-violet-500" />
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                NexusERP
              </span>
            </motion.div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {[
                { name: "Dashboard", icon: BarChart3, active: true },
                { name: "Inventory", icon: Package },
                { name: "Billing", icon: CreditCard },
                { name: "Customers", icon: Users },
                { name: "Sales", icon: ShoppingCart },
                { name: "Reports", icon: BarChart3 },
                { name: "Settings", icon: DollarSign },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      item.active
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                    asChild
                  >
                    <Link href="#">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                      {item.active && (
                        <motion.div
                          className="ml-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-zinc-800">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Users className="h-5 w-5" />
                <span>Invite Team</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className={`flex-1 ${sidebarOpen && !isMobile ? "ml-64" : ""}`}>
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm px-4 sm:px-6">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-1 flex items-center gap-4">
              <form className="hidden md:flex-1 md:flex max-w-sm">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-zinc-800 border-zinc-700 pl-8 text-zinc-400 focus-visible:ring-violet-500"
                  />
                </div>
              </form>
              <div className="ml-auto flex items-center gap-2">
                <NotificationsPopover />
                <UserNav />
              </div>
            </div>
          </header>
          <main className="grid gap-6 p-4 sm:p-6 md:gap-8">
            {/* Rest of the main content remains the same */}
            <div className="flex flex-col gap-4 md:gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-zinc-400">Welcome back, here's what's happening with your business today.</p>
              </motion.div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Revenue"
                  value="$45,231.89"
                  description="+20.1% from last month"
                  icon={DollarSign}
                  delay={0.2}
                />
                <StatCard
                  title="Sales"
                  value="2,345"
                  description="+12.3% from last month"
                  icon={ShoppingCart}
                  delay={0.3}
                />
                <StatCard
                  title="Active Inventory"
                  value="12,345"
                  description="86 items low stock"
                  icon={Package}
                  delay={0.4}
                />
                <StatCard
                  title="Active Customers"
                  value="573"
                  description="+201 since last month"
                  icon={Users}
                  delay={0.5}
                />
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-zinc-800 text-zinc-400">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
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
                          <CardDescription className="text-zinc-400">
                            Monthly revenue and transaction volume
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <SalesChart />
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
                        <RecentSales />
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
                        <InventoryChart />
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
                        <div className="space-y-4">
                          {[
                            { name: "Wireless Earbuds", stock: 3, threshold: 10, category: "Electronics" },
                            { name: "Organic Coffee Beans", stock: 5, threshold: 15, category: "Food & Beverage" },
                            { name: "Yoga Mats", stock: 2, threshold: 8, category: "Fitness" },
                            { name: "Desk Lamps", stock: 4, threshold: 12, category: "Home Office" },
                          ].map((item, i) => (
                            <motion.div
                              key={item.name}
                              className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + i * 0.1 }}
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(39, 39, 42, 0.8)",
                                borderColor: "#7c3aed",
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div>
                                <p className="font-medium text-zinc-100">{item.name}</p>
                                <p className="text-sm text-zinc-400">{item.category}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <p className="text-sm font-medium text-red-400">{item.stock} in stock</p>
                                  <p className="text-xs text-zinc-500">Threshold: {item.threshold}</p>
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-zinc-700 hover:bg-zinc-700 hover:text-white"
                                  >
                                    Reorder
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="space-y-4">
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-zinc-100">Inventory Management</CardTitle>
                        <CardDescription className="text-zinc-400">Manage your product inventory</CardDescription>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                          Add Product
                        </Button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <InventoryTable />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="invoices" className="space-y-4">
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-zinc-100">Invoices & Billing</CardTitle>
                        <CardDescription className="text-zinc-400">Manage your invoices and billing</CardDescription>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                          Create Invoice
                        </Button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <InvoicesList />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </motion.div>
    </>
  )
}
