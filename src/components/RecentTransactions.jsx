import { FaExpand, FaShoppingBag, FaCar, FaGraduationCap } from "react-icons/fa";

function RecentTransactions() {
  return (
    <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Recent transactions</h3>
        <div className="flex gap-2">
          <select className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm">
            <option>All</option>
          </select>
          <select className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm">
            <option>This year</option>
          </select>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
              <FaShoppingBag className="text-pink-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Personal Care</p>
              <p className="text-sm text-gray-600">Shopping</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₦10,000</p>
              <p className="text-sm text-gray-600">25, Jul</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <FaCar className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Auto Maintenance</p>
              <p className="text-sm text-gray-600">Transport</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₦13,000</p>
              <p className="text-sm text-gray-600">15, Jul</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-cyan-100 rounded flex items-center justify-center">
              <FaGraduationCap className="text-cyan-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">School Fees</p>
              <p className="text-sm text-gray-600">Education</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₦5,000</p>
              <p className="text-sm text-gray-600">15, Jul</p>
            </div>
          </div>
        </div>
      </div>

      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-gray-600 font-medium">Name</th>
            <th className="text-left py-3 text-gray-600 font-medium">Category</th>
            <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
            <th className="text-left py-3 text-gray-600 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="space-y-2">
          <tr className="border-b border-gray-100">
            <td className="py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                  <FaShoppingBag className="text-pink-600 text-sm" />
                </div>
                <span className="font-medium text-gray-800">Personal Care</span>
              </div>
            </td>
            <td className="py-3 text-gray-600">Shopping</td>
            <td className="py-3 font-medium text-gray-800">₦10,000</td>
            <td className="py-3 text-gray-600">25, Jul</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <FaCar className="text-blue-600 text-sm" />
                </div>
                <span className="font-medium text-gray-800">Auto Maintenance</span>
              </div>
            </td>
            <td className="py-3 text-gray-600">Transport</td>
            <td className="py-3 font-medium text-gray-800">₦13,000</td>
            <td className="py-3 text-gray-600">15, Jul</td>
          </tr>
          <tr>
            <td className="py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded flex items-center justify-center">
                  <FaGraduationCap className="text-cyan-600 text-sm" />
                </div>
                <span className="font-medium text-gray-800">School Fees</span>
              </div>
            </td>
            <td className="py-3 text-gray-600">Education</td>
            <td className="py-3 font-medium text-gray-800">₦5,000</td>
            <td className="py-3 text-gray-600">15, Jul</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;


