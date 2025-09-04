import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import WordleBox from './components/Wordle'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <WordleBox/>
    </div>
  )
}
