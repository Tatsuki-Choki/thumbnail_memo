import { Sidebar } from "@/components/sidebar"
import { EnhancedThumbnailGrid } from "@/components/enhanced-thumbnail-grid"
import { Suspense } from "react"

function ThumbnailGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
          <div className="bg-gray-200 h-4 rounded mb-2"></div>
          <div className="bg-gray-200 h-3 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm md:text-base text-gray-700 mb-8">
            目を惹かれる良質なデザインのサムネイルを集めたギャラリーサイト
          </h2>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
              最新コンテンツ
            </h3>
            <Suspense fallback={<ThumbnailGridSkeleton />}>
              <EnhancedThumbnailGrid />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
