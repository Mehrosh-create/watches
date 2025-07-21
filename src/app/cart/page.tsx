'use client'

import { useEffect, useState } from 'react'
import CartItem from '@/components/cart/CartItem'
import Link from 'next/link'

type CartItem = {
  productId: {
    _id: string
    name: string
    price: number
    image: string
  }
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart')
        const data = await response.json()
        setCart(data)
      } catch (error) {
        console.error('Error fetching cart:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      })
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const removeItem = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  )

  if (loading) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}