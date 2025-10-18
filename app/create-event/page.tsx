'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaUsers, 
  FaUpload, 
  FaPhone, 
  FaMoneyBillWave,
  FaArrowLeft,
  FaSave,
  FaPaperPlane,
  FaUser,
  FaCalendarCheck,
  FaBook,
  FaSignOutAlt
} from 'react-icons/fa'
import Link from 'next/link'

interface UserProfile {
  name: string
  photo: string
  type: string
}

export default function CreateEvent() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    mode: 'offline',
    maxApplications: '',
    onlineLink: '',
    fees: '',
    contactDetails: '',
    poster: null as File | null
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else {
      setIsLoggedIn(true)
      const userType = localStorage.getItem('userType') || 'student'
      const userEmail = localStorage.getItem('userName') || 'User'
      
      // Only allow committee members to create events
      if (userType !== 'club' && userType !== 'admin') {
        router.push('/')
        return
      }
      
      setUserProfile({
        name: userEmail.split('@')[0],
        photo: '/api/placeholder/40/40',
        type: userType
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Event created successfully!')
      // Reset form
      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        mode: 'offline',
        maxApplications: '',
        onlineLink: '',
        fees: '',
        contactDetails: '',
        poster: null
      })
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        poster: e.target.files![0]
      }))
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar isLoggedIn={isLoggedIn} userProfile={userProfile} onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
      
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
        {/* Header */}
        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-6"
            >
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <FaArrowLeft className="text-xl" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-800">Create Event</h1>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name of the event *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter event name"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description (100 words) *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe your event in detail..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <FaClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
                    Venue *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter venue location"
                      required
                    />
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Mode */}
                <div>
                  <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">
                    Mode *
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid (Online + Offline)</option>
                  </select>
                </div>

                {/* Max Applications */}
                <div>
                  <label htmlFor="maxApplications" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum number of applications (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="maxApplications"
                      name="maxApplications"
                      value={formData.maxApplications}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter maximum participants"
                      min="1"
                    />
                    <FaUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Online Link */}
                {(formData.mode === 'online' || formData.mode === 'hybrid') && (
                  <div>
                    <label htmlFor="onlineLink" className="block text-sm font-medium text-gray-700 mb-2">
                      Online Event Link (optional)
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="onlineLink"
                        name="onlineLink"
                        value={formData.onlineLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://meet.google.com/..."
                      />
                      <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Creator can enter link later as well
                    </p>
                  </div>
                )}

                {/* Fees */}
                <div>
                  <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-2">
                    Fees (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="fees"
                      name="fees"
                      value={formData.fees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter registration fees in ₹"
                      min="0"
                      step="0.01"
                    />
                    <FaMoneyBillWave className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <label htmlFor="contactDetails" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact details of event organizer *
                  </label>
                  <div className="relative">
                    <textarea
                      id="contactDetails"
                      name="contactDetails"
                      value={formData.contactDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter contact information (phone, email, etc.)"
                      required
                    />
                    <FaPhone className="absolute left-4 top-3 text-gray-400" />
                  </div>
                </div>

                {/* Poster Upload */}
                <div>
                  <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload poster (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="poster"
                      name="poster"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <FaUpload className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {formData.poster && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {formData.poster.name} selected
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white hover:bg-green-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Create Event</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
} 