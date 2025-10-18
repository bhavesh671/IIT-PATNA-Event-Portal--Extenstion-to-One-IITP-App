// In-memory OTP store for development
// In production, consider using Redis or a database
const otpStore = new Map<string, string>()

export function setOTP(phone: string, otp: string) {
  otpStore.set(phone, otp)
}

export function getOTP(phone: string): string | undefined {
  return otpStore.get(phone)
}

export function deleteOTP(phone: string) {
  otpStore.delete(phone)
}
