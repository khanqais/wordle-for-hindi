'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


const ADMIN_CREDENTIALS = [
  {
    username: 'KhanQais',
    email: 'khanzakiya6600@gmail.com', 
  },
 
]

export async function isUserAdmin(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false
  
  try {
    const user = await currentUser()
    if (!user) return false
    
    
    const isAdmin = ADMIN_CREDENTIALS.some(admin => 
      user.username === admin.username || 
      user.emailAddresses?.some(email => email.emailAddress === admin.email)
    )
    
    return isAdmin
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export async function getCurrentTargetWord(): Promise<string> {
  try {
    const activeWord = await prisma.wordleConfig.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    })
    
    
    return activeWord?.targetWord || 'BRAIN'
  } catch (error) {
    console.error('Error fetching target word:', error)
    return 'BRAIN' 
  }
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
    
    
    revalidatePath('/wordle')
    revalidatePath('/admin')
    revalidatePath('/')
    
    return { success: true, message: `Target word updated to "${word}"` }
  } catch (error) {
    console.error('Error setting target word:', error)
    return { success: false, message: 'Failed to update target word' }
  }
}

export async function getWordHistory(): Promise<Array<{
  id: number
  targetWord: string
  createdAt: Date
  isActive: boolean
  createdBy: string | null
}>> {
  
  try {
    const history = await prisma.wordleConfig.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    })
    
    return history
  } catch (error) {
    console.error('Error fetching word history:', error)
    return []
  }
}
