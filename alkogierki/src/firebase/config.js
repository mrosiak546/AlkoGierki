import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCsfvdbgA9ixALjsqPDQvl5zUU59zHNg1g",
  authDomain: "alkogierki-35e0c.firebaseapp.com",
  databaseURL: "https://alkogierki-35e0c-default-rtdb.firebaseio.com",
  projectId: "alkogierki-35e0c",
  storageBucket: "alkogierki-35e0c.firebasestorage.app",
  messagingSenderId: "876135027803",
  appId: "1:876135027803:web:e30ea217da04f81dfb5b7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };