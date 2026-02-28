'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'


const ADMIN_CREDENTIALS = [
  {
    username: 'KhanQais',
    email: 'khanzakiya6600@gmail.com', 
  },
 
]

// Cached admin check — revalidated when admin status could change
const _checkAdmin = unstable_cache(
  async (userId: string) => {
    try {
      const user = await currentUser()
      if (!user) return false
      return ADMIN_CREDENTIALS.some(admin =>
        user.username === admin.username ||
        user.emailAddresses?.some(email => email.emailAddress === admin.email)
      )
    } catch (error) {
      console.error('Error checking admin status:', error)
      return false
    }
  },
  ['admin-check'],
  { revalidate: 300, tags: ['admin-check'] } // cache 5 min
)

export async function isUserAdmin(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  return _checkAdmin(userId)
}

// Cached target word — revalidated when admin sets a new word
const _fetchTargetWord = unstable_cache(
  async () => {
    try {
      const activeWord = await prisma.wordleConfig.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        select: { targetWord: true },
      })
      return activeWord?.targetWord || 'BRAIN'
    } catch (error) {
      console.error('Error fetching target word:', error)
      return 'BRAIN'
    }
  },
  ['current-target-word'],
  { revalidate: 60, tags: ['target-word'] } // cache 60s + tag-based invalidation
)

export async function getCurrentTargetWord(): Promise<string> {
  return _fetchTargetWord()
}

export async function setTargetWord(newWord: string): Promise<{ success: boolean; message: string }> {
  const { userId } = await auth()
  
  if (!userId) {
    return { success: false, message: 'You must be signed in' }
  }
  
  const isAdmin = await isUserAdmin()
  if (!isAdmin) {
    return { success: false, message: 'You do not have admin permissions' }
  }
  
  
  const word = newWord.toUpperCase().trim()
  if (word.length !== 5) {
    return { success: false, message: 'Word must be exactly 5 letters' }
  }
  
  if (!/^[A-Z]+$/.test(word)) {
    return { success: false, message: 'Word must contain only letters' }
  }
  
  try {
    
    await prisma.wordleConfig.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    
    await prisma.wordleConfig.create({
      data: {
        targetWord: word,
        isActive: true,
        createdBy: userId
      }
    })
    
    
    // Bust caches by tag so all cached reads pick up the new word
    revalidateTag('target-word')
    revalidateTag('word-history')
    revalidatePath('/wordle')
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true, message: `Target word updated to "${word}"` }
  } catch (error) {
    console.error('Error setting target word:', error)
    return { success: false, message: 'Failed to update target word' }
  }
}

// Cached word history — revalidated when a new word is set
const _fetchWordHistory = unstable_cache(
  async () => {
    try {
      const history = await prisma.wordleConfig.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
      return history
    } catch (error) {
      console.error('Error fetching word history:', error)
      return []
    }
  },
  ['word-history'],
  { revalidate: 60, tags: ['word-history'] }
)

export async function getWordHistory(): Promise<Array<{
  id: number
  targetWord: string
  createdAt: Date
  isActive: boolean
  createdBy: string | null
}>> {
  return _fetchWordHistory()
}
