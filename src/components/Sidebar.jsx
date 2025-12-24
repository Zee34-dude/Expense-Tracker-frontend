import { useState } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaExchangeAlt,
  FaWallet,
  FaChartPie,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ firstName }) {
  const location = useLocation();
  const pathname = location.pathname;

  const [showPopup, setShowPopup] = useState(false); // controls popup visibility
  const [loggingOut, setLoggingOut] = useState(false); // optional loading state

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { path: "/budget", label: "Budget", icon: <FaWallet /> },
    { path: "/reports", label: "Reports", icon: <FaChartPie /> },
  ];

  const handleSignOutClick = () => {
    setShowPopup(true);
  };

  const confirmSignOut = () => {
    setLoggingOut(true);

    setTimeout(() => {
      signOut(auth);
    }, 1200); // 1.2 sec delay
  };

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-blue-50 p-6 flex-col justify-between fixed top-0 bottom-0 left-0">
        {/* Top Section */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Hi, {firstName}
            </h1>
            <p className="text-gray-600 text-sm">
              Ready to manage your finances?
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
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
            onClick={handleSignOutClick}
            className="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-100 rounded-lg w-full text-left"
          >
            <FaSignOutAlt /> Log out
          </button>
        </div>
      </div>

      {/* Custom Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Sign Out
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out?
            </p>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                className="w-1/2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setShowPopup(false)}
              >
                No
              </button>

              <button
                className="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={confirmSignOut}
                disabled={loggingOut}
              >
                {loggingOut ? "Signing out..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
