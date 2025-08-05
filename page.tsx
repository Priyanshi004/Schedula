'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SuccessPage() {
  const router = useRouter()
  const [latest, setLatest] = useState<any>(null)

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('bookings') || '[]')
    if (all.length > 0) {
      setLatest(all[all.length - 1])
    }
  }, [])

  const goToAppointments = () => router.push('/appointments')
  const goHome = () => router.push('/')

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <section className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Appointment Booked</h1>

        {latest && (
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Doctor:</strong> {latest.doctorName}</p>
            <p><strong>Date:</strong> {latest.date}</p>
            <p><strong>Time:</strong> {latest.slot}</p>
            <p><strong>Payment:</strong> {latest.paymentMethod}</p>
          </div>
        )}

        <p className="text-gray-500 text-sm">
          Your appointment has been saved. We'll reach out with reminders and instructions.
        </p>

        <div className="flex gap-3">
          <button
            onClick={goToAppointments}
            className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            View Appointments
          </button>
          <button
            onClick={goHome}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
          >
            Back to Home
          </button>
        </div>
      </section>
    </main>
  )
}
