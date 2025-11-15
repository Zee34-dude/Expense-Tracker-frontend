import { FaExpand } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function InsightsChart({ data }) {
  return (
    <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Insights</h3>
        <FaExpand className="text-gray-400 cursor-pointer" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 md:gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-600">Expense</span>
        </div>
        <div className="flex gap-2">
          <select className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm">
            <option>All</option>
          </select>
          <select className="px-2 md:px-3 py-1 border border-gray-300 rounded text-xs md:text-sm">
            <option>This year</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="Income" fill="#2563eb" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expense" fill="#d1d5db" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InsightsChart;


