'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  productName: string
  price: number
  description: string
  stockQuantity: number
  image_url: string
  public_id: string
  createdAt?: string
  updatedAt?: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products', {
          next: { revalidate: 0 } // Disable cache
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch products')
        }

        const data = await response.json()
        // Handle both direct array and { data: array } responses
        setProducts(Array.isArray(data) ? data : data.data || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        toast.error('Failed to load products. Check console for details.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      setDeletingId(productId)
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(await response.text())
      }

      setProducts(prev => prev.filter(p => p._id !== productId))
      toast.success('Product deleted successfully')
    } catch (err) {
      console.error('Delete error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Error Loading Products</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
          >
            Create Your First Product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Headers... (same as before) */}
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    {/* Table Cells... (same as before) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => router.push(`/admin/products/${product._id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        disabled={!!deletingId}
                      >
                        View
                      </button>
                      <button
                        onClick={() => router.push(`/admin/products/${product._id}/edit`)}
                        className="text-indigo-600 hover:text-indigo-900"
                        disabled={!!deletingId}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={deletingId === product._id}
                      >
                        {deletingId === product._id ? (
                          <span className="flex items-center">
                            <span className="animate-spin mr-1">↻</span>
                            Deleting...
                          </span>
                        ) : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}