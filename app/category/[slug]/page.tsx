import { Sidebar } from "@/components/sidebar"
import { ThumbnailGrid } from "@/components/thumbnail-grid"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-6">カテゴリー: {getCategoryName(params.slug)}</h1>
          <ThumbnailGrid />
        </div>
      </main>
    </div>
  )
}

function getCategoryName(slug: string): string {
  const categories: Record<string, string> = {
    challenge: "チャレンジ・やってみた",
    review: "レビュー・紹介・解説",
    game: "ゲーム・実況",
    vtuber: "Vtuber",
    live: "LIVE・ラジオ",
    society: "社会・会社",
    business: "ビジネス・教養",
    kids: "ベビー・子供・キッズ・教育",
    web: "Web・IT・テクノロジー",
    design: "デザイン・ものづくり",
    lifestyle: "暮らし・経費・インテリア",
    vlog: "Vlog・日常",
    music: "音楽・ミュージック",
    anime: "漫画・アニメ・本",
    fashion: "美容・ファッション",
    entertainment: "エンタメ・バラエティ",
    tv: "映画・テレビ・芸能",
    food: "料理・グルメ",
    pets: "植物・ペット・生物",
    culture: "カルチャー・芸術",
    sports: "スポーツ・健康・運動",
    medical: "病院・医療",
    science: "科学・研究",
    travel: "旅行・観光",
  }

  return categories[slug] || slug
}
