'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  productName: string
  price: number
  description: string
  stockQuantity: number
  image_url: string
  public_id: string
  categories?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export default function ViewProductPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
          <button 
            onClick={() => router.push('/admin/products')}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>Product not found</p>
          <button 
            onClick={() => router.push('/admin/products')}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="space-x-2">
          <Link
            href="/admin/products"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Back to Products
          </Link>
          <Link
            href={`/admin/products/edit/${product._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Edit Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={product.image_url}
                alt={product.productName}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold">Price</h3>
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Stock Quantity</h3>
                  <p>{product.stockQuantity}</p>
                </div>
                {product.categories && (
                  <div>
                    <h3 className="font-semibold">Categories</h3>
                    <p>{product.categories}</p>
                  </div>
                )}
                {product.isActive !== undefined && (
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                      ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold">Additional Information</h3>
                {product.createdAt && (
                  <p className="text-sm text-gray-500">
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                )}
                {product.updatedAt && (
                  <p className="text-sm text-gray-500">
                    Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}