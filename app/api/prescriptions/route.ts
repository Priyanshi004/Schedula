import { NextRequest, NextResponse } from 'next/server';
import { Prescription } from '@/types/prescription';
import fs from 'fs';
import path from 'path';

// GET /api/prescriptions
export async function GET(req: NextRequest) {
  try {
    // Read data from file
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    let data: Prescription[] = JSON.parse(jsonData);

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const appointmentId = searchParams.get('appointmentId');

    // Apply filters if provided
    if (patientId) {
      data = data.filter(prescription => prescription.patientId === patientId);
    }
    
    if (doctorId) {
      data = data.filter(prescription => prescription.doctorId === doctorId);
    }
    
    if (appointmentId) {
      data = data.filter(prescription => prescription.appointmentId === appointmentId);
    }

    // Return filtered data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading prescriptions:', error);
    return NextResponse.json(
      { error: 'Unable to load prescriptions' }, 
      { status: 500 }
    );
  }
}

// POST /api/prescriptions
export async function POST(req: NextRequest) {
  try {
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Parse request body
    const newPrescription: Prescription = await req.json();

    // Validate required fields
    if (!newPrescription.patientId || !newPrescription.patientName || 
        !newPrescription.doctorId || !newPrescription.doctorName ||
        !newPrescription.medicineName || !newPrescription.dosage || 
        !newPrescription.duration) {
      return NextResponse.json(
        { error: 'Missing required prescription fields' }, 
        { status: 400 }
      );
    }

    // Generate unique ID if not provided
    if (!newPrescription.id) {
      newPrescription.id = `pres-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Set timestamps
    const now = new Date().toISOString();
    newPrescription.createdAt = newPrescription.createdAt || now;
    newPrescription.updatedAt = now;

    // Add to data array
    data.push(newPrescription);

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return created prescription
    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    console.error('Error saving prescription:', error);
    return NextResponse.json(
      { error: 'Unable to save prescription' }, 
      { status: 500 }
    );
  }
}