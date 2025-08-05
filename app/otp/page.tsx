'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FaShieldAlt, FaArrowLeft, FaCheckCircle, FaRedoAlt, FaMobile } from 'react-icons/fa'

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
        toast.success('OTP verified successfully!')
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
    toast.success('OTP sent successfully!')
  }

  const isOtpComplete = otp.every((digit) => digit !== '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-sky-600/5 to-indigo-600/5"></div>
      
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
          whileHover={{ x: -4 }}
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back</span>
        </motion.button>

        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-8 text-center">
            <motion.div
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FaShieldAlt className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify OTP</h1>
            <p className="text-blue-100">Enter the 6-digit code sent to your mobile</p>
          </div>

          <div className="p-8">
            <motion.div
              className="flex items-center justify-center gap-3 mb-8 p-4 bg-blue-50 rounded-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
                <FaMobile className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Code sent to</p>
                <p className="font-semibold text-blue-600">+91-XXXXXXXXXX</p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                className="flex justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {otp.map((digit, i) => (
                  <motion.input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-14 h-14 text-xl font-bold text-center border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    whileFocus={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  />
                ))}
              </motion.div>

              <motion.button
                type="submit"
                disabled={!isOtpComplete || isVerifying}
                className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isOtpComplete && !isVerifying
                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white hover:from-blue-700 hover:to-sky-700 transform hover:scale-[1.02]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheckCircle className="text-lg" />
                    <span>Verify OTP</span>
                  </div>
                )}
              </motion.button>
            </form>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {resendTimer > 0 ? (
                <div className="text-gray-600">
                  <p className="mb-2">Didn't receive the code?</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{resendTimer}</span>
                    </div>
                    <span className="text-sm">seconds remaining</span>
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={handleResend}
                  className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRedoAlt className="text-sm" />
                  <span>Resend OTP</span>
                </motion.button>
              )}
            </motion.div>

            <motion.div
              className="mt-6 text-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <p>Having trouble? Contact support for assistance</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 text-center text-sm text-blue-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <p className="flex items-center justify-center gap-2">
            <FaShieldAlt className="text-xs" />
            Your information is secure and encrypted
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
