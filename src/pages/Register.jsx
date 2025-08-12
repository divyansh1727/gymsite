// src/pages/Register.jsx
import { useState } from "react";
import { auth, db } from "../firebase"; // db added for Firestore
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Save user in Firestore
  const saveUserData = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        role: "user",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserData(userCredential.user);
      navigate("/user-details");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserData(result.user);
      navigate("/user-details");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Join Us</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-neutral-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-neutral-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-neutral-800"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>or</p>
          <button
            onClick={handleGoogleSignIn}
            className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
