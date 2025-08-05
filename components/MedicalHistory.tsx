import React, { useState } from 'react';

const suggestionsList = [
  'Vertigo',
  'Jaundice',
  'Operation / surgery',
  'Hyper lipidemea',
  'Thyroid disease',
  'Hypertension',
  'Cancer',
  'Skin disease',
  'Arthritis / Gout',
  'Peptic ulcer',
  'Chronic dysentery',
  'Medication',
];

export default function MedicalHistory() {
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (item: string) => {
    if (!history.includes(item)) {
      setHistory([...history, item]);
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm bg-white max-w-sm">
      <h2 className="text-lg font-semibold mb-4">Medical History</h2>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-1">Personal Medical History</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 italic">+ Click to Add</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-gray-800">
            {history.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Suggestions</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {suggestionsList.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm text-gray-700 border p-2 rounded hover:bg-gray-100">
              <span>{item}</span>
              <button
                onClick={() => addToHistory(item)}
                className="text-blue-600 font-bold text-lg leading-none px-2 hover:text-blue-800"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
