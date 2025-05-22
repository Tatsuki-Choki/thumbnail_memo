"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function LogoutPage() {
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      router.push("/admin/login")
    }

    logout()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>ログアウト中...</p>
    </div>
  )
}
