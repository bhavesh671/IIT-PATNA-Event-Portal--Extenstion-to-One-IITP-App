'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'
import Navbar from '@/components/Navbar'

interface UserProfile {
  name: string
  photo: string
  type: string
}

export default function Rules() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

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

  const rules = [
    {
      category: 'General Guidelines',
      icon: FaInfoCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      items: [
        'All events must align with IIT Patna\'s academic and cultural values',
        'Events should promote learning, creativity, and community engagement',
        'Respect for all participants and maintaining a positive environment is mandatory',
        'Events must comply with institute policies and local regulations'
      ]
    },
    {
      category: 'Event Registration',
      icon: FaCheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      items: [
        'Submit event details at least 7 days before the proposed date',
        'Provide complete information including venue, time, and expected participants',
        'Include a detailed description of the event\'s purpose and activities',
        'Specify any special requirements or resources needed'
      ]
    },
    {
      category: 'Committee Requirements',
      icon: FaExclamationTriangle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      items: [
        'Only registered committees can create events',
        'Committee must have valid authorization from institute administration',
        'At least one committee member must be present during the event',
        'Committee is responsible for event management and participant safety'
      ]
    },
    {
      category: 'Venue and Resources',
      icon: FaInfoCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      items: [
        'Venue booking must be confirmed before event approval',
        'Technical equipment requests should be submitted in advance',
        'Cleanup and restoration of venue is the organizer\'s responsibility',
        'Any damage to institute property will be charged to the organizing committee'
      ]
    },
    {
      category: 'Safety and Security',
      icon: FaExclamationTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      items: [
        'Emergency contact information must be provided',
        'First aid arrangements are mandatory for physical events',
        'Security personnel may be required for large gatherings',
        'All safety protocols must be followed as per institute guidelines'
      ]
    },
    {
      category: 'Financial Guidelines',
      icon: FaCheckCircle,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      items: [
        'Budget approval is required for events involving expenses',
        'All financial transactions must be transparent and documented',
        'Sponsorship details must be disclosed and approved',
        'Refunds and cancellations must follow institute policies'
      ]
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
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} userProfile={userProfile || undefined} />
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
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
            <h1 className="text-3xl font-bold text-gray-800">Rules of Event Creation</h1>
            <p className="text-gray-600 mt-2">Guidelines and requirements for organizing events at IIT Patna</p>
          </motion.div>

          {/* Rules Grid */}
          <div className="space-y-6">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${rule.bgColor} rounded-lg p-6 border-l-4 border-l-current`}
                style={{ borderLeftColor: rule.color.replace('text-', '') }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <rule.icon className={`text-2xl ${rule.color}`} />
                  <h2 className="text-xl font-semibold text-gray-800">{rule.category}</h2>
                </div>
                
                <ul className="space-y-2">
                  {rule.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3 text-gray-700">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${rule.color.replace('text-', 'bg-')}`}></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
          >
            <div className="flex items-start space-x-3">
              <FaInfoCircle className="text-blue-500 text-xl mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notes</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Event approval is subject to availability of resources and venue</li>
                  <li>• Changes to approved events must be communicated at least 24 hours in advance</li>
                  <li>• Violation of these rules may result in cancellation of future event privileges</li>
                  <li>• For any queries or clarifications, contact the event management committee</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Need help? Contact the Event Management Committee at{' '}
              <a href="mailto:events@iitp.ac.in" className="text-blue-600 hover:text-blue-800">
                events@iitp.ac.in
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
