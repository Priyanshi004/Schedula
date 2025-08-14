'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FaShieldAlt, FaArrowLeft, FaCheckCircle, FaRedoAlt, FaMobile, FaRocket, FaStar, FaLock } from 'react-icons/fa'

// Floating particles animation
const FloatingParticle = ({ delay = 0, size = "w-2 h-2", color = "from-pink-400 to-purple-400" }) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-r ${color} rounded-full opacity-40`}
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

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [resendTimer, setResendTimer] = useState(30)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalOtp = otp.join('')
    
    if (finalOtp.length === 6) {
      setIsVerifying(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success('OTP verified successfully! 🚀')
        router.push('/doctors')
      } catch (error) {
        toast.error('Invalid OTP. Please try again.')
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      } finally {
        setIsVerifying(false)
      }
    } else {
      toast.error('Please enter all 6 digits')
    }
  }

  const handleResend = () => {
    setResendTimer(30)
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
    toast.success('OTP sent successfully! ⚡')
  }

  const isOtpComplete = otp.every((digit) => digit !== '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-800/15 to-pink-900/20">
        {/* Floating particles */}
        <FloatingParticle delay={0} />
        <FloatingParticle delay={1} size="w-3 h-3" color="from-cyan-400 to-blue-500" />
        <FloatingParticle delay={2} size="w-1 h-1" color="from-yellow-400 to-orange-500" />
        <FloatingParticle delay={3} size="w-2 h-2" color="from-green-400 to-teal-500" />
      </div>
      
      <motion.div
        className="relative w-full max-w-md z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300"
          whileHover={{ x: -8, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <FaArrowLeft className="text-sm" />
          </div>
          <span className="font-bold text-lg">Back</span>
        </motion.button>

        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.9, rotateZ: -2 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20" />
            
            <motion.div
              className="relative w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/20 shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaShieldAlt className="text-white text-3xl" />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl font-black text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Verify OTP ✨
            </motion.h1>
            
            <motion.p 
              className="text-white/90 font-medium text-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Enter the 6-digit security code
            </motion.p>
          </div>

          <div className="p-8">
            {/* Phone Number Display */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-10 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaMobile className="text-white text-xl" />
              </motion.div>
              <div>
                <p className="text-white/60 text-sm font-medium">Code sent to</p>
                <p className="font-bold text-white text-lg">+91 ••••• ••••0</p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* OTP Input Grid */}
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {otp.map((digit, i) => (
                  <motion.div
                    key={i}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <input
                      ref={(el) => { inputRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-16 h-16 text-2xl font-black text-center border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 shadow-lg group-hover:shadow-xl"
                    />
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${digit ? 'opacity-30' : ''}`} />
                    
                    {/* Check mark for filled inputs */}
                    {digit && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                      >
                        <FaCheckCircle className="text-white text-xs" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Verify Button */}
              <motion.button
                type="submit"
                disabled={!isOtpComplete || isVerifying}
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl relative overflow-hidden ${
                  isOtpComplete && !isVerifying
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white hover:shadow-purple-500/25 transform hover:scale-[1.02]'
                    : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                }`}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {isOtpComplete && !isVerifying && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 0.2 }}
                  />
                )}
                
                <div className="relative z-10">
                  {isVerifying ? (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div 
                        className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <FaRocket className="text-xl" />
                      <span>Verify & Continue</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaStar />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.button>
            </form>

            {/* Resend Section */}
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {resendTimer > 0 ? (
                <div className="text-white/60">
                  <p className="mb-4 text-lg font-medium">Didn't receive the code? 🤔</p>
                  <div className="flex items-center justify-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-white font-black text-lg">{resendTimer}</span>
                    </motion.div>
                    <span className="font-medium text-white/80">seconds remaining</span>
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={handleResend}
                  className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaRedoAlt />
                  </motion.div>
                  <span>Resend OTP</span>
                </motion.button>
              )}
            </motion.div>

            {/* Security Note */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <FaLock className="text-green-400" />
              <span>Your data is secured with end-to-end encryption</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
