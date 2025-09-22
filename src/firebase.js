// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBk1VwgnXGm3xsg34AUAu474c4TVny3NFE",
    authDomain: "lapostriza-project.firebaseapp.com",
    projectId: "lapostriza-project",
    storageBucket: "lapostriza-project.firebasestorage.app",
    messagingSenderId: "148874867471",
    appId: "1:148874867471:web:e0018e3573fa1ce1f1847a",
    measurementId: "G-WZLQMDR33X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };