import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a default target word
  const defaultWord = await prisma.wordleConfig.create({
    data: {
      targetWord: 'BRAIN',
      isActive: true,
    }
  })
  
  console.log('Seeded default target word:', defaultWord)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
