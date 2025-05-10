
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTrAKJPw6jgnMIjMSVN2VDSM1xsR_4t38",
  authDomain: "movie-app-f07cb.firebaseapp.com",
  projectId: "movie-app-f07cb",
  storageBucket: "movie-app-f07cb.firebasestorage.app",
  messagingSenderId: "773964993372",
  appId: "1:773964993372:web:2998077ae9dabbb4dbe799",
  measurementId: "G-K83CYLSZJM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
