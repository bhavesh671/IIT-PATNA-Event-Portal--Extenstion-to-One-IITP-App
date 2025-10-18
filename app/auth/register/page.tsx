'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Role = 'student' | 'club'

export default function Register() {
  const [role, setRole] = useState<Role>('student')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<any>({
    email: '',
    password: '',
    // student
    rollNumber: '',
    name: '',
    age: '',
    photoUrl: '',
    gender: '',
    dateOfBirth: '',
    course: '',
    branch: '',
    year: '',
    phone: '',
    // committee
    clubName: '',
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((p: any) => ({ ...p, [name]: value }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let photoUrl = ''
      if (role === 'student' && form.photoFile) {
        const fd = new FormData()
        fd.append('file', form.photoFile)
        const up = await fetch('/api/upload', { method: 'POST', body: fd })
        const upData = await up.json()
        if (!up.ok) throw new Error(upData?.error || 'Upload failed')
        photoUrl = upData.url
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, form: { ...form, photoUrl } }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert(data.error || 'Registration failed')
        setIsLoading(false)
        return
      }
      alert('Registered successfully. Please login.')
      window.location.href = '/auth/login'
    } catch (e) {
      alert('Registration failed')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-0">
      {/* Top strip full width, touching edges */}
      <div className="w-full bg-blue-200 shadow-sm">
        <div className="w-full flex items-center justify-center gap-4 py-4 px-4">
          <img src="/images/iit-patna-logo.png" alt="IIT Patna" className="h-14 w-14 md:h-16 md:w-16 rounded" />
          <div className="text-black font-extrabold uppercase tracking-wide text-2xl md:text-3xl">IIT Patna Event Portal</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl mx-auto mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-black mb-6">Register</h1>
          <div className="mb-6">
            <label className="block text-sm font-medium text-black mb-2">Role</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setRole('student')} className={`px-4 py-2 rounded border text-black font-medium ${role==='student'?'border-blue-500 bg-blue-50':'border-gray-200'}`}>Student</button>
              <button type="button" onClick={() => setRole('club')} className={`px-4 py-2 rounded border text-black font-medium ${role==='club'?'border-green-500 bg-green-50':'border-gray-200'}`}>Committee</button>
            </div>
          </div>

          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-black mb-2">Email</label>
              <input name="email" type="email" value={form.email} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <input name="password" type="password" value={form.password} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
            </div>

            {role === 'student' && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-black mb-2">Mobile Number</label>
                <input name="phone" type="tel" value={form.phone||''} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
              </div>
            )}

            {role === 'student' && (
              <>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Roll Number</label>
                  <input name="rollNumber" value={form.rollNumber} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Name</label>
                  <input name="name" value={form.name} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Age</label>
                  <input name="age" type="number" value={form.age} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Upload Photo</label>
                  <input name="photoFile" type="file" accept="image/*" onChange={(e)=>{
                    const file = (e.target as HTMLInputElement).files?.[0]
                    setForm((p: any)=>({ ...p, photoFile: file }))
                  }} className="w-full px-4 py-2 border rounded bg-white text-black" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Gender</label>
                  <select name="gender" value={form.gender} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black" required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Date of Birth</label>
                  <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Course</label>
                  <select name="course" value={form.course} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black" required>
                    <option value="">Select</option>
                    <option value="btech">B.Tech</option>
                    <option value="mtech">M.Tech</option>
                    <option value="phd">PhD</option>
                    <option value="msc">MSc</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Branch</label>
                  <input name="branch" value={form.branch} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-black mb-2">Admission Year</label>
                  <input name="year" type="number" value={form.year} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
                </div>
              </>
            )}

            {role === 'club' && (
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-black mb-2">Club Name</label>
                <input name="clubName" value={form.clubName||''} onChange={onChange} className="w-full px-4 py-2 border rounded bg-white text-black placeholder-gray-500" required />
              </div>
            )}

            <div className="md:col-span-2">
              <button disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50">
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}


