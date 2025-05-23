import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { config, validateConfig } from "./config"

export interface Database {
  public: {
    Tables: {
      thumbnails: {
        Row: {
          id: number
          title: string
          image_url: string
          category: string
          content: string | null
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          image_url: string
          category: string
          content?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          image_url?: string
          category?: string
          content?: string | null
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
  }
}

class SupabaseManager {
  private clientInstance: SupabaseClient<Database> | null = null
  private serverInstance: SupabaseClient<Database> | null = null
  private isConnected = false
  private connectionError: string | null = null

  async getClientInstance(): Promise<SupabaseClient<Database>> {
    if (this.clientInstance && this.isConnected) {
      return this.clientInstance
    }

    const validation = validateConfig()
    if (!validation.isValid) {
      throw new Error(`Configuration error: ${validation.errors.join(", ")}`)
    }

    try {
      this.clientInstance = createClient<Database>(config.supabase.url!, config.supabase.anonKey!)

      // Test connection
      const { error } = await this.clientInstance.from("thumbnails").select("count").limit(1)

      if (error) {
        this.connectionError = error.message
        this.isConnected = false
        throw new Error(`Supabase connection failed: ${error.message}`)
      }

      this.isConnected = true
      this.connectionError = null
      return this.clientInstance
    } catch (error: any) {
      this.connectionError = error.message
      this.isConnected = false
      throw error
    }
  }

  async getServerInstance(): Promise<SupabaseClient<Database>> {
    if (this.serverInstance) {
      return this.serverInstance
    }

    const serviceKey = config.supabase.serviceRoleKey || config.supabase.anonKey
    if (!serviceKey) {
      throw new Error("No service role key available")
    }

    this.serverInstance = createClient<Database>(config.supabase.url!, serviceKey)

    return this.serverInstance
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      error: this.connectionError,
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const client = await this.getClientInstance()
      const { error } = await client.from("thumbnails").select("count").limit(1)
      return !error
    } catch {
      return false
    }
  }
}

export const supabaseManager = new SupabaseManager()

// Legacy compatibility functions
export const createClientSupabaseClient = () => supabaseManager.getClientInstance()
export const createServerSupabaseClient = () => supabaseManager.getServerInstance()
