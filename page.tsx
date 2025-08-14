'use client';

import React, { useState } from 'react';
import DoctorReviews from '@/components/DoctorReviews';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Reviews Dashboard</h1>
          <p className="mt-2 text-gray-600">
            View and analyze patient feedback to improve your practice.
          </p>
        </div>

        {/* Doctor Selector - Only show if admin or multiple doctors */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="doctor-select" className="text-sm font-medium text-gray-700">
              Select Doctor:
            </label>
            <select
              id="doctor-select"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews Component */}
        <div className="space-y-6">
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
