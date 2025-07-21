// context/CartContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
  productId: string
  quantity: number
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
  // Add other cart methods as needed
}

const CartContext = createContext<CartContextType>({
  cart: { items: [] },
  shipping: null,
  updateShipping: () => {}
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState({ items: [] })
  const [shipping, setShipping] = useState<ShippingInfo | null>(null)

  // Load cart from localStorage or API
  useEffect(() => {
    const loadCart = async () => {
      // Implementation depends on your setup
    }
    loadCart()
  }, [])

  const updateShipping = (data: ShippingInfo) => {
    setShipping(data)
  }

  return (
    <CartContext.Provider value={{ cart, shipping, updateShipping }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}