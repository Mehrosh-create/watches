// app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server'
import User from '@/models/User'
import dbConnect from '@/lib/db'

export async function GET(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  const user = await User.findOne({ verificationToken: token })
  if (!user) return NextResponse.redirect('/auth/verification-failed')

  user.isVerified = true
  user.verificationToken = undefined
  await user.save()

  return NextResponse.redirect('/auth/verification-success')
}