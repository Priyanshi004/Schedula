"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
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
  FaChartLine,
  FaRocket,
  FaStar,
  FaGem,
  FaLightbulb,
  FaTrophy,
  FaFire
} from "react-icons/fa";

// Floating particles animation
const FloatingParticle = ({ delay = 0, size = "w-2 h-2", color = "from-pink-400 to-purple-400" }) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-r ${color} rounded-full opacity-60`}
    animate={{
      y: [-20, -80],
      x: [0, 30, -30, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

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
      toast.success("Signed out successfully! 🚀");
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
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
      emoji: "📅",
      href: "/appointments"
    },
    {
      title: "Medical Records",
      description: "Access your medical history",
      icon: FaFileAlt,
      gradient: "from-green-600 via-emerald-500 to-yellow-500",
      emoji: "📋",
      href: "/records"
    },
    {
      title: "Profile",
      description: "Update your personal information",
      icon: FaUser,
      gradient: "from-purple-600 via-pink-500 to-red-500",
      emoji: "👤",
      href: "/profile"
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: FaCog,
      gradient: "from-orange-600 via-amber-500 to-yellow-500",
      emoji: "⚙️",
      href: "/settings"
    }
  ];

  const quickStats = [
    {
      label: "Upcoming Appointments",
      value: "3",
      icon: FaCalendarAlt,
      gradient: "from-blue-600 to-sky-600",
      emoji: "📅",
      trend: "+2 this week"
    },
    {
      label: "Health Score",
      value: "85%",
      icon: FaHeart,
      gradient: "from-red-600 to-rose-600",
      emoji: "❤️",
      trend: "+5% improved"
    },
    {
      label: "Active Prescriptions",
      value: "2",
      icon: FaStethoscope,
      gradient: "from-green-600 to-emerald-600",
      emoji: "💊",
      trend: "1 expiring soon"
    },
    {
      label: "Notifications",
      value: "5",
      icon: FaBell,
      gradient: "from-purple-600 to-violet-600",
      emoji: "🔔",
      trend: "2 new today"
    }
  ];

  const achievements = [
    { title: "Health Champion", icon: FaTrophy, color: "text-yellow-400" },
    { title: "Consistent Care", icon: FaStar, color: "text-purple-400" },
    { title: "Wellness Warrior", icon: FaFire, color: "text-red-400" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 flex items-center justify-center">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
          <motion.div 
            className="absolute inset-0 border-4 border-pink-500 border-b-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-800/20 to-pink-900/30"
      >
        {/* Floating particles */}
        <FloatingParticle delay={0} />
        <FloatingParticle delay={1} size="w-3 h-3" color="from-cyan-400 to-blue-500" />
        <FloatingParticle delay={2} size="w-1 h-1" color="from-yellow-400 to-orange-500" />
        <FloatingParticle delay={3} size="w-2 h-2" color="from-green-400 to-teal-500" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Spectacular Header */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  <FaUser className="text-white text-2xl" />
                </div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back! 🎉
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/80 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {user.displayName || user.email}
                </motion.p>
                
                {/* Achievement badges */}
                <motion.div 
                  className="flex items-center gap-2 mt-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <achievement.icon className={`${achievement.color} text-sm`} />
                      <span>{achievement.title}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <motion.button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaSignOutAlt className="text-lg" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Spectacular Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 50, rotateZ: -5 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl blur`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className={`w-14 h-14 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="text-white text-xl" />
                  </motion.div>
                  <div className="text-3xl">{stat.emoji}</div>
                </div>
                
                <motion.p 
                  className="text-3xl font-black text-white mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-white/70 font-medium mb-2">{stat.label}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-green-400">
                  <FaStar className="text-xs" />
                  <span>{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Epic Dashboard Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, rotateZ: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(card.href)}
              initial={{ opacity: 0, y: 50, rotateZ: -3 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              {/* Animated background gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                whileHover={{ scale: 1.1 }}
              />
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center shadow-xl`}
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <card.icon className="text-white text-2xl" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-white/70 font-medium">{card.description}</p>
                    </div>
                  </div>
                  <motion.div 
                    className="text-4xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {card.emoji}
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/60 font-medium">Click to access</span>
                  <motion.div 
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                  >
                    <FaChartLine className="text-white text-sm" />
                  </motion.div>
                </div>
              </div>
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute top-4 right-4 text-yellow-400 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <FaStar className="text-lg" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Spectacular Recent Activity */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          
          <div className="relative">
            <motion.div 
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaChartLine className="text-white text-xl" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Recent Activity ⚡</h2>
                <p className="text-white/70 font-medium">Your latest healthcare interactions</p>
              </div>
            </motion.div>
            
            <div className="space-y-4">
              {[
                { action: "Appointment scheduled", time: "2 hours ago", type: "appointment", icon: FaCalendarAlt, color: "from-blue-500 to-cyan-500" },
                { action: "Lab results received", time: "1 day ago", type: "results", icon: FaFileAlt, color: "from-green-500 to-emerald-500" },
                { action: "Prescription refilled", time: "3 days ago", type: "prescription", icon: FaStethoscope, color: "from-purple-500 to-pink-500" }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    <activity.icon className="text-white text-sm" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-bold text-white">{activity.action}</p>
                    <p className="text-sm text-white/60 font-medium">{activity.time}</p>
                  </div>
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
