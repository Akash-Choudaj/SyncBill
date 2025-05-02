"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Pencil,
} from "lucide-react"
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
import { ViewInvoiceDialog } from "@/components/view-invoice-dialog"
import { EditInvoiceDialog } from "@/components/edit-invoice-dialog"
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

interface InvoiceItem {
  id: string
  name: string
  price: number
  quantity: number
  total: number
}

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail?: string
  date: string
  dueDate?: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: "paid" | "unpaid" | "overdue"
  notes?: string
  createdAt?: string
  updatedAt?: string
}

interface InvoiceTableProps {
  invoices: Invoice[]
  isLoading: boolean
  onRefresh: () => void
}

export function InvoiceTable({ invoices, isLoading, onRefresh }: InvoiceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
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

  const filteredData = invoices.filter((invoice) => {
    // Make sure all properties exist before calling toLowerCase()
    const invoiceNumber = invoice.invoiceNumber?.toLowerCase() || ""
    const clientName = invoice.clientName?.toLowerCase() || ""
    const status = invoice.status?.toLowerCase() || ""
    const searchTermLower = searchTerm.toLowerCase()

    return (
      invoiceNumber.includes(searchTermLower) ||
      clientName.includes(searchTermLower) ||
      status.includes(searchTermLower)
    )
  })

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let aValue = a[sortField as keyof Invoice] || ""
    let bValue = b[sortField as keyof Invoice] || ""

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleUpdateInvoice = async (updatedInvoice: Partial<Invoice>) => {
    if (!selectedInvoice) return

    try {
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInvoice),
      })

      if (response.ok) {
        onRefresh()
        setIsEditDialogOpen(false)
      } else {
        const error = await response.json()
        console.error("Error updating invoice:", error)
      }
    } catch (error) {
      console.error("Error updating invoice:", error)
    }
  }

  const handleDeleteInvoice = async () => {
    if (!selectedInvoice) return

    try {
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onRefresh()
        setIsDeleteDialogOpen(false)
      } else {
        const error = await response.json()
        console.error("Error deleting invoice:", error)
      }
    } catch (error) {
      console.error("Error deleting invoice:", error)
    }
  }

  const handleUpdateStatus = async (invoice: Invoice, status: "paid" | "unpaid" | "overdue") => {
    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        onRefresh()
      } else {
        const error = await response.json()
        console.error("Error updating invoice status:", error)
      }
    } catch (error) {
      console.error("Error updating invoice status:", error)
    }
  }

  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
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
            placeholder="Search invoices..."
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
                Status
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                Date Range
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                Amount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </motion.div>

      {sortedData.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          {searchTerm ? "No invoices match your search." : "No invoices found. Create an invoice to get started."}
        </div>
      ) : (
        <motion.div
          className="rounded-md border border-zinc-800 overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("invoiceNumber")}>
                    Invoice
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "invoiceNumber" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("clientName")}>
                    Client
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "clientName" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("date")}>
                    Date
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform: sortField === "date" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400 text-right">
                  <div
                    className="flex items-center gap-1 justify-end cursor-pointer"
                    onClick={() => handleSort("total")}
                  >
                    Amount
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "total" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("status")}>
                    Status
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform:
                          sortField === "status" && sortDirection === "desc" ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </motion.div>
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {sortedData.map((invoice, index) => (
                  <motion.tr
                    key={invoice.id}
                    className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={index}
                  >
                    <TableCell className="font-medium text-zinc-300">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#ea580c",
                            transition: { duration: 0.2 },
                          }}
                        >
                          <FileText className="h-4 w-4 text-orange-400" />
                        </motion.div>
                        {invoice.invoiceNumber}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-zinc-200">{invoice.clientName}</TableCell>
                    <TableCell className="text-zinc-400">{invoice.date}</TableCell>
                    <TableCell className="text-right font-medium text-zinc-300">
                      ₹{typeof invoice.total === "number" ? invoice.total.toFixed(2) : "0.00"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                          ${invoice.status === "paid" ? "border-green-800 bg-green-950 text-green-400" : ""}
                          ${invoice.status === "unpaid" ? "border-amber-800 bg-amber-950 text-amber-400" : ""}
                          ${invoice.status === "overdue" ? "border-red-800 bg-red-950 text-red-400" : ""}
                        `}
                      >
                        {invoice.status === "paid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {invoice.status === "unpaid" && <Clock className="mr-1 h-3 w-3" />}
                        {invoice.status === "overdue" && <AlertTriangle className="mr-1 h-3 w-3" />}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
                              setSelectedInvoice(invoice)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-zinc-400 hover:text-white"
                            onClick={() => {
                              setSelectedInvoice(invoice)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-400">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-zinc-800" />
                              {invoice.status !== "paid" && (
                                <DropdownMenuItem
                                  className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                                  onClick={() => handleUpdateStatus(invoice, "paid")}
                                >
                                  Mark as Paid
                                </DropdownMenuItem>
                              )}
                              {invoice.status !== "unpaid" && (
                                <DropdownMenuItem
                                  className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                                  onClick={() => handleUpdateStatus(invoice, "unpaid")}
                                >
                                  Mark as Unpaid
                                </DropdownMenuItem>
                              )}
                              {invoice.status !== "overdue" && (
                                <DropdownMenuItem
                                  className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                                  onClick={() => handleUpdateStatus(invoice, "overdue")}
                                >
                                  Mark as Overdue
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-800" />
                              <DropdownMenuItem
                                className="text-red-400 hover:bg-red-950 hover:text-red-400 focus:bg-red-950 focus:text-red-400"
                                onClick={() => {
                                  setSelectedInvoice(invoice)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                Delete Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}

      {/* View Invoice Dialog */}
      {selectedInvoice && (
        <ViewInvoiceDialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} invoice={selectedInvoice} />
      )}

      {/* Edit Invoice Dialog */}
      {selectedInvoice && (
        <EditInvoiceDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          invoice={selectedInvoice}
          onSave={handleUpdateInvoice}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This will permanently delete the invoice "{selectedInvoice?.invoiceNumber}" from your system. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteInvoice}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
