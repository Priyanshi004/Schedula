'use client';

import { Prescription } from '@/types/prescription';
import { FaPrint, FaDownload } from 'react-icons/fa';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

interface PrescriptionPreviewProps {
  prescription: Prescription;
  onBack?: () => void;
  showActions?: boolean;
}

export function PrescriptionPreview({ prescription, onBack, showActions = true }: PrescriptionPreviewProps) {
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!prescriptionRef.current) return;

    setIsDownloading(true);

    // Allow time for the UI to update and hide the button
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      const canvas = await html2canvas(prescriptionRef.current, {
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
        hotfixes: ['px_scaling'],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`prescription-${prescription.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Download failed: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      {showActions && (
        <div className="flex justify-end items-center">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              ← Back to Prescriptions
            </button>
          )}

          <div className="flex gap-3 ml-auto">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <FaPrint /> Print
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>
      )}

      <div
        ref={prescriptionRef}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden print:shadow-none print:border-none print:rounded-none"
      >
        {/* Header */}
        <div className="bg-gray-50 p-8 border-b border-gray-200 print:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dr. {prescription.doctorName}
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
                Date: {new Date(prescription.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Prescription ID: {prescription.id}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 print:p-6">
          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-6 mb-8 border-b pb-6 border-gray-200">
            <div>
              <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Patient Name
              </p>
              <p className="py-2 font-medium text-gray-800">{prescription.patientName}</p>
            </div>
            <div>
              <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Patient ID
              </p>
              <p className="py-2 font-medium text-gray-800">{prescription.patientId}</p>
            </div>
          </div>

          {/* Prescription Details */}
          <div className="flex gap-8">
            <div className="text-6xl font-serif text-gray-400 print:text-5xl">Rx</div>
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Medication
                  </p>
                  <p className="py-2 font-medium text-gray-800">{prescription.medicineName}</p>
                </div>
                <div>
                  <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Dosage
                  </p>
                  <p className="py-2 font-medium text-gray-800">{prescription.dosage}</p>
                </div>
              </div>

              <div>
                <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Instructions / SIG
                </p>
                <p className="py-2 font-medium text-gray-800">{prescription.duration}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {prescription.notes && (
            <div className="mt-8">
              <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Additional Notes
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
                <p className="text-gray-700">{prescription.notes}</p>
              </div>
            </div>
          )}

          {/* Signature */}
          <div className="mt-12 pt-8 border-t border-dashed flex justify-between items-center">
            <div>
              {!showActions && !isDownloading && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  <FaDownload /> Download
                </button>
              )}
              {isDownloading && (
                 <div className="flex items-center gap-2 px-4 py-2 text-gray-500">
                   <span>Downloading...</span>
                 </div>
              )}
            </div>
            <div className="w-1/2 text-right">
              <div className="inline-block">
                <div className="border-b-2 border-gray-800 pt-1 text-center text-sm font-semibold text-gray-700 px-8">
                  Dr. {prescription.doctorName}'s Signature
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}