'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { FaSearch, FaUser, FaHistory, FaCalendarAlt } from 'react-icons/fa'

type Appointment = {
  id?: string
  name: string
  patientId?: string
  date?: string
}

export default function PatientHistoryIndexPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/api/appointments')
      .then(r => r.json())
      .then((data) => setAppointments(data || []))
      .catch(() => setAppointments([]))
  }, [])

  const patients = useMemo(() => {
    const map = new Map<string, { patientId: string; name: string; lastDate?: string }>()
    for (const a of appointments) {
      const pid = a.patientId || ''
      if (!pid) continue
      const prev = map.get(pid)
      const lastDate = prev?.lastDate && a.date && new Date(prev.lastDate) > new Date(a.date) ? prev.lastDate : a.date
      map.set(pid, { patientId: pid, name: a.name || prev?.name || 'Unknown', lastDate })
    }
    const list = Array.from(map.values())
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      return list.filter(p => p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q))
    }
    return list
  }, [appointments, query])

  return (
    <div className="space-y-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-sky-600 rounded-xl text-white flex items-center justify-center">
            <FaHistory />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Patient Medical History</h1>
            <p className="text-gray-600 text-sm">Browse patients and open their chronological medical history</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by patient name or ID"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((p) => (
          <div key={p.patientId} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-center">
                <FaUser />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-800 truncate">{p.name}</div>
                <div className="text-xs text-gray-600 truncate">ID: {p.patientId}</div>
                {p.lastDate && (
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <FaCalendarAlt /> Last: {new Date(p.lastDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <Link
              href={`/dashboard/doctor/patients/${p.patientId}/history`}
              className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-xl hover:from-blue-700 hover:to-sky-700"
            >
              <FaHistory /> View History
            </Link>
          </div>
        ))}
        {patients.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-12">No patients found.</div>
        )}
      </div>
    </div>
  )
}


