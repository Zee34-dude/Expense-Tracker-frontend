import { FaExpand, FaArrowUp, FaArrowDown } from "react-icons/fa";

export function StatCard({ title, amount, trendValue }) {
  const isPositive = trendValue >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-2">${amount.toLocaleString()}</p>
      <p
        className={`text-sm font-medium flex items-center gap-1 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
        {Math.abs(trendValue).toFixed(1)}%
      </p>
    </div>
  );
}

function StatsCards({ type, previousType, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>

            <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>

            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate trend percentages
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <StatCard
        title="Total balance"
        amount={type.balance}
        trendValue={calculateTrend(type.balance, previousType?.balance)}
      />
      <StatCard
        title="Income"
        amount={type.totalIncome}
        trendValue={calculateTrend(type.totalIncome, previousType?.totalIncome)}
      />
      <StatCard
        title="Expense"
        amount={type.totalExpense}
        trendValue={calculateTrend(type.totalExpense, previousType?.totalExpense)}
      />
    </div>
  );
}

export default StatsCards;
