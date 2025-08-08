'use client';

import { useState, useEffect } from 'react';
import { Prescription } from '@/types/prescription';
import { PrescriptionCard } from './PrescriptionCard';
import { FaUser, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

interface PrescriptionListProps {
  prescriptions: Prescription[];
  onEdit: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
  onView: (prescription: Prescription) => void;
  grouping: 'patient' | 'appointment';
}

export function PrescriptionList({
  prescriptions,
  onEdit,
  onDelete,
  onView,
  grouping
}: PrescriptionListProps) {
  const [groupedPrescriptions, setGroupedPrescriptions] = useState<Record<string, Prescription[]>>({});

  // Group prescriptions based on grouping method
  useEffect(() => {
    const grouped: Record<string, Prescription[]> = {};
    
    prescriptions.forEach(prescription => {
      const key = grouping === 'patient' ? prescription.patientName : prescription.appointmentId;
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      
      grouped[key].push(prescription);
    });
    
    setGroupedPrescriptions(grouped);
  }, [prescriptions, grouping]);

  return (
    <div className="space-y-8">
      {Object.entries(groupedPrescriptions).map(([groupKey, groupPrescriptions]) => (
        <div key={groupKey} className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            {grouping === 'patient' ? (
              <FaUser className="text-blue-600" />
            ) : (
              <FaCalendarAlt className="text-green-600" />
            )}
            <h3 className="text-lg font-bold text-gray-800">
              {grouping === 'patient' ? groupKey : `Appointment: ${groupKey}`}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {groupPrescriptions.length} prescriptions
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {groupPrescriptions.map(prescription => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </div>
        </div>
      ))}
      
      {prescriptions.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FaClipboardList className="text-gray-400 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 font-medium">No prescriptions found</p>
              <p className="text-gray-400 text-sm mt-1">
                Create your first prescription to get started
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}