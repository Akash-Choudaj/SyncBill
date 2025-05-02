import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/dashboard")

  // Define which paths are auth paths (login, signup)
  const isAuthPath = path === "/login" || path === "/signup"

  // Check if user is authenticated
  const userId = request.cookies.get("user_id")?.value
  const isAuthenticated = !!userId

  // For demo/preview purposes, allow access to all paths
  const isPreview = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.VERCEL_ENV === "preview"

  // If it's a protected path and user is not authenticated
  if (isProtectedPath && !isAuthenticated && !isPreview) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("from", path)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and trying to access auth paths
  if (isAuthPath && isAuthenticated && !isPreview) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Apply to all paths except static files, api routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
