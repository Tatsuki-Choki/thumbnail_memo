"use client"

import type React from "react"

import { useEffect, useState } from "react"
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

export default function EditThumbnailPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [views, setViews] = useState("0")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClientSupabaseClient()
  const thumbnailId = params.id

  // サムネイル情報を取得
  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const { data, error } = await supabase.from("thumbnails").select("*").eq("id", thumbnailId).single()

        if (error) {
          throw error
        }

        // フォームに値をセット
        setTitle(data.title)
        setImageUrl(data.image_url)
        setCategory(data.category)
        setContent(data.content || "")
        setViews(data.views.toString())
      } catch (error: any) {
        setError("サムネイル情報の取得に失敗しました: " + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchThumbnail()
  }, [thumbnailId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // 入力値の検証
      if (!title || !imageUrl || !category) {
        throw new Error("タイトル、画像URL、カテゴリーは必須項目です。")
      }

      // サムネイルを更新
      const { error } = await supabase
        .from("thumbnails")
        .update({
          title,
          image_url: imageUrl,
          category,
          content,
          views: Number.parseInt(views) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", thumbnailId)

      if (error) {
        throw error
      }

      setSuccess(true)

      // 3秒後にサムネイル一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/admin/thumbnails")
        router.refresh()
      }, 3000)
    } catch (error: any) {
      setError(error.message || "サムネイルの更新に失敗しました。")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p>読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">サムネイル編集</h1>
        <div className="space-x-2">
          <Link href={`/admin/thumbnails/${thumbnailId}/delete`}>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              削除
            </Button>
          </Link>
          <Link href="/admin/thumbnails">
            <Button variant="outline">サムネイル一覧に戻る</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>サムネイル情報編集</CardTitle>
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
                サムネイルが正常に更新されました。まもなくサムネイル一覧ページにリダイレクトします。
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>

            <div className="pt-4 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/thumbnails")}>
                キャンセル
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "保存中..." : "変更を保存"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
