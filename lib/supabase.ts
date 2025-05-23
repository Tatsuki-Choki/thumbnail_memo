import { createClient } from "@supabase/supabase-js"

// クライアント側のSupabaseクライアント
let clientSupabaseClient: ReturnType<typeof createClient> | null = null

export const createClientSupabaseClient = () => {
  if (clientSupabaseClient) return clientSupabaseClient

  // 環境変数の存在確認
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase環境変数が設定されていません。")
    // フォールバック値を使用せず、エラーを投げる
    throw new Error("Supabase環境変数が設定されていません。管理者に連絡してください。")
  }

  try {
    clientSupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    return clientSupabaseClient
  } catch (error) {
    console.error("Supabaseクライアントの初期化に失敗しました:", error)
    throw new Error("Supabaseクライアントの初期化に失敗しました。環境変数を確認してください。")
  }
}

// サーバー側のSupabaseクライアント
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("サーバー側Supabase環境変数が設定されていません。")
    throw new Error("サーバー側Supabase環境変数が設定されていません。")
  }

  try {
    return createClient(supabaseUrl, supabaseServiceKey)
  } catch (error) {
    console.error("サーバー側Supabaseクライアントの初期化に失敗しました:", error)
    throw new Error("サーバー側Supabaseクライアントの初期化に失敗しました。")
  }
}
