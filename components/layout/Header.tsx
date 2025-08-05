export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-2 bg-white shadow border-b">
      <h1 className="text-xl font-semibold">Communications</h1>
      <div className="text-sm space-x-4 flex items-center">
        <span>Communication Credits: <strong>48 INR Free, 100 INR Paid</strong></span>
        <span>SMS Credits: <strong>Total Plan Credits: 1032. Used: 3</strong></span>
      </div>
    </div>
  );
}
