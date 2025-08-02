// components/products/WishlistButton.tsx
'use client'

import { useWishlist } from '@/context/WishlistContext'
import { FiHeart } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Product } from '@/types/product'

interface WishlistButtonProps {
  product: Product.Listing // Use the Listing type from your namespace
  className?: string
  iconSize?: 'sm' | 'md' | 'lg'
}

const WishlistButton = ({ product, className = '', iconSize = 'md' }: WishlistButtonProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id))
    setIsLoading(false)
  }, [isInWishlist, product.id])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const wasWishlisted = isInWishlist(product.id)
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] // Use the first image from the array
      })
      setIsWishlisted(!wasWishlisted)
      
      toast.success(
        wasWishlisted 
          ? `Removed ${product.name} from wishlist` 
          : `Added ${product.name} to wishlist`,
        {
          position: 'bottom-center',
          icon: wasWishlisted ? '❌' : '❤️',
        }
      )
    } catch (error) {
      console.error('Error toggling wishlist:', error)
      toast.error('Failed to update wishlist')
    }
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  if (isLoading) return null

  return (
    <button
      onClick={handleClick}
      className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10 ${className}`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <FiHeart 
        className={`${sizeClasses[iconSize]} ${
          isWishlisted 
            ? 'fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600' 
            : 'text-gray-400 hover:text-gray-600'
        } transition-colors`}
      />
    </button>
  )
}

export default WishlistButton