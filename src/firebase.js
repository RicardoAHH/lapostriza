// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // Si la variable de Vite existe, úsala. Si no, usa la de Vercel.
    // Esto hace el código compatible con ambos entornos.
    apiKey: import.meta.env.VITE_API_KEY || process.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID || process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };