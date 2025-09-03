'use client'
import { useAuth, useUser } from '@clerk/nextjs'

export default function UserInfo() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Please sign in</div>

  return <div>Hello, {user?.firstName}!</div>
}
