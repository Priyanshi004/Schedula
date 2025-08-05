'use client';
import React from 'react';
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
      return 'bg-green-100 text-green-800';
    case 'waiting':
      return 'bg-yellow-100 text-yellow-800';
    case 'rescheduled':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AppointmentCard: React.FC<Props> = ({ appointment, onEdit, onDelete, onUpdate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{appointment.name}</h2>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>
      <p><strong>Age:</strong> {appointment.age}</p>
      <p><strong>Mobile:</strong> {appointment.mobile}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Reschedule
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
