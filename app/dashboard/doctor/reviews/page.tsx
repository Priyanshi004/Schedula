'use client';

import React, { useState } from 'react';
import DoctorReviews from '@/components/DoctorReviews';
import Link from 'next/link';
import { FaArrowLeft, FaStar, FaChartLine, FaUsers, FaCalendarAlt } from 'react-icons/fa';

export default function DoctorReviewsPage() {
  // In a real app, you'd get this from authentication/session
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. Rishi Mehta');
  
  // Mock doctor list - in real app, this would come from your API
  const doctors = [
    'Dr. Rishi Mehta',
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Davis',
    'Dr. David Wilson'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard/doctor"
              className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Reviews Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze patient feedback</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl text-white shadow-lg">
              <FaStar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                <p className="text-sm text-green-600 mt-1">+12 this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">4.7</p>
                <p className="text-sm text-green-600 mt-1">+0.2 vs last month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">5-Star Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
                <p className="text-sm text-gray-500 mt-1">57% of all reviews</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaChartLine className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
                <p className="text-sm text-blue-600 mt-1">New reviews</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaCalendarAlt className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Select Doctor</h2>
              <p className="text-gray-600 text-sm mt-1">View reviews for a specific doctor</p>
            </div>
            <select 
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-48"
            >
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Reviews Component */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <DoctorReviews 
            doctorName={selectedDoctor}
            showStats={true}
            itemsPerPage={10}
          />
        </div>

        {/* Additional Info Panel */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Understanding Your Reviews
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Review Guidelines</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Patients can submit reviews after completed appointments</li>
                <li>Reviews can be edited/deleted within 24 hours</li>
                <li>All reviews are anonymous from the patient's perspective</li>
                <li>Use feedback to improve patient experience</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Rating System</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>5 Stars: Excellent experience</li>
                <li>4 Stars: Very good experience</li>
                <li>3 Stars: Good experience</li>
                <li>2 Stars: Fair experience</li>
                <li>1 Star: Poor experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
