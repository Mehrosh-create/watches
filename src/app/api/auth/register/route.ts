// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dbConnect from '@/lib/db';

export async function POST(request: Request) {
  console.log('[REGISTER] Request received');
  
  try {
    console.log('[REGISTER] Connecting to database...');
    await dbConnect();
    console.log('[REGISTER] Database connected successfully');

    const { name, email, password, role } = await request.json();
    console.log('[REGISTER] Request body:', { name, email, password, role });

    // Validate input
    if (!name || !email || !password) {
      console.warn('[REGISTER] Validation failed - missing fields');
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    console.log('[REGISTER] Checking for existing user...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.warn(`[REGISTER] Email already in use: ${email}`);
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }

    console.log('[REGISTER] Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[REGISTER] Password hashed successfully');

    console.log('[REGISTER] Creating new user...');
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user' // Use provided role or default to 'user'
    });
    console.log('[REGISTER] User created successfully:', newUser);

    const user = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    console.log('[REGISTER] Returning success response');
    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('[REGISTER] ERROR:', error);
    return NextResponse.json(
      { 
        message: 'Error creating user', 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}