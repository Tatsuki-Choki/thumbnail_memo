import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient()

  // サムネイル数を取得
  const { count: thumbnailCount } = await supabase.from("thumbnails").select("*", { count: "exact", head: true })

  // 最近追加されたサムネイルを取得
  const { data: recentThumbnails } = await supabase
    .from("thumbnails")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">管理者ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>サムネイル総数</CardTitle>
            <CardDescription>登録されているサムネイルの総数</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{thumbnailCount || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>アクション</CardTitle>
            <CardDescription>サムネイル管理アクション</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/thumbnails/new"
              className="block w-full p-2 bg-red-600 text-white text-center rounded hover:bg-red-700"
            >
              新規サムネイル追加
            </Link>
            <Link
              href="/admin/thumbnails"
              className="block w-full p-2 bg-gray-200 text-gray-800 text-center rounded hover:bg-gray-300"
            >
              サムネイル一覧・編集
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>ヘルプ</CardTitle>
            <CardDescription>管理者向けヘルプ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              サムネイルの追加・編集・削除は「サムネイル管理」から行えます。
              問題がある場合は管理者にお問い合わせください。
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近追加されたサムネイル</CardTitle>
          <CardDescription>最近追加された5件のサムネイル</CardDescription>
        </CardHeader>
        <CardContent>
          {recentThumbnails && recentThumbnails.length > 0 ? (
            <div className="space-y-2">
              {recentThumbnails.map((thumbnail) => (
                <div key={thumbnail.id} className="p-3 bg-gray-50 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">{thumbnail.title}</p>
                    <p className="text-sm text-gray-500">
                      {thumbnail.category} • {new Date(thumbnail.created_at).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                  <Link href={`/admin/thumbnails/${thumbnail.id}`} className="text-red-600 hover:underline text-sm">
                    編集
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">サムネイルがまだ登録されていません。</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
