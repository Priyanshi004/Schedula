'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import moment from 'moment'
import { Appointment } from '@/types'



const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop<Appointment>(Calendar)

export interface WeeklyCalendarProps {
  appointments: Appointment[]
  onDrop: (appointment: Appointment) => void
  onSelect: (appointment: Partial<Appointment>) => void
}

export default function WeeklyCalendar({
  appointments,
  onDrop,
  onSelect,
}: WeeklyCalendarProps) {
  const handleDrop = (data: { event: Appointment; start: string | Date; end: string | Date }) => {
    const { event, start, end } = data;
    onDrop({ ...event, start: new Date(start), end: new Date(end) });
  };

  const handleSelect = (event: object) => {
    onSelect(event as Partial<Appointment>);
  };

  const eventPropGetter = (event: object) => {
    const appointment = event as Appointment;
    const colorMap: Record<string, string> = {
      scheduled: '#38bdf8',  // sky blue
      completed: '#22c55e',  // emerald
      cancelled: '#ef4444',  // rose
      pending: '#fbbf24',    // amber
      confirmed: '#8b5cf6',  // violet
    }

    const bgColor = colorMap[appointment.status] || '#e5e7eb' // fallback gray
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