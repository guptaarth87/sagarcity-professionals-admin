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
  apiKey: "AIzaSyCqzvUl2bPpMAF1ziY72VzQY_MbQbPXNKQ",
  authDomain: "sagarcity-professional.firebaseapp.com",
  projectId: "sagarcity-professional",
  storageBucket: "sagarcity-professional.appspot.com",
  messagingSenderId: "1062666514396",
  appId: "1:1062666514396:web:aa663df3c29ebe67a4e919",
  measurementId: "G-TNJSQ7YTVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db=getFirestore(app);
export const storage = getStorage(app);