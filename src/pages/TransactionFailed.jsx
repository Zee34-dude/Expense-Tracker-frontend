import React from 'react'


const AddTransactionFailed = () => {
  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <HeaderBar /> */}

        <p className="mb-4 font-medium flex items-center justify-left px-18 py-5">
          <span className="text-4xl mr-2 mb-2 text-red-600">•</span>
          Transaction failed to save. Please try again.
        </p>

        {/* Body */}
        <div className="flex-1 px-8 text-left">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Add Transaction</h2>
            <p className="text-gray-500 text-sm mt-1 mb-8">
              Record a new income or expense
            </p>

            <form className="space-y-5">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                
                <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Enter</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input type="number" placeholder="Enter" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Enter</option>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Utilities</option>
                </select>
              </div>

              {/* Account / Wallet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account / Wallet
                </label>
                <select className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Enter</option>
                  <option>Main Wallet</option>
                  <option>Bank</option>
                  <option>Cash</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>

                <input type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <input type="text" placeholder="Enter" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-5 pt-5 pb-6">
                <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#0A3594] text-white rounded-md hover:bg-blue-700 transition">
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionFailed