// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHP7MmKXcouAGAeBP7-GAFWNyqe6_dd3s",
  authDomain: "survey-60005.firebaseapp.com",
  projectId: "survey-60005",
  storageBucket: "survey-60005.appspot.com",
  messagingSenderId: "505196311667",
  appId: "1:505196311667:web:2d7a76bdcb5f2d2db12606"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {app,database}