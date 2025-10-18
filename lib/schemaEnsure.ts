import { prisma } from './prisma'

async function columnExists(table: string, column: string): Promise<boolean> {
  try {
    const result = await prisma.$queryRawUnsafe<any[]>(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND column_name = $2`,
      table.toLowerCase(),
      column.toLowerCase()
    )
    return result.length > 0
  } catch (error) {
    console.error('Error checking column existence:', error)
    return false
  }
}

export async function ensureUserExtras() {
  try {
    // Check if passwordPlain column exists
    if (!(await columnExists('User', 'passwordPlain'))) {
      await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "passwordPlain" TEXT;`)
    }
    
    // Check if phone column exists
    if (!(await columnExists('User', 'phone'))) {
      await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN "phone" TEXT;`)
      // Add unique constraint for phone if not present
      try {
        await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");`)
      } catch (error) {
        // Index might already exist, ignore error
        console.log('Phone unique index might already exist')
      }
    }
  } catch (error) {
    console.error('Error ensuring user extras:', error)
    // In production, you might want to handle this differently
  }
}


