// Firebase configuration
// Replace these with your actual Firebase config values
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX87OkBBz8USi6NMU2DYwwqPBOx95HvqM",
  authDomain: "mommylist.firebaseapp.com",
  projectId: "mommylist",
  storageBucket: "mommylist.firebasestorage.app",
  messagingSenderId: "269519834014",
  appId: "1:269519834014:web:66d9b2287e4d42665d648f",
  measurementId: "G-WV28JQN7YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

