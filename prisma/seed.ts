import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ========================================
  // PART 1: Default Admin Users
  // ========================================
  console.log('\n📌 Creating default admin users...')
  
  const adminEmail1 = 'admin@iitp.ac.in'
  const adminPassword1 = 'Admin@2025'
  const adminHash1 = await bcrypt.hash(adminPassword1, 10)

  // Clear existing admin 1
  await prisma.user.deleteMany({ where: { email: adminEmail1 } })
  
  const admin1 = await prisma.user.create({
    data: {
      email: adminEmail1,
      password: adminHash1,
      name: 'IIT Patna Admin',
      passwordPlain: adminPassword1,
      phone: '9999999999'
    }
  })
  await prisma.userRole.create({
    data: { userId: admin1.id, role: Role.ADMIN }
  })
  console.log('✅ Admin 1 created:', adminEmail1)

  const adminEmail2 = 'admin2@iitp.ac.in'
  const adminPassword2 = 'Admin2@2025'
  const adminHash2 = await bcrypt.hash(adminPassword2, 10)

  // Clear existing admin 2
  await prisma.user.deleteMany({ where: { email: adminEmail2 } })
  
  const admin2 = await prisma.user.create({
    data: {
      email: adminEmail2,
      password: adminHash2,
      name: 'IIT Patna Admin 2',
      passwordPlain: adminPassword2,
      phone: '8888888888'
    }
  })
  await prisma.userRole.create({
    data: { userId: admin2.id, role: Role.ADMIN }
  })
  console.log('✅ Admin 2 created:', adminEmail2)

  // ========================================
  // PART 2: Demo Users (Same Email/Password)
  // ========================================
  console.log('\n📌 Creating 3 demo users (same email)...')
  
  const demoEmail = 'demo@gmail.com'
  const demoPassword = 'trial@2025'
  const demoHash = await bcrypt.hash(demoPassword, 10)

  // Clear existing demo users
  await prisma.user.deleteMany({ where: { email: demoEmail } })

  // USER 1: STUDENT
  const studentUser = await prisma.user.create({
    data: {
      email: demoEmail,
      password: demoHash,
      name: 'Demo Student',
      passwordPlain: demoPassword,
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
  console.log('✅ Demo Student created')

  // USER 2: COMMITTEE
  const clubUser = await prisma.user.create({
    data: {
      email: demoEmail,
      password: demoHash,
      name: 'Demo Club',
      passwordPlain: demoPassword,
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
  console.log('✅ Demo Club created')

  // USER 3: ADMIN
  const demoAdmin = await prisma.user.create({
    data: {
      email: demoEmail,
      password: demoHash,
      name: 'Demo Admin',
      passwordPlain: demoPassword,
      phone: '3333333333'
    }
  })

  await prisma.userRole.create({
    data: { userId: demoAdmin.id, role: Role.ADMIN }
  })
  console.log('✅ Demo Admin created')

  console.log('\n🎉 Database seeding completed successfully!')
  console.log('\n📝 Login Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('Default Admins:')
  console.log('  1. admin@iitp.ac.in / Admin@2025')
  console.log('  2. admin2@iitp.ac.in / Admin2@2025')
  console.log('\nDemo Users (all roles):')
  console.log('  demo@gmail.com / trial@2025')
  console.log('  (Select role on login page)')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
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


