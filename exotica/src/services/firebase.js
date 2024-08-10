import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtm7AomO8YEfSquvodtY8l4WAF41cFmrc",
  authDomain: "site-exoticalingerie.firebaseapp.com",
  projectId: "site-exoticalingerie",
  storageBucket: "site-exoticalingerie.appspot.com",
  messagingSenderId: "1003393048906",
  appId: "1:1003393048906:web:edf26ad0e11d1858a061b3",
  measurementId: "G-73BCPH24QZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
