'use client'

import { useState } from 'react'

function getDaysOfMonth(): string[] {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const dateCount = new Date(year, month + 1, 0).getDate()

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayList: string[] = []

  for (let day = 1; day <= dateCount; day++) {
    const date = new Date(year, month, day)
    const weekday = weekdays[date.getDay()]
    const formatted = `${day < 10 ? '0' + day : day} ${weekday}`
    dayList.push(formatted)
  }

  return dayList
}

const days = getDaysOfMonth()

// Simulated real-time availability

const availability = days.reduce<Record<string, string[]>>((acc, date) => {
  acc[date] = [
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:15 PM',
  ]
  return acc
}, {})


export default function BookPage() {
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Book Your Appointment</h1>

      {/* Day Selector */}
      <h2 className="text-md font-semibold text-gray-700 mb-2">Select a Day</h2>
      <div className="grid grid-cols-3 gap-3 mb-6 max-h-[200px] overflow-y-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day)
              setSelectedSlot('')
              setShowModal(false)
            }}
            className={`px-4 py-2 rounded border ${
              selectedDay === day ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slot Selector */}
      {selectedDay && (
        <>
          <h2 className="text-md font-semibold text-gray-700 mb-2">Available Slots</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {availability[selectedDay]?.map((slot: string) => (
              <button
                key={slot}
                onClick={() => {
                  setSelectedSlot(slot)
                  setShowModal(false)
                }}
                className={`px-4 py-2 border rounded ${
                  selectedSlot === slot ? 'bg-indigo-600 text-white' : 'bg-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Booking Form */}
      {selectedDay && selectedSlot && (
        <>
          <p className="text-sm text-gray-700 mb-2">
            Selected: <strong>{selectedDay}</strong> at <strong>{selectedSlot}</strong>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required className="w-full px-4 py-2 border rounded" />
            <input type="email" placeholder="Email Address" required className="w-full px-4 py-2 border rounded" />
            <textarea
              rows={3}
              placeholder="Notes (optional)"
              className="w-full px-4 py-2 border rounded"
            />
            <button type="submit" className="w-full px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Confirm Appointment
            </button>
          </form>
        </>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Appointment Confirmed!</h2>
            <p className="text-sm text-gray-700 mb-2">
              Your booking for <strong>{selectedDay}</strong> at <strong>{selectedSlot}</strong> is scheduled.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
