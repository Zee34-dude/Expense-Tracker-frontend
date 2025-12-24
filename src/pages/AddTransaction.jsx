import React from 'react'
import { addTransaction } from '../apis/Transaction.api'
import { getCategories } from '../apis/Category.api';
import { useState, useEffect } from "react";
import { fetchAccounts } from '../apis/Account.api';




const AddTransaction = () => {
  const [categories, setCategories] = useState([]);
  const [account, setAccount] = useState([])


  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        console.log(data)
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();

    fetchAccounts()
      .then(data => setAccount(data))
      .catch(err => console.error(err))

  }, []);
  // console.log(categories)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    console.log(form)
    const categoryId = Number(form.get("category"))
    const selectedCategory = categories.find(cat => cat.id == categoryId);


    const data = {
      type: selectedCategory.type,
      amount: Number(form.get("amount")),
      categoryId,
      accountId: Number(form.get('account')),
      date: form.get("date"),
      description: form.get("description"),
    };

    console.log("Transaction Data:", data.categoryId);
    console.log('data:', data)

    try {
      const response = await addTransaction(data);
      console.log("Saved:", response);
      // alert("Transaction saved!");

    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
    finally {
      window.location.href = "/transactions";

    }
  };

  return (
    <div className="flex bg-gray-50">


      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <HeaderBar /> */}

        {/* Body */}
        <div className="flex-1 p-8 text-left">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">
              Add Transaction
            </h2>
            <p className="text-gray-500 text-1.5xl mt-1 mb-8">
              Record a new Transaction
            </p>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-9">
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input type="number" name='amount' placeholder="Enter" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select name='category' className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">

                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.type})
                    </option>
                  ))}

                </select>
              </div>

              {/* Account / Wallet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account / Wallet
                </label>
                <select name='account' className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Enter</option>
                  {account?.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input name='date' type="date" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <input name='description' type="text" placeholder="Enter" className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-5 pt-5 pb-6">
                <button type="button" className="px-4 py-2 hover:border hover:border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition" >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" >
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

export default AddTransaction