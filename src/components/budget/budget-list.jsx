import { useState, useEffect } from 'react';
import { Edit2, Trash2, X, AlertTriangle } from 'lucide-react';

export default function BudgetList({ budgets, calculateSpent, onEdit, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  // New state to control the visibility of the "Over Budget" warning modal
  const [showOverBudgetWarning, setShowOverBudgetWarning] = useState(false);

  // 1. Check for over-budget items when budgets data changes
  useEffect(() => {
    // Check if any budget is over the limit
    const isAnyOverBudget = budgets.some(budget => {
      const spentAmount = calculateSpent(budget);
      return spentAmount > budget.limit;
    });

    if (isAnyOverBudget) {
      setShowOverBudgetWarning(true);
    }
    // Dependency array includes 'budgets' so the check runs whenever the budget data updates.
  }, [budgets, calculateSpent]);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      // The component should show a non-blocking UI message instead of alert()
      // console.log('Attempting to delete budget:', id); 
      await onDelete(id);
    } catch (err) {
      console.error('Failed to delete budget:', err);
      // NOTE: Replaced forbidden alert() with a console error or custom UI notification if available.
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
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
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => setConfirmDeleteId(budget.id)}
                      className="text-gray-500 hover:text-red-600 flex items-center justify-center transition-colors"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <svg
                          className="animate-spin h-4 w-4 text-red-600"
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
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className={isOverBudget ? 'text-red-500 font-semibold' : 'text-green-500 font-semibold'}>
                    {isOverBudget
                      ? `Over by $${(spentAmount - budget.limit).toFixed(2)}`
                      : `${percentage.toFixed(0)}% used`}
                  </span>

                  <span className="text-gray-500">
                    Remaining: ${Math.max(0, budget.limit - spentAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Over Budget Warning Modal */}
      {showOverBudgetWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setShowOverBudgetWarning(false)}
          />
          <div className="bg-white rounded-xl shadow-2xl p-6 z-50 max-w-sm w-full transform transition-all duration-300 scale-100">
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">
                        Budget Warning
                    </h3>
                </div>
                <button 
                    onClick={() => setShowOverBudgetWarning(false)}
                    className="text-gray-400 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            
            <p className="text-sm text-gray-600 mt-4 mb-6">
              One or more of your budget categories are currently **over the spending limit**. Please review your transactions and budget allocations immediately.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowOverBudgetWarning(false)}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={() => setConfirmDeleteId(null)}
          />
          <div className="bg-white rounded-xl shadow-2xl p-6 z-50 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this budget? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 transition-colors"
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