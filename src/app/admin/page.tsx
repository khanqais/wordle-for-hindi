'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { setTargetWord, getCurrentTargetWord, getWordHistory } from '@/app/actions/wordleConfig'
import { Settings, RefreshCw, Clock, CheckCircle2, AlertCircle, LogOut } from 'lucide-react'
import AdminAuth from '@/app/components/AdminAuth'

type WordHistoryItem = {
  id: number
  targetWord: string
  createdAt: Date
  isActive: boolean
  createdBy: string | null
}

export default function AdminPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const [newWord, setNewWord] = useState('')
  const [currentWord, setCurrentWord] = useState('')
  const [history, setHistory] = useState<WordHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      checkAdminAuth()
    }
  }, [isLoaded])

  const checkAdminAuth = () => {
    
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth) {
      try {
        const auth = JSON.parse(adminAuth)
        
        const isValid = Date.now() - auth.timestamp < 24 * 60 * 60 * 1000
        if (isValid && auth.username === 'KhanQais') {
          setIsAdminAuthenticated(true)
          loadAdminData()
          return
        }
      } catch (e) {
        console.log(e);
        
      }
    }
    setLoading(false)
  }

  const loadAdminData = async () => {
    try {
      const [word, wordHistory] = await Promise.all([
        getCurrentTargetWord(),
        getWordHistory()
      ])
      setCurrentWord(word)
      setHistory(wordHistory)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdminAuth = () => {
    setIsAdminAuthenticated(true)
    setLoading(true)
    loadAdminData()
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAdminAuthenticated(false)
    setCurrentWord('')
    setHistory([])
    setNewWord('')
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const result = await setTargetWord(newWord)
      
      if (result.success) {
        setMessage({ text: result.message, type: 'success' })
        setNewWord('')
        setCurrentWord(newWord.toUpperCase())
        // Refresh history
        const updatedHistory = await getWordHistory()
        setHistory(updatedHistory)
      } else {
        setMessage({ text: result.message, type: 'error' })
      }
    } catch (error) {
      setMessage({ text: 'An unexpected error occurred', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAdminAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAdminAuth} />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Manage Wordle target words</p>
        </div>

        {/* Display krne ke liye */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Target Word</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
              <span className="text-2xl font-bold text-blue-800 dark:text-blue-200 tracking-wider">
                {currentWord}
              </span>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Update Word Ke liye */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Update Target Word</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newWord" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Target Word (5 letters)
              </label>
              <input
                type="text"
                id="newWord"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value.toUpperCase())}
                maxLength={5}
                placeholder="ENTER"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                disabled={submitting}
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting || newWord.length !== 5}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Target Word'
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}>
              {message.text}
            </div>
          )}
        </div>

       {/* Word History ke liye */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Word History</span>
          </h2>
          
          {history.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No word history available</p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold text-lg tracking-wider ${
                      item.isActive ? 'text-blue-800 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.targetWord}
                    </span>
                    {item.isActive && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Active</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
