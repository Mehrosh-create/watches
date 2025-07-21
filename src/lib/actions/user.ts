// lib/actions/user.ts
'use server';
import { auth } from '@/app/api/auth/[...nextauth]/route';  

export async function updateProfile(formData: FormData) {
  const session = await auth();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  // Update user in database
  // await User.updateOne(...)
}