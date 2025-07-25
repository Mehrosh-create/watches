// app/checkout/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart } = useCart()

  // Redirect if cart is empty
  if (typeof window !== 'undefined' && cart.items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        <CheckoutSteps activeStep={0} />
        
        <div className="mt-8">
          <p>Please select a shipping method to continue:</p>
          <div className="mt-4">
            <a 
              href="/checkout/shipping" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg inline-block"
            >
              Continue to Shipping
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}