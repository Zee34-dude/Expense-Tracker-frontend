import axios from "axios";
import { auth } from "../config/firebase";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL + "/budget";

// Helper: Get Firebase ID Token
const getAuthHeader = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// ✅ Get all budgets
export const fetchBudgets = async () => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.get(API_URL, headers);
        return res.data;
    } catch (error) {
        console.error("Error fetching budgets:", error);
        throw error;
    }
};

// ✅ Get a single budget by ID
export const fetchBudgetById = async (id) => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.get(`${API_URL}/${id}`, headers);
        return res.data;
    } catch (error) {
        console.error("Error fetching budget:", error);
        throw error;
    }
};

// ✅ Create a new budget
export const createBudget = async (data) => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.post(API_URL, data, headers);
        return res.data;
    } catch (error) {
        console.error("Error creating budget:", error);
        throw error;
    }
};

// ✅ Update an existing budget
export const updateBudget = async (id, data) => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.put(`${API_URL}/${id}`, data, headers);
        return res.data;
    } catch (error) {
        console.error("Error updating budget:", error);
        throw error;
    }
};

// ✅ Delete a budget
export const deleteBudget = async (id) => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.delete(`${API_URL}/${id}`, headers);
        return res.data;
    } catch (error) {
        console.error("Error deleting budget:", error);
        throw error;
    }
};

export const fetchBudgetSpent = async (budgetId) => {
    try {
        const headers = await getAuthHeader();
        const res = await axios.get(`${API_URL}/${budgetId}/spent`, headers);
        return res.data;
    } catch (error) {
        console.error("Error fetching budget:", error);
        throw error;
    }
};

