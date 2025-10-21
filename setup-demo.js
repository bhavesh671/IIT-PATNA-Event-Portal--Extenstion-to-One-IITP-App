const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

// Set environment variable (use the correct path)
process.env.DATABASE_URL = 'file:./prisma/dev.db'

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('Creating 3 SEPARATE user entries...\n')
    
    const email = 'demo@gmail.com'
    const password = 'trial@2025'
    const hashedPassword = await bcrypt.hash(password, 10)
    
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
    
    console.log('✅ ADMIN user created (admin only)\n')
    console.log('🎉 3 separate users created!')
    console.log('Login: demo@gmail.com / trial@2025')
    console.log('Select role on login page!')
    
  } catch (error) {
    console.error('Error setting up database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()