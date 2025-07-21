// app/api/user/route.ts
import { auth } from '@/app/api/auth/[...nextauth]/route';  
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  return NextResponse.json({
    data: {
      userId: session.user.id,
      role: session.user.role
    }
  });
}