import {getFirestore} from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrd3nHi3tOocDG4Fqav701CLIa_iyVqQ0",
  authDomain: "house-marketplace-app-eb8d5.firebaseapp.com",
  projectId: "house-marketplace-app-eb8d5",
  storageBucket: "house-marketplace-app-eb8d5.appspot.com",
  messagingSenderId: "499326270848",
  appId: "1:499326270848:web:791eaf765be9fecf365565"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()