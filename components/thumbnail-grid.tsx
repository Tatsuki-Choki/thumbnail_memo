import Image from "next/image"
import Link from "next/link"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "今日"
  } else if (diffDays === 1) {
    return "昨日"
  } else if (diffDays < 7) {
    return `${diffDays}日前`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}週間前`
  } else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
}

// サンプルデータ
const thumbnails = [
  {
    id: 1,
    title: "買ってよかった！生活を劇的に変えたアイテム10選【ベストバイ】",
    image: "/images/best-buy-items.png",
    category: "チャレンジ・やってみた",
    views: "45.2万",
    date: "2024-05-01",
  },
  {
    id: 2,
    title: "【山田五郎×中田】機械式時計はアート。対談2時間SP",
    image: "/images/watch-discussion.png",
    category: "レビュー・紹介・解説",
    views: "32.8万",
    date: "2024-04-28",
  },
  {
    id: 3,
    title: "【#ガッチェ主相談#】VTuberのお悩み相談【やんしき/ガッチェマン】",
    image: "/images/vtuber-consultation.png",
    category: "Vtuber",
    views: "18.5万",
    date: "2024-05-10",
  },
  {
    id: 4,
    title: "【食前】大手病で悩む友人と安かるんの決定的な違いをブログ仕事！",
    image: "/images/business-discussion.png",
    category: "ビジネス・教養",
    views: "22.3万",
    date: "2024-05-05",
  },
  {
    id: 5,
    title: "Climax Jump – AAA DEN-O form // covered by 神崎・白鳥・安芸・初瀬川",
    image: "/images/music-cover.png",
    category: "音楽・ミュージック",
    views: "56.7万",
    date: "2024-04-15",
  },
  {
    id: 6,
    title: "絵画「ダリ・ファンド」トゥ　ダリ予告編（ロングver.）",
    image: "/images/dali-exhibition.png",
    category: "カルチャー・芸術",
    views: "12.9万",
    date: "2024-05-12",
  },
  {
    id: 7,
    title: "【apex/生配信】みんなで一緒にダイヤの空気よ～",
    image: "/images/apex-gameplay.png",
    category: "ゲーム・実況",
    views: "34.1万",
    date: "2024-05-15",
  },
  {
    id: 8,
    title: "【戸田恵梨香】「ASK ME ANYTHING」ELLE Japan",
    image: "/images/elle-interview.png",
    category: "エンタメ・バラエティ",
    views: "28.6万",
    date: "2024-04-30",
  },
  {
    id: 9,
    title: "【COD:MW3】視聴へのかいまっチャ！w/あらたか、ふらんしすこ、ぎゃんしー【ホロライブ】",
    image: "/images/cod-gameplay.png",
    category: "ゲーム・実況",
    views: "41.3万",
    date: "2024-05-08",
  },
  {
    id: 10,
    title: "【横浜行ったら】横浜中華街を歩いて横浜を眺めたいと思高の映像をひたすら流してみました",
    image: "/images/yokohama-tour.png",
    category: "旅行・観光",
    views: "15.7万",
    date: "2024-05-03",
  },
  {
    id: 11,
    title: "【優勝なるか？】総勢200名超えの大型トーナメント参戦！",
    image: "/images/tournament.png",
    category: "ゲーム・実況",
    views: "38.9万",
    date: "2024-04-25",
  },
  {
    id: 12,
    title: "【ドラクエ6】「バーバラ入り」で大魔王ミルドラースに挑戦！！",
    image: "/images/dragon-quest.png",
    category: "ゲーム・実況",
    views: "27.4万",
    date: "2024-05-11",
  },
]

export function ThumbnailGrid() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      {thumbnails.map((thumbnail) => (
        <Link
          key={thumbnail.id}
          href={`/post/${thumbnail.id}`}
          className="group mb-6 break-inside-avoid"
        >
          <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
            <div className="relative">
              <Image
                src={thumbnail.image || "/placeholder.svg"}
                alt={thumbnail.title}
                width={600}
                height={400}
                className="w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2">{thumbnail.title}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{formatDate(thumbnail.date)}</span>
                <span className="text-xs text-gray-500">{thumbnail.category}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
