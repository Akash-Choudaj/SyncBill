"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"

const invoiceItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be a positive integer." }),
  total: z.coerce.number().positive({ message: "Total must be a positive number." }).optional(),
})

const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Invoice number is required." }),
  clientName: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  clientEmail: z.string().email({ message: "Please enter a valid email address." }).optional(),
  date: z.string(),
  dueDate: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, { message: "At least one item is required." }),
  tax: z.coerce.number().nonnegative({ message: "Tax must be a non-negative number." }),
  notes: z.string().optional(),
  status: z.enum(["paid", "unpaid", "overdue"]),
})

interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail?: string
  date: string
  dueDate?: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    total: number
  }[]
  subtotal: number
  tax: number
  total: number
  status: "paid" | "unpaid" | "overdue"
  notes?: string
}

interface EditInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: Invoice
  onSave: (invoice: Partial<Invoice>) => void
}

export function EditInvoiceDialog({ open, onOpenChange, invoice, onSave }: EditInvoiceDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: invoice.invoiceNumber,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail || "",
      date: invoice.date,
      dueDate: invoice.dueDate || "",
      items: invoice.items,
      tax: invoice.tax,
      notes: invoice.notes || "",
      status: invoice.status,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  // Calculate subtotal and total
  const items = form.watch("items")
  const tax = form.watch("tax")

  const subtotal = items.reduce((sum, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0)
    return sum + itemTotal
  }, 0)

  const total = subtotal + (tax || 0)

  const onSubmit = async (values: z.infer<typeof invoiceFormSchema>) => {
    setIsSubmitting(true)
    try {
      // Calculate totals for each item and overall
      const itemsWithTotals = values.items.map((item) => ({
        ...item,
        total: item.price * item.quantity,
      }))

      const invoiceData = {
        ...values,
        items: itemsWithTotals,
        subtotal,
        total,
      }

      await onSave(invoiceData)
    } catch (error) {
      console.error("Error updating invoice:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuantityChange = (index: number, quantity: number) => {
    const price = form.getValues(`items.${index}.price`) || 0
    form.setValue(`items.${index}.total`, price * quantity)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
          <DialogDescription className="text-zinc-400">Update the invoice details below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Invoice Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  onClick={() => append({ id: Date.now().toString(), name: "", price: 0, quantity: 1, total: 0 })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-12 md:col-span-5">
                      <FormField
                        control={form.control}
                        name={`items.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>Item</FormLabel>
                            <FormControl>
                              <Input className="bg-zinc-800 border-zinc-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                className="bg-zinc-800 border-zinc-700 text-white"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(Number.parseFloat(e.target.value))
                                  const quantity = form.getValues(`items.${index}.quantity`) || 0
                                  form.setValue(`items.${index}.total`, Number.parseFloat(e.target.value) * quantity)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>Qty</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                className="bg-zinc-800 border-zinc-700 text-white"
                                {...field}
                                onChange={(e) => {
                                  const value = Number.parseInt(e.target.value)
                                  field.onChange(value)
                                  handleQuantityChange(index, value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <FormLabel className={index !== 0 ? "sr-only" : ""}>Total</FormLabel>
                      <div className="h-10 px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white">
                        $
                        {(
                          (form.getValues(`items.${index}.price`) || 0) *
                          (form.getValues(`items.${index}.quantity`) || 0)
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-red-500"
                        onClick={() => fields.length > 1 && remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal:</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Tax:</span>
                  <span className="text-white">${(tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1 border-t border-zinc-800">
                  <span className="text-zinc-200">Total:</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-zinc-800 border-zinc-700 text-white resize-none"
                      placeholder="Add any additional notes or payment instructions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
