import { useEffect, useState } from 'react'

export const useAppointments = (role: 'doctor' | 'patient') => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/appointments?role=${role}`)
        const data = await res.json()

        const formatted = data.map((appt: any) => ({
          title: `${appt?.name || 'Unnamed'} — ${appt?.phone || 'No phone'}`,
          start: new Date(appt?.startTime || Date.now()),
          end: new Date(appt?.endTime || Date.now() + 30 * 60 * 1000),
          status: appt?.status?.toLowerCase() || 'unknown',
        }))

        setAppointments(formatted)
      } catch (error) {
        console.error('Failed to fetch appointments:', error)
      }
    }

    fetchAppointments()
  }, [role])

  return appointments
}