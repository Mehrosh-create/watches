'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import DashboardCard from '@/components/admin/DashboardCard'
import RecentOrders from '@/components/admin/RecentOrders'
import SalesChart from '@/components/admin/SalesChart'

interface StatsData {
  totalSales: number
  newCustomers: number
  pendingOrders: number
  outOfStock: number
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect if not admin
    if (status === 'unauthenticated') {
      redirect('/auth/signin?callbackUrl=/admin/dashboard')
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      redirect('/')
    }

    // Fetch dashboard data
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/dashboard')
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Dashboard error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [status, session])

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Sales" 
          value={`$${stats.totalSales.toLocaleString()}`} 
          icon="💰"
          trend="up"
        />
        <DashboardCard 
          title="New Customers" 
          value={stats.newCustomers.toString()} 
          icon="👥"
          trend="up"
        />
        <DashboardCard 
          title="Pending Orders" 
          value={stats.pendingOrders.toString()} 
          icon="📦"
          trend="down"
        />
        <DashboardCard 
          title="Out of Stock" 
          value={stats.outOfStock.toString()} 
          icon="⚠️"
          trend="neutral"
        />
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Add New Product
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
              View Inventory
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition">
              Manage Users
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <RecentOrders />
      </div>
    </div>
  )
}