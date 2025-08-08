'use client';
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment } from '@/types';
import { FaFileMedical } from 'react-icons/fa';
interface CalendarAppointment extends Appointment {
  time: string; // hour in 24h format
  dayIndex: number; // 0-6 for Sun-Sat
}

interface DraggableAppointmentProps {
  appointment: CalendarAppointment;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onViewPrescription: () => void;
}

const DraggableAppointment: React.FC<DraggableAppointmentProps> = ({
  appointment,
  onEdit,
  onDelete,
  onCancel,
  onViewPrescription,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: appointment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-gradient-to-r from-green-600 to-green-700 border-green-500 shadow-green-300';
      case 'waiting':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400 shadow-yellow-200';
      case 'rescheduled':
        return 'bg-gradient-to-r from-red-500 to-red-600 border-red-400 shadow-red-200';
      case 'canceled':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 border-gray-400 shadow-gray-200 opacity-75';
      default:
        return 'bg-gradient-to-r from-slate-600 to-gray-700 border-slate-500 shadow-slate-300';
    }
  };

  if (!isMounted) {
    return (
      <div className={`absolute left-1 right-1 ${getStatusColor(appointment.status)} text-white text-xs p-2 rounded-lg border-l-4 cursor-pointer shadow-lg`}>
        <div className="font-semibold truncate">{appointment.name}</div>
        <div className="truncate opacity-90">{appointment.time}</div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group absolute left-1 right-1 ${getStatusColor(appointment.status)} text-white text-xs p-2 rounded-lg border-l-4 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-60 z-50 scale-105 rotate-2' : 'z-10'
      } transition-all duration-300 hover:shadow-xl hover:scale-102 hover:-translate-y-1`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="font-semibold truncate flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></span>
          {appointment.name}
        </div>
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewPrescription();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded text-xs"
              title="View Prescriptions"
            >
              <FaFileMedical />
            </button>
            {appointment.status !== 'canceled' && appointment.status !== 'rescheduled' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-white/20 rounded text-xs"
                title="Cancel appointment"
              >
                ✕
              </button>
            )}
          </div>
      </div>
      <div className="truncate opacity-90 text-xs mt-1">{appointment.time}</div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute z-50 bottom-full left-0 mb-2 bg-gray-900 text-white p-2 rounded shadow-xl min-w-48"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm space-y-1">
              <div className="font-semibold text-blue-300">{appointment.name}</div>
              <div className="text-gray-300">
                <div>🕐 {appointment.time}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${
                    appointment.status === 'confirmed' ? 'bg-green-400' :
                    appointment.status === 'waiting' ? 'bg-yellow-400' :
                    appointment.status === 'rescheduled' ? 'bg-red-400' :
                    appointment.status === 'canceled' ? 'bg-gray-400' : 'bg-gray-400'
                  }`}></span>
                  <span className="capitalize">{appointment.status}</span>
                </div>
              </div>
            </div>
            <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface TimeSlotProps {
  hour: number;
  dayIndex: number;
  appointments: CalendarAppointment[];
  onEdit: (appointment: CalendarAppointment) => void;
  onDelete: (appointment: CalendarAppointment) => void;
  onCancel: (appointment: CalendarAppointment) => void;
  onViewPrescription: (appointment: CalendarAppointment) => void;
  onDrop?: (appointmentId: string, newHour: number, newDayIndex: number) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ hour, dayIndex, appointments, onEdit, onDelete, onCancel, onViewPrescription, onDrop }) => {
  const slotAppointments = appointments.filter(
    (apt) => apt.dayIndex === dayIndex && parseInt(apt.time) === hour
  );

  const isCurrentHour = new Date().getHours() === hour;
  const isWeekend = dayIndex === 0 || dayIndex === 6;
  
  const dropId = `slot-${dayIndex}-${hour}`;
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    data: {
      dayIndex,
      hour,
      type: 'timeSlot'
    }
  });

  return (
    <div 
      ref={setNodeRef}
      className={`relative h-16 border-b transition-all duration-200 ${
        isOver 
          ? 'bg-gradient-to-r from-blue-100 to-sky-100 border-blue-300 shadow-inner' 
          : isCurrentHour 
          ? 'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200' 
          : isWeekend 
          ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:from-gray-100 hover:to-slate-100' 
          : 'border-gray-200 hover:bg-gradient-to-r hover:from-blue-25 hover:to-sky-25'
      }`}>
      {/* Drop zone indicator */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50/50 flex items-center justify-center">
          <span className="text-blue-600 text-xs font-medium bg-white px-2 py-1 rounded-full shadow-sm">
            Drop here
          </span>
        </div>
      )}
      
      {slotAppointments.map((appointment, index) => (
        <DraggableAppointment
          key={appointment.id}
          appointment={appointment}
          onEdit={() => onEdit(appointment)}
          onDelete={() => onDelete(appointment)}
          onCancel={() => onCancel(appointment)}
          onViewPrescription={() => onViewPrescription(appointment)}
        />
      ))}
    </div>
  );
};

interface DragDropCalendarViewProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
  onUpdate: () => void;
  onAppointmentMove?: (appointmentId: string, newDate: string, newTime: string) => void;
  onAppointmentCancel?: (appointmentId: string) => void;
  onViewPrescription?: (appointment: Appointment) => void;
}

const DragDropCalendarView: React.FC<DragDropCalendarViewProps> = ({
  appointments,
  onEdit,
  onDelete,
  onUpdate,
  onAppointmentMove,
  onAppointmentCancel,
  onViewPrescription,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<CalendarAppointment | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState<{ show: boolean; appointment: CalendarAppointment | null }>({ show: false, appointment: null });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [calendarAppointments, setCalendarAppointments] = useState<CalendarAppointment[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Convert appointments to calendar format
  useEffect(() => {
    setIsMounted(true);
    const convertedAppointments: CalendarAppointment[] = appointments.map((apt) => {
      const timeSource = apt.startTime || apt.time;
      const timeMatch = timeSource ? timeSource.match(/(\d{1,2}):(\d{2})/) : null;
      let time = 9; // default to 9 AM
      
      if (timeMatch) {
        let hour = parseInt(timeMatch[1]);
        const minute = parseInt(timeMatch[2]);
        
        time = hour;
      }

      // Parse date to get day of week (deterministic, no random)
      let dayIndex = 1; // Default to Monday
      try {
        const date = new Date(apt.startTime || apt.date || '');
        if (!isNaN(date.getTime())) {
          dayIndex = date.getDay();
        }
      } catch (error) {
        // Use a deterministic fallback based on appointment ID
        dayIndex = parseInt(apt.id.slice(-1)) % 7;
      }

      return {
        ...apt,
        time: `${time}:00`,
        dayIndex,
      };
    });
    setCalendarAppointments(convertedAppointments);
  }, [appointments]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const handleDragStart = (event: DragStartEvent) => {
    const appointment = calendarAppointments.find(apt => apt.id === event.active.id);
    setActiveAppointment(appointment || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveAppointment(null);

    if (!over) return;

    const draggedAppointment = calendarAppointments.find(apt => apt.id === active.id);
    if (!draggedAppointment) return;

    if (over.id.toString().startsWith('slot-')) {
        const [, dayIndexStr, hourStr] = over.id.toString().split('-');
        const newDayIndex = parseInt(dayIndexStr, 10);
        const newHour = parseInt(hourStr, 10);

        const targetSlotOccupied = calendarAppointments.some(
            (apt) => apt.dayIndex === newDayIndex && parseInt(apt.time) === newHour && apt.id !== active.id
        );

        if (targetSlotOccupied) {
            return;
        }

        if (newHour !== parseInt(draggedAppointment.time) || newDayIndex !== draggedAppointment.dayIndex) {
            const currentDate = new Date();
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), newDayIndex + 1).toISOString().split('T')[0];
            const newTime = `${newHour === 0 ? '12:00 AM' :
                              newHour < 12 ? `${newHour}:00 AM` :
                              newHour === 12 ? '12:00 PM' :
                              `${newHour - 12}:00 PM`}`;

            const updatedAppointments = calendarAppointments.map(apt => {
                if (apt.id === active.id) {
                    return {
                        ...apt,
                        time: newTime,
                        dayIndex: newDayIndex,
                    };
                }
                return apt;
            });

            setCalendarAppointments(updatedAppointments);

            if (onAppointmentMove) {
                onAppointmentMove(active.id as string, newDate, newTime);
            }
        }
    }
  };

  const handleCancelAppointment = (appointment: CalendarAppointment) => {
    setCancelConfirm({ show: true, appointment });
  };

  const confirmCancelAppointment = () => {
    if (cancelConfirm.appointment) {
      // Update appointment status to cancelled locally for immediate UI feedback
      const updatedAppointments = calendarAppointments.map(apt => {
        if (apt.id === cancelConfirm.appointment!.id) {
          return { ...apt, status: 'canceled' as const };
        }
        return apt;
      });
      
      setCalendarAppointments(updatedAppointments);
      setCancelConfirm({ show: false, appointment: null });
      setShowSuccessPopup(true);
      
      // Hide success popup after 3 seconds
      setTimeout(() => setShowSuccessPopup(false), 3000);
      
      // Call parent's cancel handler to update main state and statistics
      if (onAppointmentCancel) {
        onAppointmentCancel(cancelConfirm.appointment.id);
      } else {
        // Fallback to onUpdate if onAppointmentCancel is not provided
        onUpdate();
      }
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="grid grid-cols-8 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white">
          <div className="p-4 text-sm font-bold border-r border-white/20 flex items-center justify-center">
            <span className="bg-white/20 px-3 py-1 rounded-full">Time</span>
          </div>
          {days.map((day, index) => {
            const isWeekend = index === 0 || index === 6;
            const today = new Date().getDay();
            const isToday = index === today;
            return (
              <div key={day} className={`p-4 text-sm font-bold text-center border-r border-white/20 last:border-r-0 transition-all duration-200 ${
                isToday ? 'bg-white/30 shadow-inner' : isWeekend ? 'bg-black/10' : 'hover:bg-white/10'
              }`}>
                <div className={`${isToday ? 'bg-white text-blue-600 px-2 py-1 rounded-full text-xs' : ''}`}>
                  {day.substring(0, 3)}
                  {isToday && <div className="text-xs opacity-75">Today</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <SortableContext items={calendarAppointments.map(apt => apt.id)}>
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
            {hours.map((hour) => {
              const isCurrentHour = new Date().getHours() === hour;
              return (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-indigo-25 hover:to-purple-25 transition-all duration-200">
                  {/* Time Column */}
                  <div className={`p-3 text-sm font-medium border-r border-gray-200 flex items-center justify-center transition-all duration-200 ${
                    isCurrentHour 
                      ? 'bg-gradient-to-r from-blue-100 to-sky-100 text-blue-700 font-bold' 
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 hover:from-blue-50 hover:to-sky-50'
                  }`}>
                    <div className={`px-2 py-1 rounded-lg text-xs ${
                      isCurrentHour ? 'bg-blue-200 text-blue-800' : 'bg-white/50'
                    }`}>
                      {hour === 0 ? '12:00 AM' : 
                       hour < 12 ? `${hour}:00 AM` : 
                       hour === 12 ? '12:00 PM' : 
                       `${hour - 12}:00 PM`}
                    </div>
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((_, dayIndex) => (
                    <div key={dayIndex} className="border-r border-gray-100 last:border-r-0">
                      <TimeSlot
                        hour={hour}
                        dayIndex={dayIndex}
                        appointments={calendarAppointments}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onCancel={handleCancelAppointment}
                        onViewPrescription={onViewPrescription as any}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeAppointment ? (
            <div className={`${getStatusColor(activeAppointment.status)} text-white text-xs p-2 rounded border-l-4 shadow-lg`}>
              <div className="font-semibold">{activeAppointment.name}</div>
              <div>{activeAppointment.time}</div>
            </div>
          ) : null}
        </DragOverlay>
      </div>

      {/* Cancel Confirmation Popup */}
      <AnimatePresence>
        {cancelConfirm.show && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancel Appointment</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel the appointment with{' '}
                  <span className="font-semibold text-blue-600">{cancelConfirm.appointment?.name}</span>?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setCancelConfirm({ show: false, appointment: null })}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Keep Appointment
                  </button>
                  <button
                    onClick={confirmCancelAppointment}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
          >
            <div className="bg-white rounded-xl shadow-2xl border border-green-200 p-4 flex items-center gap-3 max-w-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Appointment Cancelled</h4>
                <p className="text-sm text-gray-600">The appointment has been successfully cancelled.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DndContext>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-500 border-green-600';
    case 'waiting':
      return 'bg-yellow-500 border-yellow-600';
    case 'rescheduled':
      return 'bg-blue-500 border-blue-600';
    default:
      return 'bg-gray-500 border-gray-600';
  }
};

export default DragDropCalendarView;
