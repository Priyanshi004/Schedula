import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');

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

function readReviews(): Review[] {
  try {
    const fileData = fs.readFileSync(reviewsFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

function writeReviews(reviews: Review[]) {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
}

function canEditReview(createdAt: string): boolean {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  return (now - createdTime) < twentyFourHours;
}

// GET - Fetch a specific review
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const reviews = readReviews();
    const review = reviews.find(r => r.id === id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...review,
      canEdit: canEditReview(review.createdAt)
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json({ error: 'Unable to fetch review' }, { status: 500 });
  }
}

// PUT - Update a review (only within 24 hours)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { rating, reviewText } = body;

    const reviews = readReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const existingReview = reviews[reviewIndex];

    // Check if review can still be edited (within 24 hours)
    if (!canEditReview(existingReview.createdAt)) {
      return NextResponse.json({ 
        error: 'Review can no longer be edited (24-hour limit exceeded)' 
      }, { status: 403 });
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json({ 
        error: 'Rating must be between 1 and 5' 
      }, { status: 400 });
    }

    // Update review
    const updatedReview = {
      ...existingReview,
      ...(rating && { rating }),
      ...(reviewText !== undefined && { reviewText }),
      updatedAt: new Date().toISOString()
    };

    reviews[reviewIndex] = updatedReview;
    writeReviews(reviews);

    return NextResponse.json({
      success: true,
      review: {
        ...updatedReview,
        canEdit: canEditReview(updatedReview.createdAt)
      }
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Unable to update review' }, { status: 500 });
  }
}

// DELETE - Delete a review (only within 24 hours)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const reviews = readReviews();
    const reviewIndex = reviews.findIndex(r => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const existingReview = reviews[reviewIndex];

    // Check if review can still be deleted (within 24 hours)
    if (!canEditReview(existingReview.createdAt)) {
      return NextResponse.json({ 
        error: 'Review can no longer be deleted (24-hour limit exceeded)' 
      }, { status: 403 });
    }

    // Remove review
    reviews.splice(reviewIndex, 1);
    writeReviews(reviews);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Unable to delete review' }, { status: 500 });
  }
}
