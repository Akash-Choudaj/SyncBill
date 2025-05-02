"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Low Stock Alert",
      description: "Yoga Mats are running low on stock (2 remaining)",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Order Received",
      description: "Order #12345 has been placed by Emma Johnson",
      time: "25 minutes ago",
      unread: true,
    },
    {
      id: 3,
      title: "Invoice Paid",
      description: "Invoice #INV-2023-001 has been paid by Acme Corp",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      title: "System Update",
      description: "System will undergo maintenance at 2:00 AM",
      time: "2 hours ago",
      unread: false,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, unread: false } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, unread: false })))
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            className="relative border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-violet-600 text-[10px] font-medium text-white flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-zinc-900 border-zinc-800 text-zinc-400">
        <motion.div
          className="p-4 border-b border-zinc-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-zinc-200">Notifications</h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-zinc-400 hover:text-white"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        </motion.div>
        <div className="max-h-80 overflow-auto">
          <AnimatePresence>
            {notifications.map((notification, i) => (
              <motion.div
                key={notification.id}
                className={`p-4 border-b border-zinc-800 ${notification.unread ? "bg-zinc-800/30" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.2 }}
                whileHover={{
                  backgroundColor: notification.unread ? "rgba(39, 39, 42, 0.5)" : "rgba(39, 39, 42, 0.3)",
                  transition: { duration: 0.2 },
                }}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className={`w-2 h-2 mt-1.5 rounded-full ${notification.unread ? "bg-violet-500" : "bg-zinc-700"}`}
                    animate={{
                      scale: notification.unread ? [1, 1.2, 1] : 1,
                      backgroundColor: notification.unread ? "#8b5cf6" : "#3f3f46",
                    }}
                    transition={{
                      repeat: notification.unread ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                      duration: 1.5,
                    }}
                  />
                  <div className="space-y-1">
                    <h5 className="text-sm font-medium text-zinc-200">{notification.title}</h5>
                    <p className="text-xs text-zinc-400">{notification.description}</p>
                    <p className="text-xs text-zinc-500">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          className="p-4 border-t border-zinc-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Button>
          </motion.div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
