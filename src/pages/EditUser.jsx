import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const healthOptions = [
  "Asthma",
  "Diabetes",
  "Heart Issues",
  "Joint Pain",
  "Back Pain",
  "Other"
];

export default function EditUser() {
  const { id } = useParams(); // user ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          alert("User not found");
          navigate("/admin/panel");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const current = new Set(prev.previousHealthProblems || []);
      if (checked) current.add(value);
      else current.delete(value);
      return { ...prev, previousHealthProblems: Array.from(current) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", id), formData);
      alert("User updated!");
      navigate("/admin/panel");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading || !formData) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit User Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-neutral-800"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-3 rounded-lg bg-neutral-800 text-gray-400"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-neutral-800"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-neutral-800"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-neutral-800"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <div>
          <label className="block mb-2">Previous Health Problems:</label>
          <div className="grid grid-cols-2 gap-2">
            {healthOptions.map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={formData.previousHealthProblems?.includes(item)}
                  onChange={handleCheckboxChange}
                  className="accent-pink-500"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-neutral-800"
        />

        <input
          type="text"
          name="alternateNumber"
          placeholder="Alternate Contact Number"
          value={formData.alternateNumber}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
