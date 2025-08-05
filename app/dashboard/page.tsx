"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaCog, 
  FaSignOutAlt,
  FaStethoscope,
  FaHeart,
  FaBell,
  FaChartLine
} from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/login");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Error signing out. Please try again.");
    }
  };

  const dashboardCards = [
    {
      title: "Appointments",
      description: "View and manage your appointments",
      icon: FaCalendarAlt,
      color: "from-blue-600 to-sky-600",
      href: "/appointments"
    },
    {
      title: "Medical Records",
      description: "Access your medical history",
      icon: FaFileAlt,
      color: "from-green-600 to-emerald-600",
      href: "/records"
    },
    {
      title: "Profile",
      description: "Update your personal information",
      icon: FaUser,
      color: "from-purple-600 to-violet-600",
      href: "/profile"
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: FaCog,
      color: "from-orange-600 to-amber-600",
      href: "/settings"
    }
  ];

  const quickStats = [
    {
      label: "Upcoming Appointments",
      value: "3",
      icon: FaCalendarAlt,
      color: "from-blue-600 to-sky-600"
    },
    {
      label: "Health Score",
      value: "85%",
      icon: FaHeart,
      color: "from-red-600 to-rose-600"
    },
    {
      label: "Active Prescriptions",
      value: "2",
      icon: FaStethoscope,
      color: "from-green-600 to-emerald-600"
    },
    {
      label: "Notifications",
      value: "5",
      icon: FaBell,
      color: "from-purple-600 to-violet-600"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      {/* Background Pattern */}
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
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  Welcome back!
                </h1>
                <p className="text-gray-600 text-lg">
                  {user.displayName || user.email}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <FaSignOutAlt className="text-sm" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(card.href)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <card.icon className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                    <p className="text-white/80">{card.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Click to access</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <FaChartLine className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
              <p className="text-gray-600">Your latest healthcare interactions</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { action: "Appointment scheduled", time: "2 hours ago", type: "appointment" },
              { action: "Lab results received", time: "1 day ago", type: "results" },
              { action: "Prescription refilled", time: "3 days ago", type: "prescription" }
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center">
                  <FaBell className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
