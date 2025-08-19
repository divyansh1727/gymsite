// src/pages/Register.jsx
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = "ritikfitness14@gmail.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      if (isAdmin) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "admin",
          createdAt: new Date(),
        });
        navigate("/admin");
      } else {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name,
          role: "student",
          createdAt: new Date(),
        });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error during registration:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-neutral-900 p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
          required
        />

        {/* Show name only if NOT admin */}
        {email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-neutral-800 text-white"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
