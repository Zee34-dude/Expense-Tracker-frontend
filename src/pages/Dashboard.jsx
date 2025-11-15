import { auth } from "../config/firebase";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
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
  const {user}=useContext(UserContext)
  useEffect(() => {
    console.log(user)
  })
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1">

        {/* Dashboard Content */}
        <div className="p-4 md:p-6">

          <StatsCards />

          {/* Middle Row - Insights and Budget/Bills */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <InsightsChart data={data} />
            <div className="space-y-4 md:space-y-6">
              <BudgetCard />
              <BillsCard />
            </div>
          </div>

          {/* Bottom Row - Recent Transactions and Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <RecentTransactions />
            <ActionButtons />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
