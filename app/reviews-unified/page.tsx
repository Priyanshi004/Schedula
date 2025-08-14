'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DoctorReviews from '@/components/DoctorReviews';
import { ReviewForm } from '@/components/ReviewForm';
import ReviewLink from '@/components/ReviewLink';
import { 
  FaArrowLeft, FaStar, FaUsers, FaChartBar, FaCalendar, FaFilter, 
  FaEdit, FaTrash, FaClock, FaChartLine, FaCalendarAlt 
} from 'react-icons/fa';
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
  doctorStats: Array<{
    doctorName: string;
    totalReviews: number;
    averageRating: number;
  }>;
  monthlyStats: Array<{
    month: string;
    count: number;
  }>;
}

const UnifiedReviewsPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState<'overview' | 'submit' | 'my-reviews' | 'doctor-view' | 'demo'>('overview');
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('Dr. Rishi Mehta');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  
  // Mock data - in real app, this would come from auth/API
  const currentPatientId = 'pat-1';
  const currentUserRole = 'patient'; // or 'doctor' or 'admin'
  
  const doctors = [
    'All Doctors',
    'Dr. Rishi Mehta',
    'Dr. Sarah Johnson', 
    'Dr. Michael Chen',
    'Dr. Emily Davis',
    'Dr. David Wilson'
  ];

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchReviewStats(),
        fetchMyReviews()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewStats = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch review statistics');
      }

      const reviews = data.reviews || [];
      
      const totalReviews = reviews.length;
      const averageRating = totalReviews > 0 
        ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / totalReviews 
        : 0;

      // Doctor-wise stats
      const doctorStatsMap = new Map();
      reviews.forEach((review: any) => {
        if (!doctorStatsMap.has(review.doctorName)) {
          doctorStatsMap.set(review.doctorName, { ratings: [], count: 0 });
        }
        const doctorData = doctorStatsMap.get(review.doctorName);
        doctorData.ratings.push(review.rating);
        doctorData.count++;
      });

      const doctorStats = Array.from(doctorStatsMap.entries()).map(([doctorName, data]: any) => ({
        doctorName,
        totalReviews: data.count,
        averageRating: data.ratings.reduce((sum: number, rating: number) => sum + rating, 0) / data.count
      }));

      // Monthly stats (simplified)
      const monthlyStats = [
        { month: 'Jan', count: Math.floor(totalReviews * 0.1) },
        { month: 'Feb', count: Math.floor(totalReviews * 0.15) },
        { month: 'Mar', count: Math.floor(totalReviews * 0.12) },
        { month: 'Apr', count: Math.floor(totalReviews * 0.18) },
        { month: 'May', count: Math.floor(totalReviews * 0.20) },
        { month: 'Jun', count: Math.floor(totalReviews * 0.25) }
      ];

      setStats({
        totalReviews,
        averageRating,
        doctorStats,
        monthlyStats
      });
    } catch (error: any) {
      console.error('Error fetching review stats:', error);
      toast.error(error.message || 'Failed to fetch review statistics');
    }
  };

  const fetchMyReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?patientId=${currentPatientId}`);
      const data = await response.json();
      
      if (response.ok) {
        setMyReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching my reviews:', error);
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
      fetchMyReviews();
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

  const getTopPerformingDoctors = () => {
    if (!stats?.doctorStats) return [];
    return [...stats.doctorStats]
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);
  };

  const getMostReviewedDoctors = () => {
    if (!stats?.doctorStats) return [];
    return [...stats.doctorStats]
      .sort((a, b) => b.totalReviews - a.totalReviews)
      .slice(0, 3);
  };

  // Tab Navigation
  const TabButton = ({ tab, label, icon: Icon }: { tab: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Review System</h2>
          <p className="text-gray-600">Please wait while we load all review data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 hover:text-blue-600"
            >
              <FaArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Unified Review System</h1>
              <p className="text-gray-600 mt-1">Complete patient review management and analytics platform</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl text-white shadow-lg">
              <FaStar className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-xl">
          <TabButton tab="overview" label="Analytics Overview" icon={FaChartBar} />
          <TabButton tab="submit" label="Submit Review" icon={FaEdit} />
          <TabButton tab="my-reviews" label="My Reviews" icon={FaStar} />
          <TabButton tab="doctor-view" label="Doctor Dashboard" icon={FaUsers} />
          <TabButton tab="demo" label="Demo & Features" icon={FaCalendar} />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.totalReviews || 0}</p>
                    <p className="text-sm text-blue-600 mt-1">All time</p>
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
                      {stats?.averageRating ? stats.averageRating.toFixed(1) : '0.0'}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">System-wide</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <FaStar className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Doctors</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.doctorStats.length || 0}</p>
                    <p className="text-sm text-green-600 mt-1">With reviews</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaUsers className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stats?.monthlyStats[stats.monthlyStats.length - 1]?.count || 0}
                    </p>
                    <p className="text-sm text-purple-600 mt-1">New reviews</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FaCalendar className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Performance Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Rated Doctors */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-500 mr-2" />
                  Top Rated Doctors
                </h2>
                <div className="space-y-3">
                  {getTopPerformingDoctors().map((doctor, index) => (
                    <div key={doctor.doctorName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.doctorName}</p>
                          <p className="text-sm text-gray-500">{doctor.totalReviews} reviews</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{doctor.averageRating.toFixed(1)}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(doctor.averageRating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Reviewed Doctors */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUsers className="w-5 h-5 text-blue-500 mr-2" />
                  Most Reviewed Doctors
                </h2>
                <div className="space-y-3">
                  {getMostReviewedDoctors().map((doctor, index) => (
                    <div key={doctor.doctorName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-cyan-500' : 'bg-indigo-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.doctorName}</p>
                          <p className="text-sm text-gray-500">{doctor.averageRating.toFixed(1)} avg rating</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{doctor.totalReviews}</p>
                        <p className="text-sm text-gray-500">reviews</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <FaFilter className="w-5 h-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Filter Reviews</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select 
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                  <select 
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="all">All Time</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews Display */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {selectedDoctor === 'All Doctors' ? (
                <div className="p-8 text-center">
                  <div className="text-blue-500 mb-4">
                    <FaChartBar className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Doctor</h3>
                  <p className="text-gray-600 mb-4">
                    Choose a specific doctor from the dropdown above to view their detailed reviews.
                  </p>
                </div>
              ) : (
                <DoctorReviews 
                  doctorName={selectedDoctor}
                  showStats={true}
                  itemsPerPage={10}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'submit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit a Review</h2>
                <p className="text-gray-600">Select an appointment to write a review</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-900">Your Completed Appointments</h3>
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

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Review Guidelines:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You can only review completed appointments</li>
                  <li>• Reviews can be edited or deleted within 24 hours</li>
                  <li>• Be honest and constructive in your feedback</li>
                  <li>• Your identity remains private to the doctor</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-reviews' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{myReviews.length}</p>
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
                      {myReviews.length > 0 
                        ? (myReviews.reduce((sum, review) => sum + review.rating, 0) / myReviews.length).toFixed(1)
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
                      {myReviews.filter(review => review.canEdit).length}
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
              {myReviews.length === 0 ? (
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
                  <button
                    onClick={() => setActiveTab('submit')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Your First Review
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white p-6">
                    <h2 className="text-xl font-bold">Your Review History</h2>
                    <p className="text-blue-100 mt-1">All your submitted reviews and feedback</p>
                  </div>
                  
                  {myReviews.map((review) => (
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
          </div>
        )}

        {activeTab === 'doctor-view' && (
          <div className="space-y-6">
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
                  {doctors.filter(d => d !== 'All Doctors').map((doctor) => (
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
        )}

        {activeTab === 'demo' && (
          <div className="space-y-6">
            {/* Features Overview */}
            <div className="grid md:grid-cols-3 gap-8">
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
            <div className="bg-white rounded-lg shadow-md p-8">
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
            <div className="bg-gray-800 text-gray-100 rounded-lg p-6">
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
        )}

        {/* Quick Navigation Links */}
        <div className="flex justify-center flex-wrap gap-4">
          <Link 
            href="/demo/reviews"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Original Demo
          </Link>
          <Link 
            href="/dashboard/doctor/reviews"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Doctor Dashboard
          </Link>
          <Link 
            href="/patients/my-reviews"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Patient Reviews
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnifiedReviewsPage;
