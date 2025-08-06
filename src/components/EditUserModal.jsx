// src/components/EditUserModal.jsx
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditUserModal({ userData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    healthProblems: [],
    address: "",
    alternateNumber: "",
  });

  const healthOptions = [
    "Diabetes",
    "Asthma",
    "Heart Disease",
    "Hypertension",
    "None"
  ];

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const current = new Set(prev.healthProblems || []);
      if (checked) current.add(value);
      else current.delete(value);
      return { ...prev, healthProblems: Array.from(current) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", userData.id), formData);
      onUpdate(); // refresh parent
      onClose();  // close modal
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-xl relative">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" required />
          
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Blood Group</option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>

          <div>
            <label className="block font-medium mb-1">Previous Health Problems</label>
            <div className="grid grid-cols-2 gap-2">
              {healthOptions.map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.healthProblems?.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="alternateNumber"
            value={formData.alternateNumber}
            onChange={handleChange}
            placeholder="Alternate Number"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
