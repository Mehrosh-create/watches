import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'

// Type-safe response helpers
const unauthorizedResponse = () => NextResponse.json(
  { success: false, error: "Admin access required" }, 
  { status: 401 }
)

const notFoundResponse = () => NextResponse.json(
  { success: false, error: "Product not found" },
  { status: 404 }
)

// GET single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") return unauthorizedResponse()

    const product = await Product.findById(params.id)
    return product 
      ? NextResponse.json({ success: true, data: product })
      : notFoundResponse()

  } catch (error) {
    console.error('ADMIN_GET_PRODUCT:', error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

// UPDATE product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") return unauthorizedResponse()

    const updateData = await request.json()
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )

    return updatedProduct
      ? NextResponse.json({ success: true, data: updatedProduct })
      : notFoundResponse()

  } catch (error) {
    console.error('ADMIN_UPDATE_PRODUCT:', error)
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "admin") return unauthorizedResponse()

    const deletedProduct = await Product.findByIdAndDelete(params.id)
    
    return deletedProduct
      ? NextResponse.json({ success: true, data: { id: params.id } })
      : notFoundResponse()

  } catch (error) {
    console.error('ADMIN_DELETE_PRODUCT:', error)
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
