// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/models/database";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }
  
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultUser;
  }
}

import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        if (!credentials?.email) return null;
        
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!passwordsMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: import("next-auth/jwt").JWT; user?: import("next-auth").User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: import("next-auth").Session; token: import("next-auth/jwt").JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);