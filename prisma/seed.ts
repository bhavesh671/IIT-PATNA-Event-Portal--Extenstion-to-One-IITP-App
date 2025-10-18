import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'demo@gmail.com'
  const passwordPlain = 'trial@2025'
  const passwordHash = await bcrypt.hash(passwordPlain, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: passwordHash,
      name: 'Demo User',
    },
  })

  // Ensure all three roles exist for the demo user
  const roles: Role[] = [Role.STUDENT, Role.COMMITTEE, Role.ADMIN]
  for (const role of roles) {
    await prisma.userRole.upsert({
      where: { userId_role: { userId: user.id, role } },
      update: {},
      create: { userId: user.id, role },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


