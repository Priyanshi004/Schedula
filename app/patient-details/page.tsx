'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaClock, 
  FaArrowLeft, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaPhone,
  FaStethoscope,
  FaUserFriends,
  FaCreditCard,
  FaUserMd
} from 'react-icons/fa';

const PatientDetailsPage = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    problem: '',
    relation: '',
    mobile: '',
  });

  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [modalType, setModalType] = useState<'error' | 'confirm' | null>(null);
  const router = useRouter();

  useEffect(() => {
    const appointmentData = localStorage.getItem('selectedAppointment');
    if (appointmentData) {
      setSelectedAppointment(JSON.parse(appointmentData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenderSelect = (gender: string) => {
    setForm({ ...form, gender });
  };

  const validate = () => {
    const newErrors: string[] = [];
    if (!form.name.trim()) newErrors.push('Patient name is required');
    if (!form.age.trim()) newErrors.push('Age is required');
    if (!form.mobile.trim()) newErrors.push('Mobile number is required');
    if (form.mobile.trim() && !/^\d{10}$/.test(form.mobile.trim())) {
      newErrors.push('Mobile number must be 10 digits');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setModalType('error');
      return;
    }
    setModalType('confirm');
  };

  const confirmBooking = () => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      name: form.name,
      age: form.age,
      gender: form.gender,
      problem: form.problem,
      relation: form.relation,
      mobile: form.mobile,
      doctor: selectedAppointment?.doctorName || 'Unknown Doctor',
      specialty: selectedAppointment?.specialty || 'General',
      date: selectedAppointment?.date || 'TBD',
      slot: selectedAppointment?.slot || 'TBD',
      status: 'Confirmed',
    };
    localStorage.setItem('appointments', JSON.stringify([...appointments, newAppointment]));
    
    toast.success('Appointment booked successfully!');
    router.push('/appointments');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-sky-600/5 to-indigo-600/5"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back to Booking</span>
        </motion.button>

        {/* Appointment Summary Card */}
        {selectedAppointment && (
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-24 bg-gradient-to-r from-blue-600 to-sky-600 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-sky-600/90"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FaUserMd className="text-white text-xl" />
                </div>
                <div className="text-white">
                  <h2 className="text-xl font-bold">Appointment Summary</h2>
                  <p className="text-blue-100 text-sm">Complete your booking details</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl flex items-center justify-center">
                    <FaUserMd className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{selectedAppointment.doctorName}</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{selectedAppointment.date}</p>
                    <p className="text-sm text-gray-600">Appointment Date</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl flex items-center justify-center">
                    <FaClock className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">{selectedAppointment.slot}</p>
                    <p className="text-sm text-gray-600">Time Slot</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Patient Details Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Patient Details</h2>
              <p className="text-gray-600">Please provide patient information</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Patient Name *"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Age and Gender Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="age"
                  placeholder="Age *"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Gender</p>
                <div className="flex gap-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <motion.button
                      key={g}
                      onClick={() => handleGenderSelect(g)}
                      className={`flex-1 py-3 px-4 rounded-2xl border-2 font-medium transition-all duration-300 ${
                        form.gender === g
                          ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white border-blue-600 shadow-lg'
                          : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md bg-white/80 backdrop-blur-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {g}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="relative">
              <FaStethoscope className="absolute left-4 top-4 text-gray-400" />
              <textarea
                name="problem"
                placeholder="Describe your symptoms or health concerns"
                rows={4}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                value={form.problem}
                onChange={handleChange}
              />
            </div>

            {/* Relation */}
            <div className="relative">
              <FaUserFriends className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="relation"
                placeholder="Relationship (Self/Mother/Father/Brother/Sister/etc.)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={form.relation}
                onChange={handleChange}
              />
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number * (10 digits)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <motion.button
              className="flex items-center justify-center gap-3 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCreditCard className="text-lg" />
              Make Payment
            </motion.button>
            
            <motion.button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCheckCircle className="text-lg" />
              Confirm Booking
            </motion.button>
          </div>
        </motion.div>

        {/* Modal for error or confirmation */}
        {modalType && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {modalType === 'error' ? (
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaExclamationTriangle className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Booking Failed</h3>
                  <div className="bg-red-50 rounded-2xl p-4 mb-6">
                    <ul className="space-y-2">
                      {errors.map((err, index) => (
                        <li key={index} className="flex items-center gap-2 text-red-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-semibold hover:from-red-700 hover:to-rose-700 transition-all duration-300"
                    onClick={() => setModalType(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Confirm Booking</h3>
                  <div className="bg-green-50 rounded-2xl p-4 mb-6">
                    <p className="text-center text-gray-700">
                      Are you sure you want to book this appointment for <strong className="text-green-600">{form.name}</strong>?
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-300"
                      onClick={() => setModalType(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                      onClick={confirmBooking}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
