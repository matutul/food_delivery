import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEdUJ6lF4IdVYvYtjvxJSl3bj1_Cyk_14",
  authDomain: "restaurant-f8f25.firebaseapp.com",
  databaseURL: "https://restaurant-f8f25-default-rtdb.firebaseio.com",
  projectId: "restaurant-f8f25",
  storageBucket: "restaurant-f8f25.appspot.com",
  messagingSenderId: "264534567000",
  appId: "1:264534567000:web:be9a79ed286c6aa1c8022d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };