import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { ensureUserExtras } from '@/lib/schemaEnsure'
import { Role } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const { role, form } = await request.json()
    console.log('Registration attempt:', { role, email: form?.email }) // Debug log
    
    await ensureUserExtras()
    const email: string = form?.email
    const password: string = form?.password
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      console.log('Email already exists:', email)
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name: form?.name ?? null,
      },
    })
    console.log('User created:', user.id)

    // Set columns not known to Prisma Client via raw SQL (demo-only)
    const phone = form?.phone ? String(form.phone) : null
    const passwordPlain = form?.password ? String(form.password) : null
    if (phone !== null || passwordPlain !== null) {
      const sets: string[] = []
      if (phone !== null) sets.push(`"phone"='${phone.replace(/'/g, "''")}'`)
      if (passwordPlain !== null) sets.push(`"passwordPlain"='${passwordPlain.replace(/'/g, "''")}'`)
      if (sets.length > 0) {
        await prisma.$executeRawUnsafe(`UPDATE "User" SET ${sets.join(', ')} WHERE id='${user.id}';`)
      }
    }

    if (role === 'student') {
      // Validate required student fields
      if (!form.rollNumber || !form.age || !form.gender || !form.dateOfBirth || !form.course || !form.branch || !form.year) {
        return NextResponse.json({ error: 'All student fields are required' }, { status: 400 })
      }
      
      await prisma.userRole.create({ data: { userId: user.id, role: Role.STUDENT } })
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          rollNumber: String(form.rollNumber),
          age: Number(form.age),
          photoUrl: form.photoUrl || null,
          gender: String(form.gender),
          dateOfBirth: new Date(form.dateOfBirth),
          course: String(form.course),
          branch: String(form.branch),
          year: Number(form.year),
        },
      })
      console.log('Student profile created')
    } else if (role === 'club') {
      // Validate required committee fields
      if (!form.committeeCode || !form.clubName) {
        return NextResponse.json({ error: 'Committee code and club name are required' }, { status: 400 })
      }
      
      await prisma.userRole.create({ data: { userId: user.id, role: Role.COMMITTEE } })
      await prisma.committeeProfile.create({
        data: {
          userId: user.id,
          committeeCode: String(form.committeeCode),
          clubName: String(form.clubName),
        },
      })
      console.log('Committee profile created')
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    console.log('Registration successful for:', email)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Registration error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


