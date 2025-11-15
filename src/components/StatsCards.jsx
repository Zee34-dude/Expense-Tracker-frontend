import { FaExpand, FaArrowUp } from "react-icons/fa";

export function StatCard({ title, amount, trendColor, trendValue }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">{amount}</p>
      <p className={`${trendColor} text-sm font-medium flex items-center gap-1`}>
        <FaArrowUp className="text-xs" />{trendValue}
      </p>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <StatCard title="Total balance" amount="₦120,000" trendColor="text-green-500" trendValue="12.1%" />
      <StatCard title="Income" amount="₦100,000" trendColor="text-green-500" trendValue="6.4%" />
      <StatCard title="Expense" amount="₦60,000" trendColor="text-red-500" trendValue="3.1%" />
    </div>
  );
}

export default StatsCards;


