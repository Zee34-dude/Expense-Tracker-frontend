
import { Edit2, Trash2 } from 'lucide-react';

export default function BudgetList({ budgets, onEdit, onDelete }) {
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Budget Categories</h2>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
            const isOverBudget = budget.spentAmount > budget.budgetAmount;

            return (
              <div key={budget.id} className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{budget.category}</h3>
                    <p className="text-sm ">
                      ${budget.spentAmount.toFixed(2)} of ${budget.budgetAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                    title='Edit'
                      onClick={() => onEdit(budget.id)}
                      className="gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      
                    </button>
                    <button
                     title='delete'
                      onClick={() => handleDelete(budget.id)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                     
                    </button>
                  </div>
                </div>

                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      isOverBudget ? 'bg-destructive' : 'bg-chart-1'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={isOverBudget ? 'text-destructive font-semibold' : 'text-green-500 font-semibold'}>
                    {percentage > 100 ? `Over by $${(budget.spentAmount - budget.budgetAmount).toFixed(2)}` : `${percentage.toFixed(0)}% used`}
                  </span>
                  <span className="">
                    Remaining: ${Math.max(0, budget.budgetAmount - budget.spentAmount).toFixed(2)}
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
