// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBsd2cd-VBTdmvP13z5Q_DgS0aRB5_alo",
  authDomain: "sagacity-7ee36.firebaseapp.com",
  projectId: "sagacity-7ee36",
  storageBucket: "sagacity-7ee36.appspot.com",
  messagingSenderId: "488620016441",
  appId: "1:488620016441:web:7b6bbc94df6c8581151ee8",
  measurementId: "G-1EW0VLB58G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app);
export const storage = getStorage(app);