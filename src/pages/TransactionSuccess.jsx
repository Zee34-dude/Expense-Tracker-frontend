import React from 'react'
import Sidebar from '../components/Sidebar'

import { CheckCircle2 } from 'lucide-react'

const TransactionSuccess = () => {
  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <HeaderBar /> */}

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Success Icon */}
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="text-green-500 w-16 h-16" />

            {/* Text */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Transaction Added successfully!
              </h2>
              <p className= "text-sm mt-1">
                Your new transaction has been recorded and added to your list
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4 text-sm md:text-l">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
                Add Another
              </button>
              <button className="px-4 py-2 bg-[#0A3594] text-white rounded-md hover:bg-blue-700 transition">
                View Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionSuccess