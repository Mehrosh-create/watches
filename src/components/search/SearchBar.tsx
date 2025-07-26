// src/components/search/SearchBar.tsx
'use client'

import { Search as SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface WatchResult {
  id: number
  name: string
  price: number
  image: string
}

export default function SearchBar({ 
  autoFocus = false,
  onClose
}: {
  autoFocus?: boolean
  onClose?: () => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WatchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch results when query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length > 2) { // Only search after 3 characters
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await response.json()
          setResults(data)
        } catch (error) {
          console.error('Search failed:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300) // Debounce for 300ms
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose?.()
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for watches..."
            className="w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Live results dropdown */}
      {query && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((watch) => (
                <li key={watch.id} className="border-b last:border-b-0">
                  <Link
                    href={`/products/${watch.id}`}
                    className="flex items-center p-3 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    <div className="relative w-12 h-12 mr-3">
                      <Image 
                        src={watch.image} 
                        alt={watch.name}
                        fill
                        className="object-contain" 
                      />
                    </div>
                    <div>
                      <div className="font-medium">{watch.name}</div>
                      <div className="text-sm text-gray-600">${watch.price.toFixed(2)}</div>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="p-3 text-center bg-gray-50">
                <button
                  onClick={() => query.trim() && handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="text-blue-600 hover:underline"
                >
                  View all results for "{query}"
                </button>
              </li>
            </ul>
          ) : query.trim().length > 2 ? (
            <div className="p-4 text-center text-gray-500">No watches found</div>
          ) : null}
        </div>
      )}
    </div>
  )
}