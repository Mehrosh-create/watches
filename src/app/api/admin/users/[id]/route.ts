import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/models/User'
import dbConnect from '@/lib/db'

const unauthorizedResponse = () => NextResponse.json(
  { success: false, error: "Unauthorized" },
  { status: 401 }
)

const notFoundResponse = () => NextResponse.json(
  { success: false, error: "User not found" },
  { status: 404 }
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return unauthorizedResponse()
    }

    const user = await User.findById(params.id, { password: 0 })
    if (!user) return notFoundResponse()

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('GET_USER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
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
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, select: '-password' }
    )

    if (!updatedUser) return notFoundResponse()

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error('UPDATE_USER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return unauthorizedResponse()
    }

    const deletedUser = await User.findByIdAndDelete(params.id)
    if (!deletedUser) return notFoundResponse()

    return NextResponse.json({ success: true, data: { id: params.id } })
  } catch (error) {
    console.error('DELETE_USER_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    )
  }
}