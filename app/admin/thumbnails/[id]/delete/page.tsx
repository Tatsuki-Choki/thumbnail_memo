"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"
import Link from "next/link"

export default function DeleteThumbnailPage({ params }: { params: { id: string } }) {
  const [thumbnail, setThumbnail] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

        setThumbnail(data)
      } catch (error: any) {
        setError("サムネイル情報の取得に失敗しました: " + error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchThumbnail()
  }, [thumbnailId, supabase])

  // サムネイルを削除
  const handleDelete = async () => {
    setDeleting(true)
    setError(null)

    try {
      const { error } = await supabase.from("thumbnails").delete().eq("id", thumbnailId)

      if (error) {
        throw error
      }

      // 削除成功後、サムネイル一覧ページにリダイレクト
      router.push("/admin/thumbnails")
      router.refresh()
    } catch (error: any) {
      setError("サムネイルの削除に失敗しました: " + error.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p>読み込み中...</p>
      </div>
    )
  }

  if (error && !thumbnail) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <Link href="/admin/thumbnails">
            <Button variant="outline">サムネイル一覧に戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">サムネイル削除確認</h1>
        <Link href="/admin/thumbnails">
          <Button variant="outline">サムネイル一覧に戻る</Button>
        </Link>
      </div>

      <Card className="border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <CardTitle className="text-red-700">このサムネイルを削除しますか？</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {thumbnail && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 relative aspect-video">
                  <Image
                    src={thumbnail.image_url || "/placeholder.svg"}
                    alt={thumbnail.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="font-bold text-lg mb-2">{thumbnail.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">カテゴリー: {thumbnail.category}</p>
                  <p className="text-sm text-gray-500 mb-1">視聴回数: {thumbnail.views}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    作成日: {new Date(thumbnail.created_at).toLocaleDateString("ja-JP")}
                  </p>
                  <p className="text-sm line-clamp-2">{thumbnail.content}</p>
                </div>
              </div>

              <div className="border-t border-red-100 pt-4 mt-6">
                <p className="text-red-600 font-medium mb-4">
                  この操作は取り消せません。このサムネイルを完全に削除してもよろしいですか？
                </p>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => router.push("/admin/thumbnails")}>
                    キャンセル
                  </Button>
                  <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                    {deleting ? "削除中..." : "サムネイルを削除"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
