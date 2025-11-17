import { auth } from "../config/firebase";
import { fetchTransactionSummary, fetchMonthlySummary, fetchTransactions, } from "../apis/Transaction.api";
import { fetchBudgets, fetchBudgetSpent } from "../apis/Budget.api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";



import StatsCards from "../components/StatsCards";
import InsightsChart from "../components/InsightsChart";
import BudgetCard from "../components/BudgetCard";
import BillsCard from "../components/BillsCard";
import RecentTransactions from "../components/RecentTransactions";
import ActionButtons from "../components/ActionButtons";

// Sample data for the chart - in real app this would come from API
const data = [
  { name: "Jan", Income: 3000, Expense: 2000 },
  { name: "Feb", Income: 5000, Expense: 3000 },
  { name: "Mar", Income: 8000, Expense: 5000 },
  { name: "Apr", Income: 12000, Expense: 7000 },
  { name: "May", Income: 15000, Expense: 9000 },
  { name: "Jun", Income: 19000, Expense: 12000 },
  { name: "Jul", Income: 25000, Expense: 15000 },
];

function Dashboard() {
  const { user } = useContext(UserContext)
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [previousType, setPreviousType] = useState(null);
  const [budgets, setBudgets] = useState([]);

  const [type, setType] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  })
  const getMonthlySummary = () => {
    fetchMonthlySummary()
      .then((res) => setChartData(res))
      .catch((err) => console.log(err));
  };
  const getTransactions = async () => {
    fetchTransactions()
      .then((res) => { setTransactions(res) })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    const savedPrevious = localStorage.getItem('previousType');
    if (savedPrevious) {
      setPreviousType(JSON.parse(savedPrevious));
    }

    const getTransactionAmount = async () => {
      try {
        setLoadingSummary(true);

        const summary = await fetchTransactionSummary();

        setType({
          totalIncome: summary.totalIncome,
          totalExpense: summary.totalExpense,
          balance: summary.balance,
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSummary(false);
      }
    };




    getTransactionAmount();
    getMonthlySummary();
    getTransactions()
  }, []);
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

    };

    loadBudgets();

  }, []);



  const refreshDashboard = async () => {
    setLoadingDashboard(true); // show loading
    try {
      const res = await fetchTransactionSummary(); // or your API call
      if (type) {
        const prev = JSON.stringify(type);
        localStorage.setItem('previousType', prev);
        setPreviousType(type);
      }
      setType({
        totalIncome: res.totalIncome,
        totalExpense: res.totalExpense,
        balance: res.balance
      });
      getMonthlySummary();
      getTransactions()
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoadingDashboard(false); // hide loading
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {loadingDashboard && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50">
          <p className="text-xl font-semibold text-white">Updating...</p>
        </div>
      )}
      {/* Main Content */}
      <div className="flex-1">


        {/* Dashboard Content */}
        <div className="p-4 md:p-6">

          <StatsCards type={type} loading={loadingSummary} previousType={previousType} />

          {/* Middle Row - Insights and Budget/Bills */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <InsightsChart data={chartData || data} />
            <div className="space-y-4 md:space-y-6">
              <BudgetCard budgets={budgets} />
              <BillsCard />
            </div>
          </div>

          {/* Bottom Row - Recent Transactions and Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <RecentTransactions transactions={transactions} />
            <ActionButtons refreshDashboard={refreshDashboard} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
