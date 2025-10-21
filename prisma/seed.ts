import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'demo@gmail.com'
  const passwordPlain = 'trial@2025'
  const passwordHash = await bcrypt.hash(passwordPlain, 10)

  console.log('Creating 3 separate demo users...')

  // Clear existing demo users
  await prisma.user.deleteMany({ where: { email } })

  // USER 1: STUDENT
  const studentUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name: 'Demo Student',
      passwordPlain,
      phone: '1111111111'
    }
  })

  await prisma.userRole.create({
    data: { userId: studentUser.id, role: Role.STUDENT }
  })

  await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      rollNumber: '2024CS001',
      age: 20,
      gender: 'Male',
      dateOfBirth: new Date('2004-01-01'),
      course: 'B.Tech',
      branch: 'Computer Science',
      year: 2024
    }
  })

  // USER 2: COMMITTEE
  const clubUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name: 'Demo Club',
      passwordPlain,
      phone: '2222222222'
    }
  })

  await prisma.userRole.create({
    data: { userId: clubUser.id, role: Role.COMMITTEE }
  })

  await prisma.committeeProfile.create({
    data: {
      userId: clubUser.id,
      committeeCode: 'DEMO001',
      clubName: 'Tech Club'
    }
  })

  // USER 3: ADMIN
  const adminUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name: 'Demo Admin',
      passwordPlain,
      phone: '3333333333'
    }
  })

  await prisma.userRole.create({
    data: { userId: adminUser.id, role: Role.ADMIN }
  })

  console.log('✅ 3 separate demo users created successfully!')
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


