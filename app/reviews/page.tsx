'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DoctorReviews from '@/components/DoctorReviews';
import { FaArrowLeft, FaStar, FaUsers, FaChartBar, FaCalendar, FaFilter } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

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

const ReviewsOverviewPage = () => {
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('All Doctors');
  const [timeFilter, setTimeFilter] = useState<string>('all');

  // Available doctors - in a real app, this would come from your API
  const doctors = [
    'All Doctors',
    'Dr. Rishi Mehta',
    'Dr. Sarah Johnson', 
    'Dr. Michael Chen',
    'Dr. Emily Davis',
    'Dr. David Wilson'
  ];

  useEffect(() => {
    fetchReviewStats();
  }, []);

  const fetchReviewStats = async () => {
    try {
      setLoading(true);
      // Fetch reviews for all doctors to calculate stats
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch review statistics');
      }

      const reviews = data.reviews || [];
      
      // Calculate comprehensive stats
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

      // Monthly stats (simplified - in real app, you'd parse dates properly)
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
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Review Analytics</h2>
          <p className="text-gray-600">Please wait while we analyze review data...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Reviews Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive review insights across all doctors</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl text-white shadow-lg">
              <FaChartBar className="w-6 h-6" />
            </div>
          </div>
        </div>

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
              <Link 
                href="/demo/reviews"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Demo Reviews
              </Link>
            </div>
          ) : (
            <DoctorReviews 
              doctorName={selectedDoctor}
              showStats={true}
              itemsPerPage={10}
            />
          )}
        </div>

        {/* Quick Links */}
        <div className="flex justify-center space-x-4">
          <Link 
            href="/demo/reviews"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Demo
          </Link>
          <Link 
            href="/dashboard/doctor/reviews"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Doctor Dashboard
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

export default ReviewsOverviewPage;
