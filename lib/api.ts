// lib/api.ts
import { Appointment } from '@/types';

const appointmentsData: Omit<Appointment, 'start' | 'end' | 'startTime' | 'endTime'>[] = [
  {
    id: '1',
    doctorId: 'doc123',
    patientId: 'pat456',
    phone: '1234567890',
    name: 'Priya Sharma',
    age: 29,
    mobile: '9876543210',
    date: '2025-08-05',
    time: '9:00 AM',
    status: 'confirmed',
  },
  {
    id: '2',
    doctorId: 'doc123',
    patientId: 'pat457',
    phone: '9123456789',
    name: 'Ravi Kumar',
    age: 35,
    mobile: '9123456789',
    date: '2025-08-05',
    time: '10:30 AM',
    status: 'waiting',
  },
  {
    id: '3',
    doctorId: 'doc123',
    patientId: 'pat458',
    phone: '9876512345',
    name: 'Sneha Kapoor',
    age: 40,
    mobile: '9876512345',
    date: '2025-08-05',
    time: '2:00 PM',
    status: 'rescheduled',
  },
  {
    id: '4',
    doctorId: 'doc123',
    patientId: 'pat459',
    phone: '9988776655',
    name: 'Amit Patel',
    age: 28,
    mobile: '9988776655',
    date: '2025-08-06',
    time: '9:30 AM',
    status: 'confirmed',
  },
  {
    id: '5',
    doctorId: 'doc123',
    patientId: 'pat460',
    phone: '9876543211',
    name: 'Kavya Singh',
    age: 32,
    mobile: '9876543211',
    date: '2025-08-06',
    time: '11:00 AM',
    status: 'waiting',
  },
  {
    id: '6',
    doctorId: 'doc123',
    patientId: 'pat461',
    phone: '9123456788',
    name: 'Rohit Gupta',
    age: 45,
    mobile: '9123456788',
    date: '2025-08-06',
    time: '3:30 PM',
    status: 'confirmed',
  },
  {
    id: '7',
    doctorId: 'doc123',
    patientId: 'pat462',
    phone: '9876512346',
    name: 'Anita Desai',
    age: 38,
    mobile: '9876512346',
    date: '2025-08-07',
    time: '10:00 AM',
    status: 'rescheduled',
  },
  {
    id: '8',
    doctorId: 'doc123',
    patientId: 'pat463',
    phone: '9988776656',
    name: 'Vikram Joshi',
    age: 42,
    mobile: '9988776656',
    date: '2025-08-07',
    time: '1:00 PM',
    status: 'waiting',
  },
  {
    id: '9',
    doctorId: 'doc123',
    patientId: 'pat464',
    phone: '9876543212',
    name: 'Meera Reddy',
    age: 26,
    mobile: '9876543212',
    date: '2025-08-08',
    time: '8:30 AM',
    status: 'confirmed',
  },
  {
    id: '10',
    doctorId: 'doc123',
    patientId: 'pat465',
    phone: '9123456787',
    name: 'Suresh Nair',
    age: 50,
    mobile: '9123456787',
    date: '2025-08-08',
    time: '11:30 AM',
    status: 'confirmed',
  },
  {
    id: '11',
    doctorId: 'doc123',
    patientId: 'pat466',
    phone: '9876512347',
    name: 'Pooja Agarwal',
    age: 32,
    mobile: '9876512347',
    date: '2025-08-09',
    time: '9:00 AM',
    status: 'waiting',
  },
  {
    id: '12',
    doctorId: 'doc123',
    patientId: 'pat467',
    phone: '9988776657',
    name: 'Arjun Malhotra',
    age: 37,
    mobile: '9988776657',
    date: '2025-08-09',
    time: '4:00 PM',
    status: 'rescheduled',
  }
];

const parseTime = (date: string, time: string): { start: Date, end: Date, startTime: string, endTime: string } => {
  const [timePart, ampm] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (ampm === 'PM' && hours < 12) {
    hours += 12;
  }
  if (ampm === 'AM' && hours === 12) {
    hours = 0;
  }

  const start = new Date(`${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
  const end = new Date(start.getTime() + 30 * 60000); // 30 minutes later

  const formatTime = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  return {
    start,
    end,
    startTime: formatTime(start),
    endTime: formatTime(end)
  };
};

const appointments: Appointment[] = appointmentsData.map(apt => {
    const { start, end, startTime, endTime } = parseTime(apt.date!, apt.time!);
  const patientId = apt.patientId || ''; // Ensure patientId is not undefined
  const phone = apt.phone || apt.mobile || ''; // Ensure phone is not undefined
    return {
        ...apt,
        start,
        end,
        startTime,
        endTime,
    patientId,
    phone,
  };
});

// In-memory mutation (note: this will reset on refresh in dev)
let mutableAppointments = [...appointments];

export const getAppointments = async (): Promise<Appointment[]> => {
  return mutableAppointments;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  mutableAppointments = mutableAppointments.filter(a => a.id !== id);
};

export const updateAppointment = async (updated: Appointment): Promise<void> => {
  mutableAppointments = mutableAppointments.map(a =>
    a.id === updated.id ? updated : a
  );
};
