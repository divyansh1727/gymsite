import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: user.email,
        uid: user.uid,
      });

      navigate("/");
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-neutral-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 font-bold text-center">Complete Your Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-neutral-800"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-neutral-800"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-neutral-800"
        />

        <button type="submit" className="w-full bg-green-500 hover:bg-pink-500 py-2 rounded font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}
