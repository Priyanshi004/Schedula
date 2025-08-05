export type Appointment = {
  id: string;
  doctorId: string;
  age: string;
  mobile: string;
  date: string;
  time: string;
  status: 'confirmed' | 'waiting' | 'rescheduled' | 'cancelled';
  name:string
};
