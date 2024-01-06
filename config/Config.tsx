// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaZTyOOrrZ1T_NWYQuUM-J2m2cD3hOIN0",
  authDomain: "proyectbdii-fd1b7.firebaseapp.com",
  databaseURL: "https://proyectbdii-fd1b7-default-rtdb.firebaseio.com",
  projectId: "proyectbdii-fd1b7",
  storageBucket: "proyectbdii-fd1b7.appspot.com",
  messagingSenderId: "787485630976",
  appId: "1:787485630976:web:c1579cbad0470a72f3eee5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//nos valida para el registro
export const db = getDatabase(app);
