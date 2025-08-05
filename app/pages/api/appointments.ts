export interface Appointment {
  id: string
  title: string
  startTime: Date
  endTime: Date
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'DELETED'
  createdBy: string // ✅ Add this line
}