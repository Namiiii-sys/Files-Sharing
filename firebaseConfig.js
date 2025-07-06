// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcuuACJhrc2CgRmbpTxfoSP7CleXmiakc",
  authDomain: "filesharing-ee7da.firebaseapp.com",
  projectId: "filesharing-ee7da",
  storageBucket: "filesharing-ee7da.firebasestorage.app",
  messagingSenderId: "666141370251",
  appId: "1:666141370251:web:3e19accfad8fea441eb18e",
  measurementId: "G-FLKMTB15J1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
