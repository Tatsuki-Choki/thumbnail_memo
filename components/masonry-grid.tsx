"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface MasonryItem {
  id: number
  title: string
  image_url: string
  category: string
  created_at: string
  views: number
  content?: string
}

interface MasonryGridProps {
  items: MasonryItem[]
  onItemClick?: (item: MasonryItem) => void
  loading?: boolean
}

interface GridConfig {
  columns: number
  gap: number
  minItemWidth: number
}

const getGridConfig = (width: number): GridConfig => {
  if (width <= 640) {
    return { columns: 1, gap: 12, minItemWidth: 280 }
  } else if (width <= 768) {
    return { columns: 2, gap: 16, minItemWidth: 250 }
  } else if (width <= 1024) {
    return { columns: 3, gap: 20, minItemWidth: 220 }
  } else if (width <= 1280) {
    return { columns: 4, gap: 24, minItemWidth: 200 }
  } else {
    return { columns: 5, gap: 24, minItemWidth: 200 }
  }
}

export function MasonryGrid({ items, onItemClick, loading = false }: MasonryGridProps) {
  const [gridConfig, setGridConfig] = useState<GridConfig>({ columns: 3, gap: 20, minItemWidth: 220 })
  const [columnHeights, setColumnHeights] = useState<number[]>([])
  const [itemPositions, setItemPositions] = useState<Map<number, { x: number; y: number; width: number }>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const [containerHeight, setContainerHeight] = useState(0)

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const newConfig = getGridConfig(width)
        setGridConfig(newConfig)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate masonry layout
  const calculateLayout = useCallback(() => {
    if (!containerRef.current || items.length === 0) {
      setContainerHeight(0)
      return
    }

    const containerWidth = containerRef.current.offsetWidth
    const { columns, gap } = gridConfig
    const itemWidth = (containerWidth - gap * (columns - 1)) / columns

    const heights = new Array(columns).fill(0)
    const positions = new Map<number, { x: number; y: number; width: number }>()

    items.forEach((item) => {
      const itemElement = itemRefs.current.get(item.id)
      if (!itemElement) return

      // Find shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))
      const x = shortestColumnIndex * (itemWidth + gap)
      const y = heights[shortestColumnIndex]

      // Get actual height of the item
      const itemHeight = itemElement.offsetHeight || 300

      positions.set(item.id, { x, y, width: itemWidth })
      heights[shortestColumnIndex] += itemHeight + gap
    })

    setColumnHeights(heights)
    setItemPositions(positions)

    // Calculate container height safely
    const maxHeight = heights.length > 0 ? Math.max(...heights) : 0
    setContainerHeight(maxHeight > 0 ? maxHeight : 400) // Default height if calculation is invalid
  }, [items, gridConfig])

  // Recalculate layout when items or config changes
  useEffect(() => {
    const timer = setTimeout(calculateLayout, 100)
    return () => clearTimeout(timer)
  }, [calculateLayout])

  // Handle image load to recalculate layout
  const handleImageLoad = useCallback(() => {
    calculateLayout()
  }, [calculateLayout])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "今日"
    if (diffDays === 1) return "昨日"
    if (diffDays < 7) return `${diffDays}日前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  // If no items, show a message instead of an empty container
  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p>サムネイルがありません。</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight || "auto" }} // Use 'auto' as fallback
    >
      <AnimatePresence>
        {items.map((item) => {
          const position = itemPositions.get(item.id)
          if (!position) return null

          return (
            <motion.div
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el)
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: position.x,
                y: position.y,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute cursor-pointer group"
              style={{ width: position.width }}
              onClick={() => onItemClick?.(item)}
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={handleImageLoad}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{item.views} views</span>
                        <span className="bg-white bg-opacity-20 px-2 py-1 rounded">{item.category}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
