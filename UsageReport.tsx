'use client';

import { useState } from 'react';

export default function UsageReport() {
  const [month, setMonth] = useState('2025-8');

  return (
    <div className="mt-8 text-sm">
      <input
        type="text"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border px-2 py-1 rounded mr-2"
      />
      <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Send Excel</button>
    </div>
  );
}
