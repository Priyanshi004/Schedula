'use client'

import { useState } from 'react'
import PatientDetailPanel from '@/components/PatientDetailPanel'
import AddPatientModal from '@/components/AddPatientModal'
import { FaUserMd, FaPlus } from 'react-icons/fa'

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)

  function handleSave(patient: any) {
    setPatients(prev => [...prev, patient])
    // Automatically select the newly added patient
    setSelectedPatient(patient)
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Patient Button */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl flex items-center justify-center">
              <FaUserMd className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Patient Management
              </h1>
              <p className="text-gray-600">
                {patients.length > 0 ? `Managing ${patients.length} patients` : 'Add your first patient to get started'}
              </p>
            </div>
          </div>
          
          <AddPatientModal onSave={handleSave} />
        </div>
      </div>

      {/* Patient Details */}
      <PatientDetailPanel patient={selectedPatient} />
    </div>
  )
}