// src/pages/admin/ManagePlans.jsx
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlans(data);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "plans", id));
    // No need to manually update state — snapshot does it
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Plans</h1>
        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/admin/add-plan")}
        >
          Add New Plan
        </button>
      </div>

      <div className="grid gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-neutral-900 p-4 rounded-xl shadow-md border border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {plan.name}</p>
                <p><strong>Price:</strong> ₹{plan.price}</p>
                <p><strong>Duration:</strong> {plan.duration}</p>
                <p><strong>Features:</strong></p>
                <ul className="list-disc list-inside">
                  {Array.isArray(plan.features) && plan.features.length > 0 ? (
                    plan.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))
                  ) : (
                    <li>No features listed</li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/admin/edit-plan/${plan.id}`)}
                  className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



