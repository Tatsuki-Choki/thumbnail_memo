import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // 管理者ページの保護
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // ログインページは除外
    if (request.nextUrl.pathname === "/admin/login") {
      return res
    }

    try {
      // ローカル認証をチェック（クッキーから）
      const localAdmin = request.cookies.get("localAdmin")?.value
      if (localAdmin !== "true") {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch (error) {
      console.error("認証エラー:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
