"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function AdminRootPage() {
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          router.replace("/admin/dashboard")
          return
        }
      } catch (e) {
        console.error("Supabase session error", e)
      }
      const local = localStorage.getItem("localAdmin")
      if (local === "true") {
        router.replace("/admin/dashboard")
      } else {
        router.replace("/admin/login")
      }
    }
    check()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  )
}
