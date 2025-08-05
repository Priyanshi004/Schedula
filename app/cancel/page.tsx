'use client'

import { useEffect, useState } from 'react'

type Appointment = {
  name: string
  email: string
  doctor: string
  specialty: string
  date: string
  slot: string
  notes: string
  status: string
}


export default function CancelledPage() {
  const [cancelled, setCancelled] = useState<Appointment[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cancelledAppointments')
    if (stored) {
      setCancelled(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-1xl font-bold text-red-600 mb-6 text-center">Cancelled Appointments</h1>

      {cancelled.length > 0 ? (
        <div className="space-y-4">
          {cancelled.map((app, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4 border-l-4 border-red-500">
              <h2 className="text-lg font-semibold text-red-700">{app.name}</h2>
              <p className="text-sm text-blue-700">Doctor: {app.doctor} ({app.specialty})</p>
              <p className="text-sm text-blue-700">Date: {app.date}</p>
              <p className="text-sm text-blue-700">Slot: {app.slot}</p>
              {app.notes && <p className="text-sm text-blue-600">Reason: {app.notes}</p>}
              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                Cancelled
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-700">No cancelled appointments found.</p>
      )}
    </div>
  )
}
