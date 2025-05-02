import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Get user ID from cookie
    const userId = cookies().get("user_id")?.value

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    try {
      // Fetch user data from database
      const { data: user, error } = await supabaseAdmin
        .from("users")
        .select("id, name, email, company_name, phone_number, avatar_url")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Database error:", error)
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
      }

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Return user data
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name || "",
          email: user.email || "",
          companyName: user.company_name || "",
          phoneNumber: user.phone_number || "",
          avatarUrl: user.avatar_url || "/placeholder.svg?height=128&width=128",
        },
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
  } catch (error) {
    console.error("User API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// Add PUT endpoint to update user profile
export async function PUT(request: Request) {
  try {
    const userId = cookies().get("user_id")?.value

    // Parse the request body safely
    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("Failed to parse request body:", e)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, companyName, phoneNumber } = body || {}

    try {
      const supabase = supabaseAdmin

      const { data, error } = await supabase
        .from("users")
        .update({
          name,
          email,
          company_name: companyName,
          phone_number: phoneNumber,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)
        .select()

      if (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
      }

      if (!data || data.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        user: {
          id: data[0].id,
          name: data[0].name,
          email: data[0].email,
          companyName: data[0].company_name,
          phoneNumber: data[0].phone_number,
        },
      })
    } catch (error) {
      console.error("Error updating user:", error)
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in PUT user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
