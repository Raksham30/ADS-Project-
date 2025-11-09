// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA40excdiL1tQGpUc4IpYKsJEfkj9Emo3c",
  authDomain: "ads-project-69ee6.firebaseapp.com",
  projectId: "ads-project-69ee6",
  storageBucket: "ads-project-69ee6.appspot.com", // ✅ FIXED
  messagingSenderId: "128829481255",
  appId: "1:128829481255:web:5c4a6ea8217fbe36968902",
  measurementId: "G-X4MG369Z9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services Export
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
