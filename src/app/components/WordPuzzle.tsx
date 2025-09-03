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

const TARGET_WORD = 'BRAIN'

export default function WordPuzzle() {
  const [grid, setGrid] = useState(initialGrid)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing')

  function getCellStyle(letter: string, rowIndex: number, colIndex: number) {
    if (!letter) return 'bg-gray-800 border-2 border-gray-600 text-gray-300'
    
    if (rowIndex < currentRow) {
      if (letter === TARGET_WORD[colIndex]) return 'bg-emerald-600 border-emerald-500 text-white'
      if (TARGET_WORD.includes(letter)) return 'bg-amber-500 border-amber-400 text-white'
      return 'bg-gray-700 border-gray-600 text-gray-300'
    }
    
    return 'bg-gray-900 border-2 border-gray-500 text-white'
  }

  function getKeyStyle(key: string) {
    const usedLetters = grid.slice(0, currentRow).flat()
    
    if (usedLetters.includes(key)) {
      if (TARGET_WORD.includes(key)) {
        let isCorrectPosition = false
        for (let i = 0; i < currentRow; i++) {
          for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === key && TARGET_WORD[j] === key) {
              isCorrectPosition = true
            }
          }
        }
        return isCorrectPosition ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
      }
      return 'bg-gray-700 text-gray-300'
    }
    
    return 'bg-gray-600 text-white hover:bg-gray-500'
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
      if (currentWord === TARGET_WORD) {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 ">
     
      {gameStatus !== 'playing' && (
        <div className="mb-4 p-3 rounded-lg bg-gray-800 border border-gray-600">
          <p className="text-lg font-semibold text-center">
            {gameStatus === 'won' ? (
              <span className="text-emerald-400">🎉 You won!</span>
            ) : (
              <span className="text-red-400">Word: {TARGET_WORD}</span>
            )}
          </p>
        </div>
      )}

      
      <div className="grid grid-rows-6 gap-1 mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        {grid.map((rowData, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {rowData.map((letter, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold rounded transition-all duration-300 ${getCellStyle(letter, rowIndex, colIndex)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      
      <div className="space-y-1 max-w-sm md:max-w-lg">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                disabled={gameStatus !== 'playing'}
                className={`
                  text-xs px-1 py-1 md:px-2 md:py-2 rounded font-semibold transition-all duration-200
                  ${key === 'SUBMIT' || key === 'CLEAR' ? 'px-3 text-xs' : 'w-7 h-7 md:w-8 md:h-8'} 
                  ${getKeyStyle(key)}
                  ${gameStatus !== 'playing' ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
                `}
              >
                {key === 'CLEAR' ? <ChevronLeft className="w-5 h-5" /> : 
                 key === 'SUBMIT' ? <Check className="w-5 h-5" />  : 
                 key}
              </button>
            ))}
          </div>
        ))}
      </div>

      
      {gameStatus !== 'playing' && (
        <button
          onClick={() => {
            setGrid(initialGrid)
            setCurrentRow(0)
            setCurrentCol(0)
            setGameStatus('playing')
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
        >
          Play Again
        </button>
      )}
    </div>
  )
}
