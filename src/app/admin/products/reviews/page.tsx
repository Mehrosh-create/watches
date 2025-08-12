'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface Review {
  _id: string
  userId: {
    _id: string
    name: string
  }
  rating: number
  comment: string
  createdAt: string
}

export default function ProductReviewsPage({ params }: { params: { id: string } }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${params.id}/reviews`, {
          credentials: 'include'
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/signin')
            return
          }
          throw new Error('Failed to fetch reviews')
        }

        const { data } = await response.json()
        setReviews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        toast.error('Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [params.id, router])

  const handleDeleteReview = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`/api/products/${params.id}/reviews/${reviewId}`, {
          method: 'DELETE',
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Failed to delete review')
        }

        setReviews(prev => prev.filter(review => review._id !== reviewId))
        toast.success('Review deleted successfully')
      } catch (error) {
        toast.error('Failed to delete review')
      }
    }
  }

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Reviews</h1>
        <button
          onClick={() => router.push(`/admin/products/${params.id}`)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Back to Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{review.userId.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{review.comment}</p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No reviews found for this product
            </div>
          )}
        </div>
      </div>
    </div>
  )
}