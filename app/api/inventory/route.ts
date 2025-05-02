import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value

    // If no user ID is found, return an error
    if (!userId) {
      // For demo/preview purposes, use demo data instead of returning 401
      // This allows the app to work in preview mode without authentication
      const isPreview = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.VERCEL_ENV === "preview"

      if (isPreview) {
        // Return demo data for preview mode
        return NextResponse.json({
          items: [
            {
              id: "1",
              name: "Laptop",
              description: "High-performance laptop for developers",
              category: "Electronics",
              price: 1299.99,
              quantity: 15,
              lowStockThreshold: 5,
              sku: "LAP-001",
            },
            {
              id: "2",
              name: "Smartphone",
              description: "Latest model smartphone",
              category: "Electronics",
              price: 899.99,
              quantity: 25,
              lowStockThreshold: 8,
              sku: "PHN-001",
            },
            {
              id: "3",
              name: "Desk Chair",
              description: "Ergonomic office chair",
              category: "Furniture",
              price: 249.99,
              quantity: 10,
              lowStockThreshold: 3,
              sku: "CHR-001",
            },
            {
              id: "4",
              name: "Wireless Headphones",
              description: "Noise-cancelling wireless headphones",
              category: "Electronics",
              price: 199.99,
              quantity: 20,
              lowStockThreshold: 5,
              sku: "HDP-001",
            },
            {
              id: "5",
              name: "Monitor",
              description: "27-inch 4K monitor",
              category: "Electronics",
              price: 349.99,
              quantity: 8,
              lowStockThreshold: 3,
              sku: "MON-001",
            },
            {
              id: "6",
              name: "Desk",
              description: "Standing desk with adjustable height",
              category: "Furniture",
              price: 499.99,
              quantity: 5,
              lowStockThreshold: 2,
              sku: "DSK-001",
            },
            {
              id: "7",
              name: "Keyboard",
              description: "Mechanical keyboard with RGB lighting",
              category: "Electronics",
              price: 129.99,
              quantity: 30,
              lowStockThreshold: 10,
              sku: "KBD-001",
            },
            {
              id: "8",
              name: "Mouse",
              description: "Wireless gaming mouse",
              category: "Electronics",
              price: 79.99,
              quantity: 35,
              lowStockThreshold: 10,
              sku: "MUS-001",
            },
            {
              id: "9",
              name: "Docking Station",
              description: "USB-C docking station",
              category: "Electronics",
              price: 189.99,
              quantity: 12,
              lowStockThreshold: 4,
              sku: "DOC-001",
            },
            {
              id: "10",
              name: "Webcam",
              description: "1080p webcam for video conferencing",
              category: "Electronics",
              price: 99.99,
              quantity: 18,
              lowStockThreshold: 5,
              sku: "CAM-001",
            },
          ],
        })
      }

      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    try {
      // Fetch inventory from Supabase
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching inventory:", error)
        return NextResponse.json({ items: [] })
      }

      // If no data, insert demo data
      if (!data || data.length === 0) {
        // Demo data for new users
        const demoItems = [
          {
            name: "Laptop",
            description: "High-performance laptop for developers",
            category: "Electronics",
            price: 1299.99,
            quantity: 15,
            low_stock_threshold: 5,
            sku: "LAP-001",
            user_id: userId,
          },
          {
            name: "Smartphone",
            description: "Latest model smartphone",
            category: "Electronics",
            price: 899.99,
            quantity: 25,
            low_stock_threshold: 8,
            sku: "PHN-001",
            user_id: userId,
          },
          {
            name: "Desk Chair",
            description: "Ergonomic office chair",
            category: "Furniture",
            price: 249.99,
            quantity: 10,
            low_stock_threshold: 3,
            sku: "CHR-001",
            user_id: userId,
          },
          {
            name: "Wireless Headphones",
            description: "Noise-cancelling wireless headphones",
            category: "Electronics",
            price: 199.99,
            quantity: 20,
            low_stock_threshold: 5,
            sku: "HDP-001",
            user_id: userId,
          },
          {
            name: "Monitor",
            description: "27-inch 4K monitor",
            category: "Electronics",
            price: 349.99,
            quantity: 8,
            low_stock_threshold: 3,
            sku: "MON-001",
            user_id: userId,
          },
        ]

        try {
          await supabase.from("inventory").insert(demoItems)
        } catch (insertError) {
          console.error("Error inserting demo inventory:", insertError)
        }

        // Return formatted demo data
        return NextResponse.json({
          items: demoItems.map((item, index) => ({
            id: (index + 1).toString(),
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            quantity: item.quantity,
            lowStockThreshold: item.low_stock_threshold,
            sku: item.sku,
          })),
        })
      }

      // Format the data to match the expected structure
      const formattedData = data.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        lowStockThreshold: item.low_stock_threshold,
        sku: item.sku,
      }))

      return NextResponse.json({ items: formattedData })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ items: [] })
    }
  } catch (error) {
    console.error("Error in inventory API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch inventory",
        items: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("Failed to parse request body:", e)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value

    // Check if user is authenticated
    if (!userId) {
      // For demo/preview purposes
      const isPreview = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.VERCEL_ENV === "preview"

      if (isPreview) {
        // Return mock success response for preview mode
        return NextResponse.json({
          item: {
            id: Math.floor(Math.random() * 1000).toString(),
            ...body,
          },
        })
      }

      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Format the inventory data for Supabase
    const inventoryData = {
      name: body.name,
      description: body.description,
      category: body.category,
      price: body.price,
      quantity: body.quantity,
      low_stock_threshold: body.lowStockThreshold,
      sku: body.sku,
      user_id: userId,
      created_at: new Date().toISOString(),
    }

    try {
      // Insert the new inventory item
      const { data, error } = await supabase.from("inventory").insert([inventoryData]).select().single()

      if (error) {
        console.error("Error adding inventory item:", error)
        return NextResponse.json({
          error: "Failed to add inventory item",
          item: {
            id: Math.floor(Math.random() * 1000).toString(),
            ...body,
          },
        })
      }

      // Format the response to match the expected structure
      const formattedData = {
        id: data.id.toString(),
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        lowStockThreshold: data.low_stock_threshold,
        sku: data.sku,
      }

      return NextResponse.json({ item: formattedData })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({
        error: "Failed to add inventory item",
        item: {
          id: Math.floor(Math.random() * 1000).toString(),
          ...body,
        },
      })
    }
  } catch (error) {
    console.error("Error in POST inventory:", error)
    return NextResponse.json({ error: "Failed to add inventory item" }, { status: 500 })
  }
}
