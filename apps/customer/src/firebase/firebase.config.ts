// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDljqUBQgiiMYdiYMFhUR3LkljsG6AmQO8",
  authDomain: "seguros-vehiculares-23ae4.firebaseapp.com",
  projectId: "seguros-vehiculares-23ae4",
  storageBucket: "seguros-vehiculares-23ae4.firebasestorage.app",
  messagingSenderId: "539343908505",
  appId: "1:539343908505:web:c5d7b9bde40a486e205208"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };


