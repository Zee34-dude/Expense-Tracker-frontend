import axios from "axios";
import { auth } from "../config/firebase";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL + "/account";

const getAuthHeader = async () => {
    const token = await auth.currentUser?.getIdToken();
    console.log('token:', token)
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
// Set your backend base URL



// GET all accounts
export const fetchAccounts = async () => {
    try {
        const headers = await getAuthHeader()
        const res = await axios.get(API_URL, headers)

        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// GET single account by ID
export const fetchAccountById =async (accountId) => {
    try {
        const headers = await getAuthHeader()
        const res = await axios.get(API_URL +`/${accountId}`, headers)

        return res.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// CREATE new account
export const createAccount = (data) => API.post("/", data);

// UPDATE an account
export const updateAccount = (accountId, data) => API.put(`/${accountId}`, data);

// DELETE an account
export const deleteAccount = (accountId) => API.delete(`/${accountId}`);
