// types/appointment.ts
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  phone?: string;
  name: string;
  age: number;
  mobile: string;
  date: string;
  time: string;
  status: 'confirmed' | 'waiting' | 'rescheduled';
  start: Date;
  end: Date;
}
