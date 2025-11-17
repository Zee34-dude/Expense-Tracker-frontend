// HelpPage.jsx
import { Link } from 'react-router-dom';

export default function HelpPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker Documentation</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p>
          This application helps you manage your finances by tracking your expenses,
          budgets, and transactions. You can add, edit, and delete transactions,
          monitor spending categories, and generate reports.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <ul className="list-disc list-inside">
          <li>Add new transactions via the "Add Transaction" button.</li>
          <li>Edit or delete existing transactions using the corresponding buttons in the table.</li>
          <li>Transactions include a date, description, category, account, and amount.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <ul className="list-disc list-inside">
          <li>Categories organize your expenses (e.g., Groceries, Entertainment).</li>
          <li>Use the dropdown filter to view transactions by category.</li>
          <li>New categories can be added through the category management section.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Budgets</h2>
        <ul className="list-disc list-inside">
          <li>Create budgets per category and track spending against them.</li>
          <li>Budgets show total allocated amount, total spent, and remaining balance.</li>
          <li>Over-budget transactions are highlighted for easy tracking.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Reports</h2>
        <ul className="list-disc list-inside">
          <li>Generate financial reports summarizing income, expenses, and net balance.</li>
          <li>View charts for income vs expenses and category spending breakdowns.</li>
          <li>Download CSV reports for external analysis or record keeping.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search & Filters</h2>
        <ul className="list-disc list-inside">
          <li>Search transactions by description or category using the search bar.</li>
          <li>Filter transactions by category or date (Newest / Oldest).</li>
          <li>If no transactions match your filter, a reset button will restore the full list.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">External References</h2>
        <p>
          For further reading on best practices for expense tracking and budgeting:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <a 
              href="https://www.adobe.com/uk/acrobat/resources/expense-report-tracker-template.html"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Adobe Expense Report Template & Guide
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/Tomu98/Expense-Tracker-API" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Expense Tracker API Documentation (GitHub)
            </a>
          </li>
        </ul>
      </section>

      <div className="mt-8">
        <Link to="/" className="text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
