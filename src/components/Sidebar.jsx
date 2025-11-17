import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaExchangeAlt,
  FaWallet,
  FaCog,
  FaChartPie,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ firstName }) {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { path: "/budget", label: "Budget", icon: <FaWallet /> },
    { path: "/reports", label: "Reports", icon: <FaChartPie /> },
  ];

  return (
    <div className="hidden md:flex w-64 bg-blue-50 p-6 flex-col justify-between fixed top-0 bottom-0 left-0">
      {/* Top Section */}
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Hi, {firstName}</h1>
          <p className="text-gray-600 text-sm">Ready to manage your finances?</p>
        </div>

        {/* 🔹 Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            // Highlight if pathname starts with the item's path (covers nested routes)
            const isActive =
              item.path === "/"
                ? pathname === "/" // dashboard exact match
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Links */}
      <div className="space-y-2">
        <Link
          to="/help"
          className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
            pathname.includes("/help")
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-blue-100"
          }`}
        >
          <FaQuestionCircle /> Help
        </Link>

        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-100 rounded-lg w-full text-left"
        >
          <FaSignOutAlt /> Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
