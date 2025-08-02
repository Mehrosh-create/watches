// components/wishlist/WishlistIcon.tsx
'use client'

import { useWishlist } from '@/context/WishlistContext'
import { FiHeart } from 'react-icons/fi'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const WishlistIcon = () => {
  const { wishlistCount } = useWishlist()
  const [isMounted, setIsMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Link 
      href="/wishlist" 
      className="relative flex items-center justify-center p-2 group"
      aria-label={`Wishlist (${wishlistCount} items)`}
    >
      <FiHeart className="text-xl text-gray-600 group-hover:text-red-500 transition-colors" />
      
      {/* Counter Badge */}
      {isMounted && wishlistCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
          {wishlistCount > 9 ? '9+' : wishlistCount}
        </span>
      )}
      
      {/* Screen reader text */}
      <span className="sr-only">
        Wishlist ({wishlistCount} items)
      </span>
    </Link>
  )
}

export default WishlistIcon