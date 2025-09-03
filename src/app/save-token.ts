'use client'
import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

export default function SaveToken() {
  const { getToken } = useAuth()

  useEffect(() => {
    getToken().then(t => {
      if (t) localStorage.setItem('clerkToken', t)
    })
  }, [getToken])

  return null
}
