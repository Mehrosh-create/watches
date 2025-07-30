import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Replace with actual data fetching logic
  const dashboardData = {
    totalSales: 45231,
    newCustomers: 124,
    pendingOrders: 15,
    outOfStock: 7,
  }

  return NextResponse.json(dashboardData)
}