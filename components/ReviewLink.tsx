'use client';

import React from 'react';
import Link from 'next/link';

interface ReviewLinkProps {
  appointmentId: string;
  doctorName: string;
  patientName: string;
  className?: string;
  variant?: 'button' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const ReviewLink: React.FC<ReviewLinkProps> = ({ 
  appointmentId, 
  doctorName, 
  patientName, 
  className = '',
  variant = 'button',
  size = 'md'
}) => {
  const reviewUrl = `/patients/review?appointmentId=${appointmentId}&doctorName=${encodeURIComponent(doctorName)}&patientName=${encodeURIComponent(patientName)}`;
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = variant === 'button' 
    ? `inline-flex items-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${sizeClasses[size]}`
    : 'text-blue-600 hover:text-blue-800 underline transition-colors';

  const buttonClasses = variant === 'button' 
    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-700 hover:to-sky-700 shadow-sm'
    : '';

  const finalClasses = `${baseClasses} ${buttonClasses} ${className}`.trim();

  return (
    <Link href={reviewUrl} className={finalClasses}>
      {variant === 'button' && size !== 'sm' && (
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )}
      {variant === 'button' ? 'Write Review' : 'Leave a Review'}
    </Link>
  );
};

export default ReviewLink;
