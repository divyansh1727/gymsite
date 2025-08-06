// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdnSPzXWCPThzw9sfsOmLFhiijjKttmHg",
  authDomain: "gymsite-8ad25.firebaseapp.com",
  projectId: "gymsite-8ad25",
  storageBucket: "gymsite-8ad25.firebasestorage.app",
  messagingSenderId: "748648856399",
  appId: "1:748648856399:web:d382a9fe471aae8318633a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);