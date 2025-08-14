'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaDownload, FaFilter, FaUser } from 'react-icons/fa'

type Appointment = {
  id?: string
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

export default function PatientHistoryPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '')

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [range, setRange] = useState<{ from?: string; to?: string }>({})

  useEffect(() => {
    if (!patientId) return
    Promise.all([
      fetch(`/api/appointments?patientId=${patientId}`).then(r => r.json()),
      fetch(`/api/diagnoses?patientId=${patientId}`).then(r => r.json()),
      fetch(`/api/prescriptions?patientId=${patientId}`).then(r => r.json()),
    ]).then(([apt, dx, rx]) => {
      setAppointments((apt || []).sort((a: any, b: any) => +new Date(b.date || 0) - +new Date(a.date || 0)))
      setDiagnoses(dx || [])
      setPrescriptions((rx || []).sort((a: any, b: any) => +new Date(b.createdAt || 0) - +new Date(a.createdAt || 0)))
    })
  }, [patientId])

  const entries = useMemo(() => {
    type Entry = { type: 'appointment' | 'diagnosis' | 'prescription'; date: string; item: any }
    const all: Entry[] = []
    appointments.forEach(a => all.push({ type: 'appointment', date: a.date || '', item: a }))
    diagnoses.forEach(d => all.push({ type: 'diagnosis', date: d.date, item: d }))
    prescriptions.forEach(p => all.push({ type: 'prescription', date: p.createdAt, item: p }))

    const inRange = (d: string) => {
      if (!range.from && !range.to) return true
      const ts = +new Date(d)
      if (range.from && ts < +new Date(range.from)) return false
      if (range.to && ts > +new Date(range.to)) return false
      return true
    }

    return all
      .filter(e => e.date && inRange(e.date))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }, [appointments, diagnoses, prescriptions, range])

  const downloadPDF = async () => {
    // Simple browser print as PDF; could integrate react-to-pdf later
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-600" />
          <div className="relative p-6 md:p-8 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Patient Medical History</h1>
                <p className="text-blue-100 text-sm">ID: {patientId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()} className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition flex items-center gap-2">
                <FaArrowLeft /> Back
              </button>
              <button onClick={downloadPDF} className="px-3 py-2 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition flex items-center gap-2">
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Patient quick link */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-center"><FaUser /></div>
            <div className="text-sm text-gray-700">Patient ID: <span className="font-semibold">{patientId}</span></div>
          </div>
          <Link href={`/dashboard/doctor/patients/${patientId}`} className="text-blue-600 hover:text-blue-700 text-sm">Go to Patient Profile</Link>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow mb-6">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">From</label>
              <input type="date" className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500" value={range.from || ''} onChange={e => setRange(r => ({ ...r, from: e.target.value }))} />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1">To</label>
              <input type="date" className="w-full border-2 border-gray-200 rounded-xl p-2 outline-none focus:ring-2 focus:ring-blue-500" value={range.to || ''} onChange={e => setRange(r => ({ ...r, to: e.target.value }))} />
            </div>
            <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 flex items-center gap-2"><FaFilter /> Filter</button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/90 rounded-2xl p-4 shadow border border-white/50 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-blue-100" />
            <div className="text-xs text-gray-500">Appointments</div>
            <div className="text-3xl font-bold text-gray-800">{appointments.length}</div>
          </div>
          <div className="bg-white/90 rounded-2xl p-4 shadow border border-white/50 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-emerald-100" />
            <div className="text-xs text-gray-500">Diagnoses</div>
            <div className="text-3xl font-bold text-gray-800">{diagnoses.length}</div>
          </div>
          <div className="bg-white/90 rounded-2xl p-4 shadow border border-white/50 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-indigo-100" />
            <div className="text-xs text-gray-500">Prescriptions</div>
            <div className="text-3xl font-bold text-gray-800">{prescriptions.length}</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-sky-200 to-indigo-200" />
          <div className="space-y-4">
            {entries.map((e, idx) => (
              <div key={idx} className="relative pl-12">
                <div className={`absolute left-3 top-3 w-4 h-4 rounded-full border-2 ${
                  e.type === 'appointment' ? 'bg-blue-50 border-blue-400' : e.type === 'diagnosis' ? 'bg-emerald-50 border-emerald-400' : 'bg-indigo-50 border-indigo-400'
                }`} />
                <div className="bg-white/80 rounded-2xl p-4 border border-white/50 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-gray-500">{new Date(e.date).toLocaleString()}</div>
                    <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wide ${
                      e.type === 'appointment' ? 'bg-blue-100 text-blue-700' : e.type === 'diagnosis' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>{e.type}</span>
                  </div>
                  {e.type === 'appointment' && (
                    <div className="font-semibold text-gray-800">Appointment with {e.item.doctorName || 'Doctor'} {e.item.time || e.item.slot ? `• ${e.item.time || e.item.slot}` : ''}</div>
                  )}
                  {e.type === 'diagnosis' && (
                    <div>
                      <div className="font-semibold text-gray-800">Diagnosis: {e.item.diagnosis}</div>
                      {e.item.notes && <div className="text-sm text-gray-700">{e.item.notes}</div>}
                    </div>
                  )}
                  {e.type === 'prescription' && (
                    <div>
                      <div className="font-semibold text-gray-800">Prescription: {e.item.medicineName}</div>
                      <div className="text-sm text-gray-700">{e.item.dosage} • {e.item.duration}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {entries.length === 0 && (
              <div className="text-center text-gray-600 py-12">No records in the selected range.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


