import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // This is just a placeholder to ensure Prisma is properly initialized
  console.log('Prisma initialized successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 