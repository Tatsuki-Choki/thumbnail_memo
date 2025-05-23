import type React from "react"
import Image from "next/image"
import Link from "next/link"

interface Thumbnail {
  id: string
  title: string
  image_url?: string
  link: string
}

interface ThumbnailGridProps {
  thumbnails: Thumbnail[]
}

const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({ thumbnails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {thumbnails.map((thumbnail, index) => (
        <Link href={thumbnail.link} key={thumbnail.id} className="group">
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
              <h3 className="text-sm font-medium text-gray-900">{thumbnail.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ThumbnailGrid
