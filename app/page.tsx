import { Sidebar } from "@/components/sidebar"
import { ThumbnailGrid } from "@/components/thumbnail-grid"
import Image from "next/image"
import Link from "next/link"

export default function Home() {

  // トレンドコンテンツ
  const trendingContent = [
    {
      id: 1,
      title: "買ってよかった！生活を劇的に変えたアイテム10選【ベストバイ】",
      image: "/images/best-buy-items.png",
    },
    {
      id: 9,
      title: "【COD:MW3】視聴へのかいまっチャ！w/あらたか、ふらんしすこ、ぎゃんしー【ホロライブ】",
      image: "/images/cod-gameplay.png",
    },
    {
      id: 11,
      title: "【優勝なるか？】総勢200名超えの大型トーナメント参戦！",
      image: "/images/tournament.png",
    },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm md:text-base text-gray-700 mb-8">
            目を惹かれる良質なデザインのサムネイルを集めたギャラリーサイト
          </h2>



          {/* トレンドコンテンツ */}
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
              トレンド
            </h3>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {trendingContent.map((content) => (
                <Link
                  key={content.id}
                  href={`/post/${content.id}`}
                  className="group mb-4 break-inside-avoid"
                >
                  <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
                    <div className="relative">
                      <Image
                        src={content.image || "/placeholder.svg"}
                        alt={content.title}
                        width={600}
                        height={400}
                        className="w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium line-clamp-2">{content.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

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
