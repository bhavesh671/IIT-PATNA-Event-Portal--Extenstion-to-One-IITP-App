'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import { 
  FaPlay, 
  FaArrowRight, 
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarCheck,
  FaPlus,
  FaCheckCircle,
  FaBook,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt
} from 'react-icons/fa'
import Link from 'next/link'

// Mock data for events
const mockEvents = {
  live: [
    {
      id: '1',
      title: 'Tech Fest 2024 - Innovation Showcase',
      description: 'Join us for the biggest technology festival of the year featuring innovative projects, workshops, and networking opportunities.',
      date: 'October 15, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Main Auditorium, IIT Patna',
      organizer: 'Technical Committee',
      status: 'live' as const,
      attendees: 150,
      maxAttendees: 200
    },
    {
      id: '2',
      title: 'Cultural Night - Music & Dance',
      description: 'Experience the vibrant cultural diversity of IIT Patna through music, dance performances, and cultural activities.',
      date: 'October 20, 2024',
      time: '7:00 PM - 11:00 PM',
      location: 'Open Air Theatre',
      organizer: 'Cultural Committee',
      status: 'live' as const,
      attendees: 80,
      maxAttendees: 120
    }
  ],
  upcoming: [
    {
      id: '3',
      title: 'Sports Meet 2024',
      description: 'Annual sports competition featuring cricket, football, basketball, and other sports events.',
      date: 'October 25, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'Sports Complex',
      organizer: 'Sports Committee',
      status: 'upcoming' as const,
      attendees: 45,
      maxAttendees: 100
    },
    {
      id: '4',
      title: 'Alumni Meet & Networking',
      description: 'Connect with IIT Patna alumni, share experiences, and build professional networks.',
      date: 'October 28, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Conference Hall',
      organizer: 'Alumni Committee',
      status: 'upcoming' as const,
      attendees: 30,
      maxAttendees: 80
    },
    {
      id: '5',
      title: 'Workshop on AI & Machine Learning',
      description: 'Hands-on workshop covering the latest developments in AI and machine learning technologies.',
      date: 'October 30, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Computer Lab 101',
      organizer: 'Technical Committee',
      status: 'upcoming' as const,
      attendees: 25,
      maxAttendees: 50
    }
  ],
  completed: [
    {
      id: '6',
      title: 'Freshers Welcome 2024',
      description: 'Welcome ceremony for new students with cultural performances and orientation.',
      date: 'October 5, 2024',
      time: '5:00 PM - 8:00 PM',
      location: 'Main Auditorium',
      organizer: 'Student Council',
      status: 'completed' as const,
      attendees: 200,
      maxAttendees: 200
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
      maxAttendees: 60
    }
  ]
}

// Photo carousel images
const carouselImages = [
  '/images/image1.png',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpeg',
  '/images/image5.png',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.avif',
  '/images/image9.jpeg',
  '/images/image10.jpg'
]

export default function Home() {
  const router = useRouter()
  const [showAllCompleted, setShowAllCompleted] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulate login state
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    photo: '/api/placeholder/40/40',
    type: 'student'
  })
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // Auto-rotate photos every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % 10)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    // Check if user is logged in (you can implement your own logic here)
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else {
      setIsLoggedIn(true)
      // Get user info from localStorage and fetch from database
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
        if (data.name) {
          setUserProfile({
            name: data.name,
            photo: '/api/placeholder/40/40',
            type: userType
          })
        } else {
          // Fallback to email prefix if database fetch fails
          const userName = userEmail.includes('@') ? userEmail.split('@')[0] : userEmail
          setUserProfile({
            name: userName,
            photo: '/api/placeholder/40/40',
            type: userType
          })
        }
      })
      .catch(() => {
        // Fallback to email prefix if API call fails
        const userName = userEmail.includes('@') ? userEmail.split('@')[0] : userEmail
        setUserProfile({
          name: userName,
          photo: '/api/placeholder/40/40',
          type: userType
        })
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

  // Show loading while checking authentication
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
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
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Photo Carousel - Full Screen with Seamless Animation */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full overflow-hidden">
            {/* Left Arrow */}
            <button 
              onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + 10) % 10)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 z-30"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            
            {/* Seamless Photo Display - No blur, parallel transitions */}
            <div className="relative w-full h-full">
              {carouselImages.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={false}
                  animate={{
                    x: `${(index - currentPhotoIndex) * 100}%`,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: 'easeInOut' 
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src={image}
                    alt={`IIT Patna Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === currentPhotoIndex}
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>
              ))}
            </div>
            
            {/* Right Arrow */}
            <button 
              onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % 10)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 z-30"
            >
              <FaChevronRight className="text-xl" />
            </button>

            {/* Photo Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {Array.from({ length: 10 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentPhotoIndex ? 'bg-yellow-400' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Welcome Text - Overlaid on Photo */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center text-white px-4 max-w-7xl"
              >
                <div className="mb-6">
                  <h1 className="text-6xl md:text-8xl font-black text-shadow-lg">
                    <span className="text-blue-200">Welcome to </span><span className="text-cyan-400">IIT Patna</span>
                  </h1>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-shadow-lg">
                  <span className="text-yellow-200">Event Portal</span>
                </h2>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        >
          <FaChevronDown className="text-white text-2xl animate-bounce" />
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Live Events */}
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2"
            >
              <div className="w-2 h-8 bg-green-500 rounded"></div>
              <span>Live Events</span>
            </motion.h2>
            
            <div className="card-grid">
              {mockEvents.live.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-container"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2"
            >
              <div className="w-2 h-8 bg-blue-500 rounded"></div>
              <span>Upcoming Events</span>
            </motion.h2>
            
            <div className="card-grid">
              {mockEvents.upcoming.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-container"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Completed Events */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-800 mb-8 flex items-center space-x-2"
            >
              <div className="w-2 h-8 bg-gray-500 rounded"></div>
              <span>Completed Events</span>
            </motion.h2>
            
            <div className="card-grid">
              {(showAllCompleted ? mockEvents.completed : mockEvents.completed.slice(0, 3)).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-container"
                >
                  <EventCard {...event} />
                </motion.div>
              ))}
            </div>
            
            {mockEvents.completed.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllCompleted(!showAllCompleted)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  <span>{showAllCompleted ? 'Show Less' : 'Show More'}</span>
                  {showAllCompleted ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links Section - With Navigation Color */}
      <section className="py-16 px-4 bg-blue-200">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-gray-800 mb-16 text-center"
          >
            Quick Links
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Side - Quick Links */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
                             <div className="flex items-center space-x-6">
                 <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></div>
                 <Link href="/rules" className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 font-bold text-xl">
                   Rules of Event Creation
                 </Link>
               </div>
                             <div className="flex items-center space-x-6">
                 <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></div>
                 <a href="https://services.iitp.ac.in/scheduler/Web/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 font-bold text-xl">
                   Lab Book Portal
                 </a>
               </div>
                             <div className="flex items-center space-x-6">
                 <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></div>
                 <a href="https://www.iitp.ac.in/sports/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 font-bold text-xl">
                   Sports Office
                 </a>
               </div>
                             <div className="flex items-center space-x-6">
                 <div className="w-3 h-3 bg-indigo-600 rounded-full flex-shrink-0"></div>
                 <a href="https://www.iitp.ac.in/auditorium/auditorium.html" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-indigo-600 transition-colors duration-200 font-bold text-xl">
                   Auditorium Booking
                 </a>
               </div>
            </motion.div>

            {/* Right Side - Gymkhana Photo and Text */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-white/60 rounded-2xl p-8 mb-6 shadow-lg">
                <Image 
                  src="/images/gymkhana.png" 
                  alt="IIT Patna Gymkhana" 
                  width={350} 
                  height={250} 
                  className="rounded-lg mx-auto"
                />
              </div>
              <h3 className="text-3xl font-black text-gray-800">
                EVENT PORTAL | GYMKHANA
              </h3>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}