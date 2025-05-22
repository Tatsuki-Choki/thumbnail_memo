import Image from "next/image"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { getCategorySlug } from "@/lib/categories"
import { createServerSupabaseClient } from "@/lib/supabase"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()
  const { data: post } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!post) {
    return (
      <div className="p-6">
        <p>投稿が見つかりませんでした。</p>
      </div>
    )
  }

  const { data: relatedPosts } = await supabase
    .from("thumbnails")
    .select("*")
    .eq("category", post.category)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2">
            <Link href="/" className="text-red-600 hover:underline text-sm">
              ホーム
            </Link>{" "}&gt;{" "}
            <Link href={`/category/${getCategorySlug(post.category)}`} className="text-red-600 hover:underline text-sm">
              {post.category}
            </Link>
          </div>

          <article className="mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-6 flex items-center justify-between">
              <span>{formatDate(post.created_at)}</span>
            </div>

            <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
              <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose max-w-none">
              <p>{post.content}</p>
            </div>
          </article>

          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">関連コンテンツ</h2>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/post/${related.id}`}
                    className="group mb-4 break-inside-avoid"
                  >
                    <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
                      <div className="relative">
                        <Image
                          src={related.image_url || "/placeholder.svg"}
                          alt={related.title}
                          width={600}
                          height={400}
                          className="w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium line-clamp-2">{related.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
