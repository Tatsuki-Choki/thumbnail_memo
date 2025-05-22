import Link from "next/link"
import { categories } from "@/lib/categories"

export function Sidebar() {
  return (
    <aside className="w-full md:w-[195px] flex-shrink-0 bg-red-600 text-white">
      <div className="p-4 md:p-6 border-b border-red-700">
        <Link href="/" className="block">
          <h1 className="text-3xl font-bold tracking-tight">サムメモ</h1>
          <p className="text-xs mt-1 text-red-100">Thumbnail Gallery Website</p>
        </Link>
      </div>
      <div className="p-2">
        <h2 className="px-2 py-3 text-xl font-bold flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-list"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
          </span>
          CATEGORY
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="block px-2 py-1.5 text-sm hover:bg-red-700 transition-colors rounded flex items-center"
            >
              <span className="w-1 h-1 bg-red-300 rounded-full mr-2"></span>
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-4 p-2">
        <Link
          href="/admin/login"
          className="block px-2 py-2 text-sm bg-red-700 hover:bg-red-800 transition-colors rounded text-center"
        >
          管理者ログイン
        </Link>
      </div>
    </aside>
  )
}
