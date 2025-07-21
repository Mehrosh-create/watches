import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Cart from '@/models/Cart'
import Product from '@/models/Product'
import dbConnect from '@/lib/db'

export async function GET() {
  await dbConnect()
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ items: [] }, { status: 200 })
  }

  try {
    const cart = await Cart.findOne({ userId: session.user.id })
      .populate('items.productId')
      .exec()
    
    return NextResponse.json(cart || { items: [] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    const { productId, quantity } = await req.json()
    
    // Validate product exists
    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: session.user.id })
    if (!cart) {
      cart = new Cart({ userId: session.user.id, items: [] })
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => 
      item.productId.toString() === productId
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ productId, quantity })
    }

    await cart.save()
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  await dbConnect()
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    const { productId } = await req.json()
    const cart = await Cart.findOne({ userId: session.user.id })

    if (cart) {
      cart.items = cart.items.filter(
        item => item.productId.toString() !== productId
      )
      await cart.save()
    }

    return NextResponse.json(cart || { items: [] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item' },
      { status: 500 }
    )
  }
}