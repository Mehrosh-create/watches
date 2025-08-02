// components/Header.tsx
'use client'

import { useWishlist } from '@/context/WishlistContext'
import { FiSearch, FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi'
import Link from 'next/link'

export default function Header() {
  const { wishlistCount } = useWishlist()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Your Logo
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" className="relative">
              <FiHeart className="text-xl hover:text-red-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative">
              <FiShoppingCart className="text-xl" />
              {/* Cart count would go here */}
            </Link>
            
            <Link href="/account">
              <FiUser className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}