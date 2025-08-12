import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import trainer1 from "../assets/trainers/trainer1.jpg";
import trainer2 from "../assets/trainers/trainer2.jpg";

export default function UploadStaticTrainers() {
  const [loading, setLoading] = useState(false);

  const uploadTrainers = async () => {
    setLoading(true);
    try {
      const trainers = [
        { name: "John Doe", speciality: "Strength Coach", image: trainer1 },
        { name: "Sarah Smith", speciality: "Yoga Instructor", image: trainer2 },
      ];

      for (const trainer of trainers) {
        const response = await fetch(trainer.image);
        const blob = await response.blob();

        const storageRef = ref(storage, `trainers/${trainer.name.replace(/\s+/g, "_")}.jpg`);
        await uploadBytes(storageRef, blob);

        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, "trainers"), {
          name: trainer.name,
          speciality: trainer.speciality,
          image: imageUrl,
        });

        console.log(`Uploaded: ${trainer.name}`);
      }

      alert("Static trainers uploaded successfully!");
    } catch (error) {
      console.error("Error uploading trainers:", error);
      alert("Failed to upload trainers. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Static Trainers</h1>
      <button
        onClick={uploadTrainers}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload Trainers"}
      </button>
    </div>
  );
}
