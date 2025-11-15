'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function BudgetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
}) {
  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: '',
    spentAmount: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        budgetAmount: initialData.budgetAmount.toString(),
        spentAmount: initialData.spentAmount.toString(),
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
      });
    } else {
      setFormData({
        category: '',
        budgetAmount: '',
        spentAmount: '',
        startDate: '',
        endDate: '',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.budgetAmount || !formData.spentAmount) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      category: formData.category,
      budgetAmount: parseFloat(formData.budgetAmount),
      spentAmount: parseFloat(formData.spentAmount),
      startDate: formData.startDate,
      endDate: formData.endDate,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        role="presentation"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-lg shadow-lg w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {initialData ? 'Edit Budget' : 'Add New Budget'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {initialData
                  ? 'Update the budget details for this category'
                  : 'Create a new budget for a spending category'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                Budget Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="budgetAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.budgetAmount}
                onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="spentAmount" className="block text-sm font-medium text-gray-700">
                Amount Spent ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="spentAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.spentAmount}
                onChange={(e) => setFormData({ ...formData, spentAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Check size={18} />
                {initialData ? 'Update Budget' : 'Add Budget'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
