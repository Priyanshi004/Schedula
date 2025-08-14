'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReviewForm } from '@/components/ReviewForm';

function ReviewPageContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams?.get('appointmentId');
  const doctorName = searchParams?.get('doctor') || searchParams?.get('doctorName') || '';
  const patientName = searchParams?.get('patient') || searchParams?.get('patientName') || '';

  if (!appointmentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid Request</h2>
            <p className="text-gray-600 mb-4">
              Missing or invalid appointment ID. Cannot write a review without a valid appointment.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Review
          </h1>
          {doctorName && (
            <p className="text-lg text-gray-600">
              Share your experience with <span className="font-semibold text-blue-600">{doctorName}</span>
            </p>
          )}
        </div>
        
        <ReviewForm
          appointmentId={appointmentId}
          doctorName={doctorName}
          patientName={patientName}
          onSuccess={() => {
            // Optionally redirect or show success message
            console.log('Review operation completed successfully');
          }}
        />
        
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to previous page
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Review Form</h2>
          <p className="text-gray-600">Please wait while we prepare your review form...</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<ReviewPageLoading />}>
      <ReviewPageContent />
    </Suspense>
  );
}
