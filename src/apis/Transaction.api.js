import axios from "axios";
import { auth } from "../config/firebase";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL + "/transactions";

// Helper: Get Firebase ID Token
const getAuthHeader = async () => {
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ----------------------
// Transaction API Calls
// ----------------------

/**
 * Get all transactions for the logged-in user
 */
export const fetchTransactions = async () => {
  try {
    const headers = await getAuthHeader();
    const res = await axios.get(API_URL, headers);
    console.log('api', res.data)
    return res.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

/**
 * Add a new transaction
 * @param {Object} data - transaction data
 */
export const addTransaction = async (data) => {
  try {
    const headers = await getAuthHeader();
    const res = await axios.post(API_URL, data, headers);
    return res.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

/**
 * Update an existing transaction
 * @param {String} id - transaction ID
 * @param {Object} data - updated transaction data
 */
export const updateTransaction = async (id, data) => {
  try {
    const headers = await getAuthHeader();
    const res = await axios.put(`${API_URL}/${id}`, data, headers);
    return res.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

/**
 * Delete a transaction
 * @param {String} id - transaction ID
 */
export const deleteTransaction = async (id) => {
  try {
    const headers = await getAuthHeader();
    const res = await axios.delete(`${API_URL}/${id}`, headers);
    return res.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

/**
 * Get summary: total income, total expenses, balance
 */
export const fetchTransactionSummary = async () => {
  try {
    const headers = await getAuthHeader();
    const res = await axios.get(`${API_URL}/summary`, headers);
    return res.data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    throw error;
  }
};
export const fetchMonthlySummary= async()=> {
  try {
    const headers = await getAuthHeader();
    const res = await axios.get(`${API_URL}/monthly-summary`, headers);
    console.log(res.data)
    return res.data
  } catch (err) {
    console.error("Fetch monthly summary failed:", err);
  }
}
