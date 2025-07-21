'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button' // Assuming you're using shadcn/ui

type CartItem = {
  productId: {
    _id: string
    price: number
  }
  quantity: number
}

type CartSummaryProps = {
  items?: CartItem[]
  onCheckout?: () => void
  className?: string
}

export default function CartSummary({ 
  items = [], 
  onCheckout,
  className = '' 
}: CartSummaryProps) {
  const [subtotal, setSubtotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Calculate totals
  useEffect(() => {
    const calculateTotals = () => {
      const calculatedSubtotal = items.reduce(
        (sum, item) => sum + (item.productId.price * item.quantity),
        0
      )
      setSubtotal(calculatedSubtotal)
      setIsLoading(false)
    }

    calculateTotals()
  }, [items])

  // Shipping calculation (example: free over $100)
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 10
  const taxRate = 0.08 // Example 8% tax
  const tax = subtotal * taxRate
  const total = subtotal + shippingFee + tax

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-gray-100 rounded-lg p-6 ${className}`}>
        <div className="h-6 w-1/2 bg-gray-200 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-1/3 bg-gray-200"></div>
              <div className="h-4 w-1/4 bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax ({(taxRate * 100)}%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {onCheckout ? (
        <Button 
          onClick={onCheckout}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </Button>
      ) : (
        <Link href="/checkout" className="block w-full">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Link>
      )}

      {items.length === 0 && (
        <p className="text-sm text-center mt-4 text-gray-500">
          Your cart is empty
        </p>
      )}

      <div className="mt-4 text-sm text-center text-gray-500">
        <p>or</p>
        <Link 
          href="/products" 
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}