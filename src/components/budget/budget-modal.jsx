'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { getCategories } from '../../apis/Category.api';

export default function BudgetModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    startDate: '',
    endDate: '',
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        categoryId: initialData.categoryId,
        amount: initialData.amount,
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
      });
    } else {
      setFormData({
        categoryId: '',
        amount: '',
        startDate: '',
        endDate: '',
        categoryName: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId || !formData.amount || !formData.startDate || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true); // ✅ start loading

    try {
      await onSubmit({
        categoryId: formData.categoryId,
        amount: parseFloat(formData.amount),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        categoryName: formData.categoryName
      });
      onClose(); // close modal after successful submission
    } catch (err) {
      console.error("Failed to submit budget:", err);
      alert('Failed to save budget. Please try again.');
    } finally {
      setIsLoading(false); // ✅ stop loading
    }
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
              disabled={isLoading} // disable while loading
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.categoryId}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedCategory = categories.find(cat => cat.id.toString() === selectedId);
                  setFormData({
                    ...formData,
                    categoryId: selectedId,
                    categoryName: selectedCategory ? selectedCategory.name : ''
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                disabled={isLoading} // disable while loading
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Budget Amount ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                disabled={isLoading} // disable while loading
              />
            </div>

            {/* Dates */}
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
                  disabled={isLoading} // disable while loading
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
                  disabled={isLoading} // disable while loading
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                disabled={isLoading} // disable while loading
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                disabled={isLoading} // disable while loading
              >
                {isLoading ? (
                  // ✅ Blue spinner while loading
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <Check size={18} />
                    {initialData ? 'Update Budget' : 'Add Budget'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
