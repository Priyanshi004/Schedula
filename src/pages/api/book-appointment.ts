import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { doctorId, date, time } = req.body;
    res.status(200).json({
      appointmentId: 'appt-001',
      status: 'confirmed',
      doctorId,
      date,
      time,
    });
  } else {
    res.status(405).end();
  }
}