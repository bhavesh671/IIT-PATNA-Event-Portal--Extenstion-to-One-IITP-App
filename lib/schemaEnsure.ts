import { prisma } from './prisma'

// Detect database type from DATABASE_URL
const isPostgreSQL = process.env.DATABASE_URL?.startsWith('postgresql') || 
                     process.env.DATABASE_URL?.startsWith('postgres')

async function columnExists(table: string, column: string): Promise<boolean> {
  try {
    if (isPostgreSQL) {
      // PostgreSQL syntax
      const result = await prisma.$queryRawUnsafe<any[]>(
        `SELECT column_name FROM information_schema.columns 
         WHERE table_name = '${table}' AND column_name = '${column}'`
      )
      return result.length > 0
    } else {
      // SQLite syntax
      const result = await prisma.$queryRawUnsafe<any[]>(
        `SELECT name FROM pragma_table_info('${table}') WHERE name = '${column}'`
      )
      return result.length > 0
    }
  } catch (error) {
    console.error('Error checking column existence:', error)
    return false
  }
}

export async function ensureUserExtras() {
  try {
    if (isPostgreSQL) {
      // PostgreSQL: Check and add columns
      if (!(await columnExists('User', 'passwordPlain'))) {
        await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "passwordPlain" TEXT;`)
      }
      
      if (!(await columnExists('User', 'phone'))) {
        await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "phone" TEXT;`)
        // Add unique constraint for phone
        try {
          await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD CONSTRAINT "User_phone_key" UNIQUE ("phone");`)
        } catch (error) {
          console.log('Phone unique constraint might already exist')
        }
      }
    } else {
      // SQLite: Check and add columns
      if (!(await columnExists('User', 'passwordPlain'))) {
        await prisma.$executeRawUnsafe(`ALTER TABLE User ADD COLUMN passwordPlain TEXT;`)
      }
      
      if (!(await columnExists('User', 'phone'))) {
        await prisma.$executeRawUnsafe(`ALTER TABLE User ADD COLUMN phone TEXT;`)
        // Add unique index for phone
        try {
          await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS User_phone_key ON User(phone);`)
        } catch (error) {
          console.log('Phone unique index might already exist')
        }
      }
    }
  } catch (error) {
    console.error('Error ensuring user extras:', error)
    // In production, you might want to handle this differently
  }
}


