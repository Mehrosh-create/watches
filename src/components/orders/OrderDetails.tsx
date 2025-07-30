'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function OrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`)
        const data = await res.json()
        if (data.success) {
          setOrder(data.data)
        } else {
          setError(data.error || 'Order not found')
        }
      } catch (err) {
        setError('Failed to fetch order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!order) return <div>Order not found</div>

  return (
    <div className="space-y-6">
      {/* User-facing order details UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Order Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Order ID:</span> {order._id}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
            <p>
              <span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </p>
          </div>
        </div>
        {/* ... rest of the user order details ... */}
      </div>
      <Button onClick={() => router.push('/orders')}>
        Back to Orders
      </Button>
    </div>
  )
}