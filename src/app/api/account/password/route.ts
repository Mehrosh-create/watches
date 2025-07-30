import dbConnect from '@/lib/db'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bcrypt from 'bcryptjs'
import User from '@/models/User' // Assuming you have a User model

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await request.json()

  try {
    await dbConnect()
    
    const user = await User.findOne({ email: session.user.email })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    
    await User.updateOne(
      { email: session.user.email },
      { password: hashedPassword }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }
}