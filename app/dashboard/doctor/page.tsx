'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaClipboardList, 
  FaClock,
  FaChartLine,
  FaBell,
  FaPlus
} from 'react-icons/fa';

const DoctorDashboard = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
              Welcome back, Dr. Smith! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              {currentDate} • {currentTime}
            </p>
            <p className="text-gray-500 mt-2">
              You have 5 appointments scheduled for today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center shadow-xl">
              <FaUserMd className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">12</p>
              <p className="text-green-600 text-xs mt-1">+2 from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Patients</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">48</p>
              <p className="text-blue-600 text-xs mt-1">5 new this week</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FaUserMd className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Reports</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">7</p>
              <p className="text-orange-600 text-xs mt-1">3 urgent</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Wait Time</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">15m</p>
              <p className="text-green-600 text-xs mt-1">-5m improved</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FaClock className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/doctor/calendar">
              <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaCalendarAlt className="text-2xl mb-3" />
                <h3 className="font-semibold mb-1">View Calendar</h3>
                <p className="text-blue-100 text-sm">Manage appointments</p>
              </div>
            </Link>

            <Link href="/dashboard/doctor/patients">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaUserMd className="text-2xl mb-3" />
                <h3 className="font-semibold mb-1">Patient Records</h3>
                <p className="text-cyan-100 text-sm">Access patient data</p>
              </div>
            </Link>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <FaPlus className="text-2xl mb-3" />
              <h3 className="font-semibold mb-1">New Appointment</h3>
              <p className="text-green-100 text-sm">Schedule patient visit</p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
              <FaChartLine className="text-2xl mb-3" />
              <h3 className="font-semibold mb-1">Analytics</h3>
              <p className="text-purple-100 text-sm">View performance</p>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity & Notifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaBell className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">New appointment request</p>
                  <p className="text-gray-600 text-sm">John Doe - 2:30 PM today</p>
                </div>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <FaClipboardList className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Lab results received</p>
                  <p className="text-gray-600 text-sm">Sarah Wilson - Blood work</p>
                </div>
                <span className="text-xs text-gray-500">15m ago</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <FaClock className="text-white text-sm" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Appointment reminder</p>
                  <p className="text-gray-600 text-sm">Mike Johnson - 3:00 PM</p>
                </div>
                <span className="text-xs text-gray-500">30m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;