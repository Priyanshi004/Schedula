'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaStickyNote,
  FaStethoscope,
  FaHeart,
  FaBrain,
  FaBone,
  FaTooth,
  FaEye,
  FaStar
} from 'react-icons/fa';
import BottomNavigation from '@/components/BottomNavigation';

type Doctor = {
  id: string
  name: string
  specialty: string
  availability: string
  hours?: string
  about?: string
  earliest?: string
  icon?: any
  photo?: string
  rating?: number
  patients?: number
}

const doctors: Doctor[] = [
  {
    id: 'priya-sharma',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    availability: 'Available today',
    hours: '09:00 AM – 05:00 PM',
    icon: FaHeart,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    patients: 1200
  },
  {
    id: 'rishi-mehta',
    name: 'Dr. Rishi Mehta',
    specialty: 'Dermatologist',
    availability: 'Available tomorrow',
    hours: '10:00 AM – 06:00 PM',
    icon: FaEye,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    patients: 950
  },
  {
    id: 'neha-singh',
    name: 'Dr. Neha Singh',
    specialty: 'Pediatrician',
    availability: 'Available Friday',
    hours: '08:00 AM – 03:00 PM',
    icon: FaStethoscope,
    photo: 'https://images.unsplash.com/photo-1594824475317-d0c8d0e5b8a4?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    patients: 800
  },
  {
    id: 'arjun-kapoor',
    name: 'Dr. Arjun Kapoor',
    specialty: 'Orthopedic Surgeon',
    availability: 'Available Friday',
    hours: '08:00 AM – 04:00 PM',
    icon: FaBone,
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    patients: 600
  },
  {
    id: 'sonia-sharma',
    name: 'Dr. Sonia Sharma',
    specialty: 'Dental Surgeon',
    about: 'Specializes in dental replacements. Over 14 years of surgical experience.',
    availability: 'Mon–Sat: 09:00 AM – 05:00 PM',
    earliest: '15 Oct, 2023 | 10:45 AM',
    hours: '09:00 AM – 05:00 PM',
    icon: FaTooth,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    patients: 1100
  },
  {
    id: 'pranav-sharma',
    name: 'Dr. Pranav Sharma',
    specialty: 'Psychiatrist',
    about: 'Specializes in mental health and behavioral disorders. Over 14 years of experience.',
    availability: 'Mon–Sat: 09:00 AM – 05:00 PM',
    earliest: '15 Oct, 2023 | 10:45 AM',
    hours: '09:00 AM – 05:00 PM',
    icon: FaBrain,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    patients: 750
  },
]

const dates: string[] = [
  '', '01 Mon','02 Tue','03 Wed','04 Thu','05 Fri','06 Sat','07 Sun',
  '08 Mon','09 Tue','10 Wed','11 Thu','12 Fri','13 Sat','14 Sun',
  '15 Mon','16 Tue','17 Wed','18 Thu','19 Fri','20 Sat','21 Sun',
  '22 Mon','23 Tue','24 Wed','25 Thu','26 Fri','27 Sat','28 Sun',
  '29 Mon','30 Tue','31 Wed'
]

const timeSlots = {
  morning: [
    '09:30 AM - 09:45 AM','10:00 AM - 10:15 AM','10:30 AM - 10:45 AM',
    '11:00 AM - 11:15 AM','11:30 AM - 11:45 AM','12:00 PM - 12:15 PM',
    '12:30 PM - 12:45 PM'
  ],
  evening: [
    '03:30 PM - 03:45 PM','04:00 PM - 04:15 PM','04:30 PM - 04:45 PM',
    '05:00 PM - 05:15 PM','05:30 PM - 05:45 PM'
  ],
}

export default function DoctorBookingPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const doctor = doctors.find((d) => d.id === id as string)

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(dates[1])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [newAppointmentId, setNewAppointmentId] = useState<string>('')

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserMd className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">The doctor you're looking for is not available.</p>
          <button
            onClick={() => router.push('/doctors')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    )
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointment = {
      id: `apt-${Date.now()}`,
      name,
      email,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      time: selectedSlot,
      notes,
      status: 'upcoming',
      patientId: `pat-${Date.now()}`,
    };
    setNewAppointmentId(appointment.id);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        toast.success('Appointment booked successfully!');
        setStep(3);
      } else {
        toast.error('Failed to book appointment.');
      }
    } catch (error) {
      toast.error('An error occurred while booking the appointment.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="relative max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back to Doctors</span>
        </motion.button>

        {/* Doctor Info Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-sky-600 p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-sky-600/90"></div>
            <div className="relative flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {doctor.icon && <doctor.icon className="text-white/80" />}
                  <p className="text-blue-100">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  {doctor.rating && <span className="bg-white/20 px-2 py-1 rounded-full">⭐ {doctor.rating}</span>}
                  {doctor.patients && <span className="bg-white/20 px-2 py-1 rounded-full">{doctor.patients}+ patients</span>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Working Hours</p>
                  <p className="text-sm text-gray-600">{doctor.hours ?? 'Not specified'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Availability</p>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Date & Time Selection */}
        {step === 1 && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Date Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
                  <FaCalendarAlt className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Select Date</h2>
                  <p className="text-gray-600">Choose your preferred appointment date</p>
                </div>
              </div>
              
              <div className="flex gap-3 overflow-auto pb-2">
                {dates.slice(1).map((day) => (
                  <motion.button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`px-4 py-3 rounded-2xl border-2 font-medium whitespace-nowrap transition-all duration-300 ${
                      selectedDate === day 
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-blue-600 shadow-lg' 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Select Time Slot</h2>
                  <p className="text-gray-600">Choose your preferred appointment time</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Morning Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></span>
                    Morning
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {timeSlots.morning.map((time) => (
                      <motion.button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`px-4 py-3 border-2 rounded-2xl font-medium transition-all duration-300 ${
                          selectedSlot === time
                            ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Evening Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></span>
                    Evening
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {timeSlots.evening.map((time) => (
                      <motion.button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`px-4 py-3 border-2 rounded-2xl font-medium transition-all duration-300 ${
                          selectedSlot === time
                            ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            {selectedSlot && (
              <motion.button
                onClick={() => {
                  localStorage.setItem('selectedAppointment', JSON.stringify({
                    doctorId: doctor.id,
                    doctorName: doctor.name,
                    specialty: doctor.specialty,
                    date: selectedDate,
                    slot: selectedSlot,
                  }))
                  router.push('/patient-details')
                }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Continue to Patient Details
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Step 2: Patient Details Form */}
        {step === 2 && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Patient Details</h2>
                <p className="text-gray-600">Please provide your information</p>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div className="relative">
                <FaStickyNote className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  rows={4}
                  placeholder="Additional notes or symptoms (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirm Booking
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaCheckCircle className="text-white text-3xl" />
            </motion.div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Booking Confirmed!
            </h2>

            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <p className="text-lg text-gray-700 mb-2">
                Thank you, <strong className="text-green-600">{name}</strong>!
              </p>
              <p className="text-gray-600">
                Your appointment with <strong>{doctor.name}</strong> is scheduled for:
              </p>
              <div className="mt-4 p-4 bg-white rounded-xl border border-green-200">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-600" />
                    <span className="font-semibold">{selectedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-600" />
                    <span className="font-semibold">{selectedSlot}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 mb-8">
              Confirmation details have been saved. We'll send updates to <strong>{email}</strong>.
            </p>

            <div className="flex gap-4">
              <motion.button
                onClick={() => router.push('/appointments')}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Appointments
              </motion.button>
              <motion.button
                onClick={() => router.push('/doctors')}
                className="flex-1 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Another
              </motion.button>
              <motion.button
                onClick={() =>
                  router.push(
                    `/patients/review?appointmentId=${newAppointmentId}&doctorName=${doctor.name}&patientName=${name}`
                  )
                }
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Write Review
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}