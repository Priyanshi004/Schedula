'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  FaUser, 
  FaBell, 
  FaQuestionCircle, 
  FaUserFriends, 
  FaSignOutAlt,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaShieldAlt,
  FaCog,
  FaChevronRight
} from 'react-icons/fa';
import BottomNavigation from '../../components/BottomNavigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: 'Priyanshi Sharma',
    email: 'priyanshi@gmail.com',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      icon: <FaBell className="text-blue-600" />,
      label: 'Notifications',
      subtitle: 'Manage your alerts',
      href: '/notifications',
      color: 'from-blue-600 to-sky-600'
    },
    {
      icon: <FaCalendarAlt className="text-green-600" />,
      label: 'My Appointments',
      subtitle: 'View booking history',
      href: '/appointments',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: <FaHeart className="text-red-600" />,
      label: 'Health Records',
      subtitle: 'Medical history & reports',
      href: '/health-records',
      color: 'from-red-600 to-rose-600'
    },
    {
      icon: <FaShieldAlt className="text-purple-600" />,
      label: 'Privacy & Security',
      subtitle: 'Account protection',
      href: '/privacy',
      color: 'from-purple-600 to-violet-600'
    },
    {
      icon: <FaQuestionCircle className="text-orange-600" />,
      label: 'Help & Support',
      subtitle: 'Get assistance',
      href: '/help',
      color: 'from-orange-600 to-amber-600'
    },
    {
      icon: <FaUserFriends className="text-indigo-600" />,
      label: 'Invite Friends',
      subtitle: 'Share the app',
      href: '/invite',
      color: 'from-indigo-600 to-blue-600'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('appointments');
    localStorage.removeItem('bookings');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const handleEditProfile = () => {
    toast.info('Edit profile feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-sky-600/5 to-indigo-600/5"></div>
      
      <div className="relative">
        {/* Header with Profile Info */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 pt-12 pb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-sky-600/90"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.button
                  onClick={handleEditProfile}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEdit className="text-sm" />
                </motion.button>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-blue-100 text-sm mb-4">Healthcare Member since {user.joinDate}</p>
              
              <div className="flex items-center justify-center gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-xs" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-xs" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto px-4 -mt-6 mb-6">
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <FaCalendarAlt className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-sm text-gray-600">Appointments</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <FaHeart className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800">8</p>
                <p className="text-sm text-gray-600">Health Records</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <FaUserFriends className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-800">5</p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.label}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>
                <FaChevronRight className="text-gray-400" />
              </div>
            </motion.div>
          ))}

          {/* Logout Button */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden mt-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.button
              onClick={() => setShowLogoutModal(true)}
              className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-red-50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
                  <FaSignOutAlt className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-red-600">Logout</h3>
                  <p className="text-sm text-gray-600">Sign out of your account</p>
                </div>
              </div>
              <FaChevronRight className="text-gray-400" />
            </motion.button>
          </motion.div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSignOutAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Logout Confirmation</h3>
                <div className="bg-red-50 rounded-2xl p-4 mb-6">
                  <p className="text-center text-gray-700">
                    Are you sure you want to logout? You'll need to sign in again to access your account.
                  </p>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    onClick={() => setShowLogoutModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all duration-300"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
