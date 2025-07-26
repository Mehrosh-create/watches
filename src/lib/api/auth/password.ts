import crypto from 'crypto'
import User from '@/models/User'
import dbConnect from '@/lib/db'

export const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex')
  const expires = Date.now() + 3600000 // 1 hour
  return { token, expires }
}

export const validatePasswordResetToken = async (token: string) => {
  await dbConnect()
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  })
  return user
}