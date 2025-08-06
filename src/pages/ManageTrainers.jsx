// src/pages/admin/AdminTrainers.jsx
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const snap = await getDocs(collection(db, "trainers"));
      setTrainers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchTrainers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      await deleteDoc(doc(db, "trainers", id));
      setTrainers((prev) => prev.filter((trainer) => trainer.id !== id));
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Manage Trainers</h2>
      <Link
        to="/admin/trainers/create"
        className="mb-4 inline-block bg-neon-green text-black px-4 py-2 rounded hover:bg-green-400 transition"
      >
        Add New Trainer
      </Link>
      <div className="grid gap-4">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-neutral-900 p-4 rounded shadow border border-neutral-700">
            <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
            <p className="mb-2">{trainer.speciality}</p>
            {trainer.image && (
              <img src={trainer.image} alt="Trainer" className="w-48 h-48 object-cover rounded mb-2" />
            )}
            <div className="flex gap-3">
              <Link to={`/admin/trainers/edit/${trainer.id}`} className="text-yellow-400 hover:text-yellow-300">
                <FaEdit /> Edit
              </Link>
              <button onClick={() => handleDelete(trainer.id)} className="text-red-500 hover:text-red-400">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
