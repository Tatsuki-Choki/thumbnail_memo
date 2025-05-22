import type { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">サムメモ管理</h1>
          <p className="text-xs text-gray-400 mt-1">管理者パネル</p>
        </div>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/dashboard" className="p-2 hover:bg-gray-700 rounded">
            ダッシュボード
          </Link>
          <Link href="/admin/thumbnails" className="p-2 hover:bg-gray-700 rounded">
            サムネイル管理
          </Link>
          <Link href="/admin/thumbnails/new" className="p-2 hover:bg-gray-700 rounded">
            新規サムネイル
          </Link>
          <div className="border-t border-gray-700 my-4 pt-4">
            <Link href="/" className="p-2 hover:bg-gray-700 rounded">
              サイト表示
            </Link>
            <Link href="/admin/logout" className="p-2 hover:bg-gray-700 rounded text-red-300">
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
