'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import moment from 'moment'
import { Appointment } from '@/types/appointment'


const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop<Appointment>(Calendar)

export interface WeeklyCalendarProps {
  appointments: Appointment[]
  onDrop: (appointment: Appointment) => void
  onSelect: (appointment: Appointment) => void
}

export default function WeeklyCalendar({
  appointments,
  onDrop,
  onSelect,
}: WeeklyCalendarProps) {
  const handleDrop = ({ event }: { event: object }) => {
    const appointment = event as Appointment
    onDrop(appointment)
  }

  const handleSelect = (event: object) => {
    const appointment = event as Appointment
    onSelect(appointment)
  }

  const eventPropGetter = (event: Appointment) => {
    const colorMap: Record<string, string> = {
      scheduled: '#38bdf8',  // sky blue
      completed: '#22c55e',  // emerald
      cancelled: '#ef4444',  // rose
      pending: '#fbbf24',    // amber
      confirmed: '#8b5cf6',  // violet
    }

    const bgColor = colorMap[event.status] || '#e5e7eb' // fallback gray
    return {
      style: {
        backgroundColor: bgColor,
        color: '#fff',
        borderRadius: '6px',
        border: 'none',
        padding: '2px 6px',
        fontWeight: 500,
      },
    }
  }

  return (
    <DnDCalendar
      localizer={localizer}
      events={appointments}
      defaultView="week"
      style={{ height: '100%', width: '100%' }}
      onEventDrop={handleDrop}
      onSelectEvent={handleSelect}
      draggableAccessor={() => true}
      resizable={false}
      eventPropGetter={eventPropGetter}
    />
  )
}