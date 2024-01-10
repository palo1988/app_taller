import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

export const db = getDatabase(app); // base de datos

//export const auth = getAuth(app)
////////

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
