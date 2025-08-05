'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { 
  FaUserMd, 
  FaBell, 
  FaUser, 
  FaClock, 
  FaCalendarAlt, 
  FaStethoscope,
  FaHeart,
  FaBrain,
  FaBone,
  FaTooth,
  FaEye,
  FaSearch,
  FaFilter
} from 'react-icons/fa'

const doctors = [
  { 
    id: 'priya-sharma',
    name: 'Dr. Priya Sharma', 
    speciality: 'Cardiologist',
    icon: FaHeart,
    about: 'Practices over 10+ years in cardiology with expertise in non-invasive and interventional procedures.', 
    availability: 'Mon–Fri: 09:00 AM – 05:00 PM | Sat: 10:00 AM – 02:00 PM',
    earliest: '12 Oct, 2023 | 10:00 AM',
    rating: 4.9,
    patients: 1200,
    experience: '10+ years',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
  }, 
  { 
    id: 'rishi-mehta', 
    name: 'Dr. Rishi Mehta',
    speciality: 'Dermatologist',
    icon: FaEye,
    about: 'Skilled in treating skin disorders and cosmetic dermatology. 8+ years of clinical experience.', 
    availability: 'Mon–Sat: 10:00 AM – 06:00 PM', 
    earliest: '13 Oct, 2023 | 11:00 AM',
    rating: 4.8,
    patients: 950,
    experience: '8+ years',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
  }, 
  {
    id: 'neha-singh', 
    name: 'Dr. Neha Singh', 
    speciality: 'Pediatrician',
    icon: FaStethoscope,
    about: 'Expert in pediatric care, childhood vaccinations, and behavioral development. Practicing for 6+ years.', 
    availability: 'Mon–Fri: 08:00 AM – 03:00 PM', 
    earliest: '14 Oct, 2023 | 09:30 AM',
    rating: 4.9,
    patients: 800,
    experience: '6+ years',
    photo: 'https://images.unsplash.com/photo-1594824475317-d0c8d0e5b8a4?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: 'arjun-kapoor', 
    name: 'Dr. Arjun Kapoor', 
    speciality: 'Orthopedic Surgeon',
    icon: FaBone,
    about: 'Specializes in joint replacements and sports injuries. Over 12 years of surgical experience.', 
    availability: 'Tue–Sat: 09:00 AM – 04:00 PM', 
    earliest: '15 Oct, 2023 | 10:45 AM',
    rating: 4.7,
    patients: 600,
    experience: '12+ years',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face'
  }, 
  { 
    id: 'sonia-sharma', 
    name: 'Dr. Sonia Sharma', 
    speciality: 'Dental Surgeon',
    icon: FaTooth,
    about: 'Specializes in dental replacements. Over 14 years of surgical experience.', 
    availability: 'Mon–Sat: 09:00 AM – 05:00 PM', 
    earliest: '15 Oct, 2023 | 10:45 AM',
    rating: 4.8,
    patients: 1100,
    experience: '14+ years',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
  },
  { 
    id: 'pranav-sharma',
    name: 'Dr. Pranav Sharma', 
    speciality: 'Psychiatrist',
    icon: FaBrain,
    about: 'Specializes in the diagnosis, treatment, and prevention of mental, emotional, and behavioral disorders. Over 14 years of experience.', 
    availability: 'Mon–Sat: 09:00 AM – 05:00 PM', 
    earliest: '15 Oct, 2023 | 10:45 AM',
    rating: 4.9,
    patients: 750,
    experience: '14+ years',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')

  const specialties = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dental Surgeon', 'Psychiatrist']

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.speciality === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-sky-600/5 to-indigo-600/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center">
                <FaUserMd className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  Meet Our Specialists
                </h1>
                <p className="text-gray-600 text-lg">
                  Find the right doctor for your healthcare needs
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                className="relative p-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <FaBell className="text-lg" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              </motion.button>
              
              <Link href="/profile">
                <motion.button
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUser className="text-sm" />
                  <span>My Profile</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Doctor Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {/* Doctor Photo Header */}
              <div className="relative h-48 bg-gradient-to-r from-blue-600 to-sky-600 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-sky-600/90"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{doctor.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <doctor.icon className="text-white/80" />
                      <p className="text-blue-100">{doctor.speciality}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="bg-white/20 px-2 py-1 rounded-full">⭐ {doctor.rating}</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full">{doctor.patients}+ patients</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{doctor.about}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <FaClock className="text-white text-xs" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">Consulting Hours</p>
                      <p className="text-xs text-gray-600">{doctor.availability}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-sky-600 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-xs" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">Next Available</p>
                      <p className="text-xs text-blue-600 font-semibold">{doctor.earliest}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/booking/${doctor.id}`}>
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toast.success(`Booking appointment with ${doctor.name}`)}
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaUserMd className="text-white text-lg" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
            <p className="text-sm text-gray-600">Expert Doctors</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaHeart className="text-white text-lg" />
            </div>
            <p className="text-2xl font-bold text-gray-800">5000+</p>
            <p className="text-sm text-gray-600">Happy Patients</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FaStethoscope className="text-white text-lg" />
            </div>
            <p className="text-2xl font-bold text-gray-800">6</p>
            <p className="text-sm text-gray-600">Specialties</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.footer
        className="sticky bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-white/50 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <nav className="grid grid-cols-3 text-center">
          <Link href="/doctors" className="py-4 bg-blue-50 text-blue-600 font-medium border-t-2 border-blue-600">
            <div className="flex flex-col items-center gap-1">
              <FaSearch className="text-lg" />
              <span className="text-xs">Find Doctor</span>
            </div>
          </Link>
          <Link href="/appointments" className="py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-300">
            <div className="flex flex-col items-center gap-1">
              <FaCalendarAlt className="text-lg" />
              <span className="text-xs">Appointments</span>
            </div>
          </Link>
          <Link href="/profile" className="py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-300">
            <div className="flex flex-col items-center gap-1">
              <FaUser className="text-lg" />
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        </nav>
      </motion.footer>

      {/* Floating Quick Booking Button */}
      <Link href="/appointments">
        <motion.button
          className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-4 rounded-full shadow-2xl font-semibold transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <FaCalendarAlt className="text-lg" />
          <span>Quick Booking</span>
        </motion.button>
      </Link>
    </div>
  )
}
