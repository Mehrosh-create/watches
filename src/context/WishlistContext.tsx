// context/WishlistContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Product = {
  id: string
  name: string
  price: number
  image: string
  // Add other product fields as needed
}

type WishlistContextType = {
  wishlist: Product[]
  wishlistCount: number
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (product: Product) => void // New utility function
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)


export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse wishlist', error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => 
      prev.some(item => item.id === product.id) 
        ? prev 
        : [...prev, product]
    )
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId)
  }, [wishlist])

  const toggleWishlist = useCallback((product: Product) => {
    isInWishlist(product.id) 
      ? removeFromWishlist(product.id)
      : addToWishlist(product)
  }, [isInWishlist, addToWishlist, removeFromWishlist])

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}