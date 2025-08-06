'use client';

import { Prescription } from '@/types/prescription';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface PrescriptionCardProps {
  prescription: Prescription;
  onEdit: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
}

export function PrescriptionCard({ prescription, onEdit, onDelete }: PrescriptionCardProps) {
  const handleEdit = () => {
    onEdit(prescription);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this prescription?')) {
      onDelete(prescription.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {prescription.medicineName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{prescription.medicineName}</h3>
              <p className="text-sm text-gray-500">for {prescription.patientName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Dosage</p>
              <p className="font-semibold text-gray-800">{prescription.dosage}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
              <p className="font-semibold text-gray-800">{prescription.duration}</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
              <p className="font-semibold text-gray-800 capitalize">{prescription.status || 'active'}</p>
            </div>
            
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Created</p>
              <p className="font-semibold text-gray-800">
                {new Date(prescription.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          {prescription.notes && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Notes</p>
              <p className="text-gray-700 bg-gray-50 rounded-xl p-3">{prescription.notes}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            title="Edit prescription"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
            title="Delete prescription"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}