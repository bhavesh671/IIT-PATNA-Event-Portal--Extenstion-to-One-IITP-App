import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { otpStore } from '../send/route'
import { ensureUserExtras } from '@/lib/schemaEnsure'

export async function POST(request: Request) {
  const { phone, otp } = await request.json()
  await ensureUserExtras()
  if (!phone || !otp) return NextResponse.json({ error: 'Phone and OTP required' }, { status: 400 })
  const right = otpStore.get(phone)
  if (!right || right !== otp) return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 })
  const user = await prisma.user.findFirst({ where: { phone } })
  if (!user) return NextResponse.json({ error: 'Number does not match any credential' }, { status: 404 })
  return NextResponse.json({ ok: true, passwordPlain: user.passwordPlain ?? '' })
}


