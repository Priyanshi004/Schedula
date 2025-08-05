'use client'

import { useState, useEffect } from 'react'

export default function AppointmentModal({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean
  onClose: () => void
  event: any
}) {
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    if (event) {
      setForm({
        ...event,
        startTime: new Date(event.start).toISOString(),
        endTime: new Date(event.end).toISOString(),
        status: event.status?.toUpperCase() || 'CONFIRMED',
      })
    }
  }, [event])

  const handleUpdate = async () => {
    if (!form.name || !form.phone || !form.startTime || !form.status) return

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST', // you can switch to PUT if updating
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()
      console.log('Updated:', result)
      onClose()
    } catch (error) {
      console.error('Failed to save appointment:', error)
    }
  }

  if (!isOpen || !form) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            value={form.name || ''}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="w-full border p-2 rounded"
            value={form.phone || ''}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
          />
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={
              form.startTime
                ? new Date(form.startTime).toISOString().slice(0, 16)
                : ''
            }
            onChange={e => {
              const start = new Date(e.target.value)
              const end = new Date(start.getTime() + 30 * 60000)
              setForm({
                ...form,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
              })
            }}
          />
          <select
            className="w-full border p-2 rounded"
            value={form.status || 'CONFIRMED'}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="CONFIRMED">Confirmed</option>
            <option value="RESCHEDULED">Rescheduled</option>
            <option value="DELETED">Deleted</option>
          </select>

          <button
            onClick={handleUpdate}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="w-full mt-2 text-gray-600 hover:underline text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}