// src/lib/utils/url.ts
'use client' // Add this if using Next.js App Router

import { useRouter } from 'next/navigation'

export function resetUrl(path?: string) {
  const router = useRouter()
  router.replace(path || window.location.pathname)
}