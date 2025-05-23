"use client"

import { useState, useEffect } from "react"
import { MasonryGrid } from "./masonry-grid"
import { ImageModal } from "./image-modal"
import { supabaseManager } from "@/lib/supabase-enhanced"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ThumbnailGridProps {
  category?: string
  limit?: number
}

interface ThumbnailItem {
  id: number
  title: string
  image_url: string
  category: string
  created_at: string
  views: number
  content?: string
}

// Sample data for development/fallback
const SAMPLE_THUMBNAILS: ThumbnailItem[] = [
  {
    id: 1,
    title: "デザイン思考入門：UXデザインの基本原則",
    image_url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Web・IT・テクノロジー",
    created_at: new Date().toISOString(),
    views: 1245,
    content: "デザイン思考の基本原則とUXデザインの重要性について解説しています。",
  },
  {
    id: 2,
    title: "最新ゲームレビュー：ドラゴンクエスト最新作",
    image_url: "https://i.ytimg.com/vi/sloe7NYyt4Y/maxresdefault.jpg",
    category: "ゲーム・実況",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    views: 3782,
    content: "ドラゴンクエスト最新作のレビューと攻略のポイントを紹介します。",
  },
  {
    id: 3,
    title: "プログラミング初心者向け：JavaScriptの基礎",
    image_url: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    category: "Web・IT・テクノロジー",
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    views: 2156,
    content: "JavaScriptの基礎から応用までを初心者向けに解説しています。",
  },
]

export function EnhancedThumbnailGrid({ category, limit }: ThumbnailGridProps) {
  const [thumbnails, setThumbnails] = useState<ThumbnailItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<ThumbnailItem | null>(null)
  const [connectionStatus, setConnectionStatus] = useState({ isConnected: false, error: null })

  useEffect(() => {
    fetchThumbnails()
  }, [category, limit])

  const fetchThumbnails = async () => {
    try {
      setLoading(true)
      setError(null)

      const supabase = await supabaseManager.getClientInstance()

      let query = supabase.from("thumbnails").select("*").order("created_at", { ascending: false })

      if (category) {
        query = query.eq("category", category)
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      setThumbnails(data || [])
      setConnectionStatus({ isConnected: true, error: null })
    } catch (err: any) {
      console.error("Failed to fetch thumbnails:", err)
      setError(err.message)
      setConnectionStatus({ isConnected: false, error: err.message })

      // Fallback to sample data for development
      if (process.env.NODE_ENV === "development") {
        console.log("Using sample data as fallback")
        setThumbnails(SAMPLE_THUMBNAILS)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleItemClick = (item: ThumbnailItem) => {
    setSelectedItem(item)
    // Increment view count
    incrementViewCount(item.id)
  }

  const incrementViewCount = async (id: number) => {
    try {
      const supabase = await supabaseManager.getClientInstance()
      await supabase
        .from("thumbnails")
        .update({ views: thumbnails.find((t) => t.id === id)?.views + 1 || 1 })
        .eq("id", id)
    } catch (err) {
      console.error("Failed to increment view count:", err)
    }
  }

  if (error && !connectionStatus.isConnected && thumbnails.length === 0) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>データベースに接続できません: {error}</AlertDescription>
        </Alert>
        <div className="text-center py-8">
          <button onClick={fetchThumbnails} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            再試行
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <MasonryGrid items={thumbnails} onItemClick={handleItemClick} loading={loading} />

      {selectedItem && <ImageModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  )
}
