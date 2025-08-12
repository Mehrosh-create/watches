// src/components/Header.tsx
'use client'

import Link from 'next/link'
import { FiSearch, FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

export default function Header() {
  const { cart } = useCart()
  const { wishlistCount } = useWishlist()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-2xl font-bold text-gray-800">WatchHub</Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/3 max-w-md">
            <input
              type="text"
              placeholder="Search watches..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/signin" className="hidden md:flex items-center text-gray-600 hover:text-gray-900">
              <FiUser className="mr-1" /> Sign In
            </Link>
            <Link href="/register" className="hidden md:block text-gray-600 hover:text-gray-900">
              Register
            </Link>
            <Link href="/wishlist" className="relative flex items-center text-gray-600 hover:text-gray-900">
              <FiHeart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            </Link>
            <Link href="/cart" className="relative flex items-center text-gray-600 hover:text-gray-900">
              <FiShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden relative mb-4">
          <input
            type="text"
            placeholder="Search watches..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        {/* Navigation */}
        <nav className="flex space-x-6 overflow-x-auto py-2 md:py-0 md:justify-center">
          <Link href="/" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Home</Link>
          <Link href="/shop" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Shop</Link>
          <Link href="/categories" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Categories</Link>
          <Link href="/about" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">About</Link>
          <Link href="/contact" className="whitespace-nowrap text-gray-600 hover:text-gray-900 px-2 py-1">Contact</Link>
        </nav>
      </div>
    </header>
  )
}