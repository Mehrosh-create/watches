'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  productName: string
  price: number
  stockQuantity: number
  description: string
  category: string
  isActive: boolean
  image_url: string
  public_id: string
  createdAt?: string
  updatedAt?: string
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
        const response = await fetch(`/api/admin/products/${params.id}`, {
          credentials: 'include'
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/admin/login')
            toast.error('Please login to continue')
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

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/products/${params.id}`, {
          method: 'DELETE',
          credentials: 'include'
        })

        if (response.ok) {
          toast.success('Product deleted successfully')
          router.push('/admin/products')
        } else {
          throw new Error('Failed to delete product')
        }
      } catch (err) {
        toast.error('Failed to delete product')
      }
    }
  }

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
          <Link href="/admin/products" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>Product not found</p>
          <Link href="/admin/products" className="text-blue-600 hover:underline mt-2 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${product._id}/edit`}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Edit Product
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete Product
          </button>
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
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.image_url}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">{product.productName}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-gray-600">{product.category}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock Quantity</p>
                  <p className="text-xl font-semibold">{product.stockQuantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="text-gray-700">
                    {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-700">
                    {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {product.description || 'No description provided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}