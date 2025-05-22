import type { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">サムメモ管理</h1>
          <p className="text-xs text-muted-foreground mt-1">管理者パネル</p>
        </div>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link href="/admin/dashboard" className="rounded p-2 hover:bg-accent">
            ダッシュボード
          </Link>
          <Link href="/admin/thumbnails" className="rounded p-2 hover:bg-accent">
            サムネイル管理
          </Link>
          <Link href="/admin/thumbnails/new" className="rounded p-2 hover:bg-accent">
            新規サムネイル
          </Link>
          <div className="border-t pt-4 mt-4">
            <Link href="/" className="rounded p-2 hover:bg-accent">
              サイト表示
            </Link>
            <Link href="/admin/logout" className="rounded p-2 hover:bg-accent text-red-600">
              ログアウト
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  )
}
