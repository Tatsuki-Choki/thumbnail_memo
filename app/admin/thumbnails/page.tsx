import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function ThumbnailsPage() {
  const supabase = createServerSupabaseClient()

  let thumbnails: any[] = []
  try {
    const { data, error } = await supabase
      .from("thumbnails")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) {
      throw error
    }
    thumbnails = data || []
  } catch (e) {
    console.error("Error fetching thumbnails:", e)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">サムネイル管理</h1>
        <Link href="/admin/thumbnails/new">
          <Button>新規サムネイル追加</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>サムネイル一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {thumbnails && thumbnails.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {thumbnails.map((thumbnail) => (
                <div
                  key={thumbnail.id}
                  className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={thumbnail.image_url || "/placeholder.svg"}
                      alt={thumbnail.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium line-clamp-1">{thumbnail.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{thumbnail.category}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-500">
                        {new Date(thumbnail.created_at).toLocaleDateString("ja-JP")}
                      </span>
                      <div className="space-x-2">
                        <Link
                          href={`/admin/thumbnails/${thumbnail.id}`}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                          編集
                        </Link>
                        <Link
                          href={`/admin/thumbnails/${thumbnail.id}/delete`}
                          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          削除
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">サムネイルがまだ登録されていません。</p>
              <Link href="/admin/thumbnails/new">
                <Button>最初のサムネイルを追加する</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
