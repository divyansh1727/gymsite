// src/pages/admin/AddPlan.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddPlan() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState({
    name: "",
    price: "",
    duration: "",
  });

  const [featuresText, setFeaturesText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plan.name || !plan.price || !plan.duration) {
      alert("Please fill in all fields.");
      return;
    }

    const newPlan = {
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== ""),
    };

    await addDoc(collection(db, "plans"), newPlan);
    alert("Plan added!");
    navigate("/admin/manage-plans");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Add New Plan</h2>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-neutral-900 p-4 rounded-xl shadow"
      >
        <input
          name="name"
          value={plan.name}
          onChange={handleChange}
          placeholder="Plan Name"
          className="p-2 rounded bg-gray-800"
        />
        <div className="relative">
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
  <input
    name="price"
    value={plan.price}
    onChange={handleChange}
    placeholder="Price"
    className="pl-6 p-2 rounded bg-gray-800 w-full"
  />
</div>

        <input
          name="duration"
          value={plan.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="p-2 rounded bg-gray-800"
        />
        <textarea
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Features (comma-separated)"
          className="p-2 rounded bg-gray-800"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          Add Plan
        </button>
      </form>
    </div>
  );
}
