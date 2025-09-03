'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { MdLeaderboard } from 'react-icons/md'
import { FaLightbulb } from 'react-icons/fa'
import { ModeToggle } from './mode-toggle'
import Leaderboard from './Leaderboard'

export default function Navbar() {
  const [showLeader, setShowLeader] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200/40 dark:border-gray-700/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              MyApp
            </span>
          </Link>

          
          <div className="hidden items-center space-x-4 md:flex">
            <SignedIn>
              <button
                onClick={() => setShowLeader(true)}
                className="rounded-md p-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <MdLeaderboard size={28} />
              </button>

              <button className="rounded-md p-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                <FaLightbulb size={28} />
              </button>
            </SignedIn>
          </div>

          
          <div className="flex items-center space-x-4">
            <ModeToggle />

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                  Sign In
                </button>
              </SignInButton>

              <SignInButton mode="modal">
                <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-lg">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </SignedIn>
          </div>
        </div>
      </nav>

      {showLeader && <Leaderboard onClose={() => setShowLeader(false)} />}
    </>
  )
}
