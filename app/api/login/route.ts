import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()
    console.log('Login attempt:', { email, role }) // Debug log
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      console.log('User not found:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      console.log('Password mismatch for:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Get user roles
    const userRoles = await prisma.userRole.findMany({ where: { userId: user.id } })
    console.log('User roles:', userRoles.map(r => r.role))
    
    const hasRole = (target: string) => userRoles.some(r => r.role === target)

    // Check if user has the requested role
    if (!hasRole(role)) {
      console.log('User does not have role:', role)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
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
    console.error('Login error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


