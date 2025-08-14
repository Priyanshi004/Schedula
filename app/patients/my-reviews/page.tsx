'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaStar, FaEdit, FaTrash, FaCalendar, FaClock } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface Review {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
  canEdit?: boolean;
}

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // In a real app, you'd get this from authentication
  const currentPatientId = 'pat-1'; // This would come from auth context

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?patientId=${currentPatientId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reviews');
      }
      
      setReviews(data.reviews || []);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch reviews');
      toast.error(error.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete review');
      }

      toast.success('Review deleted successfully!');
      fetchMyReviews(); // Refresh the reviews list
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete review');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Your Reviews</h2>
          <p className="text-gray-600">Please wait while we fetch your review history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard"
              className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-gray-600 mt-1">View and manage your submitted reviews</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{reviews.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaStar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {reviews.length > 0 
                    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaStar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Editable Reviews</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {reviews.filter(review => review.canEdit).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaEdit className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {error ? (
            <div className="p-8 text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Reviews</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchMyReviews}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't submitted any reviews yet. Complete an appointment to leave a review.
              </p>
              <Link 
                href="/appointments"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Appointments
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white p-6">
                <h2 className="text-xl font-bold">Your Review History</h2>
                <p className="text-blue-100 mt-1">All your submitted reviews and feedback</p>
              </div>
              
              {reviews.map((review) => (
                <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Review for {review.doctorName}
                        </h3>
                        {renderStarRating(review.rating)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <FaCalendar className="w-4 h-4" />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock className="w-4 h-4" />
                          <span>{formatTime(review.createdAt)}</span>
                        </div>
                        {review.updatedAt !== review.createdAt && (
                          <span className="italic">(edited)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {review.canEdit && (
                        <>
                          <Link
                            href={`/patients/review?appointmentId=${review.appointmentId}&doctorName=${encodeURIComponent(review.doctorName)}&patientName=${encodeURIComponent(review.patientName)}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit Review"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete Review"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {review.reviewText && (
                    <div className="bg-gray-50 rounded-lg p-4 mt-3">
                      <p className="text-gray-700 leading-relaxed">"{review.reviewText}"</p>
                    </div>
                  )}

                  {!review.canEdit && (
                    <div className="mt-3 text-xs text-gray-500 italic">
                      This review can no longer be edited (24-hour limit exceeded)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link 
            href="/appointments"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Appointments
          </Link>
          <Link 
            href="/dashboard"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;
