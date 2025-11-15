// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // optional
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBckEPlIO92O9700sr6Vg_Lmzh1I2kT-tY",
  authDomain: "expense-tracker-429b6.firebaseapp.com",
  projectId: "expense-tracker-429b6",
  storageBucket: "expense-tracker-429b6.firebasestorage.app",
  messagingSenderId: "270567359871",
  appId: "1:270567359871:web:e16ff243ca05fd888a864a",
  measurementId: "G-0S5EX2ZRVV"
};






// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const Provider = new GoogleAuthProvider();
const storage = getStorage(app);
const database = getDatabase(app);
const db = getFirestore(app);

export {db, app, auth, database, Provider, storage }