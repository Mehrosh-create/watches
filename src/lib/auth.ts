// src/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultUser;
  }
}

export async function getAuthUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    user: {
      id: session.user.id,
      name: session.user.name ?? '',
      email: session.user.email ?? '',
      role: session.user.role ?? 'user',
      image: session.user.image ?? null,
    },
  };
}

export type AuthUser = NonNullable<Awaited<ReturnType<typeof getAuthUser>>>["user"];