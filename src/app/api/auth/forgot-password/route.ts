import { NextResponse } from 'next/server'
import User from '@/models/User'
import dbConnect from '@/lib/db'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/api/mail'
import { url } from 'inspector'

export async function POST(request: Request) {
  await dbConnect()

  const { email } = await request.json()

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset email has been sent' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    await sendPasswordResetEmail(user.email, resetUrl)

    return NextResponse.json(
      { message: 'If an account exists, a reset email has been sent' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 }
    )
  }
}