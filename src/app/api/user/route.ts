// app/api/user/route.ts
import { auth } from '@/lib/auth';
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