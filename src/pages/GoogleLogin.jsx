// src/pages/Login.jsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user is already registered in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Already registered
        navigate("/dashboard");
      } else {
        // First time login – go to registration
        navigate("/register");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Sign-in failed.");
    }
  };

  return (
    <div className="text-center">
      <button onClick={handleGoogleSignIn} className="btn-google">
        Continue with Google
      </button>
    </div>
  );
}

