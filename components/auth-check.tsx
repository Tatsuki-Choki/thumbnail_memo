"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push("/admin/login")
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>認証を確認中...</p>
      </div>
    )
  }

  return <>{children}</>
}
