'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole?: string
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`)
    } else if (
      status === 'authenticated' &&
      requiredRole &&
      session.user?.role !== requiredRole
    ) {
      router.push('/')
    }
  }, [status, session, router, requiredRole])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (status === 'authenticated') {
    if (!requiredRole || (requiredRole && session.user?.role === requiredRole)) {
      return <>{children}</>
    }
  }

  return null
}