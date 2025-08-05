'use client'
import React, { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { getAppointments, deleteAppointment, updateAppointment } from '@/lib/api'
import { Appointment } from '@/types'

// Dynamically import the calendar to prevent SSR hydration issues
const DragDropCalendarView = dynamic(
  () => import('@/components/DragDropCalendarView'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
)

export default function Page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate appointment statistics
  const appointmentStats = useMemo(() => {
    const stats = {
      confirmed: 0,
      waiting: 0,
      rescheduled: 0,
      cancelled: 0,
      total: appointments.length
    };
    
    appointments.forEach(appointment => {
      if (stats.hasOwnProperty(appointment.status)) {
        stats[appointment.status as keyof typeof stats]++;
      }
    });
    
    return stats;
  }, [appointments]);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleEdit = async (appointment: Appointment) => {
    try {
      await updateAppointment({ ...appointment, status: 'rescheduled' });
      await loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDelete = async (appointment: Appointment) => {
    try {
      await deleteAppointment(appointment.id);
      await loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleAppointmentMove = async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      // Update the appointment with new date and time
      const appointmentToUpdate = appointments.find(apt => apt.id === appointmentId);
      if (appointmentToUpdate) {
        const updatedAppointment = {
          ...appointmentToUpdate,
          date: newDate,
          time: newTime
        };
        
        await updateAppointment(updatedAppointment);
        
        // Update local state
        setAppointments(prev => 
          prev.map(apt => apt.id === appointmentId ? updatedAppointment : apt)
        );
      }
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const handleAppointmentCancel = async (appointmentId: string) => {
    try {
      // Update the appointment status to cancelled
      const appointmentToUpdate = appointments.find(apt => apt.id === appointmentId);
      if (appointmentToUpdate) {
        const updatedAppointment = {
          ...appointmentToUpdate,
          status: 'cancelled' as const
        };
        
        await updateAppointment(updatedAppointment);
        
        // Update local state to reflect the cancellation
        setAppointments(prev => 
          prev.map(apt => apt.id === appointmentId ? updatedAppointment : apt)
        );
      }
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Appointment Calendar
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your appointments with intuitive drag-and-drop functionality. 
            <span className="text-blue-600 font-semibold">Drag appointments</span> to reschedule them effortlessly.
          </p>
        </div>

        {/* Appointment Statistics */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Total Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                    {appointmentStats.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Confirmed Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {appointmentStats.confirmed}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Waiting Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waiting</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-cyan-600 bg-clip-text text-transparent">
                    {appointmentStats.waiting}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Rescheduled Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rescheduled</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                    {appointmentStats.rescheduled}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cancelled Appointments */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    {appointmentStats.cancelled}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <DragDropCalendarView
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={loadAppointments}
          onAppointmentMove={handleAppointmentMove}
          onAppointmentCancel={handleAppointmentCancel}
        />
      </div>
    </main>
  )
}