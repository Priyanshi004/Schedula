'use client';

import React from 'react';
import Link from 'next/link';
import ReviewLink from '@/components/ReviewLink';
import DoctorReviews from '@/components/DoctorReviews';

export default function ReviewsDemoPage() {
  // Sample appointment data for demo
  const sampleAppointments = [
    {
      id: '1',
      patientName: 'Priya Sharma',
      doctorName: 'Dr. Rishi Mehta',
      date: '2025-08-01',
      status: 'completed'
    },
    {
      id: '7',
      patientName: 'Anjali Joshi',
      doctorName: 'Dr. Rishi Mehta',
      date: '2025-08-14',
      status: 'completed'
    },
    {
      id: 'apt-1755094395476',
      patientName: 'Resume',
      doctorName: 'Dr. Rishi Mehta',
      date: '2025-08-13',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌟 Patient Review System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the complete patient review workflow - from submitting feedback to viewing doctor analytics.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-blue-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Reviews</h3>
            <p className="text-gray-600">
              Patients can easily submit star ratings and detailed feedback after appointments.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-green-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Doctors get comprehensive analytics with average ratings and distribution charts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-purple-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Edit & Delete</h3>
            <p className="text-gray-600">
              Patients can edit or delete their reviews within 24 hours for maximum flexibility.
            </p>
          </div>
        </div>

        {/* Patient Side Demo */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            👤 Patient Side - Submit Reviews
          </h2>
          <p className="text-gray-600 mb-6">
            Try the patient review experience by clicking on any of these appointment review links:
          </p>
          
          <div className="space-y-4">
            {sampleAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Appointment with {appointment.doctorName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Patient: {appointment.patientName} • Date: {appointment.date} • Status: {appointment.status}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <ReviewLink
                    appointmentId={appointment.id}
                    doctorName={appointment.doctorName}
                    patientName={appointment.patientName}
                    variant="button"
                    size="sm"
                  />
                  {appointment.status === 'completed' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Can Review
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Try These Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Submit a new review with star rating and feedback</li>
              <li>• Edit an existing review (if submitted within 24 hours)</li>
              <li>• Delete a review you no longer want</li>
              <li>• View your submitted review in read-only mode</li>
            </ul>
          </div>
        </div>

        {/* Doctor Side Demo */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                👨‍⚕️ Doctor Side - View Feedback
              </h2>
              <p className="text-gray-600 mt-2">
                See how doctors can analyze patient feedback with comprehensive analytics.
              </p>
            </div>
            <Link 
              href="/dashboard/doctor/reviews"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Dashboard
            </Link>
          </div>

          {/* Mini preview of doctor reviews */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            <p className="text-center text-gray-500 mb-4">Preview of Doctor Reviews Dashboard:</p>
            <DoctorReviews 
              doctorName="Dr. Rishi Mehta"
              showStats={true}
              itemsPerPage={3}
            />
          </div>
        </div>

        {/* Technical Features */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">🔧 Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">API Features</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• RESTful API with Next.js App Router</li>
                <li>• JSON file-based mock database</li>
                <li>• CRUD operations for reviews</li>
                <li>• Automatic rating calculations</li>
                <li>• Time-based edit permissions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">UI Features</h3>
              <ul className="space-y-2 text-purple-100">
                <li>• Interactive star rating component</li>
                <li>• Real-time form validation</li>
                <li>• Responsive design with Tailwind CSS</li>
                <li>• Loading states and error handling</li>
                <li>• Pagination and filtering</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mt-8 bg-gray-800 text-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">📡 API Endpoints</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm font-mono">
            <div>
              <div className="mb-2"><span className="text-green-400">GET</span> /api/reviews</div>
              <div className="mb-2"><span className="text-blue-400">POST</span> /api/reviews</div>
              <div className="mb-2"><span className="text-yellow-400">PUT</span> /api/reviews/[id]</div>
              <div className="mb-2"><span className="text-red-400">DELETE</span> /api/reviews/[id]</div>
            </div>
            <div className="text-gray-400">
              <div>Fetch reviews with filtering</div>
              <div>Create new review</div>
              <div>Update existing review</div>
              <div>Delete review (24hr limit)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
