export default function BookingFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <div className="text-red-600 text-3xl mb-3">❌</div>
        <h2 className="text-xl font-semibold mb-2">Booking Failed</h2>
        <p className="text-gray-600 text-sm">
          Please try again. It could be a network delay or server error. Thank you for your patience.
        </p>
        <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600">Try Again</button>
      </div>
    </div>
  )
}
