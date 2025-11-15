import { FaHome, FaSearch, FaBell, FaUser } from "react-icons/fa";

function HeaderBar({ user }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 fixed left-64 right-0">
      <div className="flex justify-between items-center">
        <div className="md:hidden">
          <button className="text-gray-600">
            <FaHome className="text-xl" />
          </button>
        </div>
        <div className="hidden md:block"></div>
        <div className="flex items-center gap-2 md:gap-4">
          <FaSearch className="text-gray-400 text-lg cursor-pointer" />
          <FaBell className="text-gray-400 text-lg cursor-pointer" />
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-sm md:text-base" />
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-800 text-sm md:text-base">{user?.displayName}</p>
              <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;


