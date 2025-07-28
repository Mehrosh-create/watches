'use client'
import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'

export default function ResetUrlDemoPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [customPath, setCustomPath] = useState('')

  // 1. Reset to current path (clears query params)
  const resetCurrentUrl = () => {
    router.replace(pathname)
  }

  // 2. Reset to home
  const resetToHome = () => {
    router.replace('/')
  }

  // 3. Reset to custom path
  const resetToCustomPath = () => {
    router.replace(customPath || '/')
  }

  // 4. Hard reset (reloads page)
  const hardReset = () => {
    window.location.href = pathname
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">URL Reset Demo</h1>
      
      <div className="space-y-4 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold">Current URL State</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Pathname:</span> {pathname}</p>
          <p><span className="font-medium">Query Params:</span> {searchParams.toString() || 'None'}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* 1. Basic Reset */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Clear Query Parameters</h3>
          <Button 
            onClick={resetCurrentUrl}
            className="w-full"
          >
            Reset Current URL
          </Button>
          <p className="text-sm text-muted-foreground">
            Clears all query params while staying on same page
          </p>
        </div>

        {/* 2. Home Reset */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Return to Homepage</h3>
          <Button 
            onClick={resetToHome}
            variant="outline"
            className="w-full"
          >
            Go Home
          </Button>
        </div>

        {/* 3. Custom Path */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Custom Path Redirect</h3>
          <div className="flex gap-2">
            <Input
              placeholder="/dashboard/profile"
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
            />
            <Button 
              onClick={resetToCustomPath}
              variant="secondary"
            >
              Go
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Try: /login, /dashboard, etc.
          </p>
        </div>

        {/* 4. Hard Reset */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="font-medium">Hard Reset</h3>
          <Button 
            onClick={hardReset}
            variant="destructive"
            className="w-full"
          >
            Force Reload
          </Button>
          <p className="text-sm text-muted-foreground">
            Full page reload (clears all state)
          </p>
        </div>
      </div>

      {/* Query Param Generator for Testing */}
      <div className="p-4 border rounded-lg space-y-4">
        <h3 className="font-medium">Test Query Params</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => router.push(`${pathname}?test=1`)}
            variant="outline"
          >
            Add ?test=1
          </Button>
          <Button
            onClick={() => router.push(`${pathname}?search=hello&filter=all`)}
            variant="outline"
          >
            Add Multiple Params
          </Button>
        </div>
      </div>
    </div>
  )
}