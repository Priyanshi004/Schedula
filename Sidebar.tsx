import React from 'react';
import { FaUserMd, FaCalendarAlt, FaCog, FaChartBar } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="w-20 bg-indigo-900 text-white flex flex-col items-center py-6 space-y-6">
      <FaUserMd size={24} />
      <FaCalendarAlt size={24} />
      <FaChartBar size={24} />
      <FaCog size={24} />
    </div>
  );
}
