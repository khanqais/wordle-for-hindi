'use client'
import { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { getMyStats } from '@/app/actions/stats'

type Props = { onClose: () => void }

export default function Leaderboard({ onClose }: Props) {
  const [stats, setStats] = useState<any>(null)

  // Direct server-action call — no dynamic import overhead.
  // The action itself is cached via unstable_cache.
  useEffect(() => {
    getMyStats().then(setStats)
  }, [])

  if (!stats) return null
  const winPct =
    stats.gamesPlayed === 0 ? 0 : Math.round((stats.wins / stats.gamesPlayed) * 100)

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <section
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xs rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <IoMdClose size={24} />
          </button>
        </header>

        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span>Played</span><span>{stats.gamesPlayed}</span></li>
          <li className="flex justify-between"><span>Wins</span><span>{stats.wins}</span></li>
          <li className="flex justify-between"><span>Win %</span><span>{winPct}</span></li>
          <li className="flex justify-between"><span>Current streak</span><span>{stats.curStreak}</span></li>
          <li className="flex justify-between"><span>Max streak</span><span>{stats.maxStreak}</span></li>
        </ul>
      </section>
    </div>
  )
}
