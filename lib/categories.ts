export interface Category {
  id: string
  name: string
}

export const categories: Category[] = [
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

const idToNameMap: Record<string, string> = categories.reduce(
  (acc, cur) => {
    acc[cur.id] = cur.name
    return acc
  },
  {} as Record<string, string>,
)

const nameToIdMap: Record<string, string> = categories.reduce(
  (acc, cur) => {
    acc[cur.name] = cur.id
    return acc
  },
  {} as Record<string, string>,
)

export const getCategoryName = (slug: string): string => {
  return idToNameMap[slug] || slug
}

export const getCategorySlug = (name: string): string => {
  return nameToIdMap[name] || "category"
}
