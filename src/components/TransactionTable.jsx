'use client';

import { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { formatDate } from '../utils/DateFunction';

export default function TransactionTable({
  transactions,
  onDelete,
  onEdit,
}) {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'date') {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      aVal = dateA;
      bVal = dateB;
    } else if (sortBy === 'amount') {
      aVal = Math.abs(a.amount);
      bVal = Math.abs(b.amount);
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatAmount = (type,amount) => {
    return `${type == 'EXPENSE' ? '-' : '+'}₦${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-[#F9FAFB]">
            <th className="px-6 py-4 text-left">
              <button
                onClick={() => handleSort('date')}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Description
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Category
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Account
            </th>
            <th className="px-6 py-4 text-left">
              <button
                onClick={() => handleSort('amount')}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                Amount{' '}
                {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => {
          
            return (<tr
              key={transaction.id}
              className={` transition-colors hover:bg-[#dbe2e9] ${index % 2 === 1 ? 'bg-[#F9FAFB]' : ''
                }`}
            >
              <td className="px-6 py-4 text-sm text-foreground">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 text-sm text-foreground text-left">
                {transaction.description}
              </td>
              <td className="px-6 py-4 text-sm text-foreground text-left">
                <span className="inline-block  rounded-md  ">
                  {transaction.category?.name}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-foreground text-left">
                {transaction.account?.name}
              </td>
              <td
                className={`px-6 py-4 text-sm font-semibold text-left ${transaction.type == 'INCOME'
                    ? 'text-green-600'
                    : 'text-red-600'
                  }`}
              >
                {formatAmount(transaction.type,transaction.amount)}
              </td>
              <td className="px-6 py-4 text-sm text-left">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-950 rounded transition-colors"
                    title="Delete transaction"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(transaction.id)}
                    className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-950 rounded transition-colors"
                    title="Edit transaction"
                  >
                    <Edit size={18} />
                  </button>
                </div>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}
