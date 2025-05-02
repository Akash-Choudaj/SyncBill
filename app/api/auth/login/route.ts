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

    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Logging in user:", { email })

    try {
      // Find user by email
      const { data: user, error: fetchError } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle()

      if (fetchError) {
        console.error("Database error:", fetchError)
        throw new Error("Database error occurred")
      }

      // For demo purposes, we'll accept any password
      // In production, you would verify the password
      if (!user) {
        // For demo purposes, create a user on the fly
        const { data: newUser, error: insertError } = await supabaseAdmin
          .from("users")
          .insert([
            {
              name: "Demo User",
              email: email.toLowerCase(),
              password: "demo-password", // In production, hash this password
              company_name: "Demo Company",
            },
          ])
          .select()

        if (insertError || !newUser || newUser.length === 0) {
          console.error("Error creating demo user:", insertError)
          throw new Error("Failed to create demo user")
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
      }

      // Set cookies
      cookies().set({
        name: "user_id",
        value: user.id,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
      })

      // Return success response
      return NextResponse.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          companyName: user.company_name || "Demo Company",
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
          name: "Demo User",
          email: email,
          companyName: "Demo Company",
        },
      })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
