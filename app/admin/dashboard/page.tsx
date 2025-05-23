import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient()
  let thumbnailCount = 0
  let recentThumbnails: any[] = []
  let supabaseConnected = false
  let errorMessage = ""

  try {
    // 直接接続テストを行う
    const { data: testData, error: testError } = await supabase.from("thumbnails").select("count").limit(1)

    if (!testError) {
      supabaseConnected = true

      // データを取得
      const { count } = await supabase.from("thumbnails").select("*", { count: "exact", head: true })
      thumbnailCount = count || 0

      const { data } = await supabase.from("thumbnails").select("*").order("created_at", { ascending: false }).limit(5)
      recentThumbnails = data || []
    } else {
      errorMessage = testError.message
    }
  } catch (e: any) {
    console.error("Failed to fetch thumbnails", e)
    supabaseConnected = false
    errorMessage = e.message || "不明なエラー"
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">管理者ダッシュボード</h1>

      {!supabaseConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Supabase接続エラー</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>データベースに接続できません。環境変数を確認してください。</p>
                {errorMessage && <p className="mt-1 text-xs">エラー詳細: {errorMessage}</p>}
                <p className="mt-1">現在はローカル認証モードで動作しています。</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
