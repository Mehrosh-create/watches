import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Order from '@/models/Order'
import dbConnect from '@/lib/db'

export async function GET() {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const orders = await Order.find(
      session.user.role === 'admin' 
        ? {} 
        : { userId: session.user.id }
    ).populate('items.productId')

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('GET_ORDERS_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const orderData = await req.json()
    const order = await Order.create({
      ...orderData,
      userId: session.user.id,
      status: 'pending'
    })

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    )
  } catch (error) {
    console.error('CREATE_ORDER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    )
  }
}