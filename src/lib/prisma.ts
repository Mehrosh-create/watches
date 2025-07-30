import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `prisma` variable to prevent multiple instances
  var prisma: PrismaClient | undefined
}

// Initialize Prisma Client
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error']
})

// Store in global in development to prevent hot-reload issues
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma