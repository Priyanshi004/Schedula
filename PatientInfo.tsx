// components/PatientInfo.tsx
export default function PatientInfo() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold text-gray-800">Patient Info</h2>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div><strong>Name:</strong> Priya</div>
        <div><strong>Contact:</strong> +91 90000 12345</div>
        <div><strong>Last Appointment:</strong> 24 July 2025</div>
        <div><strong>Age:</strong> 29</div>
      </div>
    </div>
  )
}