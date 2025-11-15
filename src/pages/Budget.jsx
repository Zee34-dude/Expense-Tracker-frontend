'use client';

import { useState } from 'react';
import BudgetHeader from '../components/budget/budget-header';
import BudgetList from '../components/budget/budget-list';
import BudgetModal from '../components/budget/budget-modal';
import BudgetChart from '../components/budget/budget-chart';


export default function BudgetPage() {
  const [budgets, setBudgets] = useState([
    {
      id: '1',
      category: 'Groceries',
      budgetAmount: 500,
      spentAmount: 320,
      startDate: '2025-11-01',
      endDate: '2025-11-30',
    },
    {
      id: '2',
      category: 'Dining',
      budgetAmount: 300,
      spentAmount: 185,
      startDate: '2025-11-01',
      endDate: '2025-11-30',
    },
    {
      id: '3',
      category: 'Entertainment',
      budgetAmount: 200,
      spentAmount: 210,
      startDate: '2025-11-01',
      endDate: '2025-11-30',
    },
    {
      id: '4',
      category: 'Transportation',
      budgetAmount: 150,
      spentAmount: 95,
      startDate: '2025-11-01',
      endDate: '2025-11-30',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddBudget = (newBudget) => {
    const id = Date.now().toString();
    setBudgets([...budgets, { ...newBudget, id }]);
    setIsModalOpen(false);
  };

  const handleEditBudget = (id, updatedBudget) => {
    setBudgets(budgets.map(b => (b.id === id ? { ...updatedBudget, id } : b)));
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;

  const editingBudget = editingId ? budgets.find(b => b.id === editingId) : null;

  return (
    <main className="min-h-screen  text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BudgetHeader 
          onAddClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
          totalBudget={totalBudget}
          totalSpent={totalSpent}
          totalRemaining={totalRemaining}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <BudgetList
              budgets={budgets}
              onEdit={(id) => {
                setEditingId(id);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteBudget}
            />
          </div>
          <div>
            <BudgetChart budgets={budgets} />
          </div>
        </div>

        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
          }}
          onSubmit={(data) => {
            if (editingId) {
              handleEditBudget(editingId, data);
            } else {
              handleAddBudget(data);
            }
          }}
          initialData={editingBudget || undefined}
          categories={Array.from(new Set(['Groceries', 'Dining', 'Entertainment', 'Transportation', 'Utilities', 'Shopping', 'Health', 'Travel']))}
        />
      </div>
    </main>
  );
}
