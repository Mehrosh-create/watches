import { Resend } from 'resend'
import { generatePasswordResetToken } from './auth/password'
import User from '@/models/User'
import dbConnect from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailOptions = {
  to: string
  subject: string
  html: string
}

interface SendEmailResult {
  success: boolean
  error?: Error
  data?: any
}

export const sendEmail = async (options: EmailOptions): Promise<SendEmailResult> => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'no-reply@yourdomain.com',
      to: options.to,
      subject: options.subject,
      html: options.html
    })
    return { success: true, data }
  } catch (error) {
    console.error('Email send failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Email sending failed') 
    }
  }
}

interface PasswordResetEmailParams {
  email: string
  user: {
    _id: string
    email: string
  }
}

export const sendPasswordResetEmail = async (
  params: PasswordResetEmailParams
): Promise<SendEmailResult> => {
  await dbConnect()
  
  try {
    const { token } = generatePasswordResetToken()
    const resetUrl = new URL(
      `/reset-password?token=${encodeURIComponent(token)}`,
      process.env.NEXTAUTH_URL
    ).toString()

    // Update user atomically
    await User.updateOne(
      { _id: params.user._id },
      { 
        resetToken: token,
        resetTokenExpiry: Date.now() + 3600000, // 1 hour
        updatedAt: new Date() 
      }
    )

    return await sendEmail({
      to: params.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset. Click the button below to set a new password:</p>
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
        </div>
      `
    })
  } catch (error) {
    console.error('Password reset email failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Password reset email failed') 
    }
  }
}

interface VerificationEmailParams {
  email: string
  token: string
  userName?: string
}

export const sendVerificationEmail = async (
  params: VerificationEmailParams
): Promise<SendEmailResult> => {
  const verificationUrl = new URL(
    `/verify-email?token=${encodeURIComponent(params.token)}`,
    process.env.NEXTAUTH_URL
  ).toString()

  return sendEmail({
    to: params.email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Welcome${params.userName ? `, ${params.userName}` : ''}!</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
          This link will expire in 24 hours.
        </p>
      </div>
    `
  })
}