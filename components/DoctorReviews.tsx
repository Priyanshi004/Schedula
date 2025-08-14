'use client';

import React, { useState, useEffect } from 'react';
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

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  distribution: Record<string, number>;
}

interface DoctorReviewsProps {
  doctorName: string;
  showStats?: boolean;
  itemsPerPage?: number;
}

const DoctorReviews: React.FC<DoctorReviewsProps> = ({ 
  doctorName, 
  showStats = true, 
  itemsPerPage = 10 
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [doctorName]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?doctorName=${encodeURIComponent(doctorName)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch reviews');
      }
      
      setReviews(data.reviews || []);
      setStats(data.stats || null);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch reviews');
      toast.error(error.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
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

  const getSortedAndFilteredReviews = () => {
    let filteredReviews = [...reviews];
    
    // Apply rating filter
    if (filterRating !== null) {
      filteredReviews = filteredReviews.filter(review => review.rating === filterRating);
    }
    
    // Apply sorting
    filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
    
    return filteredReviews;
  };

  const getPaginatedReviews = () => {
    const sortedReviews = getSortedAndFilteredReviews();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedReviews.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getSortedAndFilteredReviews().length / itemsPerPage);

  const renderStarRating = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl'
    };
    
    return (
      <div className={`flex ${sizeClasses[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    if (!stats || !stats.distribution) return null;
    
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map((rating) => {
          const percentage = stats.distribution[rating.toString()] || 0;
          const count = Math.round((percentage / 100) * stats.totalReviews);
          
          return (
            <div key={rating} className="flex items-center space-x-2 text-sm">
              <span className="w-3">{rating}</span>
              <span className="text-yellow-400">★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full transition-all duration-300" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-right text-gray-600">{count}</span>
              <span className="w-10 text-right text-gray-500">({percentage}%)</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Reviews</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchReviews}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Patient Reviews</h2>
        <p className="text-blue-100">for {doctorName}</p>
      </div>

      {/* Stats Section */}
      {showStats && stats && stats.totalReviews > 0 && (
        <div className="p-6 border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats.averageRating}
              </div>
              {renderStarRating(Math.round(stats.averageRating), 'lg')}
              <p className="text-gray-600 mt-2">
                Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Rating Distribution */}
            <div>
              {renderRatingDistribution()}
            </div>
          </div>
        </div>
      )}

      {/* Filters and Sorting */}
      {reviews.length > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter by rating:</label>
              <select 
                value={filterRating || ''} 
                onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600 ml-auto">
              Showing {getSortedAndFilteredReviews().length} review{getSortedAndFilteredReviews().length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-gray-200">
        {reviews.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">
              This doctor hasn't received any patient reviews yet.
            </p>
          </div>
        ) : (
          getPaginatedReviews().map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {review.patientName}
                    </h4>
                    {renderStarRating(review.rating, 'sm')}
                    <span className="text-sm text-gray-600">({review.rating}/5)</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.createdAt)} at {formatTime(review.createdAt)}
                    {review.updatedAt !== review.createdAt && (
                      <span className="italic"> (edited)</span>
                    )}
                  </p>
                </div>
              </div>
              
              {review.reviewText && (
                <div className="mt-3">
                  <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
