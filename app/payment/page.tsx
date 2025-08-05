'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaymentPage() {
  const router = useRouter()

  const [appointment, setAppointment] = useState<any>({})
  const [patient, setPatient] = useState<any>({})
  const [method, setMethod] = useState('UPI')

  useEffect(() => {
    const appt = localStorage.getItem('selectedAppointment')
    const details = localStorage.getItem('patientDetails')
    if (appt) setAppointment(JSON.parse(appt))
    if (details) setPatient(JSON.parse(details))
  }, [])

  const handleConfirm = () => {
    const finalBooking = {
      ...appointment,
      patientDetails: patient,
      paymentMethod: method,
      status: 'Paid',
    }

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([...existing, finalBooking]))

    router.push('/success')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <section className="bg-white shadow-md rounded-xl w-full max-w-md p-6 space-y-6">
        <h1 className="text-xl font-bold text-indigo-700 text-center">Payment Summary</h1>

        {/* Appointment Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Specialty:</strong> {appointment.specialty}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.slot}</p>
        </div>

        {/* Patient Info */}
        {patient.fullName && (
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Patient:</strong> {patient.fullName}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Mobile:</strong> {patient.phone}</p>
          </div>
        )}

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="font-medium">Select Payment Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Wallet">Wallet</option>
            <option value="Cash">Cash at Clinic</option>
          </select>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
        >
          Confirm & Pay
        </button>
      </section>
    </main>
  )
}
