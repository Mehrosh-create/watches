// src/app/api/auth/[...nextauth]/route.ts

import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// --- TypeScript: Extend NextAuth User and Session types for 'role'
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: "user" | "admin" | null;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: "user" | "admin" | null;
    };
  }
}

// --- Auth options ---
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Case-insensitive email search
        const user = await User.findOne({ email: credentials.email.toLowerCase() }).select("+password");
        if (!user) throw new Error("No user found");
        if (!user.isVerified) throw new Error("Please verify your email first");
        if (!user.password) throw new Error("Invalid user data");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        // Return user data to be attached to token
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role, // <-- Make sure to include 'role'
        };
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, user will be defined
      if (user && user.email) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // <-- Add 'role' directly from user object
      }
      // On subsequent requests, token is preserved
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "user" | "admin" | null; // <-- Assign 'role'
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  debug: process.env.NODE_ENV !== "production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };