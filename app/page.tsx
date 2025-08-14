'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 via-purple-900 to-blue-900 overflow-x-hidden">

      {/* 🎨 Enhanced Blue Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 via-cyan-500/25 to-sky-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/25 via-blue-600/30 to-cyan-500/25 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-600/25 rounded-full blur-2xl animate-pulse delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-br from-cyan-400/15 via-blue-600/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse delay-3000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-gradient-to-br from-sky-300/20 via-blue-400/20 to-indigo-500/20 rounded-full blur-xl animate-pulse delay-4000" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-gradient-to-br from-cyan-300/15 via-sky-400/15 to-blue-500/20 rounded-full blur-xl animate-pulse delay-1500" />
      
      {/* 🏠 Modern Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen overflow-hidden">
        {/* Enhanced Blue Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/60 via-cyan-900/40 to-indigo-800/60" />
            <div className="absolute inset-0 bg-gradient-to-bl from-sky-800/30 via-transparent to-blue-900/40" />
          </div>
          {/* Enhanced Blue Animated geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/25 via-cyan-400/20 to-indigo-400/25 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-r from-sky-400/20 via-blue-500/25 to-indigo-500/20 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-cyan-400/15 via-blue-500/20 to-indigo-400/15 rounded-full animate-pulse delay-2000 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/6 right-1/6 w-28 h-28 bg-gradient-to-r from-indigo-300/20 via-blue-400/25 to-cyan-400/20 rounded-full animate-pulse delay-3000" />
          <div className="absolute bottom-1/6 left-1/6 w-36 h-36 bg-gradient-to-r from-blue-300/20 via-sky-400/25 to-indigo-400/20 rounded-full animate-pulse delay-4000" />
        </div>
        
        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          {/* Floating Medical Icons */}
          <motion.div 
            className="absolute -top-20 left-10 text-6xl"
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <span className="text-blue-300/40">🏥</span>
          </motion.div>
          <motion.div 
            className="absolute -top-16 right-16 text-5xl"
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -5, 0, 5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          >
            <span className="text-purple-300/40">⚕️</span>
          </motion.div>
          <motion.div 
            className="absolute top-1/2 -left-10 text-4xl"
            animate={{ 
              x: [-5, 5, -5],
              y: [5, -5, 5]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          >
            <span className="text-emerald-300/40">💊</span>
          </motion.div>
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-white/80 text-sm font-medium">✨ The Future of Healthcare Management</span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Schedula
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-white/90 leading-relaxed font-light"
          >
            Transform your healthcare experience with our intelligent, 
            <span className="font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              AI-powered platform
            </span> that connects patients and doctors seamlessly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Get Started Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
            
            <Link href="/reviews-unified">
              <motion.button 
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  ⭐ Try Demo
                </span>
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-white/70"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm font-medium">Smart Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">✓</span>
              <span className="text-sm font-medium">Video Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span className="text-sm font-medium">Patient Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-400">✓</span>
              <span className="text-sm font-medium">Digital Records</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⚙️ Enhanced Features Grid */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 px-6 overflow-hidden">
        {/* Section Background Decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-emerald-300/30 to-cyan-300/30 rounded-full blur-xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Why Choose Schedula?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of healthcare management with our comprehensive suite of advanced features
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                title: 'Smart Scheduling',
                desc: 'AI-powered appointment booking with real-time availability and intelligent conflict resolution.',
                icon: '📅',
                gradient: 'from-blue-500 via-purple-500 to-pink-500',
                bgGradient: 'from-blue-50 via-purple-50 to-pink-50',
                borderGradient: 'from-blue-200 via-purple-200 to-pink-200'
              },
              {
                title: 'Video Consultations',
                desc: 'Connect with healthcare providers from anywhere, anytime with crystal-clear HD video calls.',
                icon: '💻',
                gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
                bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
                borderGradient: 'from-emerald-200 via-teal-200 to-cyan-200'
              },
              {
                title: 'Health Records',
                desc: 'Secure, encrypted digital health records accessible across all your devices with blockchain security.',
                icon: '📁',
                gradient: 'from-orange-500 via-red-500 to-pink-500',
                bgGradient: 'from-orange-50 via-red-50 to-pink-50',
                borderGradient: 'from-orange-200 via-red-200 to-pink-200'
              },
              {
                title: 'Patient Reviews',
                desc: 'Share authentic feedback and read verified reviews to make informed healthcare decisions.',
                icon: '⭐',
                gradient: 'from-yellow-400 via-orange-500 to-red-500',
                bgGradient: 'from-yellow-50 via-orange-50 to-red-50',
                borderGradient: 'from-yellow-200 via-orange-200 to-red-200'
              },
              {
                title: 'Doctor Analytics',
                desc: 'Advanced insights and comprehensive analytics to help healthcare providers optimize patient care.',
                icon: '📊',
                gradient: 'from-indigo-500 via-purple-500 to-blue-500',
                bgGradient: 'from-indigo-50 via-purple-50 to-blue-50',
                borderGradient: 'from-indigo-200 via-purple-200 to-blue-200'
              },
              {
                title: 'Quality Assurance',
                desc: 'Continuous improvement through real-time patient feedback and AI-driven quality metrics.',
                icon: '🏆',
                gradient: 'from-green-500 via-emerald-500 to-teal-500',
                bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
                borderGradient: 'from-green-200 via-emerald-200 to-teal-200'
              },
            ].map(({ title, desc, icon, gradient, bgGradient, borderGradient }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                className={`relative group bg-gradient-to-br ${bgGradient} backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
              >
                {/* Card Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${borderGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Icon with enhanced styling */}
                <div className="relative z-10 mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl filter drop-shadow-sm">{icon}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base group-hover:text-gray-800 transition-colors duration-300">
                    {desc}
                  </p>
                </div>
                
                {/* Subtle corner decoration */}
                <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Modern CTA Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white py-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-white/80 text-sm font-medium">🚀 Join the Healthcare Revolution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join thousands of patients and doctors who trust Schedula for their healthcare management needs.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/signup">
              <motion.button 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  ✨ Start Your Journey
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
            
            <Link href="/login">
              <motion.button 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secure & Private</h3>
              <p className="text-white/70 text-sm">End-to-end encryption for all your health data</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Lightning Fast</h3>
              <p className="text-white/70 text-sm">Book appointments in under 30 seconds</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-semibold mb-1">Trusted by Thousands</h3>
              <p className="text-white/70 text-sm">4.9/5 rating from verified patients</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}