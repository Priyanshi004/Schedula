'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';

import { Appointment } from '@/types';
import { getAppointments, deleteAppointment, updateAppointment } from '@/lib/api';

// Dynamically import the DraggableAppointmentCard to prevent SSR issues
const DraggableAppointmentCard = dynamic(
  () => import('@/components/DraggableAppointmentCard'),
  { ssr: false }
);

const CalendarGrid = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'waiting' | 'rescheduled'>('all');
  const [isMounted, setIsMounted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const loadAppointments = async () => {
    setIsLoading(true);
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
    setIsMounted(true);
    loadAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      await loadAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleEdit = async (updatedAppointment: Appointment) => {
    try {
      await updateAppointment(updatedAppointment);
      await loadAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setAppointments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    filter === 'all' || appointment.status === filter
  );

  const getStatusCount = (status: string) => 
    appointments.filter(apt => apt.status === status).length;

  if (isLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl">
        {[
          { key: 'all', label: 'All', count: appointments.length },
          { key: 'confirmed', label: 'Confirmed', count: getStatusCount('confirmed') },
          { key: 'waiting', label: 'Waiting', count: getStatusCount('waiting') },
          { key: 'rescheduled', label: 'Rescheduled', count: getStatusCount('rescheduled') },
        ].map(({ key, label, count }) => (
          <motion.button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white hover:bg-opacity-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label} ({count})
          </motion.button>
        ))}
      </div>

      {/* Appointments Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredAppointments.map(apt => apt.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {filteredAppointments.length === 0 ? (
              <motion.div
                className="text-center py-12 text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No appointments found</h3>
                <p>No appointments match the current filter.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                layout
              >
                {filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <DraggableAppointmentCard
                      appointment={appointment}
                      onEdit={() =>
                        handleEdit({ ...appointment, status: 'rescheduled' })
                      }
                      onDelete={() => handleDelete(appointment.id)}
                      onUpdate={loadAppointments}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      {/* Statistics */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { label: 'Total', count: appointments.length, color: 'bg-blue-500' },
          { label: 'Confirmed', count: getStatusCount('confirmed'), color: 'bg-green-500' },
          { label: 'Waiting', count: getStatusCount('waiting'), color: 'bg-yellow-500' },
          { label: 'Rescheduled', count: getStatusCount('rescheduled'), color: 'bg-purple-500' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 shadow-md">
            <div className={`w-3 h-3 ${color} rounded-full mb-2`}></div>
            <div className="text-2xl font-bold text-gray-800">{count}</div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CalendarGrid;
