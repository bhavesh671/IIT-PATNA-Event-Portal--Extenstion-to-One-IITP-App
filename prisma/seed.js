const { PrismaClient, Role } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()
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

  const roles = [Role.STUDENT, Role.COMMITTEE, Role.ADMIN]
  for (const role of roles) {
    await prisma.userRole.upsert({
      where: { userId_role: { userId: user.id, role } },
      update: {},
      create: { userId: user.id, role },
    })
  }

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  process.exit(1)
})
