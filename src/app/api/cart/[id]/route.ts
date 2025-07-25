import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/db'
import Cart from '@/models/Cart'

// Type-safe response helpers
const unauthorizedResponse = () => NextResponse.json(
  { success: false, error: "Authentication required" }, 
  { status: 401 }
)

const notFoundResponse = () => NextResponse.json(
  { success: false, error: "Cart not found" },
  { status: 404 }
)

// GET cart by ID (user's own cart)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    
    // User must be authenticated to view their cart
    if (!session?.user) return unauthorizedResponse()

    // Find cart belonging to the user with the specified ID
    const cart = await Cart.findOne({
      _id: params.id,
      user: session.user.id // Ensure user can only access their own cart
    }).populate('items.product')

    return cart 
      ? NextResponse.json({ success: true, data: cart })
      : notFoundResponse()

  } catch (error) {
    console.error('GET_CART:', error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

// UPDATE cart (add/remove items)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) return unauthorizedResponse()

    const updateData = await request.json()
    
    // Verify the cart belongs to the user
    const existingCart = await Cart.findOne({
      _id: params.id,
      user: session.user.id
    })
    if (!existingCart) return notFoundResponse()

    // Update the cart
    const updatedCart = await Cart.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('items.product')

    return updatedCart
      ? NextResponse.json({ success: true, data: updatedCart })
      : notFoundResponse()

  } catch (error) {
    console.error('UPDATE_CART:', error)
    return NextResponse.json(
      { success: false, error: "Failed to update cart" },
      { status: 500 }
    )
  }
}

// DELETE cart (clear cart)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user) return unauthorizedResponse()

    // Verify the cart belongs to the user before deleting
    const existingCart = await Cart.findOne({
      _id: params.id,
      user: session.user.id
    })
    if (!existingCart) return notFoundResponse()

    // Instead of deleting, we'll clear the cart items
    const clearedCart = await Cart.findByIdAndUpdate(
      params.id,
      { items: [] },
      { new: true }
    )

    return clearedCart
      ? NextResponse.json({ success: true, data: { id: params.id } })
      : notFoundResponse()

  } catch (error) {
    console.error('CLEAR_CART:', error)
    return NextResponse.json(
      { success: false, error: "Failed to clear cart" },
      { status: 500 }
    )
  }
}