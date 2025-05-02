"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales({ invoices = [] }) {
  // Sort invoices by date (newest first) and take the 5 most recent
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.date || b.issue_date || 0).getTime() - new Date(a.date || a.issue_date || 0).getTime())
    .slice(0, 5)

  // If no invoices, show sample data
  const sampleSales = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "₹1,999.00",
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "₹39,000.00",
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "₹299.00",
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "₹99.00",
      image: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "₹4,999.00",
      image: "/placeholder.svg?height=32&width=32",
    },
  ]

  // Use real data if available, otherwise use sample data
  const displayData =
    recentInvoices.length > 0
      ? recentInvoices.map((invoice) => ({
          name: invoice.clientName || invoice.customer_id || "Client",
          email: invoice.clientEmail || "client@example.com",
          amount: `₹${
            typeof invoice.total === "number"
              ? invoice.total.toFixed(2)
              : typeof invoice.total === "string"
                ? Number.parseFloat(invoice.total).toFixed(2)
                : "0.00"
          }`,
          image: "/placeholder.svg?height=32&width=32",
        }))
      : sampleSales

  return (
    <div className="space-y-8">
      {displayData.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.image || "/placeholder.svg"} alt={sale.name} />
            <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-white">{sale.name}</p>
            <p className="text-sm text-zinc-400">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium text-white">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
