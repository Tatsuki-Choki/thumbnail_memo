import Link from "next/link"

const categories = [
  { id: "challenge", name: "チャレンジ・やってみた" },
  { id: "review", name: "レビュー・紹介・解説" },
  { id: "game", name: "ゲーム・実況" },
  { id: "vtuber", name: "Vtuber" },
  { id: "live", name: "LIVE・ラジオ" },
  { id: "society", name: "社会・会社" },
  { id: "business", name: "ビジネス・教養" },
  { id: "kids", name: "ベビー・子供・キッズ・教育" },
  { id: "web", name: "Web・IT・テクノロジー" },
  { id: "design", name: "デザイン・ものづくり" },
  { id: "lifestyle", name: "暮らし・経費・インテリア" },
  { id: "vlog", name: "Vlog・日常" },
  { id: "music", name: "音楽・ミュージック" },
  { id: "anime", name: "漫画・アニメ・本" },
  { id: "fashion", name: "美容・ファッション" },
  { id: "entertainment", name: "エンタメ・バラエティ" },
  { id: "tv", name: "映画・テレビ・芸能" },
  { id: "food", name: "料理・グルメ" },
  { id: "pets", name: "植物・ペット・生物" },
  { id: "culture", name: "カルチャー・芸術" },
  { id: "sports", name: "スポーツ・健康・運動" },
  { id: "medical", name: "病院・医療" },
  { id: "science", name: "科学・研究" },
  { id: "travel", name: "旅行・観光" },
]

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
