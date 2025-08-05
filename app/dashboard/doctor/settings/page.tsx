'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { 
  FaCog, 
  FaUser, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaSignOutAlt,
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCertificate,
  FaCalendarAlt,
  FaStethoscope
} from 'react-icons/fa'

export default function SettingsPage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  // Doctor profile data
  const [doctorProfile, setDoctorProfile] = useState({
    name: 'Dr. Smith',
    specialty: 'Cardiologist',
    email: 'dr.smith@schedula.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Drive, Healthcare City, HC 12345',
    education: 'MD from Harvard Medical School',
    certification: 'Board Certified in Cardiology',
    experience: '15 years',
    description: 'Experienced cardiologist specializing in preventive cardiology, heart disease management, and cardiovascular surgery. Committed to providing comprehensive cardiac care with a focus on patient education and lifestyle modifications for optimal heart health.',
    joinDate: '2018-03-15',
    licenseNumber: 'MD-12345-CA'
  })

  const [editForm, setEditForm] = useState(doctorProfile)

  const handleEdit = () => {
    setEditForm(doctorProfile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setDoctorProfile(editForm)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setEditForm(doctorProfile)
    setIsEditing(false)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    toast.success('Logged out successfully!')
    // Clear any stored authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userSession')
    // Redirect to login page
    router.push('/login')
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaCog className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage your profile and account preferences
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaEdit className="text-sm" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaSave className="text-sm" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaTimes className="text-sm" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Profile Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FaUserMd className="text-white text-3xl" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-3xl font-bold bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 text-white placeholder-white/70 border-none outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Doctor Name"
                />
              ) : (
                <h2 className="text-3xl font-bold">{doctorProfile.name}</h2>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  className="text-xl bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 mt-2 text-blue-100 placeholder-blue-200 border-none outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Specialty"
                />
              ) : (
                <p className="text-xl text-blue-100 mt-2">{doctorProfile.specialty}</p>
              )}
              
              <div className="flex items-center gap-4 mt-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  <span>Joined {new Date(doctorProfile.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStethoscope className="text-sm" />
                  <span>{doctorProfile.experience} experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter description about yourself and your practice..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{doctorProfile.description}</p>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-2" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.phone}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2" />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.address}</p>
              )}
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaGraduationCap className="inline mr-2" />
                  Education
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.education}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCertificate className="inline mr-2" />
                  Certification
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.certification}
                    onChange={(e) => handleInputChange('certification', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                ) : (
                  <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.certification}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              ) : (
                <p className="text-gray-600 bg-gray-50 px-4 py-3 rounded-2xl">{doctorProfile.licenseNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6 text-white rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaSignOutAlt className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Confirm Logout</h2>
                  <p className="text-red-100 text-sm">Are you sure you want to logout?</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                You will be redirected to the login page and will need to sign in again to access your dashboard.
              </p>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
