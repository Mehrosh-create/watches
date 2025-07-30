'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function AdminOrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`)
        const data = await res.json()
        if (data.success) {
          setOrder(data.data)
          setStatus(data.data.status)
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

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) {
        setOrder(data.data)
        alert('Order status updated successfully')
      } else {
        alert(data.error || 'Failed to update order')
      }
    } catch (err) {
      alert('Failed to update order')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!order) return <div>Order not found</div>

  return (
    <div className="space-y-6">
      {/* Admin-specific order details UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-2">Order Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Order ID:</span> {order._id}</p>
            <p><span className="font-medium">Customer:</span> {order.userId?.name || 'N/A'}</p>
            <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="flex items-center">
              <span className="font-medium mr-2">Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border rounded px-2 py-1"
              >
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <Button onClick={handleStatusUpdate} className="ml-2">
                Update
              </Button>
            </div>
          </div>
        </div>
        {/* ... rest of the admin order details ... */}
      </div>
    </div>
  )
}