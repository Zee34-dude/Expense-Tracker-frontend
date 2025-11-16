import { Edit2, Trash2 } from 'lucide-react';

export default function BudgetList({ budgets, transactions = [], onEdit, onDelete }) {

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      onDelete(id);
    }
  };
  console.log(transactions)
  // Calculate actual spent amount based on real transactions
  const calculateSpent = (budget) => {
    const filtered = transactions.filter((t) => {
      const sameCategory = t.categoryId === budget.categoryId;


      const dateMatches =
        new Date(t.date) >= new Date(budget.startDate) &&
        new Date(t.date) <= new Date(budget.endDate);

      const isExpense = t.type === "EXPENSE"; // <-- cleaner & accurate

      return sameCategory && dateMatches && isExpense;
    });

    return filtered.reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Budget Categories</h2>

        <div className="space-y-4">
          {budgets.map((budget) => {
            const spentAmount = calculateSpent(budget);
            const percentage = (spentAmount / budget.limit) * 100 || 0;
            const isOverBudget = spentAmount > budget.limit;

            return (
              <div key={budget.id} className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{budget.name}</h3>
                    <p className="text-sm">
                      ${spentAmount.toFixed(2)} of ${budget.limit.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      title="Edit"
                      onClick={() => onEdit(budget.id)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(budget.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOverBudget ? 'bg-destructive' : 'bg-chart-1'
                      }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between text-xs">
                  <span className={isOverBudget ? 'text-destructive font-semibold' : 'text-green-500 font-semibold'}>
                    {isOverBudget
                      ? `Over by $${(spentAmount - budget.limit).toFixed(2)}`
                      : `${percentage.toFixed(0)}% used`}
                  </span>

                  <span>
                    Remaining: ${Math.max(0, budget.limit - spentAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
