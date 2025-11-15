import { FaExpand } from "react-icons/fa";

function BillsCard() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Bills</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-medium">Water</span>
          <span className="text-gray-600">₦3,000</span>
        </div>
        <span className="text-sm text-gray-500">(Due Jul 12)</span>
      </div>
    </div>
  );
}

export default BillsCard;


