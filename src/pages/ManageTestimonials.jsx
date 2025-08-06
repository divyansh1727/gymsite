import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const snapshot = await getDocs(collection(db, "testimonials"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !message || !image) return alert("Please fill all fields");

    const imageRef = ref(storage, `testimonial_images/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(db, "testimonials"), {
      name,
      message,
      imageUrl,
    });

    setTestimonials([...testimonials, { id: docRef.id, name, message, imageUrl }]);
    setName("");
    setMessage("");
    setImage(null);
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>

      <form onSubmit={handleAdd} className="bg-neutral-900 p-6 rounded-lg mb-8 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-neutral-800 rounded"
        />
        <textarea
          placeholder="Testimonial message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 bg-neutral-800 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 bg-neutral-800 rounded"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
          Add Testimonial
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-neutral-800 p-4 rounded-lg flex items-center gap-4">
            <img src={t.imageUrl} alt={t.name} className="w-16 h-16 object-cover rounded-full" />
            <div className="flex-1">
              <h2 className="font-semibold">{t.name}</h2>
              <p className="text-sm text-gray-300">{t.message}</p>
            </div>
            <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
