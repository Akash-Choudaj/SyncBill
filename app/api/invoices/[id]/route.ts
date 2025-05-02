import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSupabaseAdmin } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value || "demo-user"

    // Fetch the invoice
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("invoice_number", id)
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error fetching invoice:", error)
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 })
    }

    // Format the response to match the expected structure
    const formattedData = {
      id: data.invoice_number,
      customer: data.customer_name,
      amount: data.amount,
      status: data.status,
      date: data.issue_date,
    }

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error in GET invoice:", error)
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 })
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

    // Format the invoice data for Supabase
    const invoiceData = {
      customer_name: body.customer,
      amount: body.amount,
      status: body.status,
      issue_date: body.date,
    }

    // Update the invoice
    const { data, error } = await supabase
      .from("invoices")
      .update(invoiceData)
      .eq("invoice_number", id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating invoice:", error)
      return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 })
    }

    // Format the response to match the expected structure
    const formattedData = {
      id: data.invoice_number,
      customer: data.customer_name,
      amount: data.amount,
      status: data.status,
      date: data.issue_date,
    }

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error in PUT invoice:", error)
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const supabase = getSupabaseAdmin()

    // Get user ID from cookies
    const userId = cookies().get("user_id")?.value || "demo-user"

    // Delete the invoice
    const { error } = await supabase.from("invoices").delete().eq("invoice_number", id).eq("user_id", userId)

    if (error) {
      console.error("Error deleting invoice:", error)
      return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in DELETE invoice:", error)
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 })
  }
}
