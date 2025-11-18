import { useState, useMemo } from "react";
import { formatDate } from "../utils/DateFunction";

function RecentTransactions({ transactions }) {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This year");

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const catSet = new Set();
    transactions.forEach(t => {
      if (t.category?.name) catSet.add(t.category.name);
    });
    return ["All", ...Array.from(catSet)];
  }, [transactions]);

  // Filter transactions based on selected filters
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(t => t.category?.name === categoryFilter);
    }

    // Date filter
    const now = new Date();
    if (dateFilter === "This year") {
      filtered = filtered.filter(t => new Date(t.date).getFullYear() === now.getFullYear());
    } else if (dateFilter === "This month") {
      filtered = filtered.filter(t => {
        const d = new Date(t.date);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      });
    } else if (dateFilter === "This week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filtered = filtered.filter(t => new Date(t.date) >= oneWeekAgo);
    }

    return filtered.slice(0, 3); // limit to 3 entries
  }, [transactions, categoryFilter, dateFilter]);

  return (
    <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Recent transactions</h3>
        <div className="flex gap-2">
          {/* Category Filter */}
          <select
            className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option>This year</option>
            <option>This month</option>
            <option>This week</option>
          </select>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden space-y-4">
        {filteredTransactions.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.amount}</p>
                <p className="text-sm text-gray-600">{item.category?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{item.account.type}</p>
                <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-gray-600 font-medium">Account</th>
            <th className="text-left py-3 text-gray-600 font-medium">Category</th>
            <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
            <th className="text-left py-3 text-gray-600 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="text-left py-3 text-gray-600">{item.account.type}</td>
              <td className="text-left py-3 text-gray-600">{item.category?.name}</td>
              <td className="text-left py-3 font-medium text-gray-800">{item.amount}</td>
              <td className="text-left py-3 font-medium text-gray-800">{formatDate(item.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;
