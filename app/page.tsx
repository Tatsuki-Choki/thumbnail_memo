import { Sidebar } from "@/components/sidebar"
import { ThumbnailGrid } from "@/components/thumbnail-grid"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  // フィーチャーコンテンツ
  const featuredContent = {
    id: 5,
    title: "Climax Jump – AAA DEN-O form // covered by 神崎・白鳥・安芸・初瀬川",
    image: "/images/music-cover.png",
    category: "音楽・ミュージック",
    views: "56.7万",
    date: "2024-04-15",
  }

  // トレンドコンテンツ
  const trendingContent = [
    {
      id: 1,
      title: "買ってよかった！生活を劇的に変えたアイテム10選【ベストバイ】",
      image: "/images/best-buy-items.png",
      views: "45.2万",
    },
    {
      id: 9,
      title: "【COD:MW3】視聴へのかいまっチャ！w/あらたか、ふらんしすこ、ぎゃんしー【ホロライブ】",
      image: "/images/cod-gameplay.png",
      views: "41.3万",
    },
    {
      id: 11,
      title: "【優勝なるか？】総勢200名超えの大型トーナメント参戦！",
      image: "/images/tournament.png",
      views: "38.9万",
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

          {/* フィーチャーコンテンツ */}
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
              注目コンテンツ
            </h3>
            <Link href={`/post/${featuredContent.id}`} className="group">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={featuredContent.image || "/placeholder.svg"}
                  alt={featuredContent.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-4 rounded">
                  <h4 className="text-white font-bold text-lg mb-2">{featuredContent.title}</h4>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>{featuredContent.category}</span>
                    <span>{featuredContent.views}回視聴</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* トレンドコンテンツ */}
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-red-600 mr-2 rounded-sm"></span>
              トレンド
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trendingContent.map((content) => (
                <Link key={content.id} href={`/post/${content.id}`} className="group">
                  <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={content.image || "/placeholder.svg"}
                        alt={content.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {content.views}回視聴
                      </div>
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
