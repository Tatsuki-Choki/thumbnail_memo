import Image from "next/image"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase"

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

// 正しいインターフェースを定義
export interface ThumbnailGridProps {
  // 静的なデータを渡す場合
  images?: {
    id: number
    image_url: string
    title: string
    created_at: string
    category: string
  }[]
  // カテゴリーで動的にフィルタする場合
  category?: string
}

export async function ThumbnailGrid({ images, category }: ThumbnailGridProps) {
  let thumbnails = images

  // imagesが提供されていない場合は、Supabaseから取得
  if (!thumbnails) {
    try {
      const supabase = createServerSupabaseClient()

      let query = supabase.from("thumbnails").select("*").order("created_at", { ascending: false })

      if (category) {
        query = query.eq("category", category)
      }

      const { data, error } = await query

      if (error) {
        console.error("データベースエラー:", error)
        thumbnails = []
      } else {
        thumbnails = data || []
      }
    } catch (error) {
      console.error("Supabase接続エラー:", error)
      thumbnails = []
    }
  }

  if (!thumbnails || thumbnails.length === 0) {
    return <p className="text-center text-sm text-gray-500">データがありません。</p>
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
      {thumbnails.map((thumbnail, index) => (
        <Link key={thumbnail.id} href={`/post/${thumbnail.id}`} className="group mb-6 break-inside-avoid">
          <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
            <div className="relative aspect-video">
              <Image
                src={thumbnail.image_url || "/placeholder.svg"}
                alt={thumbnail.title}
                width={640}
                height={360}
                priority={index < 4}
                className="w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2">{thumbnail.title}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{formatDate(thumbnail.created_at)}</span>
                <span className="text-xs text-gray-500">{thumbnail.category}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
