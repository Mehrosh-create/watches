'use client'

import { useEffect, useState } from 'react'
import { FiShoppingBag, FiArrowLeft, FiCreditCard, FiTruck } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  price: number
  image: string
}

interface CartItem {
  productId: Product
  quantity: number
}

interface CartResponse {
  items: CartItem[]
}

// Sample product data for demo purposes
const sampleProducts: Product[] = [
  {
    _id: '1',
    name: 'Luxury Chronograph Watch',
    price: 499.99,
    image: '/chronograph.jpg'
  },
  {
    _id: '2',
    name: 'Classic Leather Strap Watch',
    price: 349.99,
    image: '/Leather.jpg'
  },
  {
    _id: '3',
    name: 'Sport Pro Digital Watch',
    price: 199.99,
    image: '/Sportpro.jpg'
  },
  {
    _id: '4',
    name: 'Minimalist Silver Watch',
    price: 249.99,
    image: '/minimalist.jpg'
  }
]

export default function CartPage() {
  const [cart, setCart] = useState<CartResponse>({ items: [] })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Generate random cart items for demo
  const generateRandomCart = (): CartResponse => {
    const numItems = Math.floor(Math.random() * 3) + 1 // 1-3 items
    const shuffled = [...sampleProducts].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, numItems)
    
    return {
      items: selected.map(product => ({
        productId: product,
        quantity: Math.floor(Math.random() * 3) + 1 // 1-3 quantity
      }))
    }
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart')
        if (!response.ok) throw new Error('Failed to fetch cart')
        const data = await response.json()
        
        // If cart is empty, use demo data
        if (data.items && data.items.length === 0) {
          setCart(generateRandomCart())
        } else {
          setCart(data)
        }
      } catch (error) {
        console.error('Error fetching cart:', error)
        // Use demo data if API fails
        setCart(generateRandomCart())
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      })
      if (!response.ok) throw new Error('Failed to update cart')
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error updating cart:', error)
      // For demo purposes, update locally
      setCart(prev => ({
        items: prev.items.map(item => 
          item.productId._id === productId 
            ? { ...item, quantity: Math.max(1, quantity) } 
            : item
        )
      }))
    }
  }

  const removeItem = async (productId: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      if (!response.ok) throw new Error('Failed to remove item')
      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error('Error removing item:', error)
      // For demo purposes, remove locally
      setCart(prev => ({
        items: prev.items.filter(item => item.productId._id !== productId)
      }))
    }
  }

  const total = cart.items.reduce(
    (sum, item) => sum + (item.productId.price * item.quantity),
    0
  )

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
        <p>Loading your cart...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-600 hover:text-black mr-4"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      
      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            href="/shop"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            <FiShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div key={item.productId._id} className="bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row border border-gray-100">
                <div className="relative w-full sm:w-32 h-32 mb-4 sm:mb-0 sm:mr-6 bg-gray-100 flex items-center justify-center">
                  {item.productId.image ? (
                    <Image
                      src={item.productId.image}
                      alt={item.productId.name}
                      fill
                      className="object-contain"
                      sizes="100px"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.productId.name}</h3>
                  <p className="text-gray-600 mb-4">${item.productId.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button 
                        onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                        className="px-3 py-1 text-lg"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FiCreditCard className="mr-2" /> Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href="/checkout/shipping"
                className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition font-medium flex items-center justify-center"
              >
                <FiTruck className="mr-2" />
                Proceed to Shipping
              </Link>
              <Link
                href="/shop"
                className="block w-full border border-black text-black text-center py-3 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center"
              >
                <FiShoppingBag className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}