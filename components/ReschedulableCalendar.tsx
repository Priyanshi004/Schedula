'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useState } from 'react'
import type { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'

type Appointment = {
  id: string
  title: string
  start: Date
  end: Date
  doctorId?: string
  patientId?: string
  status?: 'confirmed' | 'pending'
}

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop<Appointment>(Calendar)

const initialEvents: Appointment[] = [
  {
    id: '1',
    title: 'Patient A',
    start: new Date(),
    end: new Date(new Date().getTime() + 30 * 60000),
    status: 'confirmed',
  },
  // Add more sample events
]

export default function ReschedulableCalendar() {
  const [events, setEvents] = useState(initialEvents)

 const handleDrop = (args: EventInteractionArgs<Appointment>) => {
  const { event, start, end } = args

  const updated = { ...event, start: new Date(start), end: new Date(end) }

  setEvents(prev => {
  const next = prev.map(e => (e.id === event.id ? updated : e))
  console.log('Updated Events:', next)
  return next
})

}
  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      defaultView="week"
      startAccessor="start"
      endAccessor="end"
      style={{ height: '90vh' }}
      onEventDrop={handleDrop}
      draggableAccessor={() => true}
    />
  )
}