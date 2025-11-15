import axios from "axios";
import { auth } from "../config/firebase";


// Base API URL
const API_URL = import.meta.env.VITE_API_URL + "/categories";

// Helper: Get Firebase ID Token
const getAuthHeader = async () => {
    const token = await auth.currentUser?.getIdToken();
    console.log('token:', token)
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
// Get all categories
export const getCategories = async () => {
    try {
        const headers = await getAuthHeader()
        const res = await axios.get(API_URL, headers)

        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Create a new category
export const createCategory = async (data) => {
    try {
        const res = await axios.post("/categories", data);
        return res.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Update category
export const updateCategory = async (id, data) => {
    try {
        const res = await axios.put(`/categories/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// Delete category
export const deleteCategory = async (id) => {
    try {
        const res = await axios.delete(`/categories/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
