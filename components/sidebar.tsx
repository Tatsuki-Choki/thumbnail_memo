import Link from "next/link"
import { categories } from "@/lib/categories"

export function Sidebar() {
  return (
    <aside className="w-full md:w-60 flex-shrink-0 bg-background border-r">
      <div className="p-4 md:p-6">
        <Link href="/" className="block">
          <h1 className="text-3xl font-bold tracking-tight text-primary">サムメモ</h1>
          <p className="text-xs mt-1 text-muted-foreground">Thumbnail Gallery Website</p>
        </Link>
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-sm font-semibold text-muted-foreground flex items-center uppercase tracking-wider">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          Category
        </h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-4 p-4">
        <Link
          href="/admin/login"
          className="block w-full text-center rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          管理者ログイン
        </Link>
      </div>
    </aside>
  )
}
