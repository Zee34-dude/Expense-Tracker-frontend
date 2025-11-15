
import { Plus } from 'lucide-react';
import { StatCard } from '../StatsCards';


export default function BudgetHeader({
    onAddClick,
    totalBudget,
    totalSpent,
    totalRemaining,
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className='text-3xl '>Budget</h1>
                <div>
                    <p className=" mt-2">Track and manage your spending across categories</p>
                </div>
                <button onClick={onAddClick} size="lg" className=" bg-[#0A3594] flex p-2 font-medium text-white gap-2 rounded-sm">
                    <Plus className="w-5 h-5" />
                    Add Budget
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title='Total Budget' amount={totalBudget.toFixed(2)} trendColor="text-green-500" />
                <StatCard title='Total Spent' amount={totalSpent.toFixed(2)} />
                <StatCard title='Remaining' amount={totalRemaining.toFixed(2)} trendColor="text-red-500" />
            </div>
        </div>
    );
}
