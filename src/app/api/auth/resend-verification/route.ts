// app/api/auth/resend-verification/route.ts
import { NextResponse } from 'next/server'
import User from '@/models/User'
import dbConnect from '@/lib/db'
import { sendVerificationEmail } from '@/lib/api/mail' // Your existing email utility
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    await dbConnect()
    
    const { email } = await request.json()
    
    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { success: false, message: 'Email is already verified' },
        { status: 400 }
      )
    }

    // Generate new token (32 characters)
    const verificationToken = crypto.randomBytes(32).toString('hex')
    
    // Update user with new token (1 hour expiration)
    user.verificationToken = verificationToken
    user.verificationTokenExpires = new Date(Date.now() + 3600000) // 1 hour
    await user.save()

    // Send using your existing email utility without modifications
    const emailResult = await sendVerificationEmail({
      email: user.email,
      token: verificationToken
      // userName is optional in your existing implementation
    })

    if (!emailResult.success) {
      throw new Error('Failed to send verification email')
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email resent successfully'
    })

  } catch (error) {
    console.error('RESEND_VERIFICATION_ERROR:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to resend verification email' 
      },
      { status: 500 }
    )
  }
}