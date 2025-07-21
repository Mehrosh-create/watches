import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import dbConnect from '@/lib/db'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect()
        
        // Find user by email
        const user = await User.findOne({ email: credentials?.email })
        if (!user) return null

        // Compare passwords
        const isValid = await bcrypt.compare(credentials!.password, user.password)
        if (!isValid) return null

        // Return user object without password
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }