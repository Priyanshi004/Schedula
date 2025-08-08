type Appointment = {
  id: string;
  doctorId: string;
  patientId: string;
  phone?: string;
  name: string;
  age: number;
  mobile?: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  status: string;
};

const exampleAppointment: Appointment = {
  id: "1",
  doctorId: "123",
  patientId: "456",
  phone: "9876543210", // or use `mobile` here consistently
  name: "John Doe",
  age: 30,
  mobile: "9876543210", // if needed, but could just use phone
  date: "2025-08-07",
  time: "10:00",
  startTime: "10:00",  // ✅ added
  endTime: "10:30",    // ✅ added
  status: "confirmed"
};
