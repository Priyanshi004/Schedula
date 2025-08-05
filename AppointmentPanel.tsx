import React from 'react';

export default function AppointmentPanel() {
  return (
    <div className="w-[300px] bg-white border-l shadow-md p-4 flex flex-col">
      <h2 className="text-lg font-medium mb-2">Today's Schedule</h2>
      <button className="bg-orange-500 text-white py-1 rounded text-sm mb-4">Add Walk-In Appointment</button>

      <div className="flex justify-between text-xs font-semibold mb-2">
        <span>Today</span>
        <span>Waiting</span>
        <span>Engaged</span>
        <span>Done</span>
      </div>

      <div className="flex justify-between text-xs mb-2">
        <span className="text-gray-700">0</span>
        <span className="text-orange-500">0</span>
        <span className="text-blue-500">0</span>
        <span className="text-green-600">0</span>
      </div>

      <div className="text-sm text-gray-500 text-center mt-10">No appointments</div>
    </div>
  );
}
