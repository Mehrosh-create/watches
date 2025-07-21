// types/next-auth.d.ts
import 'next-auth'
import type { User } from '@/types/user'

declare module 'next-auth' {
  interface Session {
    user: User.Base
  }
}