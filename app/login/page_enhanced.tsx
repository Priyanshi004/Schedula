'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaUserMd, FaEnvelope, FaLock, FaPhone, FaRocket, FaStar, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (authTab === 'signup') {
      router.push('/signup');
      return;
    }

    if (role === 'doctor') {
      router.push('/dashboard/doctor');
      return;
    }

    if (trimmed.includes('@')) {
      router.push('/otp');
    } else if (/^\d{10}$/.test(trimmed)) {
      localStorage.setItem('loginPhone', trimmed);
      router.push('/otp');
    } else {
      alert('Please enter a valid email or 10-digit mobile number');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: 360,
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: -360,
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/15 to-teal-500/15 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-12 items-center min-h-screen">
        {/* Left: Brand + Welcome */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaRocket className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-4xl font-black">
              <span className="text-white">Sched</span>
              <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">ula</span>
            </h1>
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-7xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future ✨
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your next-gen healthcare companion. Connect with qualified doctors and manage your health journey with cutting-edge technology.
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {['🚀 Instant Booking', '💫 AI Powered', '🌟 24/7 Support'].map((feature, idx) => (
              <motion.div
                key={idx}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Auth Card */}
        <motion.div 
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, x: 100, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          
          <div className="relative">
            {/* Role Selection */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
                <motion.button
                  onClick={() => setRole('patient')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    role === 'patient' 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUser className="text-xs" /> Patient
                </motion.button>
                <motion.button
                  onClick={() => setRole('doctor')}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    role === 'doctor' 
                      ? 'bg-white/20 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUserMd className="text-xs" /> Doctor
                </motion.button>
              </div>
            </motion.div>

            {/* Auth Tabs */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                <motion.button
                  onClick={() => setAuthTab('signin')}
                  className={`px-8 py-3 font-bold text-lg transition-all ${
                    authTab === 'signin' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => setAuthTab('signup')}
                  className={`px-8 py-3 font-bold text-lg border-l border-white/20 transition-all ${
                    authTab === 'signup' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form 
              onSubmit={handleLogin} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {authTab === 'signup' && (
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-bold text-white/90 mb-3">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-white/50 font-medium transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </motion.div>
              )}

              <motion.div className="relative group">
                <label className="block text-sm font-bold text-white/90 mb-3">
                  {role === 'doctor' ? 'Doctor Email' : authTab === 'signin' ? 'Email or Mobile' : 'Email'}
                </label>
                <div className="relative">
                  {authTab === 'signin' && role !== 'doctor' ? (
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors" />
                  ) : (
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-purple-400 transition-colors" />
                  )}
                  <input
                    type="text"
                    placeholder={role === 'doctor' ? 'Enter your doctor email' : authTab === 'signin' ? 'Enter email or mobile number' : 'Enter your email'}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 font-medium transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              <motion.div className="relative group">
                <label className="block text-sm font-bold text-white/90 mb-3">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 group-focus-within:text-pink-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-white/50 font-medium transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              <div className="flex items-center justify-between text-sm">
                <motion.label 
                  className="flex items-center space-x-3 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 backdrop-blur-sm"
                  />
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">Remember me</span>
                </motion.label>
                <Link href="#" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center gap-2">
                  <FaRocket />
                  {authTab === 'signin' ? `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Create Account'}
                </span>
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div 
              className="flex items-center justify-center gap-4 text-white/50 text-sm my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <hr className="flex-1 border-white/20" />
              <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20">OR</span>
              <hr className="flex-1 border-white/20" />
            </motion.div>

            {/* Google Login */}
            <motion.button 
              className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 py-4 rounded-2xl hover:bg-white/15 transition-all duration-300 font-bold text-white group"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <FcGoogle className="text-2xl" />
              <span className="group-hover:text-white transition-colors">Continue with Google</span>
            </motion.button>

            {/* Auth Switch */}
            <motion.div 
              className="text-center text-white/70 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {authTab === 'signin' ? (
                <>
                  Don't have a {role} account?{' '}
                  <motion.button 
                    onClick={() => setAuthTab('signup')} 
                    className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign up now
                  </motion.button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <motion.button 
                    onClick={() => setAuthTab('signin')} 
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors hover:underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign in
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
