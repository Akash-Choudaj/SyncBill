"use client"

import { AlertTriangle } from "lucide-react"

export function LowStockAlerts({ inventory = [] }) {
  // Filter inventory items that are below their low stock threshold
  const lowStockItems = inventory
    .filter((item) => {
      const quantity =
        typeof item.quantity === "number"
          ? item.quantity
          : typeof item.quantity === "string"
            ? Number.parseInt(item.quantity, 10)
            : 0
      const threshold = item.lowStockThreshold || 10
      return quantity < threshold
    })
    .sort((a, b) => {
      // Sort by the percentage of stock remaining (lowest first)
      const aPercent = a.quantity / (a.lowStockThreshold || 10)
      const bPercent = b.quantity / (b.lowStockThreshold || 10)
      return aPercent - bPercent
    })
    .slice(0, 5) // Take the 5 most critical items

  // Sample data for when no real data is available
  const sampleAlerts = [
    { name: "Laptop Pro", quantity: 2, lowStockThreshold: 5, category: "Electronics" },
    { name: "Wireless Earbuds", quantity: 8, lowStockThreshold: 20, category: "Electronics" },
    { name: "Office Chair", quantity: 3, lowStockThreshold: 10, category: "Furniture" },
    { name: "Printer Ink", quantity: 1, lowStockThreshold: 5, category: "Office Supplies" },
    { name: "Notebooks", quantity: 12, lowStockThreshold: 25, category: "Office Supplies" },
  ]

  // Use real data if available, otherwise use sample data
  const displayItems = lowStockItems.length > 0 ? lowStockItems : sampleAlerts

  return (
    <div className="space-y-4">
      {displayItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${getStockLevelColor(item.quantity, item.lowStockThreshold)}`} />
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-zinc-400">{item.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">
              {item.quantity} / {item.lowStockThreshold}
            </span>
            {item.quantity === 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>
        </div>
      ))}

      {displayItems.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32 text-zinc-500">
          <p>No low stock items</p>
          <p className="text-xs">All inventory levels are healthy</p>
        </div>
      )}
    </div>
  )
}

// Helper function to get color based on stock level
function getStockLevelColor(quantity, threshold) {
  const ratio = quantity / threshold
  if (ratio === 0) return "bg-red-500"
  if (ratio < 0.25) return "bg-red-500"
  if (ratio < 0.5) return "bg-amber-500"
  return "bg-yellow-500"
}
