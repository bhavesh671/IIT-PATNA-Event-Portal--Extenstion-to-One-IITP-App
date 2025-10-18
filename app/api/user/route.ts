import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExtras } from '@/lib/schemaEnsure'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    await ensureUserExtras()
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        student: true,
        committee: true,
        roles: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's name from user table or use email prefix as fallback
    let displayName = user.name || user.email.split('@')[0]
    
    // For committee users, use club name as display name
    if (user.committee && user.committee.clubName) {
      displayName = user.committee.clubName
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: displayName,
      roles: user.roles.map(r => r.role),
      student: user.student,
      committee: user.committee
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
