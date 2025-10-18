'use client'

import { useState } from 'react'

export default function ForgotPassword() {
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [password, setPassword] = useState<string | null>(null)

 const sendOtp = async () => {
  alert('Feature coming soon!')
  return
}

  const verifyOtp = async () => {
  alert('Feature coming soon!')
  return
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-black mb-4">Forgot Password</h1>
        {error && <div className="text-red-600 font-medium mb-3">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Registered Mobile Number</label>
            <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full px-4 py-2 border rounded bg-white text-black" placeholder="Enter mobile number" />
          </div>
          {!otpSent ? (
            <button onClick={sendOtp} className="w-full bg-blue-600 text-white py-2 rounded">Send OTP</button>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Enter OTP</label>
                <input value={otp} onChange={(e)=>setOtp(e.target.value)} className="w-full px-4 py-2 border rounded bg-white text-black" placeholder="Enter OTP" />
              </div>
              <button onClick={verifyOtp} className="w-full bg-blue-600 text-white py-2 rounded">Verify</button>
            </>
          )}
          {password !== null && (
            <div className="mt-4 p-3 bg-gray-50 border rounded">
              <div className="text-sm text-black">Your registered password:</div>
              <div className="font-semibold text-black">{password}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


