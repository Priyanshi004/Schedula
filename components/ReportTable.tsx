export default function ReportTable() {
  return (
    <div className="text-sm mt-4">
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold mb-2">SMS Sent</h2>
          <table className="table-auto border w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border px-4 py-2">03 Aug 2025</td>
                <td className="border px-4 py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Failed SMS</h2>
          <table className="table-auto border w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border px-4 py-2">03 Aug 2025</td>
                <td className="border px-4 py-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Download Report</button>
        <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm">Mail Report</button>
      </div>
    </div>
  );
}
