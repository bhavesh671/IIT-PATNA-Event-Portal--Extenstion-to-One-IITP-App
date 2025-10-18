'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaArrowLeft } from 'react-icons/fa'
import Navbar from '@/components/Navbar'

interface UserProfile {
  name: string
  photo: string
  type: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  status: 'upcoming' | 'ongoing' | 'completed'
  registeredCount: number
  maxParticipants: number
}

export default function RegisteredEvents() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sample events data
  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Symposium 2024',
      description: 'Annual technology symposium featuring latest innovations in AI, ML, and Web Development.',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'Main Auditorium',
      category: 'Technical',
      status: 'upcoming',
      registeredCount: 45,
      maxParticipants: 100
    },
    {
      id: '2',
      title: 'Cultural Fest - Rangoli Competition',
      description: 'Traditional rangoli making competition celebrating Indian culture and traditions.',
      date: '2024-02-10',
      time: '02:00 PM',
      location: 'Cultural Center',
      category: 'Cultural',
      status: 'upcoming',
      registeredCount: 23,
      maxParticipants: 50
    },
    {
      id: '3',
      title: 'Sports Meet - Cricket Tournament',
      description: 'Inter-department cricket tournament with exciting matches and prizes.',
      date: '2024-01-28',
      time: '08:00 AM',
      location: 'Sports Ground',
      category: 'Sports',
      status: 'completed',
      registeredCount: 32,
      maxParticipants: 40
    }
  ]

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else {
      setIsLoggedIn(true)
      const userType = localStorage.getItem('userType') || 'student'
      const userEmail = localStorage.getItem('userName') || 'User'
      
      setUserProfile({
        name: userEmail.split('@')[0],
        photo: '/api/placeholder/40/40',
        type: userType
      })
      
      // Simulate loading and set sample events
      setTimeout(() => {
        setEvents(sampleEvents)
        setIsLoading(false)
      }, 1000)
    }
  }, [router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-purple-100 text-purple-800'
      case 'Cultural': return 'bg-pink-100 text-pink-800'
      case 'Sports': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isLoggedIn || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} userProfile={userProfile} />
      
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">My Registered Events</h1>
            <p className="text-gray-600 mt-2">Events you have registered for</p>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{event.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <FaClock className="text-green-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-gray-600">
                      <FaUsers className="text-purple-500" />
                      <span className="text-sm">{event.registeredCount}/{event.maxParticipants} registered</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Registration Progress</span>
                      <span>{Math.round((event.registeredCount / event.maxParticipants) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {events.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FaCalendarAlt className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Registered Events</h3>
              <p className="text-gray-500 mb-6">You haven't registered for any events yet.</p>
              <button
                onClick={() => router.push('/events')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
