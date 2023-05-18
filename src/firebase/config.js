// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoyyFbipJcWf48hr2praH_yqPqFuJS3jA",
  authDomain: "blog-react-478b7.firebaseapp.com",
  projectId: "blog-react-478b7",
  storageBucket: "blog-react-478b7.appspot.com",
  messagingSenderId: "1023400721671",
  appId: "1:1023400721671:web:2febd62ff6de2d063fd9a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };