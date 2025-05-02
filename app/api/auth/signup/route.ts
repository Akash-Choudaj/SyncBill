import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json().catch(() => {
      console.error("Failed to parse request body")
      return null
    })

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { name, email, password, companyName, phoneNumber } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    console.log("Creating user:", { name, email, companyName, phoneNumber })

    // For demo purposes, we'll create a user directly in the database
    // In production, you would use Supabase Auth
    try {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle()

      if (existingUser) {
        return NextResponse.json(
          {
            error: "User with this email already exists",
            code: "EMAIL_EXISTS",
            suggestion: "Please try logging in instead or use a different email address.",
          },
          { status: 409 },
        )
      }

      // Create user in the database
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from("users")
        .insert([
          {
            name,
            email: email.toLowerCase(),
            password, // In production, hash this password
            company_name: companyName || "Demo Company",
            phone_number: phoneNumber || "",
          },
        ])
        .select()

      if (insertError) {
        console.error("Error creating user:", insertError)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
      }

      if (!newUser || newUser.length === 0) {
        console.error("No user created")
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
      }

      // Set cookies
      cookies().set({
        name: "user_id",
        value: newUser[0].id,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      })

      // Return success response
      return NextResponse.json({
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          companyName: newUser[0].company_name || "Demo Company",
        },
      })
    } catch (dbError) {
      console.error("Database error:", dbError)

      // For demo purposes, create a mock user and set cookie
      const mockUserId = "demo-" + Math.random().toString(36).substring(2, 15)

      cookies().set({
        name: "user_id",
        value: mockUserId,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      })

      return NextResponse.json({
        user: {
          id: mockUserId,
          name: name,
          email: email,
          companyName: companyName || "Demo Company",
        },
      })
    }
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}
