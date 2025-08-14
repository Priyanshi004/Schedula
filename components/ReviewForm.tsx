'use client';

import { useState, useEffect } from 'react';
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

interface ReviewFormProps {
  appointmentId: string;
  doctorName?: string;
  patientName?: string;
  onSubmit?: (review: { appointmentId: string; rating: number; reviewText: string }) => void;
  onSuccess?: () => void;
}

export function ReviewForm({ appointmentId, doctorName, patientName, onSubmit, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [existingReview, setExistingReview] = useState<Review | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Check if review already exists for this appointment
  useEffect(() => {
    const checkExistingReview = async () => {
      try {
        const response = await fetch(`/api/reviews?appointmentId=${appointmentId}`);
        const data = await response.json();
        
        if (data.reviews && data.reviews.length > 0) {
          const review = data.reviews[0];
          setExistingReview(review);
          setRating(review.rating);
          setReviewText(review.reviewText);
        }
      } catch (error) {
        console.error('Error checking existing review:', error);
      }
    };

    if (appointmentId) {
      checkExistingReview();
    }
  }, [appointmentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!rating) {
      setError('Please select a rating.');
      setLoading(false);
      return;
    }

    try {
      let response;
      
      if (existingReview && isEditing) {
        // Update existing review
        response = await fetch(`/api/reviews/${existingReview.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, reviewText }),
        });
      } else {
        // Create new review
        response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ appointmentId, rating, reviewText }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      toast.success(isEditing ? 'Review updated successfully!' : 'Review submitted successfully!');
      
      if (onSubmit) {
        onSubmit({ appointmentId, rating, reviewText });
      }
      
      if (onSuccess) {
        onSuccess();
      }

      // Refresh the existing review data
      if (!isEditing) {
        setExistingReview(data.review);
      } else {
        setExistingReview(data.review);
        setIsEditing(false);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to submit review');
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingReview || !window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/reviews/${existingReview.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete review');
      }

      toast.success('Review deleted successfully!');
      setExistingReview(null);
      setRating(0);
      setReviewText('');
      setIsEditing(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.reviewText);
    }
    setIsEditing(false);
    setError('');
  };

  // If there's an existing review and not editing, show read-only view
  if (existingReview && !isEditing) {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-bold text-green-700 mb-2">Your Review</h3>
        
        {/* Display existing review */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Your rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-lg ${
                    star <= existingReview.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold">({existingReview.rating}/5)</span>
          </div>
          
          {existingReview.reviewText && (
            <div className="mb-3">
              <p className="text-gray-700">{existingReview.reviewText}</p>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Submitted: {formatDate(existingReview.createdAt)}
            {existingReview.updatedAt !== existingReview.createdAt && (
              <span className="block">Last updated: {formatDate(existingReview.updatedAt)}</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {existingReview.canEdit && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                Edit Review
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
              >
                Delete Review
              </button>
            </>
          )}
          
          {!existingReview.canEdit && (
            <p className="text-sm text-gray-500 italic">
              Reviews can only be edited or deleted within 24 hours of submission.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h3 className="text-xl font-bold text-blue-700 mb-2">
        {existingReview && isEditing ? 'Edit Your Review' : 'Submit Your Review'}
        {doctorName && <span className="block text-sm font-normal text-gray-600">for {doctorName}</span>}
      </h3>

      {/* Star Rating */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={loading}
              className={`text-3xl transition-colors ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-300 disabled:opacity-50`}
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-600">{rating} out of 5 stars</p>
        )}
      </div>

      {/* Review Text */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
        <textarea
          value={reviewText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setReviewText(e.target.value)
          }
          rows={4}
          disabled={loading}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-50"
          placeholder="Share your experience with the doctor..."
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !rating}
          className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold hover:from-blue-700 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? 'Updating...' : 'Submitting...'}
            </span>
          ) : (
            <span>{isEditing ? 'Update Review' : 'Submit Review'}</span>
          )}
        </button>
        
        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={loading}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
