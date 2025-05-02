"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, Package, Search, AlertTriangle, CheckCircle2, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { EditInventoryDialog } from "@/components/edit-inventory-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface InventoryItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  category: string
  lowStockThreshold: number
  createdAt: string
  updatedAt: string
}

interface InventoryTableProps {
  inventory: InventoryItem[]
  isLoading: boolean
  onRefresh: () => void
}

export function InventoryTable({ inventory, isLoading, onRefresh }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredData = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let aValue = a[sortField as keyof InventoryItem]
    let bValue = b[sortField as keyof InventoryItem]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleEditItem = async (updatedItem: Partial<InventoryItem>) => {
    if (!selectedItem) return

    try {
      const response = await fetch(`/api/inventory/${selectedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      })

      if (response.ok) {
        onRefresh()
        setIsEditDialogOpen(false)
      } else {
        const error = await response.json()
        console.error("Error updating inventory item:", error)
      }
    } catch (error) {
      console.error("Error updating inventory item:", error)
    }
  }

  const handleDeleteItem = async () => {
    if (!selectedItem) return

    try {
      const response = await fetch(`/api/inventory/${selectedItem.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onRefresh()
        setIsDeleteDialogOpen(false)
      } else {
        const error = await response.json()
        console.error("Error deleting inventory item:", error)
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error)
    }
  }

  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      backgroundColor: "rgba(39, 39, 42, 0.6)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-orange-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-400 focus-visible:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-zinc-400">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                Category
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                Status
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                Price Range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>

      {sortedData.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          {searchTerm ? "No items match your search." : "No inventory items found. Add some items to get started."}
        </div>
      ) : (
        <motion.div
          className="rounded-md border border-zinc-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                    Item
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform: sortField === "name" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  <div
                    className="flex items-center gap-1 justify-end cursor-pointer"
                    onClick={() => handleSort("price")}
                  >
                    Price
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "price" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400 text-right">
                  <div
                    className="flex items-center gap-1 justify-end cursor-pointer"
                    onClick={() => handleSort("quantity")}
                  >
                    Stock
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "quantity" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {sortedData.map((item, index) => {
                  const isLowStock = item.quantity < item.lowStockThreshold
                  const isOutOfStock = item.quantity === 0
                  let status = "In Stock"
                  if (isOutOfStock) status = "Out of Stock"
                  else if (isLowStock) status = "Low Stock"

                  return (
                    <motion.tr
                      key={item.id}
                      className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "#ea580c",
                              transition: { duration: 0.2 },
                            }}
                          >
                            <Package className="h-4 w-4 text-orange-400" />
                          </motion.div>
                          <div>
                            <span className="font-medium text-zinc-200">{item.name}</span>
                            <p className="text-xs text-zinc-500 truncate max-w-[200px]">{item.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-zinc-400">{item.category}</TableCell>
                      <TableCell className="text-right font-medium text-zinc-300">₹{item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium text-zinc-300">{item.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${status === "In Stock" ? "border-green-800 bg-green-950 text-green-400" : ""}
                            ${status === "Low Stock" ? "border-amber-800 bg-amber-950 text-amber-400" : ""}
                            ${status === "Out of Stock" ? "border-red-800 bg-red-950 text-red-400" : ""}
                          `}
                        >
                          {status === "In Stock" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {status === "Low Stock" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {status === "Out of Stock" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-400 hover:text-white"
                              onClick={() => {
                                setSelectedItem(item)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-400 hover:text-red-500"
                              onClick={() => {
                                setSelectedItem(item)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}

      {/* Edit Dialog */}
      {selectedItem && (
        <EditInventoryDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          item={selectedItem}
          onSave={handleEditItem}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This will permanently delete the item "{selectedItem?.name}" from your inventory. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteItem}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
