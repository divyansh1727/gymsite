// src/pages/admin/EditTrainer.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EditTrainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    imageURL: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      const snap = await getDoc(doc(db, "trainers", id));
      if (snap.exists()) {
        setFormData(snap.data());
      }
    };
    fetchTrainer();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = { ...formData };

    if (imageFile) {
      const imageRef = ref(storage, `trainers/${id}`);
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);
      updatedData.imageURL = downloadURL;
    }

    await updateDoc(doc(db, "trainers", id), updatedData);
    alert("Trainer updated!");
    navigate("/manage-trainers");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-neon">Edit Trainer</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Trainer Name"
          className="w-full p-2 rounded bg-neutral-800 text-white"
          required
        />
        <input
          type="text"
          name="speciality"
          value={formData.speciality}
          onChange={handleChange}
          placeholder="Speciality"
          className="w-full p-2 rounded bg-neutral-800 text-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-white"
        />
        {formData.imageURL && (
          <img
            src={formData.imageURL}
            alt="Current Trainer"
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        <button
          type="submit"
          className="block w-full mt-4 bg-neon text-black font-bold px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
