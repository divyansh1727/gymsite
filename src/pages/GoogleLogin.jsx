// src/pages/Login.jsx
import { useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Handle redirect result (after login)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const user = result.user;

          // ✅ Special case: make sure ritikfitness14@gmail.com is always admin
          if (user.email === "ritikfitness14@gmail.com") {
            await setDoc(
              doc(db, "users", user.uid),
              {
                email: user.email,
                role: "admin",
              },
              { merge: true }
            );
            navigate("/admin");
            return;
          }

          // ✅ Check Firestore for role
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === "admin") {
              navigate("/admin"); // go straight to admin panel
            } else {
              navigate("/dashboard"); // normal student dashboard
            }
          } else {
            // If no Firestore doc exists → go to extra details
            navigate("/extra-details");
          }
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error);
      });
  }, [auth, navigate]);

  // Trigger Google Login
  const handleLogin = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
      >
        Sign In with Google
      </button>
    </div>
  );
}
