// src/pages/admin/EditTrainer.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditTrainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const trainerRef = doc(db, "trainers", id);
        const trainerSnap = await getDoc(trainerRef);
        if (trainerSnap.exists()) {
          setFormData(trainerSnap.data());
        } else {
          alert("Trainer not found!");
          navigate("/admin/trainers");
        }
      } catch (error) {
        console.error("Error fetching trainer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      // If a new image is uploaded
      if (imageFile) {
        const storageRef = ref(storage, `trainers/${id}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, "trainers", id), {
        ...formData,
        image: imageUrl,
      });

      alert("Trainer updated successfully!");
      navigate("/admin/trainers");
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="p-6 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Edit Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Trainer Name"
          className="w-full p-2 rounded bg-neutral-800 text-white"
          required
        />

        {/* Speciality */}
        <input
          type="text"
          name="speciality"
          value={formData.speciality || ""}
          onChange={handleChange}
          placeholder="Speciality"
          className="w-full p-2 rounded bg-neutral-800 text-white"
          required
        />

        {/* Current Image */}
        {formData.image && (
          <div>
            <p className="mb-1 text-gray-400">Current Image:</p>
            <img
              src={formData.image}
              alt="Trainer"
              className="w-32 h-32 object-cover rounded mb-2"
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block text-white"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-neon-green text-black px-4 py-2 rounded hover:bg-green-400 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
