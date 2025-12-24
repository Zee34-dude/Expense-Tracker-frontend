import { FaPlus } from "react-icons/fa";
import { useState,useContext } from "react";
import TransactionModal from "./TransactionModal";
import { UserContext } from "../context/UserContext";


function ActionButtons({ refreshDashboard }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const { toast, setToast } = useContext(UserContext)

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="space-y-3 md:space-y-4">

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        onSuccess={refreshDashboard}
        showToast={(msg) => setToast(msg)}
      />

      {/* Income Button */}
      <button
        className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
        onClick={() => openModal("Income")}
      >
        <FaPlus className="text-base md:text-lg" />
        Income
      </button>

      {/* Expense Button */}
      <button
        className="w-full bg-cyan-500 text-white p-3 md:p-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 font-medium hover:bg-cyan-600 transition-colors text-sm md:text-base"
        onClick={() => openModal("Expense")}
      >
        <FaPlus className="text-base md:text-lg" />
        Expense
      </button>
    </div>
  );
}

export default ActionButtons;



