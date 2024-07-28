import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUB57i-Oce2K97b11LNhse96fKgcfZDVM",
  authDomain: "fir-test-d9539.firebaseapp.com",
  projectId: "fir-test-d9539",
  storageBucket: "fir-test-d9539.appspot.com",
  messagingSenderId: "377800689563",
  appId: "1:377800689563:web:331da938e8ed88a40d433e",
  measurementId: "G-F3P2EYEL8D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
