'use client';
import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { Appointment } from '@/types';

type Props = {
  appointment: Appointment;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
  onUpdate: () => Promise<void>;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return {
        bg: 'bg-gradient-to-r from-green-400 to-green-500',
        text: 'text-white',
        border: 'border-green-300',
        shadow: 'shadow-green-200'
      };
    case 'waiting':
      return {
        bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
        text: 'text-white',
        border: 'border-yellow-300',
        shadow: 'shadow-yellow-200'
      };
    case 'rescheduled':
      return {
        bg: 'bg-gradient-to-r from-blue-400 to-purple-500',
        text: 'text-white',
        border: 'border-blue-300',
        shadow: 'shadow-blue-200'
      };
    default:
      return {
        bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
        text: 'text-white',
        border: 'border-gray-300',
        shadow: 'shadow-gray-200'
      };
  }
};

const DraggableAppointmentCard: React.FC<Props> = ({ 
  appointment, 
  onEdit, 
  onDelete, 
  onUpdate 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const statusColors = getStatusColor(appointment.status);

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

  // Render simple card on server-side to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className={`${statusColors.bg} ${statusColors.border} border-2 rounded-xl p-4 shadow-lg ${statusColors.shadow}`}>
        <div className={`${statusColors.text} space-y-2`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold truncate">{appointment.name}</h3>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
              {appointment.status.toUpperCase()}
            </div>
          </div>
          <div className="text-sm opacity-90">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {appointment.date} at {appointment.time}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Age: {appointment.age} • {appointment.mobile}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Reschedule
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div
        className={`relative cursor-grab active:cursor-grabbing ${statusColors.bg} ${statusColors.border} border-2 rounded-xl p-4 shadow-lg ${statusColors.shadow} transition-all duration-300 hover:scale-105 hover:shadow-xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isDragging ? 0.5 : 1, 
          y: 0,
          scale: isDragging ? 1.05 : 1,
          rotate: isDragging ? 5 : 0
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        layout
      >
        {/* Appointment Content */}
        <div className={`${statusColors.text} space-y-2`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold truncate">{appointment.name}</h3>
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              {appointment.status.toUpperCase()}
            </motion.div>
          </div>
          
          <div className="text-sm opacity-90">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {appointment.date} at {appointment.time}
            </p>
            <p className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Age: {appointment.age} • {appointment.mobile}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reschedule
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          </div>
        </div>

        {/* Drag Handle Indicator */}
        <div className="absolute top-2 right-2 opacity-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3h2v2H9V3zm4 0h2v2h-2V3zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"/>
          </svg>
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white p-3 rounded-lg shadow-xl min-w-64"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm space-y-1">
                <div className="font-semibold text-blue-300">{appointment.name}</div>
                <div className="text-gray-300">
                  <div>📅 {appointment.date}</div>
                  <div>🕐 {appointment.time}</div>
                  <div>👤 Age: {appointment.age}</div>
                  <div>📱 {appointment.mobile}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-2 h-2 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-400' :
                      appointment.status === 'waiting' ? 'bg-yellow-400' :
                      appointment.status === 'rescheduled' ? 'bg-blue-400' : 'bg-gray-400'
                    }`}></span>
                    <span className="capitalize">{appointment.status}</span>
                  </div>
                </div>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DraggableAppointmentCard;
