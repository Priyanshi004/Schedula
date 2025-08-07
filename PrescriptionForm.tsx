'use client';

import { useState } from 'react';
import { Prescription } from '@/types/prescription';

interface PrescriptionFormProps {
  prescription?: Partial<Prescription>;
  onSave: (prescription: Partial<Prescription>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PrescriptionForm({
  prescription,
  onSave,
  onCancel,
  isLoading = false,
}: PrescriptionFormProps) {
  const [formData, setFormData] = useState<Partial<Prescription>>({
    patientId: prescription?.patientId || '',
    patientName: prescription?.patientName || '',
    medicineName: prescription?.medicineName || '',
    dosage: prescription?.dosage || '',
    duration: prescription?.duration || '',
    notes: prescription?.notes || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dr. Emily Carter
            </h2>
            <p className="text-sm text-gray-500">
              Cardiology Specialist, MD
            </p>
            <p className="text-sm text-gray-500">
              HealthCare Clinic, 123 Wellness Ave.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-medium">
              Date: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Prescription ID: {prescription?.id || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-6 mb-8 border-b pb-6 border-gray-200">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-300 py-2"
              placeholder="e.g., John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Patient ID *
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-300 py-2"
              placeholder="e.g., P00123"
            />
          </div>
        </div>

        {/* Prescription Details */}
        <div className="flex gap-8">
          <div className="text-6xl font-serif text-gray-400">Rx</div>
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Medication *
                </label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-300 py-2"
                  placeholder="e.g., Lisinopril"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Dosage *
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-300 py-2"
                  placeholder="e.g., 10mg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Instructions / SIG *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-300 py-2"
                placeholder="e.g., Take one tablet daily"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., Follow up in 2 weeks"
          />
        </div>

        {/* Footer & Signature */}
        <div className="mt-10 pt-6 border-t border-dashed flex justify-between items-center">
          <div className="w-1/2">
            <p className="text-xs text-gray-500">
              This prescription is valid until{' '}
              {new Date(
                Date.now() + 90 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="w-full max-w-xs">
              <div className="border-t-2 border-gray-800 pt-1 text-center text-sm font-semibold text-gray-700">
                Doctor's Signature
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6">* Required fields</p>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Issue Prescription'}
          </button>
        </div>
      </form>
    </div>
  );
}