import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function OnboardingPage() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Hi {user?.firstName}, thanks for joining our app!
          </p>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✅ Account Created</h3>
              <p className="text-sm text-green-700">
                Your account was successfully created and you've been automatically signed in.
              </p>
            </div>
            
            <Link 
              href="/dashboard" 
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Get Started
            </Link>
            
            <Link href="/" className="block text-gray-600 hover:text-gray-800 text-sm">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
