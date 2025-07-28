'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FiCheckCircle, FiXCircle, FiMail } from 'react-icons/fi'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error('No verification token provided')
        }

        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await res.json()
        
        if (!res.ok) {
          throw new Error(data.message || 'Email verification failed')
        }

        setStatus('success')
        setMessage(data.message || 'Email verified successfully!')
        
        // Optional: Redirect after success
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } catch (err) {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Email verification failed')
      }
    }

    verifyToken()
  }, [token, router])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center">
              <FiCheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Successful!</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to dashboard... <br />
                <Link href="/dashboard" className="font-medium text-black hover:text-gray-800">
                  Click here if you're not redirected
                </Link>
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center">
              <FiXCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Failed</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                >
                  Try Again
                </button>
       
         <Link 
                href="/resend-verification" 
                className="font-medium text-black hover:text-gray-800"
              >
                  Resend Verification Email
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}