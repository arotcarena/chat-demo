import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../services/password-hasher'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()

  const password = await hashPassword('password');

  // insérer quelques users
  await prisma.user.createMany({
    data: [
      { username: 'Alice', password: password },
      { username: 'Bob',   password: password },
      { username: 'Charlie',   password: password },
      { username: 'Georges',   password: password },
      { username: 'Dave',   password: password },
      { username: 'Eve',   password: password },
      { username: 'Julie',   password: password },
    ],
  })

  await prisma.conversation.deleteMany()
  await prisma.message.deleteMany()
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
