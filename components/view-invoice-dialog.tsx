"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, AlertTriangle, Download, Mail } from "lucide-react"

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
}

interface ViewInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: Invoice
}

export function ViewInvoiceDialog({ open, onOpenChange, invoice }: ViewInvoiceDialogProps) {
  // Ensure invoice and its properties exist before rendering
  if (!invoice) {
    return null
  }

  // Safely access properties with default values
  const {
    invoiceNumber = "",
    clientName = "",
    clientEmail = "",
    date = "",
    dueDate = "",
    items = [],
    subtotal = 0,
    tax = 0,
    total = 0,
    status = "unpaid",
    notes = "",
  } = invoice

  // Helper function to safely format numbers
  const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return "0.00"
    }
    return value.toFixed(2)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Invoice #{invoiceNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-zinc-400">Invoice Number</p>
              <p className="text-lg font-medium text-white">{invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Status</p>
              <Badge
                variant="outline"
                className={`
                  ${status === "paid" ? "border-green-800 bg-green-950 text-green-400" : ""}
                  ${status === "unpaid" ? "border-amber-800 bg-amber-950 text-amber-400" : ""}
                  ${status === "overdue" ? "border-red-800 bg-red-950 text-red-400" : ""}
                `}
              >
                {status === "paid" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                {status === "unpaid" && <Clock className="mr-1 h-3 w-3" />}
                {status === "overdue" && <AlertTriangle className="mr-1 h-3 w-3" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-400">Bill To</p>
              <p className="text-base font-medium text-white">{clientName}</p>
              {clientEmail && <p className="text-sm text-zinc-400">{clientEmail}</p>}
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Invoice Date</p>
              <p className="text-base text-white">{date}</p>
              {dueDate && (
                <>
                  <p className="text-sm text-zinc-400 mt-2">Due Date</p>
                  <p className="text-base text-white">{dueDate}</p>
                </>
              )}
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
                  {items && items.length > 0 ? (
                    items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-zinc-300">{item.name}</TableCell>
                        <TableCell className="text-right text-zinc-300">{item.quantity}</TableCell>
                        <TableCell className="text-right text-zinc-300">${formatNumber(item.price)}</TableCell>
                        <TableCell className="text-right text-zinc-300">${formatNumber(item.total)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-zinc-400">
                        No items found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-1/2 space-y-2">
                <div className="flex justify-between">
                  <p className="text-zinc-400">Subtotal</p>
                  <p className="text-zinc-300">${formatNumber(subtotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-zinc-400">Tax</p>
                  <p className="text-zinc-300">${formatNumber(tax)}</p>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800">
                  <p className="text-zinc-100 font-medium">Total</p>
                  <p className="text-zinc-100 font-bold">${formatNumber(total)}</p>
                </div>
              </div>
            </div>
          </div>

          {notes && (
            <div className="mt-4">
              <p className="text-sm text-zinc-400">Notes</p>
              <p className="text-zinc-300 mt-1">{notes}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
              <Mail className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
