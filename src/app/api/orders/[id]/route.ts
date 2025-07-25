import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Order from '@/models/Order'
import dbConnect from '@/lib/db'

const unauthorizedResponse = () => NextResponse.json(
  { success: false, error: "Unauthorized" },
  { status: 401 }
)

const notFoundResponse = () => NextResponse.json(
  { success: false, error: "Order not found" },
  { status: 404 }
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) return unauthorizedResponse()

    const order = await Order.findById(params.id).populate('items.productId')
    if (!order) return notFoundResponse()

    // Only allow admin or order owner to view
    if (session.user.role !== 'admin' && order.userId.toString() !== session.user.id) {
      return unauthorizedResponse()
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error('GET_ORDER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return unauthorizedResponse()
    }

    const updateData = await request.json()
    const updatedOrder = await Order.findByIdAndUpdate(
      params.id,
      { status: updateData.status },
      { new: true }
    )

    if (!updatedOrder) return notFoundResponse()

    return NextResponse.json({ success: true, data: updatedOrder })
  } catch (error) {
    console.error('UPDATE_ORDER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    )
  }
}