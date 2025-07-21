// app/checkout/payment/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '@/context/CartContext'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'

const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'paypal'])
})

type PaymentFormData = z.infer<typeof paymentSchema>

export default function PaymentPage() {
  const { cart, shipping } = useCart()
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'card'
    }
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)
    
    try {
      if (data.paymentMethod === 'card') {
        // Stripe integration
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        
        const response = await fetch('/api/checkout/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: cart.items,
            shipping
          })
        })
        
        const session = await response.json()
        await stripe?.redirectToCheckout({ sessionId: session.id })
      } else {
        // Handle PayPal flow
        // You would typically redirect to PayPal here
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Payment Method</h1>
        
        <CheckoutSteps activeStep={2} />
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register('paymentMethod')}
                  value="card"
                  className="h-4 w-4"
                />
                <span className="font-medium">Credit/Debit Card</span>
              </label>
              
              {watchPaymentMethod === 'card' && (
                <div className="mt-4 pl-6 space-y-4">
                  <div>
                    <label className="block mb-1">Card Number</label>
                    <div className="border rounded-lg px-4 py-2">
                      [Stripe Elements will go here]
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Expiration</label>
                      <input
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1">CVV</label>
                      <input
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border rounded-lg p-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  {...register('paymentMethod')}
                  value="paypal"
                  className="h-4 w-4"
                />
                <span className="font-medium">PayPal</span>
              </label>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <a
              href="/checkout/shipping"
              className="text-blue-600 hover:underline"
            >
              Back to Shipping
            </a>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}