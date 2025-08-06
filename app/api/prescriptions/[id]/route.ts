import { NextRequest, NextResponse } from 'next/server';
import { Prescription } from '@/types/prescription';
import fs from 'fs';
import path from 'path';

// GET /api/prescriptions/:id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read data from file
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const prescription = data.find(p => p.id === id);
    
    if (!prescription) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Return found prescription
    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error reading prescription:', error);
    return NextResponse.json(
      { error: 'Unable to load prescription' }, 
      { status: 500 }
    );
  }
}

// PUT /api/prescriptions/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const index = data.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Parse request body
    const updatedPrescription: Partial<Prescription> = await req.json();

    // Update only provided fields (partial update)
    const prescription = { ...data[index], ...updatedPrescription };
    
    // Update timestamp
    prescription.updatedAt = new Date().toISOString();
    
    // Update in array
    data[index] = prescription;

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return updated prescription
    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Error updating prescription:', error);
    return NextResponse.json(
      { error: 'Unable to update prescription' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/prescriptions/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Read existing data
    const filePath = path.join(process.cwd(), 'data', 'prescriptions.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Prescription[] = JSON.parse(jsonData);

    // Find prescription by ID
    const index = data.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Prescription not found' }, 
        { status: 404 }
      );
    }

    // Remove from array
    data.splice(index, 1);

    // Write updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    return NextResponse.json(
      { error: 'Unable to delete prescription' }, 
      { status: 500 }
    );
  }
}