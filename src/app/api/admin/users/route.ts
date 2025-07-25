import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/models/User'
import dbConnect from '@/lib/db'

export async function GET() {
  try {
    await dbConnect()
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const users = await User.find({}, { password: 0 })
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error('GET_USERS_ERROR:', error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    )
  }
}