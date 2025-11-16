import { formatDate } from "../utils/DateFunction";
function RecentTransactions({ transactions }) {
  const limitedData = transactions.slice(0, 3); // Only 3 entries
  

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

      {/* Mobile Version */}
      <div className="md:hidden space-y-4">
        {limitedData.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.account.name}</p>
                <p className="text-sm text-gray-600">{item.category?.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">{item.amount}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-gray-600 font-medium">Name</th>
            <th className="text-left py-3 text-gray-600 font-medium">Category</th>
            <th className="text-left py-3 text-gray-600 font-medium">Amount</th>
            <th className="text-left py-3 text-gray-600 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {limitedData.map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3 text-gray-600 text-left">{formatDate(item.date)}</td>
              <td className="py-3 text-gray-600 text-left">{item.category?.name}</td>
              <td className="py-3 font-medium text-gray-800 flex ">{item.account?.name}</td>
              <td className="py-3 font-medium text-gray-800 text-left">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactions;
