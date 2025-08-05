'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: string;
  selectedTime: string;
};

const AddAppointmentModal = ({ isOpen, onClose, selectedDay, selectedTime }: Props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async () => {
    const newAppointment = {
      id: uuidv4(),
      doctorId: 'doc1',
      patientName: name,
      patientAge: Number(age),
      patientMobile: mobile,
      date: selectedDay,
      time: selectedTime,
    };

    await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(newAppointment),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>
        <div className="mb-2">
          <input
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
