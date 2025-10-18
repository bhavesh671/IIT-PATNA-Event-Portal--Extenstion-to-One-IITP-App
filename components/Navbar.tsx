'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUsers, 
  FaEnvelope, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaGraduationCap,
  FaBuilding,
  FaShieldAlt
} from 'react-icons/fa'

interface NavbarProps {
  isLoggedIn?: boolean
  userProfile?: {
    name: string
    photo: string
    type: string
  }
  onDrawerToggle?: () => void
}

const Navbar = ({ isLoggedIn = false, userProfile, onDrawerToggle }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginOptions, setShowLoginOptions] = useState(false)
  const pathname = usePathname()

  // Filter nav items based on user role
  const getNavItems = () => {
    const allItems = [
      { name: 'Home', href: '/', icon: FaHome },
      { name: 'Create Event', href: '/create-event', icon: FaCalendarAlt },
      { name: 'All Events', href: '/events', icon: FaCalendarAlt },
      { name: 'Schedule', href: '/schedule', icon: FaCalendarAlt },
      { name: 'Contact', href: '/contact', icon: FaEnvelope },
    ]
    
    // Only show Create Event to committee members
    if (userProfile?.type === 'club' || userProfile?.type === 'admin') {
      return allItems
    } else {
      return allItems.filter(item => item.name !== 'Create Event')
    }
  }

  const navItems = getNavItems()

  const loginOptions = [
    { 
      name: 'Login', 
      href: '/auth/login', 
      icon: FaUser,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-blue-200 shadow-lg border-b border-blue-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section: Hamburger + Logo + Title */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            {isLoggedIn && onDrawerToggle && (
              <button
                onClick={onDrawerToggle}
                className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200"
              >
                <FaBars className="text-black text-xl" />
              </button>
            )}

            {/* Logo */}
            <div className="w-16 h-16 flex items-center justify-center">
              <Image 
                src="/images/iit-patna-logo.png" 
                alt="IIT Patna Logo" 
                width={64} 
                height={64} 
                className="rounded-lg"
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800">IIT Patna Event Portal</h1>
          </div>

          {/* Center Section: Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group"
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="text-sm" />
                  <span>{item.name}</span>
                </div>
                {/* Active indicator line */}
                <div className={`h-1 w-full rounded-full transition-all duration-200 ${
                  pathname === item.href ? 'bg-blue-600' : 'bg-transparent group-hover:bg-blue-300'
                }`}></div>
              </Link>
            ))}
          </div>
          
          {/* Right Section: User Profile */}
          <div className="flex items-center">
            {isLoggedIn && userProfile ? (
              <Link href="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                <div className="max-w-[180px] truncate text-gray-700 font-medium text-right">
                  {userProfile.name}
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white text-sm" />
                </div>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FaUser className="text-sm" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="text-sm" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-2">
                {isLoggedIn && userProfile ? (
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md mx-2 mb-1 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-sm" />
                    <span>{userProfile.name}</span>
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center space-x-2 px-3 py-2 text-white bg-blue-600 rounded-md mx-2 mb-1 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-sm" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 