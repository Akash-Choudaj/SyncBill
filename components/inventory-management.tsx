"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InventoryTable } from "@/components/inventory-table"
import { AddInventoryDialog } from "@/components/add-inventory-dialog"

export function InventoryManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [inventory, setInventory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchInventory = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/inventory")
      const data = await response.json()
      setInventory(data.items || [])
    } catch (error) {
      console.error("Error fetching inventory:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const handleAddItem = async (newItem: any) => {
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      })

      if (response.ok) {
        // Refresh inventory after adding
        fetchInventory()
        setIsAddDialogOpen(false)
      } else {
        const error = await response.json()
        console.error("Error adding inventory item:", error)
      }
    } catch (error) {
      console.error("Error adding inventory item:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-zinc-400">Manage your product inventory, track stock levels, and more.</p>
      </motion.div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-zinc-100">Inventory Items</CardTitle>
              <CardDescription className="text-zinc-400">
                {isLoading ? "Loading inventory..." : `${inventory.length} items in your inventory`}
              </CardDescription>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <InventoryTable inventory={inventory} isLoading={isLoading} onRefresh={fetchInventory} />
        </CardContent>
      </Card>

      <AddInventoryDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAddItem={handleAddItem} />
    </div>
  )
}
