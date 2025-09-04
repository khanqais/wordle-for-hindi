'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/nextjs'
import { MdLeaderboard } from 'react-icons/md'
import { MdOutlineQuestionMark } from "react-icons/md";
import { Settings } from 'lucide-react'
import Leaderboard from './Leaderboard'

export default function Navbar() {
  const [showLeader, setShowLeader] = useState(false)
  const [ShowHowTo, SetShowHowTo] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200/40 dark:border-gray-700/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Akshar
            </span>
          </Link>

          
          <div className="hidden items-center space-x-4 md:flex">
            {isSignedIn ? (
              <button
                onClick={() => setShowLeader(true)}
                className="rounded-md p-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                title="Leaderboard"
              >
                <MdLeaderboard size={28} />
              </button>
            ) : (
              <SignInButton mode="modal">
                <button
                  className="rounded-md p-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  title="Sign in to view Leaderboard"
                >
                  <MdLeaderboard size={28} />
                </button>
              </SignInButton>
            )}

            
            <Link
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                title="Admin Panel (Opens in new tab)"
              >
                <Settings size={20} />
                <span className="hidden lg:inline">Admin</span>
              </Link>

           
            <button 
              onClick={() => SetShowHowTo(true)} 
              className="rounded-md p-1 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              title="How to play"
            >
              <MdOutlineQuestionMark size={28} />
            </button>

            
           
          </div>

          
          <div className="flex items-center space-x-4">
           
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-md p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

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

       
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/40 dark:border-gray-700/40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              
              {isSignedIn ? (
                <button
                  onClick={() => {
                    setShowLeader(true)
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                >
                  <MdLeaderboard size={20} />
                  <span>Leaderboard</span>
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
                    <MdLeaderboard size={20} />
                    <span>Leaderboard </span>
                  </button>
                </SignInButton>
              )}

               <Link
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Admin Panel</span>
                </Link>

              {/* Mobile How To */}
              <button
                onClick={() => {
                  SetShowHowTo(true)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              >
                <MdOutlineQuestionMark size={20} />
                <span>How to Play</span>
              </button>

              
            </div>
          </div>
        )}
      </nav>

      {showLeader && isSignedIn && <Leaderboard onClose={() => setShowLeader(false)} />}
      
      {/* How To Play Modal */}
      {ShowHowTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">How to Play</h2>
              <button
                onClick={() => SetShowHowTo(false)}
                className="rounded-md p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>🎯 <strong>Goal:</strong> Guess the 5-letter word in 6 tries</p>
              <p>🟢 <strong>Green:</strong> Correct letter in correct position</p>
              <p>🟡 <strong>Yellow:</strong> Correct letter in wrong position</p>
              <p>⚫ <strong>Gray:</strong> Letter not in the word</p>
              <p>✏️ Type letters and press SUBMIT to guess</p>
              <p>🔙 Use CLEAR to delete letters</p>
            </div>
            <button
              onClick={() => SetShowHowTo(false)}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
