'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaPhone,
  FaCheckCircle,
  FaTimes,
  FaEdit,
  FaTrash,
  FaUser,
  FaMoneyBillWave,
  FaStethoscope,
  FaArrowLeft,
  FaPlus,
  FaFileMedical,
  FaStar
} from 'react-icons/fa';
import Link from 'next/link';
import BottomNavigation from '@/components/BottomNavigation';
import { Prescription } from '@/types/prescription';
import { PrescriptionPreview } from '@/components/PrescriptionPreview';

type Appointment = {
  id?: string;
  name: string;
  gender?: string;
  age: string;
  mobile: string;
  date: string;
  slot?: string;
  time?: string;
  tokenNo?: string;
  paid?: boolean;
  status: 'upcoming' | 'completed' | 'canceled' | 'Confirmed';
  doctor?: string;
  doctorName?: string;
  specialty?: string;
  doctorImage?: string;
  problem?: string;
  relation?: string;
  patientId?: string;
};

const TABS = ['upcoming', 'completed', 'canceled'] as const;

export default function AppointmentsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [viewingPrescription, setViewingPrescription] = useState<Prescription | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem('appointments');
    const storedBookings = localStorage.getItem('bookings');
    
    let allAppointments: Appointment[] = [];
    const seenIds = new Set<string>();
    
    // Add demo appointments
    const demoAppointments: Appointment[] = [
      {
        id: 'demo-1',
        name: 'Priyanshi Sharma',
        gender: 'Female',
        age: '23',
        mobile: '9876543210',
        date: 'Aug 6, 2025',
        slot: '10:00 AM',
        tokenNo: 'A1',
        paid: true,
        status: 'upcoming',
        doctor: 'Dr. Sonia Sharma',
        doctorName: 'Dr. Sonia Sharma',
        specialty: 'Cardiologist',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
        problem: 'Chest pain and irregular heartbeat',
        relation: 'Self',
        patientId: 'pat-1'
      },
      {
        id: 'demo-2',
        name: 'Raj Mehta',
        gender: 'Male',
        age: '35',
        mobile: '9876501234',
        date: 'Jul 20, 2025',
        slot: '11:30 AM',
        tokenNo: 'B3',
        paid: true,
        status: 'completed',
        doctor: 'Dr. Arjun Kapoor',
        doctorName: 'Dr. Arjun Kapoor',
        specialty: 'Orthopedic',
        doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
        problem: 'Back pain and joint stiffness',
        relation: 'Self',
        patientId: 'pat-2'
      },
      {
        id: 'demo-3',
        name: 'Sneha Verma',
        gender: 'Female',
        age: '29',
        mobile: '9898989898',
        date: 'Jul 15, 2025',
        slot: '02:00 PM',
        tokenNo: 'C5',
        paid: false,
        status: 'canceled',
        doctor: 'Dr. Priya Sharma',
        doctorName: 'Dr. Priya Sharma',
        specialty: 'Dermatologist',
        doctorImage: 'https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face',
        problem: 'Skin rash and allergies',
        relation: 'Self',
        patientId: 'pat-3'
      }
    ];
    
    // Add demo appointments with unique tracking
    demoAppointments.forEach(apt => {
      if (!seenIds.has(apt.id!)) {
        allAppointments.push(apt);
        seenIds.add(apt.id!);
      }
    });
    
    // Add stored appointments with unique IDs
    if (storedAppointments) {
      try {
        const parsed = JSON.parse(storedAppointments);
        parsed.forEach((apt: any, index: number) => {
          const uniqueId = apt.id || `stored-apt-${index}-${Math.random().toString(36).substr(2, 9)}`;
          if (!seenIds.has(uniqueId)) {
            allAppointments.push({
              ...apt,
              id: uniqueId,
              status: apt.status === 'Confirmed' ? 'upcoming' : apt.status
            });
            seenIds.add(uniqueId);
          }
        });
      } catch (error) {
        console.error('Error parsing stored appointments:', error);
      }
    }
    
    // Add stored bookings with unique IDs
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        parsed.forEach((booking: any, index: number) => {
          const uniqueId = booking.id || `stored-booking-${index}-${Math.random().toString(36).substr(2, 9)}`;
          if (!seenIds.has(uniqueId)) {
            allAppointments.push({
              ...booking,
              id: uniqueId,
              status: booking.status === 'Confirmed' ? 'upcoming' : booking.status || 'upcoming'
            });
            seenIds.add(uniqueId);
          }
        });
      } catch (error) {
        console.error('Error parsing stored bookings:', error);
      }
    }
    
    setAppointments(allAppointments);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'from-blue-600 to-sky-600';
      case 'completed': return 'from-green-600 to-emerald-600';
      case 'canceled': return 'from-red-600 to-rose-600';
      default: return 'from-gray-600 to-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <FaClock className="text-white" />;
      case 'completed': return <FaCheckCircle className="text-white" />;
      case 'canceled': return <FaTimes className="text-white" />;
      default: return <FaClock className="text-white" />;
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'canceled' as const } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setShowCancelModal(null);
    toast.success('Appointment canceled successfully');
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    setShowRescheduleModal(null);
    toast.info('Reschedule feature coming soon!');
  };

  const handleViewPrescription = async (appointment: Appointment) => {
    try {
      const response = await fetch(`/api/prescriptions?patientId=${appointment.patientId}`);
      if (response.ok) {
        const prescriptions = await response.json();
        if (prescriptions.length > 0) {
          setViewingPrescription(prescriptions[0]);
        } else {
          toast.error('No prescription found for this appointment.');
        }
      } else {
        toast.error('Failed to fetch prescription.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the prescription.');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const status = apt.status === 'Confirmed' ? 'upcoming' : apt.status;
    return status === tab;
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="relative pb-24">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => router.back()}
                  className="p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaArrowLeft />
                </motion.button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                    My Appointments
                  </h1>
                  <p className="text-gray-600 text-sm">Manage your healthcare appointments</p>
                </div>
              </div>
              
              <Link href="/doctors">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className="text-sm" />
                  Book New
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg mb-6">
            <div className="flex">
              {TABS.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 capitalize py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    tab === t 
                      ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No {tab} appointments</h3>
                <p className="text-gray-600 mb-6">You don't have any {tab} appointments yet.</p>
                <Link href="/doctors">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Your First Appointment
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id || index}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Status Header */}
                  <div className={`relative h-16 bg-gradient-to-r ${getStatusColor(appointment.status)} p-4`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          {getStatusIcon(appointment.status)}
                        </div>
                        <div className="text-white">
                          <p className="font-bold capitalize">{appointment.status}</p>
                          <p className="text-xs opacity-90">Token: {appointment.tokenNo || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="text-white text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-xs opacity-90">{appointment.slot || appointment.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Doctor Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                        <img
                          src={appointment.doctorImage || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'}
                          alt="Doctor"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">
                          {appointment.doctor || appointment.doctorName}
                        </h3>
                        <p className="text-blue-600 font-medium">{appointment.specialty || 'General Physician'}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            {appointment.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaPhone className="text-xs" />
                            {appointment.mobile}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Patient Details */}
                    {appointment.problem && (
                      <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <FaStethoscope className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-medium text-gray-800 mb-1">Health Concern</p>
                            <p className="text-gray-700 text-sm">{appointment.problem}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Status */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className={`${appointment.paid ? 'text-green-600' : 'text-orange-600'}`} />
                        <span className={`font-medium ${appointment.paid ? 'text-green-600' : 'text-orange-600'}`}>
                          {appointment.paid ? 'Payment Completed' : 'Payment Pending'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        Age: {appointment.age} • {appointment.gender || 'N/A'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleViewPrescription(appointment)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaFileMedical className="text-sm" />
                        View Prescription
                      </motion.button>
                      {appointment.status === 'upcoming' && (
                        <>
                          <motion.button
                            onClick={() => setShowRescheduleModal(appointment.id || `${index}`)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-2xl hover:bg-blue-50 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaEdit className="text-sm" />
                            Reschedule
                          </motion.button>
                          <motion.button
                            onClick={() => setShowCancelModal(appointment.id || `${index}`)}
                            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-red-600 text-red-600 font-medium rounded-2xl hover:bg-red-50 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaTrash className="text-sm" />
                            Cancel
                          </motion.button>
                        </>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <>
                          <Link 
                            href={`/patients/review?appointmentId=${appointment.id}&doctorName=${encodeURIComponent(appointment.doctor || appointment.doctorName || '')}&patientName=${encodeURIComponent(appointment.name)}`} 
                            className="flex-1"
                          >
                            <motion.button
                              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaStar className="text-sm" />
                              Write Review
                            </motion.button>
                          </Link>
                          <Link href="/doctors" className="flex-1">
                            <motion.button
                              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <FaPlus className="text-sm" />
                              Book Again
                            </motion.button>
                          </Link>
                        </>
                      )}
                      
                      {appointment.status === 'canceled' && (
                        <Link href="/doctors" className="flex-1">
                          <motion.button
                            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaPlus className="text-sm" />
                            Book New Appointment
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaTrash className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Cancel Appointment</h3>
                <div className="bg-red-50 rounded-2xl p-4 mb-6">
                  <p className="text-center text-gray-700">
                    Are you sure you want to cancel this appointment? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    onClick={() => setShowCancelModal(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Keep Appointment
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all duration-300"
                    onClick={() => handleCancelAppointment(showCancelModal)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Reschedule Modal */}
        {showRescheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaEdit className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Reschedule Appointment</h3>
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <p className="text-center text-gray-700">
                    Reschedule feature is coming soon! For now, please contact the clinic directly.
                  </p>
                </div>
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-sky-700 transition-all duration-300"
                  onClick={() => handleRescheduleAppointment(showRescheduleModal)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <BottomNavigation />

      {/* Prescription Modal */}
      {viewingPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 overflow-y-auto">
              <PrescriptionPreview
                prescription={viewingPrescription}
                onBack={() => setViewingPrescription(null)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
