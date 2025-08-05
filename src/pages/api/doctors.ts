import type { NextApiRequest, NextApiResponse } from 'next';

const mockDoctors = [
  { id: 'doc-001', name: 'Dr. Asha Verma', specialty: 'Cardiologist', rating: 4.8 },
  { id: 'doc-002', name: 'Dr. Ravi Singh', specialty: 'Dermatologist', rating: 4.5 },
];

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ doctors: mockDoctors });
}