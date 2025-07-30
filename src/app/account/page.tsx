'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import ProfileForm from './components/ProfileForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin?callbackUrl=/account')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="bg-white p-6 rounded-lg shadow">
              <ProfileForm user={session?.user} />
            </div>
          </TabsContent>
          
          <TabsContent value="password">
            <div className="bg-white p-6 rounded-lg shadow">
              <ChangePasswordForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}