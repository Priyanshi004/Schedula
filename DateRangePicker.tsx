export default function DateRangePicker() {
  return (
    <div className="my-4 flex gap-2 items-center text-sm">
      <span>Delivery Reports for Transactional SMS from</span>
      <input type="date" className="border rounded px-2 py-1" />
      <span>to</span>
      <input type="date" className="border rounded px-2 py-1" />
    </div>
  );
}
