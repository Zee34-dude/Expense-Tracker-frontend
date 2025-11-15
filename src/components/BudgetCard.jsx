import { FaExpand } from "react-icons/fa";

function BudgetCard() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Budget</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>
      <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">₦9,000</p>
      <p className="text-gray-600 text-sm mb-4">of ₦12,000 budget</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;


