import { supabaseManager } from "./supabase-enhanced"
import { config } from "./config"

export interface AuthUser {
  id: string
  email: string
  role: "admin" | "user"
}

class AuthManager {
  private currentUser: AuthUser | null = null

  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Try Supabase authentication first
      const supabase = await supabaseManager.getClientInstance()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (!error && data.user) {
        this.currentUser = {
          id: data.user.id,
          email: data.user.email!,
          role: "admin",
        }
        this.setAuthCookies(true)
        return { user: this.currentUser, error: null }
      }

      // Fallback to environment-based authentication for development
      if (config.app.isDevelopment && config.auth.adminEmail && config.auth.adminPassword) {
        if (email === config.auth.adminEmail && password === config.auth.adminPassword) {
          this.currentUser = {
            id: "dev-admin",
            email: config.auth.adminEmail,
            role: "admin",
          }
          this.setAuthCookies(true)
          return { user: this.currentUser, error: null }
        }
      }

      return { user: null, error: "Invalid credentials" }
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : "認証エラーが発生しました" }
    }
  }

  async signOut(): Promise<void> {
    try {
      const supabase = await supabaseManager.getClientInstance()
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Supabase signOut error:", error)
    }

    this.currentUser = null
    this.setAuthCookies(false)
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    try {
      const supabase = await supabaseManager.getClientInstance()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        this.currentUser = {
          id: session.user.id,
          email: session.user.email!,
          role: "admin",
        }
        return this.currentUser
      }
    } catch (error) {
      console.error("Session check error:", error)
    }

    // Check local authentication
    if (typeof window !== "undefined") {
      const localAuth = localStorage.getItem("localAdmin")
      if (localAuth === "true") {
        this.currentUser = {
          id: "local-admin",
          email: "local@admin.com",
          role: "admin",
        }
        return this.currentUser
      }
    }

    return null
  }

  private setAuthCookies(authenticated: boolean) {
    if (typeof document !== "undefined") {
      if (authenticated) {
        document.cookie = "localAdmin=true; path=/; max-age=86400; SameSite=Lax; Secure"
        localStorage.setItem("localAdmin", "true")
      } else {
        document.cookie = "localAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        localStorage.removeItem("localAdmin")
      }
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }
}

export const authManager = new AuthManager()
