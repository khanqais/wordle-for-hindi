'use client'

import Link from "next/link"

export default function WordleBox() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 dark:bg-green-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
       
        <div className="mb-12">

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-green-600 bg-clip-text text-transparent leading-tight">
            Akshar
          </h1>
          
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-2">
            Hindi Word Puzzle
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hindi Words Ka Ultimate Challenge • Daily Brain Teaser
          </p>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Game Preview Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
          {/* Sample Wordle Grid */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-5 gap-2">
              
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">P</span>
              </div>
              <div className="w-12 h-12 bg-yellow-400 rounded-lg border-2 border-yellow-500 flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">A</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">N</span>
              </div>
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">I</span>
              </div>
              
              {/* Row 2 - Winning word */}
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">I</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg border-2 border-green-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">A</span>
              </div>
            </div>
          </div>
          
          {/* Game Stats */}
          
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href='/wordle' 
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg min-w-[200px]"
          >
            <span className="relative z-10">🎮 Start Playing</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 flex items-center justify-center md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl mb-3">🧩</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fun Puzzle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hindi words ka challenge</p>
          </div>
          
          
          
          <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Daily Game</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Roz naya word, naya challenge</p>
          </div>
        </div>
      </div>
    </div>
  )
}
