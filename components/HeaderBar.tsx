import React from 'react';

export default function HeaderBar() {
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">Calendar</h1>
        <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Add Patient</button>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 text-sm border rounded">Today</button>
        <button className="px-3 py-1 text-sm border rounded bg-gray-100">Week</button>
      </div>
    </div>
  );
}
