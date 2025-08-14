import { NextRequest, NextResponse } from 'next/server';

// Mock diagnoses keyed by patientId
const mockDiagnoses = [
  {
    id: 'dx-1003',
    patientId: 'pat-2',
    date: '2025-07-20T10:00:00.000Z',
    diagnosis: 'Lumbar spondylosis',
    notes: 'Physiotherapy recommended; avoid heavy lifting.',
  },
  {
    id: 'dx-1002',
    patientId: 'pat-1',
    date: '2025-08-06T10:30:00.000Z',
    diagnosis: 'Atrial fibrillation',
    notes: 'Monitor HR; follow-up in 2 weeks.',
  },
  {
    id: 'dx-1001',
    patientId: 'pat-3',
    date: '2025-07-15T14:00:00.000Z',
    diagnosis: 'Allergic dermatitis',
    notes: 'Topical steroids; antihistamines as needed.',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get('patientId');
  let result = mockDiagnoses;
  if (patientId) {
    result = result.filter((d) => d.patientId === patientId);
  }
  // Most recent first
  result = result.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return NextResponse.json(result);
}


