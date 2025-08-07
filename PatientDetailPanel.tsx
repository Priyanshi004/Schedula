'use client'

import { useState } from 'react'
import { 
  FaUserMd, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaBirthdayCake,
  FaVenus,
  FaMars,
  FaClipboardList,
  FaChartLine,
  FaPlus,
  FaTimes
} from 'react-icons/fa'

const suggestionsList = [
  'Vertigo',
  'Jaundice',
  'Operation / surgery',
  'Hyper lipidemea',
  'Thyroid disease',
  'Hypertension',
  'Cancer',
  'Skin disease',
  'Arthritis / Gout',
  'Peptic ulcer',
  'Chronic dysentery',
  'Medication',
]

export default function PatientDetailPanel({ patient }: { patient: any }) {
  const [medicalHistory, setMedicalHistory] = useState<string[]>([])

  if (!patient || Object.keys(patient).length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaUserMd className="text-white text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Patient Selected</h3>
        <p className="text-gray-600 mb-6">Add a new patient using the button above to get started with patient management.</p>
        <div className="text-sm text-gray-500">
          <p>Once you add a patient, you'll be able to:</p>
          <ul className="mt-2 space-y-1 text-left">
            <li>• View patient details and contact information</li>
            <li>• Manage medical history and conditions</li>
            <li>• Create prescriptions and view charts</li>
          </ul>
        </div>
      </div>
    )
  }

  const addToHistory = (item: string) => {
    if (!medicalHistory.includes(item)) {
      setMedicalHistory([...medicalHistory, item])
    }
  }

  const removeFromHistory = (item: string) => {
    setMedicalHistory(medicalHistory.filter(h => h !== item))
  }

  return (
    <div className="space-y-6">
      {/* Patient Info Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full flex items-center justify-center">
            <FaUserMd className="text-white text-2xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
              {patient.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                {patient.gender === 'Female' ? <FaVenus className="text-pink-500" /> : <FaMars className="text-blue-500" />}
                {patient.gender}
              </span>
              {patient.dob && (
                <span className="flex items-center gap-1">
                  <FaBirthdayCake className="text-orange-500" />
                  {new Date().getFullYear() - new Date(patient.dob).getFullYear()} years old
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaPhone className="text-white text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Phone Number</p>
              <p className="text-gray-800 font-semibold">{patient.mobile}</p>
            </div>
          </div>

          {patient.email && (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <FaEnvelope className="text-white text-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 font-medium">Email Address</p>
                <p className="text-gray-800 font-semibold truncate">{patient.email}</p>
              </div>
            </div>
          )}

          {patient.city && (
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Location</p>
                <p className="text-gray-800 font-semibold">{patient.city}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <FaChartLine className="text-2xl mb-3" />
          <h3 className="font-semibold mb-1">View Charts</h3>
          <p className="text-blue-100 text-sm">Access patient charts and records</p>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <FaClipboardList className="text-2xl mb-3" />
          <h3 className="font-semibold mb-1">New Prescription</h3>
          <p className="text-green-100 text-sm">Create new prescription</p>
        </div>
      </div>

      {/* Medical History Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
            <FaClipboardList className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Medical History</h3>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Personal Medical History</h4>
          {medicalHistory.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-2xl">
              <FaPlus className="text-gray-400 text-2xl mx-auto mb-2" />
              <p className="text-gray-500 font-medium">No medical history added</p>
              <p className="text-gray-400 text-sm">Add conditions from suggestions below</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {medicalHistory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-2xl border border-red-100">
                  <span className="text-gray-800 font-medium">{item}</span>
                  <button
                    onClick={() => removeFromHistory(item)}
                    className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Add Conditions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
            {suggestionsList.map((item, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-3 rounded-2xl border transition-all duration-300 ${
                  medicalHistory.includes(item)
                    ? 'bg-gray-100 border-gray-200 text-gray-500'
                    : 'bg-blue-50 border-blue-100 hover:bg-blue-100 cursor-pointer'
                }`}
              >
                <span className="font-medium">{item}</span>
                <button
                  onClick={() => addToHistory(item)}
                  disabled={medicalHistory.includes(item)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    medicalHistory.includes(item)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
                  }`}
                >
                  <FaPlus className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
