'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaCalendarAlt, FaClipboardList, FaFileMedical, FaHistory, FaPhone, FaUser } from 'react-icons/fa'

type Appointment = {
  id?: string
  name: string
  age?: string
  mobile?: string
  date?: string
  time?: string
  slot?: string
  status?: string
  doctorName?: string
}

type Diagnosis = {
  id: string
  patientId: string
  date: string
  diagnosis: string
  notes?: string
}

type Prescription = {
  id: string
  patientId: string
  createdAt: string
  doctorName?: string
  medicineName: string
  dosage: string
  duration: string
}

export default function PatientProfilePage() {
  const params = useParams()
  const patientId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '')
  const router = useRouter()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  const patientName = useMemo(() => appointments[0]?.name || 'Patient', [appointments])
  const patientMobile = useMemo(() => appointments[0]?.mobile, [appointments])

  useEffect(() => {
    if (!patientId) return
    Promise.all([
      fetch(`/api/appointments?patientId=${patientId}`).then(r => r.json()),
      fetch(`/api/diagnoses?patientId=${patientId}`).then(r => r.json()),
      fetch(`/api/prescriptions?patientId=${patientId}`).then(r => r.json()),
    ]).then(([apt, dx, rx]) => {
      setAppointments((apt || []).sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0)))
      setDiagnoses((dx || []).sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0)))
      setPrescriptions((rx || []).sort((a: any, b: any) => +new Date(b.createdAt || 0) - +new Date(a.createdAt || 0)))
    })
  }, [patientId])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <FaArrowLeft /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-center">
            <FaUser />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">{patientName}</div>
            <div className="text-sm text-gray-600">ID: {patientId}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/doctor/patients/${patientId}/history`} className="px-3 py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl flex items-center gap-2">
            <FaHistory /> History
          </Link>
        </div>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl text-white flex items-center justify-center">
            <FaPhone />
          </div>
          <div>
            <div className="text-xs text-gray-500">Phone</div>
            <div className="font-semibold text-gray-800">{patientMobile || '—'}</div>
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl text-white flex items-center justify-center">
            <FaCalendarAlt />
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Appointments</div>
            <div className="font-semibold text-gray-800">{appointments.length}</div>
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl text-white flex items-center justify-center">
            <FaFileMedical />
          </div>
          <div>
            <div className="text-xs text-gray-500">Prescriptions</div>
            <div className="font-semibold text-gray-800">{prescriptions.length}</div>
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 rounded-2xl p-4 border border-white/50 shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Recent Appointments</h3>
            <div className="text-xs text-gray-500">Latest first</div>
          </div>
          <div className="space-y-2">
            {appointments.slice(0, 6).map((a, idx) => (
              <div key={idx} className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                <div className="font-medium text-gray-800">{a.doctorName || 'Doctor'}</div>
                <div className="text-sm text-gray-600">{a.date} {a.time || a.slot ? `• ${a.time || a.slot}` : ''}</div>
                <div className="text-xs capitalize px-2 py-1 rounded-lg bg-white border border-blue-200 text-blue-700">{a.status || '—'}</div>
              </div>
            ))}
            {appointments.length === 0 && <div className="text-center text-gray-600 py-6">No appointments</div>}
          </div>
        </div>
        <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Recent Diagnoses</h3>
            <div className="text-xs text-gray-500">Latest first</div>
          </div>
          <div className="space-y-2">
            {diagnoses.slice(0, 6).map((d) => (
              <div key={d.id} className="bg-green-50 rounded-xl p-3">
                <div className="font-medium text-gray-800">{d.diagnosis}</div>
                {d.notes && <div className="text-sm text-gray-700">{d.notes}</div>}
                <div className="text-xs text-gray-500 mt-1">{new Date(d.date).toLocaleDateString()}</div>
              </div>
            ))}
            {diagnoses.length === 0 && <div className="text-center text-gray-600 py-6">No diagnoses</div>}
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Prescriptions</h3>
          <div className="text-xs text-gray-500">Latest first</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {prescriptions.slice(0, 9).map((p) => (
            <div key={p.id} className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <div className="font-semibold text-gray-800">{p.medicineName}</div>
              <div className="text-sm text-gray-700">{p.dosage} • {p.duration}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
          {prescriptions.length === 0 && <div className="text-center text-gray-600 py-6 col-span-full">No prescriptions</div>}
        </div>
      </div>
    </div>
  )
}


