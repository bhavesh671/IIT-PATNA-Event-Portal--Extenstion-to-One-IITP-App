require('dotenv').config()
process.env.DATABASE_URL = 'postgresql://postgres:Google%402026@db.zfcurejsejwvqoqlmttv.supabase.co:5432/postgres'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Database connection successful:', result)
  } catch (error) {
    console.error('Database connection failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
