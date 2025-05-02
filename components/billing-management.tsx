"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoiceTable } from "@/components/invoice-table"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BillingManagement() {
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [invoices, setInvoices] = useState([])
  const [inventory, setInventory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Add timestamp to prevent caching
      const timestamp = new Date().getTime()

      // Use Promise.allSettled instead of Promise.all to handle partial failures
      const results = await Promise.allSettled([
        fetch(`/api/invoices?t=${timestamp}`, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }),
        fetch(`/api/inventory?t=${timestamp}`, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }),
      ])

      // Handle invoices result
      if (results[0].status === "fulfilled") {
        try {
          const response = results[0].value
          if (response.ok) {
            const data = await response.json()
            setInvoices(data.invoices || [])
          } else {
            if (response.status === 401) {
              console.warn("Authentication required for invoices")
              // Use empty array instead of throwing error for better UX
              setInvoices([])

              // Show toast notification
              toast({
                title: "Authentication Required",
                description: "Please log in to view your invoices.",
                variant: "destructive",
              })
            } else {
              console.error("Failed to fetch invoices:", response.status, response.statusText)
              setError("Failed to load invoices. Please try again later.")
            }
          }
        } catch (error) {
          console.error("Error parsing invoices response:", error)
          setError("Failed to process invoice data. Please try again later.")
        }
      } else {
        console.error("Failed to fetch invoices:", results[0].reason)
        setError("Failed to connect to invoice service. Please try again later.")
      }

      // Handle inventory result
      if (results[1].status === "fulfilled") {
        try {
          const response = results[1].value
          if (response.ok) {
            const data = await response.json()
            setInventory(data.items || [])
          } else {
            if (response.status === 401) {
              console.warn("Authentication required for inventory")
              setInventory([])
            } else {
              console.error("Failed to fetch inventory:", response.status, response.statusText)
              // Don't set error for inventory as it's secondary to invoices
            }
          }
        } catch (error) {
          console.error("Error parsing inventory response:", error)
          // Don't set error for inventory as it's secondary to invoices
        }
      } else {
        console.error("Failed to fetch inventory:", results[1].reason)
        // Don't set error for inventory as it's secondary to invoices
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateInvoice = async (newInvoice: any) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify(newInvoice),
      })

      if (response.ok) {
        // Refresh invoices after adding
        toast({
          title: "Success",
          description: "Invoice created successfully",
        })
        fetchData()
        setIsCreateDialogOpen(false)
      } else {
        if (response.status === 401) {
          toast({
            title: "Authentication Required",
            description: "Please log in to create invoices.",
            variant: "destructive",
          })
        } else {
          const errorData = await response.json()
          console.error("Error creating invoice:", errorData)
          toast({
            title: "Error",
            description: "Failed to create invoice. Please try again.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error creating invoice:", error)
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h1 className="text-2xl font-bold tracking-tight">Billing Management</h1>
        <p className="text-zinc-400">Create and manage invoices, track payments, and more.</p>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-zinc-100">Invoices</CardTitle>
              <CardDescription className="text-zinc-400">
                {isLoading ? "Loading invoices..." : `${invoices.length} invoices in your system`}
              </CardDescription>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <InvoiceTable invoices={invoices} isLoading={isLoading} onRefresh={fetchData} />
        </CardContent>
      </Card>

      <CreateInvoiceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateInvoice={handleCreateInvoice}
        inventoryItems={inventory}
      />
    </div>
  )
}
