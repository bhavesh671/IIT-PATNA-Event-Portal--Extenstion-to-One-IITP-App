'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaArrowLeft,
  FaTwitter,
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

export default function Contact() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['iitp_events@iitp.ac.in'],
      color: 'bg-blue-600'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+91 8452090781'],
      color: 'bg-green-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['Indian Institute of Technology Patna', 'Bihta, Patna, Bihar 801106'],
      color: 'bg-purple-600',
      mapLink: 'https://www.google.com/maps/place/Indian+Institute+of+Technology,+Patna/@25.5376451,84.8483121,15z/data=!4m6!3m5!1s0x39ed577f6954a4ab:0x6ce8f1b9fc2aa02a!8m2!3d25.5356448!4d84.8512966!16s%2Fm%2F04n5dz1?entry=ttu&g_ep=EgoyMDI1MTAxNS4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
      color: 'bg-orange-600'
    }
  ]

  const socialLinks = [
    { 
      icon: FaTwitter, 
      href: 'https://x.com/IITPAT?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor', 
      label: 'X (Twitter)' 
    },
    { 
      icon: FaFacebook, 
      href: 'https://www.facebook.com/iitp.ac.in/', 
      label: 'Facebook' 
    },
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/school/indian-institute-of-technology-patna/posts/?feedView=all', 
      label: 'LinkedIn' 
    },
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/iit_patna_official/?hl=en', 
      label: 'Instagram' 
    }
  ]

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
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
              >
                <FaArrowLeft className="text-sm" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Contact us through the information below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 mb-1">{detail}</p>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            {/* Map and Social Links */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Find Us</h3>
                <div className="rounded-lg h-64 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.123456789!2d84.8512966!3d25.5356448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed577f6954a4ab%3A0x6ce8f1b9fc2aa02a!2sIndian%20Institute%20of%20Technology%2C%20Patna!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="IIT Patna Location"
                  ></iframe>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-gray-600 font-medium">Indian Institute of Technology Patna</p>
                  <p className="text-sm text-gray-500">Bihta, Patna, Bihar 801106</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
                <div className="grid grid-cols-1 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200 hover:border-blue-300"
                    >
                      <social.icon className="text-3xl text-blue-600" />
                      <span className="font-medium text-gray-700 text-lg">{social.label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 