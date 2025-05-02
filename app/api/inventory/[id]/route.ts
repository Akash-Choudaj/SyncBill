import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value || "demo-user"

    // Fetch the inventory item
    const { data, error } = await supabase.from("inventory").select("*").eq("id", id).eq("user_id", userId).single()

    if (error) {
      console.error("Error fetching inventory item:", error)
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET inventory item:", error)
    return NextResponse.json({ error: "Failed to fetch inventory item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json().catch(() => null)

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value || "demo-user"

    // Update the inventory item
    const { data, error } = await supabase
      .from("inventory")
      .update(body)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating inventory item:", error)
      return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in PUT inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value || "demo-user"

    // Delete the inventory item
    const { error } = await supabase.from("inventory").delete().eq("id", id).eq("user_id", userId)

    if (error) {
      console.error("Error deleting inventory item:", error)
      return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE inventory item:", error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}
