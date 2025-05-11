// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx5Zkle839xQQWvbSdf3YG_QXzFFnZVsU",
  authDomain: "mywebapp-9440b.firebaseapp.com",
  projectId: "mywebapp-9440b",
  storageBucket: "mywebapp-9440b.firebasestorage.app",
  messagingSenderId: "293873067781",
  appId: "1:293873067781:web:9223792276536de748b96c",
  measurementId: "G-HKCCPTG9G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);