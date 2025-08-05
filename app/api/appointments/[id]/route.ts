// app/api/appointments/[id]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'appointments.json');

function readData() {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const updatedAppointment = await req.json();
  const data = readData();
  const index = data.findIndex((item: any) => item.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  data[index] = { ...data[index], ...updatedAppointment };
  writeData(data);

  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const data = readData();
  const updatedData = data.filter((item: any) => item.id !== id);
  writeData(updatedData);

  return NextResponse.json({ success: true });
}
