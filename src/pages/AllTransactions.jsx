import { useEffect, useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import SearchIcon from '../assets/Vector (5).png';
import { ChevronDownIcon, PlusIcon } from 'lucide-react';
import CreateTransactions from '../components/Create_transaction';
import { fetchTransactions, deleteTransaction } from '../apis/Transaction.api';
import { getCategories } from '../apis/Category.api';
import { useNavigate } from 'react-router-dom';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("Newest");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const [showDateDropdown, setShowDateDropdown] = useState(false);

    const handleDelete = async (id) => {
        await deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    // Load transactions + categories
    useEffect(() => {
        const loadData = async () => {
            try {
                const tx = await fetchTransactions();
                const cat = await getCategories();

                // Normalize categories for dropdown
                const categoryNames = ["All", ...cat.map(c => c.name)];
                setCategories(categoryNames);

                // Normalize transactions so t.category is always a string
                const normalizedTx = tx.map(t => ({
                    ...t,
                    category: typeof t.category === "object"
                        ? t.category.name
                        : t.category
                }));

                setTransactions(normalizedTx);
            } catch (err) {
                console.log(err);
            }
        };

        loadData();
    }, []);

    // Apply filters
    const filteredTransactions = transactions
        // Category filter
        .filter(t =>
            categoryFilter === "All" ? true : t.category === categoryFilter
        )
        // Search filter (by description OR category)
        .filter(t => {
            if (searchQuery.trim() === "") return true;
            const q = searchQuery.toLowerCase();
            return (
                t.description.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        })
        // Sort
        .sort((a, b) =>
            dateFilter === "Newest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

    // Resets all filters
    const resetFilters = () => {
        setCategoryFilter("All");
        setSearchQuery("");
        setDateFilter("Newest");
    };

    const noResults = filteredTransactions.length === 0;
    const showResetBelow = categoryFilter !== "All" || searchQuery.trim() !== "";
    console.log(transactions)
    return (
        <main className={`${transactions?.length > 0 ? 'h-screen' : 'overflow'} bg-background p-6`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center w-full gap-40 mb-8">

                    {/* Title */}
                    <h1 className="text-3xl">Transactions</h1>

                    {/* Filters */}
                    <div className="flex gap-10">

                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <i className="w-4 h-4">
                                <img src={SearchIcon} alt="" />
                            </i>
                            <input
                                type="text"
                                placeholder="Search transactions"
                                className="text-[#555454] font-medium outline-none bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Date Filter */}
                        <div
                            className="font-medium flex items-center gap-1 relative cursor-pointer"
                            onClick={() => setShowDateDropdown(!showDateDropdown)}
                        >
                            <span>{dateFilter}</span>
                            <ChevronDownIcon size={20} />

                            {showDateDropdown && (
                                <div className="absolute top-7 left-0 bg-white shadow-md rounded p-2 z-10 w-32">
                                    <div
                                        onClick={() => { setDateFilter("Newest"); setShowDateDropdown(false); }}
                                        className="cursor-pointer hover:bg-gray-100 p-1"
                                    >
                                        Newest
                                    </div>
                                    <div
                                        onClick={() => { setDateFilter("Oldest"); setShowDateDropdown(false); }}
                                        className="cursor-pointer hover:bg-gray-100 p-1"
                                    >
                                        Oldest
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Category Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="border border-gray-300 p-2 rounded font-medium bg-white cursor-pointer"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        {/* Add Transaction Button */}
                        <button
                            onClick={() => navigate('/transactions/add')}
                            className="bg-[#0A3594] flex p-2 font-medium text-white gap-2 rounded-sm"
                        >
                            <PlusIcon size={20} className="text-white" /> Transactions
                        </button>
                    </div>

                </div>

                {/* No matching results */}
                {noResults  && !transactions && (
                    <div className="text-center mt-20">
                        <p className="text-xl font-semibold mb-4 text-gray-600">
                            No transactions found for this category or search.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Transactions Table */}
                {!noResults ? (
                    <>
                        <TransactionTable
                            transactions={filteredTransactions}
                            onDelete={handleDelete}
                            onEdit={console.log}
                        />

                        {/* Reset Below Table */}
                        {showResetBelow && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </>
                ) : transactions?.length === 0 ? (
                    <CreateTransactions />
                ) : null}

            </div>
        </main>
    );
};

export default AllTransactions;
