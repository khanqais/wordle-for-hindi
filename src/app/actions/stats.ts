'use server'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

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
    return
  }

  const gamesPlayed = row.gamesPlayed + 1
  const wins        = row.wins + (didWin ? 1 : 0)
  const curStreak   = didWin ? row.curStreak + 1 : 0
  const maxStreak   = Math.max(row.maxStreak, curStreak)

  await prisma.wordleStat.update({
    where: { userId: user.id },
    data:  { gamesPlayed, wins, curStreak, maxStreak },
  })
}

export async function getMyStats() {
  const user = await currentUser()
  if (!user) return null
  return prisma.wordleStat.findUnique({ where: { userId: user.id } })
}
