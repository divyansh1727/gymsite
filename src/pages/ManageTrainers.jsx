import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, addDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

// Static trainer images
import trainer1 from "../assets/trainers/trainer1.jpg";
import trainer2 from "../assets/trainers/trainer2.jpg";

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchTrainers();
    uploadDefaultTrainersOnce();
  }, []);

  // Fetch trainers from Firestore
  const fetchTrainers = async () => {
    const snap = await getDocs(collection(db, "trainers"));
    setTrainers(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // One-time upload of static trainers
  const uploadDefaultTrainersOnce = async () => {
    const existingSnap = await getDocs(collection(db, "trainers"));
    if (existingSnap.empty) {
      console.log("No trainers found, uploading defaults...");

      const defaults = [
        { name: "John Doe", speciality: "Strength Coach", image: trainer1 },
        { name: "Sarah Smith", speciality: "Yoga Instructor", image: trainer2 },
      ];

      for (const t of defaults) {
        const res = await fetch(t.image);
        const blob = await res.blob();
        const storageRef = ref(storage, `trainers/${t.name.replace(/\s+/g, "_")}.jpg`);
        await uploadBytes(storageRef, blob);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, "trainers"), {
          name: t.name,
          speciality: t.speciality,
          image: imageUrl,
        });
      }
      fetchTrainers();
    }
  };

  // Manual upload from form
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || !speciality || !imageFile) return alert("All fields required");

    const storageRef = ref(storage, `trainers/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "trainers"), {
      name,
      speciality,
      image: imageUrl,
    });

    setName("");
    setSpeciality("");
    setImageFile(null);
    fetchTrainers();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this trainer?")) {
      await deleteDoc(doc(db, "trainers", id));
      setTrainers((prev) => prev.filter((trainer) => trainer.id !== id));
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Trainers</h2>

      {/* Manual Upload Form */}
      <form onSubmit={handleUpload} className="bg-neutral-900 p-4 rounded mb-6">
        <h3 className="text-lg mb-3">Add Trainer</h3>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-2 text-black rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Speciality"
          className="w-full p-2 mb-2 text-black rounded"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-400">
          Upload
        </button>
      </form>

      {/* Add Trainer Button */}
      <Link
        to="/admin/trainers/create"
        className="inline-block bg-neon-green text-black px-4 py-2 rounded hover:bg-green-400 transition mb-6"
      >
        + Add New Trainer
      </Link>

      {/* Trainer List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-neutral-900 border border-neutral-700 rounded-xl shadow p-4 hover:shadow-lg transition duration-200"
          >
            {trainer.image && (
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{trainer.name}</h3>
            <p className="text-sm text-gray-300 mb-3">{trainer.speciality}</p>

            <div className="flex justify-between items-center">
              <Link
                to={`/admin/trainers/edit/${trainer.id}`}
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
              >
                <FaEdit /> <span>Edit</span>
              </Link>
              <Link
  to="upload"
  className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition mb-6"
>
  + Upload Static Trainers
</Link>

              <button
                onClick={() => handleDelete(trainer.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-400"
              >
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
