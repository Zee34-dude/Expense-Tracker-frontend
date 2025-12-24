import { useEffect, useState } from "react";
import { fetchTransactions } from "../apis/Transaction.api";
import { fetchBudgets, fetchBudgetSpent } from "../apis/Budget.api";

import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ReportPage() {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const tx = await fetchTransactions();
        const bg = await fetchBudgets();

        // Fetch spent amounts for each budget
        const budgetsWithSpent = await Promise.all(
            bg.map(async (b) => {
                const spentRes = await fetchBudgetSpent(b.id);
                return { ...b, spent: spentRes.spent || 0 };
            })
        );

        setTransactions(tx);
        setBudgets(budgetsWithSpent);
    }

    // --------------------------
    // 1. SUMMARY CARDS
    // --------------------------
    const totalIncome = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    const topCategory = (() => {
        const categoryTotals = {};
        transactions.forEach((t) => {
            if (t.type === "EXPENSE") {
                categoryTotals[t.category?.name || t.category] =
                    (categoryTotals[t.category?.name || t.category] || 0) + t.amount;
            }
        });
        const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
        return sorted[0]?.[0] || "None";
    })();

    // --------------------------
    // 2. INCOME VS EXPENSE (Bar Chart)
    // --------------------------
    const incomeExpenseData = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                label: "Amount (₦)",
                data: [totalIncome, totalExpenses],
                backgroundColor: ["#10B981", "#EF4444"], // green for income, red for expenses
            },
        ],
    };

    // --------------------------
    // 3. CATEGORY PIE CHART
    // --------------------------
    const categoryTotals = {};
    transactions.forEach((t) => {
        if (t.type === "EXPENSE") {
            const name = t.category?.name || t.category;
            categoryTotals[name] = (categoryTotals[name] || 0) + t.amount;
        }
    });
    const categoryColors = [
        "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#14B8A6",
        "#F43F5E", "#EAB308", "#6366F1", "#EC4899"
    ];

    const pieData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: categoryColors.slice(0, Object.keys(categoryTotals).length),
                borderWidth: 1,
            },
        ],
    };


    // --------------------------
    // 4. TOP CATEGORIES (List)
    // --------------------------
    const topCategories = Object.entries(categoryTotals)
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    // --------------------------
    // 5. Budgets performance
    // --------------------------
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpentBudget = budgets.reduce((sum, b) => sum + b.spent, 0);

    // --------------------------
    // EXPORT CSV
    // --------------------------
    const downloadCSV = () => {
        const rows = [
            ["INCOME", totalIncome],
            ["EXPENSES", totalExpenses],
            ["NET BALANCE", netBalance],
            [],
            ["CATEGORY", "AMOUNT"],
            ...Object.entries(categoryTotals),
        ];

        let csvContent =
            "data:text/csv;charset=utf-8," +
            rows.map((e) => e.join(",")).join("\n");

        const encoded = encodeURI(csvContent);
        const link = document.createElement("a");
        link.href = encoded;
        link.download = "financial-report.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Financial Report</h1>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="px-8 py-10 bg-white shadow rounded-xl">
                    <h3 className="font-semibold">Total Income</h3>
                    <p className="text-2xl font-bold text-green-600">
                        ₦{totalIncome.toLocaleString()}
                    </p>
                </div>

                <div className="px-8 py-10 bg-white shadow rounded-xl">
                    <h3 className="font-semibold">Total Expenses</h3>
                    <p className="text-2xl font-bold text-red-500">
                        ₦{totalExpenses.toLocaleString()}
                    </p>
                </div>

                <div className="px-8 py-10 bg-white shadow rounded-xl">
                    <h3 className="font-semibold">Net Balance</h3>
                    <p className="text-2xl font-bold">
                        ₦{netBalance.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Income vs Expense */}
                <div className="bg-white shadow p-4 rounded-xl">
                    <h3 className="font-bold mb-2">Income vs Expenses</h3>
                    <Bar data={incomeExpenseData} />
                </div>

                {/* Spending Breakdown */}
                <div className="bg-white shadow p-4 rounded-xl">
                    <h3 className="font-bold mb-2">Spending Breakdown</h3>
                    <Pie data={pieData} />
                </div>

            </div>

            {/* TOP CATEGORIES */}
            <div className="bg-white shadow rounded-xl p-4 mt-10">
                <h3 className="font-bold text-xl mb-4">Top Spending Categories</h3>

                {topCategories.map((cat, i) => (
                    <div key={i} className="flex justify-between py-2 border-b last:border-0">
                        <span className="font-medium">{cat.name}</span>
                        <span className="font-bold">₦{cat.amount.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* BUDGET PERFORMANCE */}
            <div className="bg-white shadow rounded-xl p-4 mt-10">
                <h3 className="font-bold text-xl mb-4">Budget Performance</h3>

                <p className="font-semibold mb-2">
                    Total Budget: ₦{totalBudget.toLocaleString()}
                </p>
                <p className="font-semibold mb-4">
                    Total Spent: ₦{totalSpentBudget.toLocaleString()}
                </p>

                {budgets.map((b) => {
                    const percent = b.limit > 0 ? (b.spent / b.limit) * 100 : 0;

                    return (
                        <div key={b.id} className="mb-4">
                            <div className="flex justify-between">
                                <span>{b.name}</span>
                                <span>
                                    ₦{b.spent.toLocaleString()} / ₦{b.limit.toLocaleString()}
                                </span>
                            </div>

                            <div className="w-full bg-gray-200 h-2 rounded">
                                <div
                                    className="bg-blue-500 h-2 rounded"
                                    style={{ width: `₦{percent}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* DOWNLOAD CSV BUTTON */}
            <div className="mt-10 flex justify-end">
                <button
                    onClick={downloadCSV}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
                >
                    Download CSV Report
                </button>
            </div>
        </main>
    );
}
