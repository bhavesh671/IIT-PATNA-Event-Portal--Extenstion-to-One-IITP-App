import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserExtras } from '@/lib/schemaEnsure'
import { setOTP } from '@/lib/otpStore'

export async function POST(request: Request) {
  const { phone } = await request.json()
  await ensureUserExtras()
  if (!phone) return NextResponse.json({ error: 'Phone required' }, { status: 400 })
  const user = await prisma.user.findFirst({ where: { phone } })
  if (!user) return NextResponse.json({ error: 'Number does not match any credential' }, { status: 404 })
  const otp = String(Math.floor(100000 + Math.random() * 900000))
  setOTP(phone, otp)
  // For demo: return OTP in response; in prod we would send SMS.
  return NextResponse.json({ ok: true, otp })
}



