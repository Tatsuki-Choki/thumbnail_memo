"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"
import { categories } from "@/lib/categories"
import Link from "next/link"

// YouTube helper
async function fetchYoutubeInfo(url: string) {
  const res = await fetch(`/api/youtube?url=${encodeURIComponent(url)}`)
  if (!res.ok) {
    throw new Error("YouTube情報の取得に失敗しました")
  }
  return (await res.json()) as {
    title: string
    imageUrl: string
    viewCount: string
  }
}

export default function NewThumbnailPage() {
  const [title, setTitle] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [views, setViews] = useState("0")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const handleFetchInfo = async () => {
    try {
      setFetching(true)
      setError(null)
      const data = await fetchYoutubeInfo(youtubeUrl)
      setTitle(data.title)
      setImageUrl(data.imageUrl)
      setViews(data.viewCount)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // 入力値の検証
      if (!title || !imageUrl || !category) {
        throw new Error("タイトル、画像URL、カテゴリーは必須項目です。")
      }

      // Supabaseクライアントの初期化を試行
      try {
        const supabase = createClientSupabaseClient()

        // サムネイルをデータベースに追加
        const { error } = await supabase.from("thumbnails").insert([
          {
            title,
            image_url: imageUrl,
            category,
            content,
            views: Number.parseInt(views) || 0,
          },
        ])

        if (error) {
          throw error
        }

        setSuccess(true)

        // フォームをリセット
        setTitle("")
        setYoutubeUrl("")
        setImageUrl("")
        setCategory("")
        setContent("")
        setViews("0")

        // 3秒後にサムネイル一覧ページにリダイレクト
        setTimeout(() => {
          router.push("/admin/thumbnails")
          router.refresh()
        }, 3000)
      } catch (supabaseError: any) {
        console.error("Supabase操作エラー:", supabaseError)
        throw new Error("データベースへの保存に失敗しました。管理者に連絡してください。")
      }
    } catch (error: any) {
      setError(error.message || "サムネイルの追加に失敗しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">新規サムネイル追加</h1>
        <Link href="/admin/thumbnails">
          <Button variant="outline">サムネイル一覧に戻る</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>サムネイル情報入力</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>
                サムネイルが正常に追加されました。まもなくサムネイル一覧ページにリダイレクトします。
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube動画URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <Button type="button" onClick={handleFetchInfo} disabled={fetching || !youtubeUrl}>
                  {fetching ? "取得中..." : "情報取得"}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                URLを入力して情報取得を押すとタイトルとサムネイルを自動入力します。
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">タイトル *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="サムネイルのタイトルを入力"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">画像URL *</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-gray-500">画像のURLを入力してください。推奨サイズ: 1280x720px</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリー *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリーを選択" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">コンテンツ詳細</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="サムネイルの詳細内容を入力"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="views">視聴回数</Label>
              <Input
                id="views"
                type="number"
                min="0"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                placeholder="0"
              />
              <p className="text-xs text-gray-500">初期視聴回数を設定できます。未入力の場合は0になります。</p>
            </div>

            <div className="pt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/thumbnails")}>
                キャンセル
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "保存中..." : "サムネイルを保存"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
