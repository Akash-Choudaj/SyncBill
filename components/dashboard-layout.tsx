"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Package, FileText, Settings, LogOut, Menu, X, ChevronRight, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import { NotificationsPopover } from "@/components/notifications-popover"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Simulate loading for the intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  const navItems = [
    { name: "Dashboard", icon: BarChart3, path: "/dashboard" },
    { name: "Inventory", icon: Package, path: "/dashboard/inventory" },
    { name: "Billing", icon: FileText, path: "/dashboard/billing" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ]

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
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="flex min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: loading ? 1 : 0 }}
      >
        {/* Sidebar */}
        <motion.div
          className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-zinc-900 border-r border-zinc-800 ${isMobile ? "left-0" : ""}`}
          initial={isMobile ? { x: "-100%" } : { x: 0 }}
          animate={sidebarOpen ? { x: 0 } : { x: "-100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-800">
            <motion.div
              className="flex items-center gap-2 text-xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent"
              >
                SyncBill
              </Link>
            </motion.div>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, i) => {
                const isActive = pathname === item.path
                return (
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
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive
                          ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon className="h-5 w-5" />
                        {item.name}
                        {isActive && (
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
                )
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-zinc-800">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
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
                    className="w-full bg-zinc-800 border-zinc-700 pl-8 text-zinc-400 focus-visible:ring-orange-500"
                  />
                </div>
              </form>
              <div className="ml-auto flex items-center gap-2">
                <NotificationsPopover />
                <UserNav />
              </div>
            </div>
          </header>
          <main className="grid gap-6 p-4 sm:p-6 md:gap-8">{children}</main>
        </div>
      </motion.div>
    </>
  )
}
