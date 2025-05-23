import { createClient } from "@supabase/supabase-js"

// 型定義を既存のスキーマに合わせて更新
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

// クライアント側のSupabaseクライアント
let clientSupabaseClient: ReturnType<typeof createClient<Database>> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  // 環境変数の存在確認
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase環境変数が設定されていません。ローカル認証モードで動作します。")
    // ダミークライアントを返す（開発環境用）
    return createDummyClient()
  }

  try {
    clientSupabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
    return clientSupabaseClient
  } catch (error) {
    console.error("Supabaseクライアントの初期化に失敗しました:", error)
    return createDummyClient()
  }
}

// サーバー側のSupabaseクライアント
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("サーバー側Supabase環境変数が設定されていません。ダミークライアントを使用します。")
    return createDummyClient()
  }

  try {
    return createClient<Database>(supabaseUrl, supabaseServiceKey)
  } catch (error) {
    console.error("サーバー側Supabaseクライアントの初期化に失敗しました:", error)
    return createDummyClient()
  }
}

// 開発環境用ダミークライアントを改善
function createDummyClient() {
  const dummyData = {
    data: [],
    error: { message: "Supabase環境変数が設定されていません" },
  }

  return {
    auth: {
      signInWithPassword: async () => ({ error: new Error("Supabase未設定") }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: () => dummyData,
        single: () => ({ data: null, error: new Error("Supabase未設定") }),
        order: () => dummyData,
        limit: () => dummyData,
      }),
      insert: () => ({ error: new Error("Supabase未設定") }),
      update: () => ({ error: new Error("Supabase未設定") }),
      delete: () => ({ error: new Error("Supabase未設定") }),
    }),
  } as any
}
