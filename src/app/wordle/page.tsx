import React from 'react'
import Navbar from '../components/Navbar'
import WordPuzzle from '../components/WordPuzzle'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Navbar/>
      <WordPuzzle/>
    </div>
  )
}

export default page
