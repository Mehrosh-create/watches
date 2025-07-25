// src/app/api/auth/route.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import { AdapterUser } from 'next-auth/adapters'

interface UserSession {
  id: string
  name?: string | null
  email?: string | null
  role?: string
}

interface Credentials {
  email: string
  password: string
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<UserSession | null> {
        try {
          await dbConnect()
          
          if (!credentials?.email || !credentials.password) {
            throw new Error('Email and password are required')
          }

          const user = await User.findOne({ email: credentials.email }).select('+password')
          if (!user) {
            throw new Error('Invalid credentials')
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            throw new Error('Invalid credentials')
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'user'
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as UserSession).role
        token.id = (user as UserSession).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }