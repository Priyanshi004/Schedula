'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const doctor = {
  name: 'Dr. Priya Sharma',
  specialty: 'Cardiologist',
  availability: 'Available today',
  hours: '09:00 AM – 05:00 PM',
}

const dates = ['13 Mon', '14 Tue', '15 Wed', '16 Thu', '17 Fri', '18 Sat', '20 Mon', '21 Tue', '22 Wed', '23 Thu', '24 Fri', '25 Sat', '27 Mon', '28 Tue', '29 Wed', '30 Thu']

const timeSlots = {
  morning: [
    { time: '09:30 AM - 09:45 AM', disabled: false },
    { time: '10:00 AM - 10:15 AM', disabled: false },
    { time: '10:30 AM - 10:45 AM', disabled: false },
    { time: '11:00 AM - 11:15 AM', disabled: true },
    { time: '11:30 AM - 11:45 AM', disabled: false },
    { time: '12:00 PM - 12:15 PM', disabled: false },
    { time: '12:30 PM - 12:45 AM', disabled: true },
    { time: '01:00 PM - 01:15 PM', disabled: false },
  ],
  evening: [
    { time: '03:30 PM - 03:45 PM', disabled: false },
    { time: '04:00 PM - 04:15 PM', disabled: false },
    { time: '04:30 PM - 04:45 PM', disabled: false },
  ],
}

export default function BookPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedDate, setSelectedDate] = useState('14 Tue')
  const [selectedSlot, setSelectedSlot] = useState('')

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()

    const appointment = {
      name,
      email,
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      slot: selectedSlot,
      notes,
      status: 'Booked',
    }

    const existing = JSON.parse(localStorage.getItem('appointments') || '[]')
    localStorage.setItem('appointments', JSON.stringify([...existing, appointment]))

    router.push('/appointments')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Doctor Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">{doctor.name}</h1>
        <p className="text-gray-700">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-1">{doctor.availability}</p>
        <p className="text-sm text-gray-600 mt-2">Timings: {doctor.hours}</p>
      </div>

      {/* Date Selector */}
      <h2 className="text-md font-semibold text-gray-700 mb-2">Select a Date</h2>
      <div className="flex gap-3 overflow-auto mb-6">
        {dates.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`px-4 py-2 rounded border ${
              selectedDate === day ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <h2 className="text-md font-semibold text-gray-700 mb-2">Morning Slots</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {timeSlots.morning.map(({ time, disabled }) => (
          <button
            key={time}
            disabled={disabled}
            onClick={() => setSelectedSlot(time)}
            className={`px-4 py-2 border rounded ${
              disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : selectedSlot === time
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      <h2 className="text-md font-semibold text-gray-700 mb-2">Evening Slots</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {timeSlots.evening.map(({ time, disabled }) => (
          <button
            key={time}
            disabled={disabled}
            onClick={() => setSelectedSlot(time)}
            className={`px-4 py-2 border rounded ${
              disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : selectedSlot === time
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Form */}
      {selectedSlot && (
        <form className="space-y-4" onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            rows={3}
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
          >
            Book appointment
          </button>
        </form>
      )}
    </div>
  )
}
