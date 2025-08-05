export interface Appointment {
  id: string
  title: string
  start: Date   
  end: Date 
  name:string
  time:string
  date:string
  doctorId:string
  status: 'confirmed' | 'waiting' | 'rescheduled';
  patientName:string
}