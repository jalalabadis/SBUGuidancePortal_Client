// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAh3wnPiHLpfovXY13GC0oRs2lRkZS5lLg",
  authDomain: "shop-recharge.firebaseapp.com",
  databaseURL: "https://shop-recharge-default-rtdb.firebaseio.com",
  projectId: "shop-recharge",
  storageBucket: "shop-recharge.appspot.com",
  messagingSenderId: "96912889881",
  appId: "1:96912889881:web:bcbf4d4b330d015a77f288",
  measurementId: "G-YX7FNQBRGQ"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);