import { Sidebar } from "@/components/sidebar"
import { ThumbnailGrid } from "@/components/thumbnail-grid"
import { getCategoryName } from "@/lib/categories"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = getCategoryName(params.slug)
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-6">カテゴリー: {categoryName}</h1>
          <ThumbnailGrid category={categoryName} />
        </div>
      </main>
    </div>
  )
}
