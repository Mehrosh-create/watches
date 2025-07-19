// lib/auth.ts
import { auth as nextAuth } from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'user' | 'admin';
    } & DefaultSession['user'];
  }
}

export async function auth() {
  const session = await nextAuth();
  
  if (!session?.user) {
    return null;
  }

  return {
    user: {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      role: session.user.role || 'user',
      image: session.user.image,
    },
  };
}

export type AuthUser = Awaited<ReturnType<typeof auth>>['user'];