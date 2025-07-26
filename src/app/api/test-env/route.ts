// app/api/test-env/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'exists' : 'missing',
    EMAIL_FROM: process.env.EMAIL_FROM
  })
}