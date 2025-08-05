// components/TodaysSchedule.tsx
'use client';

import React from 'react';

type Appointment = {
  name: string;
  gender: string;
  age: string;
  mobile: string;
  date: string;
  time: string;
  tokenNo: string;
  paid: boolean;
  status: string;
};

type Props = {
  appointments: Appointment[];
};

export default function TodaysSchedule({ appointments }: Props) {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-3">Today's Appointments</h3>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((apt, index) => (
            <li
              key={index}
              className="border p-2 rounded shadow-sm bg-gray-50"
            >
              <div><strong>Name:</strong> {apt.name}</div>
              <div><strong>Time:</strong> {apt.time}</div>
              <div><strong>Token:</strong> {apt.tokenNo}</div>
              <div><strong>Mobile:</strong> {apt.mobile}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
