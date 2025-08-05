'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-200 overflow-x-hidden">

      {/* 🎨 Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-sky-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-sky-300/10 to-blue-400/10 rounded-full blur-2xl" />
      
      {/* 🏠 Hero Section */}
      <section data-aos="fade-up" className="relative z-10 text-center px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Schedula
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your healthcare experience with our intelligent appointment management system.
            <span className="block mt-2 text-lg text-blue-600 font-semibold">Book • Manage • Care</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <button className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-sky-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                Get Started Free
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-white/80 backdrop-blur-sm text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-blue-200 hover:bg-white hover:border-blue-300 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ⚙️ Features Grid */}
      <section data-aos="zoom-in" className="px-6 mb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Why Choose Schedula?
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Experience healthcare management like never before with our cutting-edge features
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Smart Scheduling', 
                desc: 'AI-powered appointment booking with real-time availability', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ), 
                href: '/login',
                gradient: 'from-blue-500 to-sky-500'
              },
              { 
                title: 'Video Consultations', 
                desc: 'Connect with healthcare providers from anywhere, anytime', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ), 
                href: '/signup',
                gradient: 'from-sky-500 to-cyan-500'
              },
              { 
                title: 'Health Records', 
                desc: 'Secure digital health records accessible across all devices', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ), 
                href: '/login',
                gradient: 'from-cyan-500 to-blue-500'
              },
            ].map(({ title, desc, icon, href, gradient }) => (
              <Link href={href} key={title}>
                <div className="group bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/50 hover:bg-white/90 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA Footer */}
      <footer data-aos="slide-up" className="text-center px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your healthcare experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Schedula for their healthcare management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-blue-500 hover:bg-blue-800 transform hover:scale-105 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}