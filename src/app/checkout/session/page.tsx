// app/checkout/session/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi'
import Link from 'next/link'

export default function CheckoutSessionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const verifySession = async () => {
      try {
        if (!sessionId) {
          throw new Error('No session ID provided')
        }

        const response = await fetch('/api/checkout/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          throw new Error('Failed to verify payment')
        }

        const data = await response.json()
        
        if (data.payment_status === 'paid') {
          setStatus('success')
          setMessage('Payment successful! Your order is being processed.')
          
          // Clear cart and other state management would go here
          setTimeout(() => {
            router.push('/orders')
          }, 3000)
        } else {
          throw new Error('Payment not completed')
        }
      } catch (err) {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Payment verification failed')
      }
    }

    verifySession()
  }, [sessionId, router])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <FiLoader className="h-12 w-12 text-gray-400 animate-spin mb-4" />
              <p className="text-gray-600">Verifying your payment...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <FiCheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to orders... <br />
                <Link href="/orders" className="font-medium text-black hover:text-gray-800">
                  Click here if you're not redirected
                </Link>
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <FiXCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-4">
                <Link
                  href="/cart"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                >
                  Back to Cart
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}