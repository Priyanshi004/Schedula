'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation or backend call placeholder
    if (role === 'doctor') {
      router.push('/dashboard/doctor');
    } else {
      router.push('/otp');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-sky-300/10 to-blue-400/10 rounded-full blur-2xl" />
      
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Schedula
              </h1>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
            {/* Role Switch */}
            <div className="flex justify-center gap-2 mb-6">
              {['patient', 'doctor'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r as 'patient' | 'doctor')}
                  className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    role === r 
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join Schedula as a {role}
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {role === 'doctor' ? 'Professional Email' : 'Email or Mobile'}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={
                    role === 'doctor'
                      ? 'Enter your professional email'
                      : 'Enter email or mobile number'
                  }
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  required
                />
              </div>

              {/* Terms and Privacy */}
              <div className="text-xs text-gray-600 text-center">
                By signing up, you agree to our{' '}
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Privacy Policy
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-3 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm my-6">
              <hr className="flex-1 border-gray-200" />
              <span className="bg-white px-3 py-1 rounded-full text-xs font-medium">OR</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Google Signup */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold">
              <FcGoogle className="text-xl" />
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 mt-6">
              Already have a {role} account?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}