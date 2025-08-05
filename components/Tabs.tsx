type TabProps = {
  activeTab: 'delivery' | 'usage';
  setActiveTab: (tab: 'delivery' | 'usage') => void;
};

export default function Tabs({ activeTab, setActiveTab }: TabProps) {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        className={`px-4 py-2 rounded ${activeTab === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('delivery')}
      >
        Delivery Reports
      </button>
      <button
        className={`px-4 py-2 rounded ${activeTab === 'usage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('usage')}
      >
        Usage Report
      </button>
    </div>
  );
}
