import { createClient } from "@supabase/supabase-js"

// Create a singleton instance for the client-side Supabase client
let clientSingleton: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (clientSingleton) return clientSingleton

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    // Return a mock client for development
    return createClient("https://example.supabase.co", "mock-key")
  }

  clientSingleton = createClient(supabaseUrl, supabaseAnonKey)
  return clientSingleton
}

// Create a Supabase client for server-side usage
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing Supabase environment variables")
    // Return a mock client for development
    return createClient("https://example.supabase.co", "mock-key")
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

// For backward compatibility
export const supabase = getSupabaseClient()
export const supabaseAdmin = getSupabaseAdmin()
