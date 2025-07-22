import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/models/User'
import dbConnect from '@/lib/db'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { name, email, password } = await request.json()

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch  {
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    )
  }
}