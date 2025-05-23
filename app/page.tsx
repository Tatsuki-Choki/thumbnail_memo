import { Sidebar } from "@/components/sidebar"
import { ThumbnailGrid } from "@/components/thumbnail-grid"
import Link from "next/link"

export default function Home() {


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm md:text-base text-gray-700 mb-8">
            目を惹かれる良質なデザインのサムネイルを集めたギャラリーサイト
          </h2>





          {/* 最新コンテンツ */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
              最新コンテンツ
            </h3>
            <ThumbnailGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
