import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@lib/models/User.ts'

export async function GET() {
  try {
    // 1. Connect to database 
    await dbConnect()

    // 2. Fetch users with optional query parameters
    const users = await User.find()
      .select('-password') // Exclude sensitive fields
      .lean() // Convert to plain JavaScript objects

    // 3. Return successful response
    return NextResponse.json(
      { success: true, data: users },
      { status: 200 }
    )

  } catch (error) {
    // 4. Handle errors
    console.error('Users API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error 
          ? error.message 
          : 'Database operation failed'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // 1. Connect to database
    await dbConnect()

    // 2. Parse and validate request body
    const body = await request.json()
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Create new user
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      password: body.password, // Note: Should be hashed before saving
      role: body.role || 'user'
    })

    // 4. Return created user (excluding password)
    const userResponse = newUser.toObject()
    delete userResponse.password

    return NextResponse.json(
      { success: true, data: userResponse },
      { status: 201 }
    )

  } catch (error) {
    console.error('User Creation Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error 
          ? error.message.includes('duplicate key') 
            ? 'Email already exists' 
            : error.message
          : 'User creation failed'
      },
      { status: 400 }
    )
  }
}