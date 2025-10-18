'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaGraduationCap, FaBuilding, FaEdit, FaArrowLeft, FaCalendarCheck, FaBook, FaSignOutAlt } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface UserProfile {
  name: string
  photo: string
  type: string
}

interface UserData {
  id: string
  email: string
  name: string
  phone?: string
  roles: string[]
  student?: {
    rollNumber?: string
    name?: string
    age?: number
    gender?: string
    dob?: string
    course?: string
    branch?: string
    admissionYear?: number
    photoUrl?: string
  }
  committee?: {
    committeeCode?: string
  }
}

export default function Profile() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else {
      setIsLoggedIn(true)
      const userType = localStorage.getItem('userType') || 'student'
      const userEmail = localStorage.getItem('userName') || 'User'
      
      // Fetch user details from database
      fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      })
      .then(res => res.json())
      .then(data => {
        setUserData(data)
        setUserProfile({
          name: data.name || userEmail.split('@')[0],
          photo: data.student?.photoUrl || '/api/placeholder/40/40',
          type: userType
        })
        setIsLoading(false)
      })
      .catch(() => {
        setUserProfile({
          name: userEmail.split('@')[0],
          photo: '/api/placeholder/40/40',
          type: userType
        })
        setIsLoading(false)
      })
    }
  }, [router])

  // Logout function
  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      // Clear localStorage
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userType')
      localStorage.removeItem('userName')
      
      // Redirect to login page
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect even if API call fails
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userType')
      localStorage.removeItem('userName')
      router.push('/auth/login')
    }
  }

  if (!isLoggedIn || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} userProfile={userProfile || undefined} onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
      
      {/* Side Drawer */}
      {isDrawerOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-20 h-full w-80 bg-white shadow-xl border-2 border-black z-40"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu</h3>
            <div className="space-y-2">
              <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <FaUser className="text-blue-500" />
                <span className="text-black">Profile</span>
              </Link>
              <Link href="/registered-events" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <FaCalendarCheck className="text-green-500" />
                <span className="text-black">Registered Events</span>
              </Link>
              <Link href="/rules" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <FaBook className="text-red-500" />
                <span className="text-black">Rules of Event Creation</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-full text-left"
              >
                <FaSignOutAlt className="text-red-600" />
                <span className="text-black">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Go to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <FaArrowLeft className="text-sm" />
              <span>Go to Home</span>
            </Link>
          </motion.div>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{userData?.name || 'User'}</h1>
                <p className="text-gray-600 text-lg">{userData?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {userProfile?.type === 'student' ? 'Student' : 
                     userProfile?.type === 'club' ? 'Committee' : 'Admin'}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <FaEdit />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{userData?.email}</p>
                  </div>
                </div>
                
                {userData?.phone && (
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{userData.phone}</p>
                    </div>
                  </div>
                )}

                {userData?.student && (
                  <>
                    {userData.student.rollNumber && (
                      <div className="flex items-center space-x-3">
                        <FaGraduationCap className="text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Roll Number</p>
                          <p className="text-gray-800">{userData.student.rollNumber}</p>
                        </div>
                      </div>
                    )}
                    
                    {userData.student.age && (
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="text-gray-800">{userData.student.age}</p>
                        </div>
                      </div>
                    )}
                    
                    {userData.student.gender && (
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-pink-500" />
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          <p className="text-gray-800">{userData.student.gender}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {userData?.committee && userData.committee.committeeCode && (
                  <div className="flex items-center space-x-3">
                    <FaBuilding className="text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Committee Code</p>
                      <p className="text-gray-800">{userData.committee.committeeCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Academic Information (for students) */}
            {userData?.student && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Academic Information</h2>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <FaEdit />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {userData.student.course && (
                    <div className="flex items-center space-x-3">
                      <FaGraduationCap className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Course</p>
                        <p className="text-gray-800">{userData.student.course}</p>
                      </div>
                    </div>
                  )}
                  
                  {userData.student.branch && (
                    <div className="flex items-center space-x-3">
                      <FaBuilding className="text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Branch</p>
                        <p className="text-gray-800">{userData.student.branch}</p>
                      </div>
                    </div>
                  )}
                  
                  {userData.student.admissionYear && (
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Admission Year</p>
                        <p className="text-gray-800">{userData.student.admissionYear}</p>
                      </div>
                    </div>
                  )}
                  
                  {userData.student.dob && (
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-gray-800">{new Date(userData.student.dob).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
