// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmnsCdQ6AZU25WyK5YriWJzKB1TImCj1w",
  authDomain: "library-catalog-fff24.firebaseapp.com",
  projectId: "library-catalog-fff24",
  storageBucket: "library-catalog-fff24.appspot.com",
  messagingSenderId: "256730684578",
  appId: "1:256730684578:web:c985de1c467cd3a87fcbfb",
  measurementId: "G-51817RZN0G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); // Export the auth instance
