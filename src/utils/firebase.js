import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "ju5tanetflix.firebaseapp.com",
  projectId: "ju5tanetflix",
  storageBucket: "ju5tanetflix.appspot.com",
  messagingSenderId: "769029131224",
  appId: "1:769029131224:web:e0b47cad7272c0ad5c40ad",
  measurementId: "G-LENGJF7W4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export default app;
