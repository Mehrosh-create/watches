// src/context/CartContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
  productId: string
  quantity: number
  name: string
  price: number
  image: string
}

type ShippingInfo = {
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  postalCode: string
  phone: string
  shippingMethod: 'standard' | 'express'
}

type CartContextType = {
  cart: {
    items: CartItem[]
  }
  shipping: ShippingInfo | null
  updateShipping: (data: ShippingInfo) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: { items: [] },
  shipping: null,
  updateShipping: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] })
  const [shipping, setShipping] = useState<ShippingInfo | null>(null)

  // Persist cart to localStorage (optional, but recommended)
  useEffect(() => {
    const storedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const updateShipping = (data: ShippingInfo) => setShipping(data)

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const index = prev.items.findIndex(i => i.productId === item.productId)
      if (index >= 0) {
        // Merge data (update info in case product changed), add quantity
        const newItems = [...prev.items]
        newItems[index] = {
          ...newItems[index],
          ...item,
          quantity: newItems[index].quantity + item.quantity
        }
        return { items: newItems }
      }
      return { items: [...prev.items, item] }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => ({
      items: prev.items.filter(item => item.productId !== productId)
    }))
  }

  const clearCart = () => setCart({ items: [] })

  return (
    <CartContext.Provider value={{ cart, shipping, updateShipping, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
