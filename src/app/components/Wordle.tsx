'use client'

import Link from "next/link"

export default function WordleBox() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center">
        
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-8 mb-4 w-80 h-80 flex flex-col items-center justify-center">
          
          <div className="grid grid-cols-5 gap-1 mb-6">
            
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded"></div>
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            
           
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded"></div>
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            
            {/* Row 3 */}
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
            <div className="w-8 h-8 bg-green-500 rounded"></div>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Wordle
          </h3>
        </div>
        
        {/* Buttons */}
        <div className="space-y-3 w-80">
          <Link 
            href='/wordle' 
            className="block w-full py-3 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 text-center"
          >
            Play
          </Link>
          
          <button className="w-full py-3 px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200">
            Archive
          </button> 
        </div>
      </div>
    </div>
  )
}
