import { FaPlus } from "react-icons/fa";

function ActionButtons() {
  return (
    <div className="space-y-3 md:space-y-4">
      <button className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-medium hover:bg-blue-700 transition-colors text-sm md:text-base">
        <FaPlus className="text-base md:text-lg" />
        Income
      </button>
      <button className="w-full bg-cyan-500 text-white p-3 md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-medium hover:bg-cyan-600 transition-colors text-sm md:text-base">
        <FaPlus className="text-base md:text-lg" />
        Expense
      </button>
    </div>
  );
}

export default ActionButtons;


