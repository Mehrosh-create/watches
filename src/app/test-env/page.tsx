// app/test-env/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { FiAlertTriangle, FiCheckCircle, FiCopy } from 'react-icons/fi'

export default function TestEnvPage() {
  const [envData, setEnvData] = useState<{
    NEXTAUTH_URL?: string
    RESEND_API_KEY?: string
    EMAIL_FROM?: string
  }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchEnv = async () => {
      try {
        const response = await fetch('/api/test-env')
        if (!response.ok) throw new Error('Failed to fetch environment variables')
        const data = await response.json()
        setEnvData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    fetchEnv()
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(envData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">Environment Variables Test</h1>
            <p className="text-gray-600 mt-1">Verify your environment configuration</p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiAlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <FiCopy className="mr-2 h-4 w-4" />
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">NEXTAUTH_URL</h3>
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        envData.NEXTAUTH_URL ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
                        {envData.NEXTAUTH_URL || 'Not set'}
                      </code>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">RESEND_API_KEY</h3>
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        envData.RESEND_API_KEY === 'exists' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {envData.RESEND_API_KEY === 'exists' ? 'Configured (hidden for security)' : 'Not set'}
                      </code>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-md p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">EMAIL_FROM</h3>
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        envData.EMAIL_FROM ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm break-all">
                        {envData.EMAIL_FROM || 'Not set'}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiCheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Environment Status</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          {envData.NEXTAUTH_URL && 
                          envData.RESEND_API_KEY === 'exists' && 
                          envData.EMAIL_FROM ? (
                            'All required environment variables are properly configured!'
                          ) : (
                            'Some environment variables are missing or incorrectly configured.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}