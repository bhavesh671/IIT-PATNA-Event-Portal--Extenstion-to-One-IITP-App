'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaCalendarCheck,
  FaBook,
  FaSignOutAlt
} from 'react-icons/fa'

interface UserProfile {
  name: string
  photo: string
  type: string
}

export default function Schedule() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)) // October 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 9, 15)) // October 15, 2025

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

  // Mock events for the calendar
  const events = [
    {
      id: '1',
      title: 'Tech Fest 2025 - Innovation Showcase',
      date: new Date(2025, 9, 15), // October 15, 2025
      time: '10:00 AM - 6:00 PM',
      venue: 'Main Auditorium, IIT Patna',
      attendees: 150,
      status: 'ongoing',
      description: 'Join us for the biggest technology festival of the year featuring innovative projects, workshops, and networking opportunities.'
    },
    {
      id: '2',
      title: 'Cultural Night - Music & Dance',
      date: new Date(2025, 9, 20), // October 20, 2025
      time: '7:00 PM - 11:00 PM',
      venue: 'Open Air Theatre',
      attendees: 80,
      status: 'scheduled',
      description: 'Experience the vibrant cultural diversity of IIT Patna through music, dance performances, and cultural activities.'
    },
    {
      id: '3',
      title: 'Sports Meet 2025',
      date: new Date(2025, 9, 25), // October 25, 2025
      time: '9:00 AM - 5:00 PM',
      venue: 'Sports Complex',
      attendees: 45,
      status: 'scheduled',
      description: 'Annual sports competition featuring cricket, football, basketball, and other sports events.'
    },
    {
      id: '4',
      title: 'Hackathon 2025',
      date: new Date(2025, 9, 10), // October 10, 2025
      time: '9:00 AM - 9:00 AM',
      venue: 'Computer Center',
      attendees: 60,
      status: 'completed',
      description: '24-hour coding competition to solve real-world problems using innovative solutions.'
    },
    {
      id: '5',
      title: 'Alumni Meet & Networking',
      date: new Date(2025, 9, 28), // October 28, 2025
      time: '6:00 PM - 9:00 PM',
      venue: 'Conference Hall',
      attendees: 30,
      status: 'scheduled',
      description: 'Connect with IIT Patna alumni, share experiences, and build professional networks.'
    },
    {
      id: '6',
      title: 'Freshers Welcome 2025',
      date: new Date(2025, 9, 5), // October 5, 2025
      time: '5:00 PM - 8:00 PM',
      venue: 'Main Auditorium',
      attendees: 200,
      status: 'completed',
      description: 'Welcome ceremony for new students with cultural performances and orientation.'
    },
    {
      id: '7',
      title: 'Workshop on AI & Machine Learning',
      date: new Date(2025, 9, 30), // October 30, 2025
      time: '2:00 PM - 6:00 PM',
      venue: 'Computer Lab 101',
      attendees: 25,
      status: 'scheduled',
      description: 'Hands-on workshop covering the latest developments in AI and machine learning technologies.'
    }
  ]

  // Get calendar data
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days = []
    
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const days = getDaysInMonth(currentDate)
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
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
        {/* Header */}
        <section className="py-8 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              Scheduler Calendar
            </motion.h1>
            <p className="text-gray-600 mb-8">Find your all events at one place</p>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6"
              >
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FaChevronLeft className="text-gray-600" />
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {formatDate(currentDate)}
                  </h2>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <FaChevronRight className="text-gray-600" />
                  </button>
                </div>

                {/* Event Status Legend */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Event Status:</h4>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gray-100 rounded"></div>
                      <span className="text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-orange-100 rounded"></div>
                      <span className="text-gray-600">Ongoing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-100 rounded"></div>
                      <span className="text-gray-600">Scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weekDays.map((day, index) => (
                    <div key={index} className="text-center py-2 text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    if (!day) {
                      return <div key={index} className="h-24 bg-gray-50 rounded-lg"></div>
                    }

                    const dayEvents = getEventsForDate(day)
                    const isToday = day.toDateString() === new Date().toDateString()
                    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(day)}
                        className={`h-24 p-2 text-left rounded-lg border-2 transition-all duration-200 hover:bg-blue-50 ${
                          isToday 
                            ? 'border-blue-500 bg-blue-50' 
                            : isSelected 
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`text-sm font-medium ${
                          isToday ? 'text-blue-600' : 'text-gray-800'
                        }`}>
                          {day.getDate()}
                        </div>
                        {dayEvents.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {dayEvents.map((event, eventIndex) => (
                              <div 
                                key={eventIndex}
                                className={`text-xs px-1 py-0.5 rounded truncate ${
                                  event.status === 'completed' 
                                    ? 'bg-gray-100 text-gray-600' 
                                    : event.status === 'ongoing'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {event.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Event Details */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedDate ? (
                    `Events for ${selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}`
                  ) : (
                    'Select a date to view events'
                  )}
                </h3>

                {selectedDate && (
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map(event => (
                        <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800">{event.title}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              event.status === 'completed' 
                                ? 'bg-gray-100 text-gray-600' 
                                : event.status === 'ongoing'
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <FaClock className="text-blue-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaMapMarkerAlt className="text-green-500" />
                              <span>{event.venue}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FaUsers className="text-purple-500" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FaCalendarAlt className="text-4xl mx-auto mb-2 text-gray-300" />
                        <p>No events scheduled for this date</p>
                      </div>
                    )}
                  </div>
                )}

                {!selectedDate && (
                  <div className="text-center py-8 text-gray-500">
                    <FaCalendarAlt className="text-4xl mx-auto mb-2 text-gray-300" />
                    <p>Click on any date to view events</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-t border-gray-200 pt-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact us:</h3>
              <p className="text-gray-600">For any questions about events or scheduling</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
} 