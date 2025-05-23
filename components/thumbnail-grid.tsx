import type React from "react"
import Image from "next/image"

export interface ThumbnailGridProps {
  images: { image_url: string; title: string }[]
}

export function ThumbnailGrid({ images }: ThumbnailGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((thumbnail, index) => (
        <div key={index} className="relative aspect-video">
          <Image
            src={thumbnail.image_url || "/placeholder.svg"}
            alt={thumbnail.title}
            width={640}
            height={360}
            className="w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

export default ThumbnailGrid
