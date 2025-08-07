export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  medicineName: string;
  dosage: string;
  duration: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'completed' | 'expired';
  frequency?: string;
}