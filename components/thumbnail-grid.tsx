"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase"

interface ThumbnailGridProps {
 category?: string
}

export function ThumbnailGrid({ category }: ThumbnailGridProps) {
 const [thumbnails, setThumbnails] = React.useState<any[]>([])
 const [loading, setLoading] = React.useState(true)

 React.useEffect(() => {
   const fetchThumbnails = async () => {
     const supabase = createClientSupabaseClient()
     
     let query = supabase.from("thumbnails").select("*").order("created_at", { ascending: false })
     
     if (category) {
       query = query.eq("category", category)
     }
     
     const { data } = await query
     setThumbnails(data || [])
     setLoading(false)
   }

   fetchThumbnails()
 }, [category])

 if (loading) {
   return <div className="text-center py-8">読み込み中...</div>
 }

 if (thumbnails.length === 0) {
   return <div className="text-center py-8">サムネイルがありません。</div>
 }

 function formatDate(dateString: string) {
   const date = new Date(dateString)
   return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
 }

 return (
   <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
     {thumbnails.map((thumbnail) => (
       <Link
         key={thumbnail.id}
         href={`/post/${thumbnail.id}`}
         className="group mb-4 break-inside-avoid"
       >
         <div className="overflow-hidden rounded-lg border border-gray-200 transition-all group-hover:shadow-md">
           {/* 16:9 アスペクト比のコンテナ */}
           <div className="relative w-full aspect-[16/9] bg-gray-100">
             <Image
               src={thumbnail.image_url || "/placeholder.svg"}
               alt={thumbnail.title}
               fill
               className="object-cover transition-transform group-hover:scale-105"
               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
             />
           </div>
           <div className="p-3">
             <p className="text-sm font-medium line-clamp-2">{thumbnail.title}</p>
             <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
               <span>{thumbnail.category}</span>
               <span>{formatDate(thumbnail.created_at)}</span>
             </div>
           </div>
         </div>
       </Link>
     ))}
   </div>
 )
}
