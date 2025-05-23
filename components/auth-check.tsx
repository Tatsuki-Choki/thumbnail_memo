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
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          setIsLoading(false)
          return
        }
      } catch (err) {
        console.error("Supabase session check failed", err)
      }

      const local = localStorage.getItem("localAdmin")
      if (local === "true") {
        setIsLoading(false)
        return
      }

      router.push("/admin/login")
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
