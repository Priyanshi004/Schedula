import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const filePath = path.join(process.cwd(), 'data', 'appointments.json')

export async function GET() {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(jsonData)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading appointments:', error)
    return NextResponse.json({ error: 'Unable to load appointments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(jsonData)

    const newAppointment = await req.json()

    // ✅ Auto-fill endTime if missing
    if (!newAppointment.endTime && newAppointment.startTime) {
      const start = new Date(newAppointment.startTime)
      newAppointment.endTime = new Date(start.getTime() + 30 * 60 * 1000).toISOString() // 30 min slot
    }

    // Optional: Validate structure (basic check)
    if (!newAppointment.name || !newAppointment.phone || !newAppointment.startTime || !newAppointment.status) {
      return NextResponse.json({ error: 'Missing required appointment fields' }, { status: 400 })
    }

    // Append and save
    data.push(newAppointment)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true, appointment: newAppointment })
  } catch (error) {
    console.error('Error saving appointment:', error)
    return NextResponse.json({ error: 'Unable to save appointment' }, { status: 500 })
  }
}