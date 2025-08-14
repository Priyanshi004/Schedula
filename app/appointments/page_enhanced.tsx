'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaEdit,
  FaTrash,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaStethoscope,
  FaArrowLeft,
  FaPlus,
  FaFileMedical,
  FaStar,
  FaHeart,
  FaFire,
  FaRocket,
  FaGem,
} from 'react-icons/fa';
import Link from 'next/link';

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

// Floating particles animation
const FloatingParticle = ({ delay = 0, size = "w-2 h-2", color = "from-pink-400 to-purple-400" }) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-r ${color} rounded-full opacity-40`}
    animate={{
      y: [-20, -80],
      x: [0, 30, -30, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

export default function AppointmentsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAppointments = async () => {
      // Demo appointments with enhanced data
      const demoAppointments: Appointment[] = [
        {
          id: '1',
          name: 'Dr. Priya Sharma',
          gender: 'Female',
          age: '29',
          mobile: '9876543210',
          date: 'Today',
          slot: '10:00 AM',
          tokenNo: 'T001',
          paid: true,
          status: 'upcoming',
          doctor: 'Dr. Rishi Mehta',
          doctorName: 'Dr. Rishi Mehta',
          specialty: 'Cardiologist',
          doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
          problem: 'Heart checkup consultation',
          relation: 'Self',
          patientId: 'pat-1',
        },
        {
          id: '2',
          name: 'Ravi Kumar',
          gender: 'Male',
          age: '35',
          mobile: '9123456789',
          date: 'Tomorrow',
          slot: '2:30 PM',
          tokenNo: 'T002',
          paid: true,
          status: 'upcoming',
          doctor: 'Dr. Sarah Wilson',
          doctorName: 'Dr. Sarah Wilson',
          specialty: 'Dermatologist',
          doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
          problem: 'Skin consultation',
          relation: 'Self',
          patientId: 'pat-2',
        },
        {
          id: '3',
          name: 'Anjali Joshi',
          gender: 'Female',
          age: '26',
          mobile: '9876541230',
          date: 'Aug 10, 2025',
          slot: '4:00 PM',
          tokenNo: 'T003',
          paid: true,
          status: 'completed',
          doctor: 'Dr. Michael Chen',
          doctorName: 'Dr. Michael Chen',
          specialty: 'Pediatrician',
          doctorImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
          problem: 'Regular checkup',
          relation: 'Daughter',
          patientId: 'pat-3',
        },
        {
          id: '4',
          name: 'Raj Patel',
          gender: 'Male',
          age: '42',
          mobile: '9998887776',
          date: 'Aug 5, 2025',
          slot: '11:00 AM',
          tokenNo: 'T004',
          paid: false,
          status: 'canceled',
          doctor: 'Dr. Lisa Anderson',
          doctorName: 'Dr. Lisa Anderson',
          specialty: 'Orthopedist',
          doctorImage: 'https://images.unsplash.com/photo-1594824475317-d0c8d0e5b8a4?w=150&h=150&fit=crop&crop=face',
          problem: 'Back pain treatment',
          relation: 'Self',
          patientId: 'pat-4',
        },
      ];

      setAppointments(demoAppointments);
    };

    loadAppointments();
  }, []);

  const filteredAppointments = appointments.filter(apt => apt.status === tab);

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id ? { ...apt, status: 'canceled' as const } : apt
      )
    );
    setShowCancelModal(null);
    toast.success('Appointment canceled successfully! 💫');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'from-blue-500 to-cyan-500';
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'canceled':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <FaClock className="text-white" />;
      case 'completed':
        return <FaCheckCircle className="text-white" />;
      case 'canceled':
        return <FaTimes className="text-white" />;
      default:
        return <FaClock className="text-white" />;
    }
  };

  const tabColors = {
    upcoming: 'from-blue-600 via-cyan-500 to-teal-500',
    completed: 'from-green-600 via-emerald-500 to-yellow-500',
    canceled: 'from-red-600 via-pink-500 to-purple-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-800/15 to-pink-900/20">
        {/* Floating particles */}
        <FloatingParticle delay={0} />
        <FloatingParticle delay={1} size="w-3 h-3" color="from-cyan-400 to-blue-500" />
        <FloatingParticle delay={2} size="w-1 h-1" color="from-yellow-400 to-orange-500" />
        <FloatingParticle delay={3} size="w-2 h-2" color="from-green-400 to-teal-500" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Spectacular Header */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => router.back()}
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.1, rotate: -180 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft className="text-white" />
              </motion.button>
              
              <div>
                <motion.h1 
                  className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  My Appointments 📅
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/80 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Manage your healthcare schedule
                </motion.p>
              </div>
            </div>
            
            <motion.button
              onClick={() => router.push('/doctors')}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FaPlus className="text-lg" />
              <span>Book New</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Epic Tab Navigation */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-2 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex">
            {TABS.map((tabName) => (
              <motion.button
                key={tabName}
                onClick={() => setTab(tabName)}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg capitalize transition-all duration-300 relative overflow-hidden ${
                  tab === tabName
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab === tabName && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${tabColors[tabName]} rounded-xl`}
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tabName === 'upcoming' && <FaClock />}
                  {tabName === 'completed' && <FaCheckCircle />}
                  {tabName === 'canceled' && <FaTimes />}
                  {tabName}
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {appointments.filter(apt => apt.status === tabName).length}
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Spectacular Appointments List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredAppointments.length === 0 ? (
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl border border-white/10 p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaCalendarAlt className="text-white text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">No {tab} appointments</h3>
                <p className="text-white/60 font-medium">Your {tab} appointments will appear here</p>
              </motion.div>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  className="group bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-purple-500/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 50, rotateZ: -2 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={appointment.doctorImage}
                            alt={appointment.doctorName}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white/20 shadow-lg"
                          />
                          <motion.div 
                            className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${getStatusColor(appointment.status)} rounded-full flex items-center justify-center text-xs shadow-lg`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {getStatusIcon(appointment.status)}
                          </motion.div>
                        </motion.div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{appointment.doctorName}</h3>
                          <p className="text-purple-400 font-medium mb-1 flex items-center gap-1">
                            <FaStethoscope className="text-sm" />
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock />
                              {appointment.slot}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaUser />
                              Token: {appointment.tokenNo}
                            </span>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className={`px-4 py-2 bg-gradient-to-r ${getStatusColor(appointment.status)} rounded-full text-white text-sm font-bold capitalize shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {appointment.status}
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <p className="text-white/60 text-sm font-medium mb-1">Patient</p>
                        <p className="text-white font-bold">{appointment.name}</p>
                        <p className="text-white/80 text-sm">{appointment.gender}, {appointment.age} years</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <p className="text-white/60 text-sm font-medium mb-1">Problem</p>
                        <p className="text-white font-bold">{appointment.problem}</p>
                        <p className="text-white/80 text-sm">Relation: {appointment.relation}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                            appointment.paid 
                              ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-400/30'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaMoneyBillWave className="text-xs" />
                          {appointment.paid ? 'Paid' : 'Unpaid'}
                        </motion.span>
                        
                        {appointment.status === 'completed' && (
                          <motion.button
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toast.success('Prescription downloaded! 📋')}
                          >
                            <FaFileMedical />
                            Prescription
                          </motion.button>
                        )}
                      </div>

                      {appointment.status === 'upcoming' && (
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="p-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowRescheduleModal(appointment.id!)}
                          >
                            <FaEdit />
                          </motion.button>
                          
                          <motion.button
                            className="p-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.1, rotate: -15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowCancelModal(appointment.id!)}
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute top-4 right-4 text-yellow-400 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaStar className="text-lg" />
                  </motion.div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cancel Modal */}
        <AnimatePresence>
          {showCancelModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaTimes className="text-white text-2xl" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Cancel Appointment?</h3>
                  <p className="text-white/70 mb-8">
                    Are you sure you want to cancel this appointment? This action cannot be undone.
                  </p>
                  
                  <div className="flex gap-4">
                    <motion.button
                      className="flex-1 py-3 px-6 bg-white/10 text-white rounded-2xl font-bold border border-white/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCancelModal(null)}
                    >
                      Keep Appointment
                    </motion.button>
                    <motion.button
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCancelAppointment(showCancelModal)}
                    >
                      Yes, Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
