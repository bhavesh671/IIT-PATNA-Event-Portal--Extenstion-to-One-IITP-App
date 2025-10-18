import { prisma } from './prisma'

async function columnExists(table: string, column: string): Promise<boolean> {
  const rows = await prisma.$queryRawUnsafe<any[]>(`PRAGMA table_info(${table});`)
  return rows.some((r) => r.name === column)
}

export async function ensureUserExtras() {
  if (!(await columnExists('User', 'passwordPlain'))) {
    await prisma.$executeRawUnsafe(`ALTER TABLE User ADD COLUMN passwordPlain TEXT;`)
  }
  if (!(await columnExists('User', 'phone'))) {
    await prisma.$executeRawUnsafe(`ALTER TABLE User ADD COLUMN phone TEXT;`)
    // Attempt to add a unique index for phone if not present
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS User_phone_key ON User(phone);`)
  }
}


