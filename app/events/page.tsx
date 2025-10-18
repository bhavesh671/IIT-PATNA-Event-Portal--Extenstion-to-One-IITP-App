'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import EventCard from '../../components/EventCard'
import Link from 'next/link'
import { 
  FaSearch, 
  FaSort, 
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaUser,
  FaCalendarCheck,
  FaBook,
  FaSignOutAlt
} from 'react-icons/fa'

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Tech Fest 2024 - Innovation Showcase',
    description: 'Join us for the biggest technology festival of the year featuring innovative projects, workshops, and networking opportunities.',
    date: 'December 15, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium, IIT Patna',
    organizer: 'Technical Committee',
    status: 'live' as const,
    attendees: 150,
    maxAttendees: 200,
    club: 'Technical Committee'
  },
  {
    id: '2',
    title: 'Cultural Night - Music & Dance',
    description: 'Experience the vibrant cultural diversity of IIT Patna through music, dance performances, and cultural activities.',
    date: 'December 15, 2024',
    time: '7:00 PM - 11:00 PM',
    location: 'Open Air Theatre',
    organizer: 'Cultural Committee',
    status: 'live' as const,
    attendees: 80,
    maxAttendees: 120,
    club: 'Cultural Committee'
  },
  {
    id: '3',
    title: 'Sports Meet 2024',
    description: 'Annual sports competition featuring cricket, football, basketball, and other sports events.',
    date: 'December 20, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Sports Complex',
    organizer: 'Sports Committee',
    status: 'upcoming' as const,
    attendees: 45,
    maxAttendees: 100,
    club: 'Sports Committee'
  },
  {
    id: '4',
    title: 'Alumni Meet & Networking',
    description: 'Connect with IIT Patna alumni, share experiences, and build professional networks.',
    date: 'December 25, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Conference Hall',
    organizer: 'Alumni Committee',
    status: 'upcoming' as const,
    attendees: 30,
    maxAttendees: 80,
    club: 'Alumni Committee'
  },
  {
    id: '5',
    title: 'Workshop on AI & Machine Learning',
    description: 'Hands-on workshop covering the latest developments in AI and machine learning technologies.',
    date: 'December 28, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'Computer Lab 101',
    organizer: 'Technical Committee',
    status: 'upcoming' as const,
    attendees: 25,
    maxAttendees: 50,
    club: 'Technical Committee'
  },
  {
    id: '6',
    title: 'Freshers Welcome 2024',
    description: 'Welcome ceremony for new students with cultural performances and orientation.',
    date: 'August 15, 2024',
    time: '5:00 PM - 8:00 PM',
    location: 'Main Auditorium',
    organizer: 'Student Council',
    status: 'completed' as const,
    attendees: 200,
    maxAttendees: 200,
    club: 'Student Council'
  },
  {
    id: '7',
    title: 'Hackathon 2024',
    description: '24-hour coding competition to solve real-world problems using innovative solutions.',
    date: 'October 10, 2024',
    time: '9:00 AM - 9:00 AM',
    location: 'Computer Center',
    organizer: 'Technical Committee',
    status: 'completed' as const,
    attendees: 60,
    maxAttendees: 60,
    club: 'Technical Committee'
  }
]

const clubs = ['All Clubs', 'Technical Committee', 'Cultural Committee', 'Sports Committee', 'Alumni Committee', 'Student Council']

interface UserProfile {
  name: string
  photo: string
  type: string
}

export default function Events() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [selectedClub, setSelectedClub] = useState('All Clubs')

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

  // Filter and sort events
  const filteredEvents = mockEvents
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || event.status === filterBy
      const matchesClub = selectedClub === 'All Clubs' || event.club === selectedClub
      
      return matchesSearch && matchesFilter && matchesClub
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'a-z':
          return a.title.localeCompare(b.title)
        case 'z-a':
          return b.title.localeCompare(a.title)
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        default:
          return 0
      }
    })

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
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              All Events
            </motion.h1>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>

            {/* Sort and Filter Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              {/* Sort Options */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FaSort className="text-blue-500" />
                  <span>Sort by</span>
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">A → Z</option>
                  <option value="z-a">Z → A</option>
                </select>
              </div>

              {/* Filter by Status */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FaFilter className="text-green-500" />
                  <span>Filter by Status</span>
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Events</option>
                  <option value="live">Live</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Filter by Club */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FaBuilding className="text-purple-500" />
                  <span>Filter by Club</span>
                </label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {clubs.map(club => (
                    <option key={club} value={club}>{club}</option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Results
                </label>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  <span className="text-sm text-gray-600">
                    {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredEvents.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <EventCard {...event} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSortBy('newest')
                    setFilterBy('all')
                    setSelectedClub('All Clubs')
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
} 