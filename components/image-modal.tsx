"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Eye, Calendar } from "lucide-react"
import { getCategorySlug } from "@/lib/categories"

interface ImageModalProps {
  item: {
    id: number
    title: string
    image_url: string
    category: string
    created_at: string
    views: number
    content?: string
  }
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ item, isOpen, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">{item.category}</span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye size={16} />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
              {/* Image */}
              <div className="flex-1 relative bg-gray-50 flex items-center justify-center">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>

              {/* Details */}
              <div className="lg:w-80 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h2>

                {item.content && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">詳細</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">カテゴリー</h3>
                    <Link
                      href={`/category/${getCategorySlug(item.category)}`}
                      className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
                    >
                      <span>{item.category}</span>
                      <ExternalLink size={14} />
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">投稿日</h3>
                    <p className="text-sm text-gray-600">{formatDate(item.created_at)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">視聴回数</h3>
                    <p className="text-sm text-gray-600">{item.views.toLocaleString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <Link
                    href={`/post/${item.id}`}
                    className="block w-full text-center bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                  >
                    詳細ページを見る
                  </Link>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + `/post/${item.id}`)
                      // You could add a toast notification here
                    }}
                    className="block w-full text-center border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
                  >
                    リンクをコピー
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
