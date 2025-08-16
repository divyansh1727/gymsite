// src/pages/UserRegistration.jsx
import { auth, db } from "../firebase";
import { useState } from "react";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { generatePDF } from "../utilis/generatePDF";
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plan: "1 Month",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateMembershipEnd = (months) => {
    const end = new Date();
    end.setMonth(end.getMonth() + months);
    return end.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Not logged in!");
      return;
    }

    const uid = user.uid;
    const startDate = new Date();
    const planMonths =
      formData.plan === "3 Months" ? 3 : formData.plan === "6 Months" ? 6 : 1;
    const endDate = calculateMembershipEnd(planMonths);

    const userData = {
      name: formData.name,
      email: user.email,
      phone: formData.phone,
      plan: formData.plan,
      role: "user",
      joinedAt: Timestamp.now(),
      startDate: startDate.toISOString().split("T")[0],
      membershipEnds: endDate,
    };

    await setDoc(doc(db, "users", uid), userData);

    generatePDF(userData);

    alert("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="input"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        required
        value={formData.phone}
        onChange={handleChange}
        className="input"
      />
      <select name="plan" value={formData.plan} onChange={handleChange} className="input">
        <option>1 Month</option>
        <option>3 Months</option>
        <option>6 Months</option>
      </select>
      <button type="submit" className="btn-primary mt-4">Register</button>
    </form>
  );
}
