'use client'
import React, { useState } from 'react'
import { ChevronLeft, Check, X, RotateCcw } from 'lucide-react'
import { recordGame } from '@/app/actions/stats'

const ROWS = 6
const COLS = 5

const initialGrid = Array(ROWS).fill(null).map(() => Array(COLS).fill(''))

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['CLEAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'SUBMIT'],
]

interface WordPuzzleProps {
  initialTargetWord?: string
}

export default function WordPuzzle({ initialTargetWord = 'BRAIN' }: WordPuzzleProps) {
  const [grid, setGrid] = useState(initialGrid)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')
  // Target word is now server-prefetched — no client fetch needed
  const [targetWord] = useState(initialTargetWord)
  const loading = false

  function getCellStyle(letter: string, rowIndex: number, colIndex: number) {
    if (!letter) {
      return 'bg-white/60 dark:bg-gray-700/60 border-2 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500'
    }
    
    if (rowIndex < currentRow) {
      if (letter === targetWord[colIndex]) {
        return 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 text-white shadow-lg'
      }
      if (targetWord.includes(letter)) {
        return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-orange-400 text-white shadow-lg'
      }
      return 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500 text-white shadow-lg'
    }
    
    return 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white shadow-md'
  }

  function getKeyStyle(key: string) {
    const usedLetters = grid.slice(0, currentRow).flat()
    
    if (usedLetters.includes(key)) {
      if (targetWord.includes(key)) {
        let isCorrectPosition = false
        for (let i = 0; i < currentRow; i++) {
          for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === key && targetWord[j] === key) {
              isCorrectPosition = true
            }
          }
        }
        return isCorrectPosition 
          ? 'bg-gradient-to-br from-green-400 to-green-600 text-white border border-green-500' 
          : 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border border-orange-400'
      }
      return 'bg-gradient-to-br from-gray-400 to-gray-600 text-white border border-gray-500'
    }
    
    return 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
  }

  function handleKeyPress(key: string) {
    if (gameStatus !== 'playing') return

    if (key === 'CLEAR') {
      if (currentCol === 0) return
      const newGrid = [...grid]
      newGrid[currentRow][currentCol - 1] = ''
      setGrid(newGrid)
      setCurrentCol(currentCol - 1)
    } else if (key === 'SUBMIT') {
      if (currentCol !== COLS) return
      
      const currentWord = grid[currentRow].join('')
      if (currentWord === targetWord) {
        setGameStatus('won')
        recordGame(true)
        return
      }
      
      if (currentRow === ROWS - 1) {
        setGameStatus('lost')
        recordGame(false)
        return
      }
      
      setCurrentRow(currentRow + 1)
      setCurrentCol(0)
    } else {
      if (currentCol === COLS) return
      const newGrid = [...grid]
      newGrid[currentRow][currentCol] = key
      setGrid(newGrid)
      setCurrentCol(currentCol + 1)
    }
  }

  return (
    <div className="h-screen flex flex-col p-2 md:p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto w-full">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Loading today's puzzle...</p>
          </div>
        ) : (
          <>
            {/* Compact Header */}
            <div className="text-center py-2 md:py-4">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Akshar
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Guess the 5-letter word!</p>
            </div>

            {/* Game status message */}
            {gameStatus !== 'playing' && (
              <div className="mb-2 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 shadow-lg">
                <div className="text-center">
                  {gameStatus === 'won' ? (
                    <div className="space-y-1">
                      <div className="text-2xl">🎉</div>
                      <p className="text-base font-bold text-green-600 dark:text-green-400">Congratulations!</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Found in {currentRow} tries!</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-2xl">😅</div>
                      <p className="text-base font-bold text-red-600 dark:text-red-400">Better luck next time!</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Word: <span className="font-bold text-gray-900 dark:text-white">{targetWord}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Compact Game Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div className="p-3 md:p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="grid grid-rows-6 gap-1.5">
                  {grid.map((rowData, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1.5 justify-center">
                      {rowData.map((letter, colIndex) => (
                        <div 
                          key={`${rowIndex}-${colIndex}`} 
                          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-black rounded-lg transition-all duration-300 transform ${
                            rowIndex === currentRow && colIndex === currentCol && gameStatus === 'playing' 
                              ? 'scale-105 ring-2 ring-indigo-400' 
                              : ''
                          } ${getCellStyle(letter, rowIndex, colIndex)}`}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

           
            <div className="space-y-1 pb-2">
              {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                  {row.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      disabled={gameStatus !== 'playing'}
                      className={`
                        rounded-md font-bold transition-all duration-200 shadow-sm
                        ${key === 'SUBMIT' || key === 'CLEAR' 
                          ? 'px-2 py-2 text-xs' 
                          : 'w-7 h-9 md:w-8 md:h-10 text-xs md:text-sm'
                        } 
                        ${getKeyStyle(key)}
                        ${gameStatus !== 'playing' 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'active:scale-95 hover:shadow-md'
                        }
                      `}
                    >
                      {key === 'CLEAR' ? (
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                      ) : key === 'SUBMIT' ? (
                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        key
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Compact Game Controls */}
            {gameStatus !== 'playing' && (
              <div className="flex justify-center pb-2">
                <button
                  onClick={() => {
                    setGrid(initialGrid)
                    setCurrentRow(0)
                    setCurrentCol(0)
                    setGameStatus('playing')
                  }}
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center space-x-2 text-sm">
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}

            {/* Compact Progress Indicator */}
            <div className="flex justify-center pb-1">
              <div className="flex space-x-1">
                {Array.from({ length: ROWS }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index < currentRow || gameStatus !== 'playing'
                        ? index < currentRow && gameStatus === 'won' && index === currentRow - 1
                          ? 'bg-green-500'
                          : index < currentRow
                          ? 'bg-gray-400'
                          : 'bg-red-500'
                        : index === currentRow
                        ? 'bg-indigo-500 animate-pulse'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
