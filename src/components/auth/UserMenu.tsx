// components/auth/UserMenu.tsx
'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session) {
    return (
      <div className="flex space-x-4">
        <Link 
          href="/auth/login" 
          className="text-gray-700 hover:text-blue-600"
        >
          Sign In
        </Link>
        <Link 
          href="/auth/register" 
          className="text-gray-700 hover:text-blue-600"
        >
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <span className="text-gray-700">{session.user?.name}</span>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          {session.user?.name?.charAt(0).toUpperCase()}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            My Account
          </Link>
          <Link
            href="/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </Link>
          {session.user?.role === 'admin' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              signOut()
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}