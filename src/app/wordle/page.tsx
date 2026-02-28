import React from 'react'
import Navbar from '../components/Navbar'
import WordPuzzle from '../components/WordPuzzle'
import { getCurrentTargetWord } from '@/app/actions/wordleConfig'

// Prefetch the target word on the server so the client
// doesn't need an extra round-trip on mount.
export default async function WordlePage() {
  const targetWord = await getCurrentTargetWord()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Navbar/>
      <WordPuzzle initialTargetWord={targetWord} />
    </div>
  )
}
