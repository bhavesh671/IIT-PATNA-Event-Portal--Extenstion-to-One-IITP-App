import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    // Role-based gate: only registered Students/Committees may log in.
    // Admin login permitted only for the demo account.
    const userRoles = await prisma.userRole.findMany({ where: { userId: user.id } })
    const hasRole = (target: string) => userRoles.some(r => r.role === target)

    if (role === 'ADMIN') {
      if (email.toLowerCase() !== 'demo@gmail.com') {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
      // demo admin allowed
    } else if (role === 'STUDENT') {
      if (!hasRole('STUDENT')) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
    } else if (role === 'COMMITTEE') {
      if (!hasRole('COMMITTEE')) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }
    }

    // Create a very simple session cookie (demo-only). In production, use NextAuth or a proper session store.
    const res = NextResponse.json({ ok: true })
    const cookieValue = Buffer.from(JSON.stringify({ uid: user.id, role })).toString('base64')
    res.cookies.set('app_session', cookieValue, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    // Also send a header flag to allow client to react
    res.headers.set('x-login', 'ok')
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


