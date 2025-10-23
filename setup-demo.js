const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

// Use environment DATABASE_URL or default to local SQLite
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./prisma/dev.db'
  console.log('Using local SQLite database\n')
} else {
  console.log('Using DATABASE_URL from environment\n')
}

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🌱 Setting up database with default users...\n')
    
    // ========================================
    // PART 1: Default Admin Users
    // ========================================
    console.log('📌 Creating default admin users...')
    
    const adminEmail1 = 'admin@iitp.ac.in'
    const adminPassword1 = 'Admin@2025'
    const adminHash1 = await bcrypt.hash(adminPassword1, 10)

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
      data: { userId: admin1.id, role: 'ADMIN' }
    })
    console.log('✅ Admin 1 created:', adminEmail1)

    const adminEmail2 = 'admin2@iitp.ac.in'
    const adminPassword2 = 'Admin2@2025'
    const adminHash2 = await bcrypt.hash(adminPassword2, 10)

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
      data: { userId: admin2.id, role: 'ADMIN' }
    })
    console.log('✅ Admin 2 created:', adminEmail2)
    
    // ========================================
    // PART 2: Demo Users (Same Email/Password)
    // ========================================
    console.log('\n📌 Creating 3 demo users (same email)...')
    
    const email = 'demo@gmail.com'
    const password = 'trial@2025'
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Clear existing demo users
    await prisma.user.deleteMany({ where: { email } })
    
    // USER 1: STUDENT
    const studentUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Demo Student',
        passwordPlain: password,
        phone: '1111111111'
      }
    })
    
    await prisma.userRole.create({
      data: { userId: studentUser.id, role: 'STUDENT' }
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
    
    console.log('✅ STUDENT user created (has roll number)')
    
    // USER 2: COMMITTEE
    const clubUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Demo Club',
        passwordPlain: password,
        phone: '2222222222'
      }
    })
    
    await prisma.userRole.create({
      data: { userId: clubUser.id, role: 'COMMITTEE' }
    })
    
    await prisma.committeeProfile.create({
      data: {
        userId: clubUser.id,
        committeeCode: 'DEMO001',
        clubName: 'Tech Club'
      }
    })
    
    console.log('✅ COMMITTEE user created (has club info)')
    
    // USER 3: ADMIN
    const adminUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Demo Admin',
        passwordPlain: password,
        phone: '3333333333'
      }
    })
    
    await prisma.userRole.create({
      data: { userId: adminUser.id, role: 'ADMIN' }
    })
    
    console.log('✅ Demo Admin created\n')
    
    console.log('🎉 Database setup completed successfully!')
    console.log('\n📝 Login Credentials:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Default Admins:')
    console.log('  1. admin@iitp.ac.in / Admin@2025')
    console.log('  2. admin2@iitp.ac.in / Admin2@2025')
    console.log('\nDemo Users (all roles):')
    console.log('  demo@gmail.com / trial@2025')
    console.log('  (Select role on login page)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
  } catch (error) {
    console.error('Error setting up database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()