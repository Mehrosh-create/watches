'use client'

import { signIn } from 'next-auth/react'
import { FaGoogle, FaGithub } from 'react-icons/fa'

const providers = [
  {
    name: 'Google',
    id: 'google',
    icon: <FaGoogle className="mr-2" />,
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    name: 'GitHub',
    id: 'github',
    icon: <FaGithub className="mr-2" />,
    color: 'bg-gray-800 hover:bg-gray-900',
  },
]

export default function AuthProviders() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm ${provider.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {provider.icon}
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  )
}