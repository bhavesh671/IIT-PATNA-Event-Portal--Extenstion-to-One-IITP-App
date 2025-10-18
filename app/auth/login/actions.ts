"use server"

import { signIn } from 'next-auth/react'

export async function credentialsLogin(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const res = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })
  return res
}


