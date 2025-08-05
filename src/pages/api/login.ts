import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'demo@user.com' && password === '123456') {
      res.status(200).json({ token: 'mock-token', user: { name: 'Demo User', role: 'patient' } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).end();
  }
}