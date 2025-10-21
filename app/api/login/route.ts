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

    // Find all users with this email
    const users = await prisma.user.findMany({ 
      where: { email },
      include: { roles: true }
    })
    
    if (users.length === 0) {
      console.log('User not found:', email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Find the user that has the requested role
    let matchedUser = null
    for (const user of users) {
      const ok = await bcrypt.compare(password, user.password)
      if (ok && user.roles.some(r => r.role === role)) {
        matchedUser = user
        break
      }
    }

    if (!matchedUser) {
      console.log('No matching user found for role:', role)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('User logged in:', matchedUser.id, 'Role:', role)

    // Create a very simple session cookie (demo-only). In production, use NextAuth or a proper session store.
    const res = NextResponse.json({ ok: true })
    const cookieValue = Buffer.from(JSON.stringify({ uid: matchedUser.id, role })).toString('base64')
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


