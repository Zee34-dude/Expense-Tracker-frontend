import { useState } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';

export default function BudgetList({ budgets, calculateSpent, onEdit, onDelete }) {
  const [deletingId, setDeletingId] = useState(null); // which item is deleting
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // which item to confirm

  const handleDelete = async (id) => {
    try {
      setDeletingId(id); // start loading
      await onDelete(id); // call delete function
    } catch (err) {
      console.error('Failed to delete budget:', err);
      alert('Failed to delete budget. Please try again.');
    } finally {
      setDeletingId(null); // stop loading
      setConfirmDeleteId(null); // close modal
    }
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
            const isDeleting = deletingId === budget.id;

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
                      disabled={isDeleting}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => setConfirmDeleteId(budget.id)} // open modal
                      className="text-destructive hover:text-destructive flex items-center justify-center"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <svg
                          className="animate-spin h-4 w-4 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${isOverBudget ? 'bg-destructive' : 'bg-chart-1'}`}
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

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this budget? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {deletingId === confirmDeleteId ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
