// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE3Ja-FCPwk6OHmQgy3Dhwz6516jCssQY",
  authDomain: "openjio-6e610.firebaseapp.com",
  projectId: "openjio-6e610",
  storageBucket: "openjio-6e610.appspot.com",
  messagingSenderId: "196076397155",
  appId: "1:196076397155:web:487c8317efe3efc8204e56",
  measurementId: "G-4Z2D13SZR0"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = getFirestore(app);
const auth = firebase.auth();

export { db, auth };
