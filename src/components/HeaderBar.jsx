import { useState } from "react";
import { FaHome, FaSearch, FaBell, FaUser, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function HeaderBar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 fixed left-64 right-0 z-10">
      <div className="flex justify-between items-center">
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-gray-600">
            <FaHome className="text-xl" />
          </button>
        </div>

        <div className="hidden md:block"></div>

        {/* Right Section */}
        <div className="relative flex items-center gap-2 md:gap-4">
          <FaSearch className="text-gray-400 text-lg cursor-pointer" />
          <FaBell className="text-gray-400 text-lg cursor-pointer" />

          {/* Profile + Dropdown */}
          <div
            className="flex items-center gap-2 md:gap-3 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm md:text-base" />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                {user?.displayName}
              </p>
              <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
            </div>
            <FaChevronDown className="text-gray-500 text-xs" />
          </div>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-12 bg-white shadow-lg border rounded-lg w-40 py-2 z-20 text-sm animate-fadeIn">
              <button
                onClick={() => navigate("/user-profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                View Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
