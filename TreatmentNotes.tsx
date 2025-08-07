// components/TreatmentNotes.tsx
'use client';
import React from 'react';
import { useState } from 'react'

export default function TreatmentNotes() {
  const [notes] = useState([
    {
      date: '30 July 2025',
      doctor: 'Dr. A. Mehra',
      content: 'Prescribed 5-day antibiotic course for sinus infection.',
    },
    {
      date: '15 July 2025',
      doctor: 'Dr. A. Mehra',
      content: 'Follow-up scheduled. Mild headache persists. Suggested hydration.',
    },
    {
      date: '28 June 2025',
      doctor: 'Dr. A. Mehra',
      content: 'Initial diagnosis: sinus inflammation. Prescribed pain relief.',
    },
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Treatment Notes</h2>
      <div className="space-y-3">
        {notes.map((note, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-md p-3 hover:shadow transition"
          >
            <div className="text-xs text-gray-500">{note.date}</div>
            <div className="text-sm font-medium text-gray-700">{note.doctor}</div>
            <div className="mt-1 text-sm text-gray-600">{note.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}