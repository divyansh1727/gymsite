// src/pages/admin/EditPlan.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditPlan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState({
    name: "",
    price: "",
    duration: "",
    features: [],
  });

  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      const docRef = doc(db, "plans", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPlan({
          name: data.name || "",
          price: data.price || "",
          duration: data.duration || "",
          features: data.features || [],
        });
        setFeaturesText((data.features || []).join(", "));
      }
    };
    fetchPlan();
  }, [id]);

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

    const updatedPlan = {
      ...plan,
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== ""),
    };

    await updateDoc(doc(db, "plans", id), updatedPlan);
    alert("Plan updated!");
    navigate("/admin/manage-plans");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Edit Plan</h2>
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
          name="featuresText"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Features (comma-separated)"
          className="p-2 rounded bg-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          Update Plan
        </button>
      </form>
    </div>
  );
}
