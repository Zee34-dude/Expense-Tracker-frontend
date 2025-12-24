import React, { useState, useEffect } from "react";
import { addTransaction } from "../apis/Transaction.api";
import { getCategories } from "../apis/Category.api";
import { fetchAccounts } from "../apis/Account.api";

export default function TransactionModal({ isOpen, onClose, type, onSuccess, showToast }) {
    const [categories, setCategories] = useState([]);
    const [account, setAccount] = useState([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const cats = await getCategories();
                const accs = await fetchAccounts();
                setCategories(cats);
                setAccount(accs);
            } catch (err) {
                console.error("Failed to load:", err);
            }
        }
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        amount: "",
        categoryId: "",
        accountId: "",
        date: "",
        description: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSending(true);

        const payload = {
            type: type.toUpperCase(),
            amount: Number(formData.amount),
            categoryId: Number(formData.categoryId),
            accountId: Number(formData.accountId),
            date: formData.date,
            description: formData.description,
        };

        try {
            await addTransaction(payload);

            // notify dashboard to refresh
            onSuccess();

            onClose(); // close modal
            showToast(`✔ ${type} saved successfully!`);
        } catch (err) {
            console.error("Failed to save transaction:", err);
        } finally {
            setIsSending(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">

                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Add {type}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full border p-2 rounded"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                        }
                    />

                    <select
                        value={formData.categoryId}
                        onChange={(e) =>
                            setFormData({ ...formData, categoryId: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Category</option>
                        {categories?.map((cat) => cat.type == type.toUpperCase() && (
                            <option key={cat.id} value={cat.id}>
                                {cat.name} ({cat.type})
                            </option>
                        ))}
                    </select>

                    <select
                        value={formData.accountId}
                        onChange={(e) =>
                            setFormData({ ...formData, accountId: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Account</option>
                        {account?.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.type}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Description (optional)"
                        className="w-full border p-2 rounded"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-2 border rounded hover:bg-gray-100"
                            disabled={isSending}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={isSending}
                        >
                            {isSending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
