import { FaExpand } from "react-icons/fa";

export default function BudgetCard({ budgets }) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Budget</h3>
          <FaExpand className="text-gray-400 cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm">No budget data available</p>
      </div>
    );
  }

  // Total budget and total spent
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spentAmount || 0), 0);
  const percentUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // Assign colors to categories
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Budget</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>

      <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        ₦{totalSpent.toLocaleString()}
      </p>
      <p className="text-gray-600 text-sm mb-4">
        of ₦{totalBudget.toLocaleString()} budget
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-cyan-400 h-2 rounded-full"
          style={{ width: `${percentUsed}%` }}
        ></div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {budgets.map((b, i) => {
          const spentPercent = b.limit > 0 ? ((b.spentAmount || 0) / b.limit) * 100 : 0;
          return (
            <div key={b.id} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></div>
              <span className="text-sm text-gray-600">
                {b.name}: ₦{(b.spentAmount || 0).toLocaleString()} ({spentPercent.toFixed(1)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
