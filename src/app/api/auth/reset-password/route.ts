import { NextResponse } from 'next/server'
import User from '@/models/User'
import dbConnect from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  await dbConnect()

  const { token, password } = await request.json()

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()

    return NextResponse.json(
      { message: 'Password reset successfully. You can now log in with your new password.' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error resetting password' },
      { status: 500 }
    )
  }
}