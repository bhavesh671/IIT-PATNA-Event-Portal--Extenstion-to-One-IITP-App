'use client'

import { motion } from 'framer-motion'
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers,
  FaCheckCircle,
  FaClock as FaClockIcon,
  FaTimesCircle
} from 'react-icons/fa'

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  status: 'live' | 'upcoming' | 'completed'
  image?: string
  attendees?: number
  maxAttendees?: number
}

const EventCard = ({ 
  id, 
  title, 
  description, 
  date, 
  time, 
  location, 
  organizer, 
  status, 
  image, 
  attendees = 0, 
  maxAttendees 
}: EventCardProps) => {
  const statusConfig = {
    live: {
      color: 'bg-green-500',
      icon: FaCheckCircle,
      text: 'Live Now',
      textColor: 'text-green-600'
    },
    upcoming: {
      color: 'bg-blue-500',
      icon: FaClockIcon,
      text: 'Upcoming',
      textColor: 'text-blue-600'
    },
    completed: {
      color: 'bg-gray-500',
      icon: FaTimesCircle,
      text: 'Completed',
      textColor: 'text-gray-600'
    }
  }

  const config = statusConfig[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      {/* Event Image - Fixed height */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-6xl opacity-20">
              📅
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${config.color} text-white text-sm font-medium`}>
            <config.icon className="text-xs" />
            <span>{config.text}</span>
          </div>
        </div>
      </div>

      {/* Event Content - Flexible height with consistent spacing */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Event Details - Fixed height */}
        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
            <span className="text-sm truncate">{date}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <FaClock className="text-blue-500 flex-shrink-0" />
            <span className="text-sm truncate">{time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUsers className="text-blue-500 flex-shrink-0" />
            <span className="text-sm truncate">Organized by {organizer}</span>
          </div>
        </div>

        {/* Attendees Info - Fixed height */}
        {maxAttendees && (
          <div className="mb-4 flex-shrink-0">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Attendees</span>
              <span>{attendees}/{maxAttendees}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((attendees / maxAttendees) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button - Fixed at bottom */}
        <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex-shrink-0 ${
          status === 'live' 
            ? 'bg-green-600 text-white hover:bg-green-700' 
            : status === 'upcoming'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}>
          {status === 'live' && 'Join Now'}
          {status === 'upcoming' && 'Register'}
          {status === 'completed' && 'Event Ended'}
        </button>
      </div>
    </motion.div>
  )
}

export default EventCard 