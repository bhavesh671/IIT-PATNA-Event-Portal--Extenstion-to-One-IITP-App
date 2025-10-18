'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaGraduationCap, FaBuilding, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'

export default function Login() {
  const [userType, setUserType] = useState<'student' | 'club' | 'admin'>('student')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userTypeConfig = {
    student: {
      icon: FaGraduationCap,
      title: 'Student Login',
      subtitle: 'Access your student portal',
      placeholder: 'Enter your roll number',
      color: 'from-blue-600 to-purple-600',
      bgColor: 'from-blue-50 to-indigo-100',
      textColor: 'text-blue-600'
    },
    club: {
      icon: FaBuilding,
      title: 'Club/Committee Login',
      subtitle: 'Access your committee portal',
      placeholder: 'Enter your committee ID',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-100',
      textColor: 'text-green-600'
    },
    admin: {
      icon: FaShieldAlt,
      title: 'Admin Login',
      subtitle: 'Secure administrative access',
      placeholder: 'Enter your admin ID',
      color: 'from-purple-600 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-100',
      textColor: 'text-purple-600'
    }
  }

  const config = userTypeConfig[userType]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      setError('')
      const role = userType === 'club' ? 'COMMITTEE' : userType === 'admin' ? 'ADMIN' : 'STUDENT'
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, role }),
      })

      if (!res.ok) {
        setIsLoading(false)
        setError('Wrong credentials')
        return
      }

      // Keep current home-page logic working by mirroring auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userType', userType)
      localStorage.setItem('userName', formData.email)
      window.location.href = '/'
    } catch (err) {
      console.error(err)
      alert('Login failed')
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >


        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <config.icon className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h1>
            <p className="text-gray-600">{config.subtitle}</p>
          </div>

          {/* User Type Selector */}
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Login as:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['student','club','admin'] as const).map((type) => {
                const typeConfig = (userTypeConfig as any)[type]
                return (
                <button
                  key={type}
                  onClick={() => setUserType(type as any)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === type
                      ? `border-${type === 'student' ? 'blue' : type === 'club' ? 'green' : 'red'}-500 bg-${type === 'student' ? 'blue' : type === 'club' ? 'green' : 'red'}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <typeConfig.icon className={`text-xl mx-auto mb-2 ${
                    userType === type
                      ? `text-${type === 'student' ? 'blue' : type === 'club' ? 'green' : 'red'}-600`
                      : 'text-gray-400'
                  }`} />
                  <span className={`text-xs font-medium ${
                    userType === type
                      ? `text-${type === 'student' ? 'blue' : type === 'club' ? 'green' : type === 'admin' ? 'purple' : 'gray'}-600`
                      : 'text-gray-500'
                  }`}>
                    {type === 'student' ? 'Student' : type === 'club' ? 'Club' : 'Admin'}
                  </span>
                </button>
              )})}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identifier Field */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              }
            </div>

            {/* Password - Hide for Guest */}
            {
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            }

            {/* Remember Me - Hide for Guest */}
            {/* Remember me removed */}

            <div className="flex justify-end -mt-2">
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${config.color} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-3">
            {(userType === 'student' || userType === 'club') && (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/auth/register"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Register here
                </Link>
              </p>
            )}
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <Link 
                href="/contact-support"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              © 2024 IIT Patna. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 