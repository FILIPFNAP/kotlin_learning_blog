// Import and configure Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Your Firebase config (from Firebase Console)
 const firebaseConfig = {
    apiKey: "AIzaSyDw_KBVw-N4EsKrNAbfrIoW3eDHcjlhv1g",
    authDomain: "fnappl.firebaseapp.com",
    projectId: "fnappl",
    storageBucket: "fnappl.firebasestorage.app",
    messagingSenderId: "504759761470",
    appId: "1:504759761470:web:ac922a43cc09ec1d1f6f6f",
    measurementId: "G-82SJ0QLCMQ"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Ensure authentication persists across sessions
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Failed to set persistence:', error);
});