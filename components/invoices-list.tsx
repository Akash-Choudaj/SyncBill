"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Search,
  Download,
  Mail,
  Clock,
  CheckCircle2,
  AlertTriangle,
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
import { X } from "lucide-react"

const invoicesData = [
  {
    id: "INV-2023-001",
    customer: "Acme Corp",
    amount: 1299.99,
    status: "Paid",
    date: "Apr 1, 2023",
    dueDate: "Apr 15, 2023",
  },
  {
    id: "INV-2023-002",
    customer: "Globex Industries",
    amount: 849.5,
    status: "Pending",
    date: "Apr 3, 2023",
    dueDate: "Apr 17, 2023",
  },
  {
    id: "INV-2023-003",
    customer: "Stark Enterprises",
    amount: 2450.0,
    status: "Overdue",
    date: "Mar 25, 2023",
    dueDate: "Apr 8, 2023",
  },
  {
    id: "INV-2023-004",
    customer: "Wayne Industries",
    amount: 1875.25,
    status: "Paid",
    date: "Apr 2, 2023",
    dueDate: "Apr 16, 2023",
  },
  {
    id: "INV-2023-005",
    customer: "Oscorp",
    amount: 3200.0,
    status: "Pending",
    date: "Apr 5, 2023",
    dueDate: "Apr 19, 2023",
  },
  {
    id: "INV-2023-006",
    customer: "Umbrella Corporation",
    amount: 950.75,
    status: "Paid",
    date: "Apr 4, 2023",
    dueDate: "Apr 18, 2023",
  },
  {
    id: "INV-2023-007",
    customer: "LexCorp",
    amount: 1450.5,
    status: "Overdue",
    date: "Mar 20, 2023",
    dueDate: "Apr 3, 2023",
  },
]

export function InvoicesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedInvoice, setExpandedInvoice] = useState(null)

  const filteredData = invoicesData.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: {
      scale: 1.01,
      backgroundColor: "rgba(39, 39, 42, 0.6)",
      boxShadow: "0 0 0 1px rgba(124, 58, 237, 0.3)",
      transition: { duration: 0.2 },
    },
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
            className="pl-8 bg-zinc-800 border-zinc-700 text-zinc-400 focus-visible:ring-violet-500"
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

      <motion.div
        className="rounded-md border border-zinc-800 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={listVariants}
      >
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400">
                <div className="flex items-center gap-1">
                  Invoice
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <ArrowUpDown className="h-3 w-3" />
                  </motion.div>
                </div>
              </TableHead>
              <TableHead className="text-zinc-400">
                <div className="flex items-center gap-1">
                  Customer
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <ArrowUpDown className="h-3 w-3" />
                  </motion.div>
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 text-right">Amount</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-zinc-400">Date</TableHead>
              <TableHead className="text-zinc-400">Due Date</TableHead>
              <TableHead className="text-zinc-400"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredData.map((invoice) => (
                <motion.tr
                  key={invoice.id}
                  className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50"
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() => setExpandedInvoice(expandedInvoice === invoice.id ? null : invoice.id)}
                  layoutId={`invoice-${invoice.id}`}
                >
                  <TableCell className="font-medium text-zinc-300">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "#4c1d95",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <FileText className="h-4 w-4 text-violet-400" />
                      </motion.div>
                      {invoice.id}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-zinc-200">{invoice.customer}</TableCell>
                  <TableCell className="text-right font-medium text-zinc-300">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`
                        ${invoice.status === "Paid" ? "border-green-800 bg-green-950 text-green-400" : ""}
                        ${invoice.status === "Pending" ? "border-amber-800 bg-amber-950 text-amber-400" : ""}
                        ${invoice.status === "Overdue" ? "border-red-800 bg-red-950 text-red-400" : ""}
                      `}
                    >
                      {invoice.status === "Paid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {invoice.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                      {invoice.status === "Overdue" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400">{invoice.date}</TableCell>
                  <TableCell className="text-zinc-400">{invoice.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-400">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                              Edit Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white">
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-950 hover:text-red-400 focus:bg-red-950 focus:text-red-400">
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

      {/* Invoice Preview Modal - would appear when expandedInvoice is set */}
      <AnimatePresence>
        {expandedInvoice && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedInvoice(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-2xl p-6 m-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Invoice Preview</h2>
                <Button variant="ghost" size="icon" onClick={() => setExpandedInvoice(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">Invoice Number</p>
                    <p className="text-lg font-medium text-white">{expandedInvoice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Status</p>
                    <Badge variant="outline" className="border-green-800 bg-green-950 text-green-400">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Paid
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">Bill To</p>
                    <p className="text-base font-medium text-white">Acme Corp</p>
                    <p className="text-sm text-zinc-400">123 Business St.</p>
                    <p className="text-sm text-zinc-400">New York, NY 10001</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Invoice Date</p>
                    <p className="text-base text-white">Apr 1, 2023</p>
                    <p className="text-sm text-zinc-400">Due Date</p>
                    <p className="text-base text-white">Apr 15, 2023</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="rounded-md border border-zinc-800 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-zinc-800">
                        <TableRow>
                          <TableHead className="text-zinc-400">Item</TableHead>
                          <TableHead className="text-zinc-400 text-right">Qty</TableHead>
                          <TableHead className="text-zinc-400 text-right">Price</TableHead>
                          <TableHead className="text-zinc-400 text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="text-zinc-300">Product Design</TableCell>
                          <TableCell className="text-right text-zinc-300">1</TableCell>
                          <TableCell className="text-right text-zinc-300">$800.00</TableCell>
                          <TableCell className="text-right text-zinc-300">$800.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-zinc-300">Development</TableCell>
                          <TableCell className="text-right text-zinc-300">1</TableCell>
                          <TableCell className="text-right text-zinc-300">$1,200.00</TableCell>
                          <TableCell className="text-right text-zinc-300">$1,200.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end mt-4">
                    <div className="w-1/2 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-zinc-400">Subtotal</p>
                        <p className="text-zinc-300">$2,000.00</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-zinc-400">Tax (10%)</p>
                        <p className="text-zinc-300">$200.00</p>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-zinc-800">
                        <p className="text-zinc-100 font-medium">Total</p>
                        <p className="text-zinc-100 font-bold">$2,200.00</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invoice
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
