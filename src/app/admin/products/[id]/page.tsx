'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  description: string
  category: string
  isActive: boolean
  images: string[]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${params.id}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/admin/products/add')
            return
          }
          if (response.status === 404) {
            setError('Product not found')
            return
          }
          throw new Error('Failed to fetch product')
        }

        const { data } = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="space-x-2">
          <Link
            href={`/admin/products/${product._id}/edit`}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Edit Product
          </Link>
          <Link
            href="/admin/products"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {product.images.length > 0 && (
              <div className="w-full md:w-1/3">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="w-full md:w-2/3 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500">{product.category}</p>
              </div>

              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="text-lg font-semibold">{product.stock}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">{product.description || 'No description provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}