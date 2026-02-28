'use server'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { revalidateTag, unstable_cache } from 'next/cache'

export async function recordGame(didWin: boolean) {
  const user = await currentUser()
  if (!user) return

  const row = await prisma.wordleStat.findUnique({
    where: { userId: user.id },
  })

  if (!row) {
    await prisma.wordleStat.create({
      data: {
        userId: user.id,
        gamesPlayed: 1,
        wins:        didWin ? 1 : 0,
        curStreak:   didWin ? 1 : 0,
        maxStreak:   didWin ? 1 : 0,
      },
    })
  } else {
    const gamesPlayed = row.gamesPlayed + 1
    const wins        = row.wins + (didWin ? 1 : 0)
    const curStreak   = didWin ? row.curStreak + 1 : 0
    const maxStreak   = Math.max(row.maxStreak, curStreak)

    await prisma.wordleStat.update({
      where: { userId: user.id },
      data:  { gamesPlayed, wins, curStreak, maxStreak },
    })
  }

  // Invalidate this user's cached stats so the leaderboard shows fresh data
  revalidateTag(`user-stats-${user.id}`)
}

// Cached per-user stats — busted after every game record
export async function getMyStats() {
  const user = await currentUser()
  if (!user) return null

  const _fetchStats = unstable_cache(
    async (uid: string) => {
      return prisma.wordleStat.findUnique({ where: { userId: uid } })
    },
    [`user-stats-${user.id}`],
    { revalidate: 120, tags: [`user-stats-${user.id}`] } // 2 min cache + tag invalidation
  )

  return _fetchStats(user.id)
}
