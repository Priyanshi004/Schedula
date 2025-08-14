# 🌟 Patient Review System

A comprehensive patient review system that allows patients to submit feedback after appointments and enables doctors to view and analyze their patient feedback.

## ✨ Features

### Patient Side
- ⭐ **Star Rating System** - Interactive 5-star rating component
- 📝 **Feedback Text** - Optional detailed review text
- 🔗 **Appointment Linking** - Reviews are tied to specific appointments
- ✏️ **Edit Reviews** - Patients can edit their reviews within 24 hours
- 🗑️ **Delete Reviews** - Patients can delete their reviews within 24 hours
- 👁️ **Review Viewing** - See submitted reviews in read-only mode after 24 hours

### Doctor Side
- 📊 **Analytics Dashboard** - Comprehensive review analytics
- 📈 **Average Rating** - Calculated automatically from all reviews
- 📋 **Rating Distribution** - Visual breakdown of star ratings
- 🔍 **Filtering & Sorting** - Filter by rating, sort by date or rating
- 📄 **Pagination** - Handle large numbers of reviews efficiently
- 🏥 **Multi-Doctor Support** - Support for multiple doctors in the system

## 🏗️ Technical Implementation

### API Routes

#### `/api/reviews` (GET)
Fetch reviews with optional filtering:
- `doctorName` - Filter reviews for specific doctor
- `patientId` - Filter reviews by patient
- `appointmentId` - Get review for specific appointment

Returns aggregated statistics when filtering by doctor:
```json
{
  "reviews": [...],
  "stats": {
    "totalReviews": 10,
    "averageRating": 4.5,
    "distribution": {
      "5": 60,
      "4": 20,
      "3": 10,
      "2": 5,
      "1": 5
    }
  }
}
```

#### `/api/reviews` (POST)
Create a new review:
```json
{
  "appointmentId": "123",
  "rating": 5,
  "reviewText": "Great experience!"
}
```

#### `/api/reviews/[id]` (PUT)
Update an existing review (only within 24 hours):
```json
{
  "rating": 4,
  "reviewText": "Updated feedback"
}
```

#### `/api/reviews/[id]` (DELETE)
Delete a review (only within 24 hours)

#### `/api/reviews/[id]` (GET)
Get a specific review by ID

### Components

#### `ReviewForm`
- **Location**: `components/ReviewForm.tsx`
- **Features**:
  - Interactive star rating
  - Form validation
  - Edit/delete functionality
  - Loading states
  - Error handling
  - Toast notifications

#### `DoctorReviews`
- **Location**: `components/DoctorReviews.tsx`
- **Features**:
  - Review listing with pagination
  - Average rating display
  - Rating distribution chart
  - Filtering and sorting
  - Responsive design

#### `ReviewLink`
- **Location**: `components/ReviewLink.tsx`
- **Features**:
  - Easy link generation for review forms
  - Multiple display variants (button/link)
  - Different sizes (sm/md/lg)

### Pages

#### Patient Review Page
- **Location**: `app/patients/review/page.tsx`
- **Access**: `/patients/review?appointmentId=123&doctorName=Dr.%20Smith&patientName=John`

#### Doctor Reviews Dashboard
- **Location**: `app/dashboard/doctor/reviews/page.tsx`
- **Access**: `/dashboard/doctor/reviews`

#### Demo Page
- **Location**: `app/demo/reviews/page.tsx`
- **Access**: `/demo/reviews`

## 📱 User Experience

### Patient Journey
1. **Complete Appointment** - Patient attends their appointment
2. **Receive Review Link** - Get link via email, SMS, or in-app notification
3. **Submit Review** - Fill out star rating and optional feedback
4. **Edit if Needed** - Can modify review within 24 hours
5. **View Confirmation** - See read-only version of submitted review

### Doctor Journey
1. **Access Dashboard** - Navigate to reviews section
2. **View Analytics** - See overall rating and distribution
3. **Browse Reviews** - Read individual patient feedback
4. **Filter & Sort** - Find specific reviews or trends
5. **Analyze Feedback** - Use insights to improve practice

## 🛠️ Installation & Setup

### Prerequisites
- Next.js 14+ with App Router
- React 18+
- Tailwind CSS
- react-hot-toast for notifications

### File Structure
```
app/
├── api/
│   └── reviews/
│       ├── route.ts
│       └── [id]/route.ts
├── patients/
│   └── Review.tsx
├── dashboard/doctor/
│   └── reviews/page.tsx
└── demo/reviews/page.tsx

components/
├── ReviewForm.tsx
├── DoctorReviews.tsx
└── ReviewLink.tsx

data/
├── reviews.json
└── appointments.json
```

### Data Models

#### Review
```typescript
interface Review {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  rating: number; // 1-5
  reviewText: string;
  createdAt: string;
  updatedAt: string;
  canEdit?: boolean; // Calculated field
}
```

#### Review Stats
```typescript
interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  distribution: Record<string, number>; // Percentages
}
```

## 🚀 Usage Examples

### Creating a Review Link
```tsx
import ReviewLink from '@/components/ReviewLink';

<ReviewLink
  appointmentId="123"
  doctorName="Dr. Smith"
  patientName="John Doe"
  variant="button"
  size="md"
/>
```

### Displaying Doctor Reviews
```tsx
import DoctorReviews from '@/components/DoctorReviews';

<DoctorReviews 
  doctorName="Dr. Smith"
  showStats={true}
  itemsPerPage={10}
/>
```

### Using Review Form
```tsx
import { ReviewForm } from '@/components/ReviewForm';

<ReviewForm
  appointmentId="123"
  doctorName="Dr. Smith"
  patientName="John Doe"
  onSuccess={() => console.log('Review submitted!')}
/>
```

## 🔧 Configuration Options

### Review Form Options
- `appointmentId` - Required appointment identifier
- `doctorName` - Display name for the doctor
- `patientName` - Display name for the patient
- `onSubmit` - Callback when review is submitted
- `onSuccess` - Callback when operation succeeds

### Doctor Reviews Options
- `doctorName` - Required doctor name to filter reviews
- `showStats` - Whether to display analytics (default: true)
- `itemsPerPage` - Number of reviews per page (default: 10)

## 🎨 Styling

The system uses Tailwind CSS with a blue/sky color scheme:
- Primary: `blue-600` to `sky-500` gradient
- Success: `green-600`
- Warning: `yellow-400`
- Error: `red-600`
- Gray scale for backgrounds and text

## 📝 Business Rules

1. **24-Hour Edit Window** - Patients can edit/delete reviews only within 24 hours
2. **One Review Per Appointment** - Each appointment can have only one review
3. **Required Rating** - Star rating is mandatory, text is optional
4. **Completed Appointments Only** - Reviews can only be submitted for completed appointments
5. **Anonymous to Doctors** - Patient names are shown but reviews are treated as feedback

## 🚦 Error Handling

- **Missing Appointment** - Clear error message if appointment doesn't exist
- **Duplicate Review** - Prevent multiple reviews for same appointment
- **Edit Time Expired** - Friendly message when 24-hour window passes
- **Network Errors** - Toast notifications for API failures
- **Validation Errors** - Real-time form validation feedback

## 🔮 Future Enhancements

### Planned Features
- **Email Notifications** - Automatic review request emails
- **SMS Integration** - Text message review links
- **Review Templates** - Quick-select common feedback
- **Photo Uploads** - Allow patients to attach images
- **Doctor Responses** - Enable doctors to respond to reviews
- **Review Trends** - Historical analytics and trends
- **Sentiment Analysis** - Automatic text sentiment scoring

### Technical Improvements
- **Database Integration** - Replace JSON files with proper database
- **Caching** - Redis caching for better performance
- **Rate Limiting** - Prevent spam reviews
- **Audit Logging** - Track all review operations
- **Backup & Recovery** - Automated data backups

## 🤝 Contributing

When contributing to the review system:

1. **Follow TypeScript** - Use proper types for all components
2. **Test Edge Cases** - Consider 24-hour limits, missing data, etc.
3. **Responsive Design** - Ensure mobile compatibility
4. **Accessibility** - Follow ARIA guidelines for screen readers
5. **Error Boundaries** - Handle component errors gracefully

## 📊 Testing

### Test Cases to Cover
- [ ] Submit new review successfully
- [ ] Edit review within 24 hours
- [ ] Delete review within 24 hours
- [ ] Prevent editing after 24 hours
- [ ] Handle duplicate reviews
- [ ] Display statistics correctly
- [ ] Pagination works properly
- [ ] Filtering and sorting function
- [ ] Mobile responsive design
- [ ] Error handling for network failures

## 📚 Additional Resources

- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **React Hot Toast**: https://react-hot-toast.com/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

**Created for the Schedula appointment management system**  
**Version**: 1.0.0  
**Last Updated**: August 14, 2025
