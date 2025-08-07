type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

export const Select = ({ label, name, value, onChange, options }: SelectProps) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">Select a specialty</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
