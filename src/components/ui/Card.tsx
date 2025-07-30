// components/ui/Card.tsx
import React from 'react'
import { FiHeart, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  variant?: 'default' | 'featured' | 'minimal'
  title: string
  price: number
  imageUrl: string
  brand?: string
  rating?: number
  reviewCount?: number
  description?: string
  href: string
  onAddToCart?: () => void
  onAddToWishlist?: () => void
  className?: string
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  title,
  price,
  imageUrl,
  brand,
  rating,
  reviewCount,
  description,
  href,
  onAddToCart,
  onAddToWishlist,
  className = ''
}) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  const renderRating = () => {
    if (!rating) return null
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        {reviewCount && (
          <span className="ml-1 text-sm text-gray-500">({reviewCount})</span>
        )}
      </div>
    )
  }

  const renderDefault = () => (
    <div className={`group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              onAddToWishlist?.()
            }}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            aria-label="Add to wishlist"
          >
            <FiHeart className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
      <Link href={href} className="block p-4">
        {brand && <p className="text-sm text-gray-500 mb-1">{brand}</p>}
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{title}</h3>
        {renderRating()}
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold text-gray-900">{formattedPrice}</span>
          <button
            onClick={(e) => {
              e.preventDefault()
              onAddToCart?.()
            }}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Add to cart"
          >
            <FiShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </Link>
    </div>
  )

  const renderFeatured = () => (
    <div className={`group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              {brand && <p className="text-sm text-white/80 mb-1">{brand}</p>}
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-white/80 text-sm mt-1 line-clamp-1">{description}</p>
            </div>
            <span className="font-bold text-white text-lg">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMinimal = () => (
    <div className={`group flex items-center space-x-4 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <div className="mt-1 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-900">{formattedPrice}</span>
        </div>
      </div>
    </div>
  )

  switch (variant) {
    case 'featured':
      return renderFeatured()
    case 'minimal':
      return renderMinimal()
    default:
      return renderDefault()
  }
}

export default Card