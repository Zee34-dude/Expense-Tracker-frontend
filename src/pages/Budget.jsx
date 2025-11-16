'use client';

import { useState, useEffect } from 'react';
import BudgetHeader from '../components/budget/budget-header';
import BudgetList from '../components/budget/budget-list';
import BudgetModal from '../components/budget/budget-modal';
import BudgetChart from '../components/budget/budget-chart';

import {
  fetchBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  fetchBudgetSpent
} from '../apis/Budget.api';
import { fetchTransactions } from '../apis/Transaction.api';
const budgets1 = [
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
];


export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [transactions, setTransactions] = useState([])

  // 🔥 Load budgets from API
  useEffect(() => {
    const loadBudgets = async () => {
      const data = await fetchBudgets();

      // Fetch spent for each budget in parallel
      const budgetsWithSpent = await Promise.all(
        data.map(async (b) => {
          const spentRes = await fetchBudgetSpent(b.id);
          return {
            ...b,
            spent: spentRes.spent,    // ← REAL spent value
          };
        })
      );

      setBudgets(budgetsWithSpent);
      const fetchData = async () => {
        try {
          const res = await fetchTransactions();

          setTransactions(res);
        } catch (err) {
          console.log(err);
        }
      }

      fetchData();
    };

    loadBudgets();

  }, []);

  // ➕ Create budget
  const handleAddBudget = async (newBudget) => {
    const res = await createBudget(newBudget);
    console.log(res)
    const spentRes = await fetchBudgetSpent(res.budget.id);

    setBudgets([
      ...budgets,
      { ...res.budget, spent: spentRes.spent }
    ]); 
    setIsModalOpen(false);
  };

  // ✏️ Edit budget
  const handleEditBudget = async (id, updatedBudget) => {
    const res = await updateBudget(id, updatedBudget);
    setBudgets(
      budgets.map((b) => (b.id === id ? { ...res, spent: b.spent } : b))
    );
    setEditingId(null);
    setIsModalOpen(false);
  };

  // ❌ Delete budget
  const handleDelete = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const editingBudget = editingId ? budgets.find((b) => b.id === editingId) : null;

  return (
    <main className="min-h-screen text-foreground">
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
              transactions={ transactions}
              onEdit={(id) => {
                setEditingId(id);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>

          <div>
            <BudgetChart budgets={budgets1} />
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
          categories={[
            "Groceries",
            "Dining",
            "Entertainment",
            "Transportation",
            "Utilities",
            "Shopping",
            "Health",
            "Travel"
          ]}
        />
      </div>
    </main>
  );
}

