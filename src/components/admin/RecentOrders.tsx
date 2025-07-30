'use client'

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
}

export default function RecentOrders() {
  // Sample data - replace with real data from your API
  const orders: Order[] = [
    { id: '#12345', customer: 'John Doe', date: '2023-05-15', amount: 125.99, status: 'completed' },
    { id: '#12346', customer: 'Jane Smith', date: '2023-05-14', amount: 89.99, status: 'pending' },
    { id: '#12347', customer: 'Robert Johnson', date: '2023-05-14', amount: 215.50, status: 'completed' },
    { id: '#12348', customer: 'Emily Davis', date: '2023-05-13', amount: 65.99, status: 'failed' },
    { id: '#12349', customer: 'Michael Wilson', date: '2023-05-12', amount: 149.99, status: 'completed' },
  ]

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}