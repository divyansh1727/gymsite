import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";
import { getAuth } from "firebase/auth";

export default function ExtraDetailsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    healthProblems: [],
    address: "",
    alternateNumber: ""
  });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;

  // Prefill from Google if available
  useState(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || ""
      }));
    }
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        healthProblems: checked
          ? [...prev.healthProblems, value]
          : prev.healthProblems.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...formData,
      uid: user.uid,
      role: location.state?.role || "user", // role passed from signup
      createdAt: new Date()
    });

    // Generate PDF for users only
    if ((location.state?.role || "user") === "user") {
      const docPDF = new jsPDF();
      docPDF.setFontSize(14);
      docPDF.text("Registration Details", 10, 10);

      let y = 20;
      Object.entries(formData).forEach(([key, val]) => {
        let value = Array.isArray(val) ? val.join(", ") : val;
        docPDF.text(`${key}: ${value}`, 10, y);
        y += 8;
      });

      docPDF.save("registration-details.pdf");
    }

    // Redirect
    navigate((location.state?.role || "user") === "admin" ? "/admin/panel" : "/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Complete Your Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 rounded bg-gray-800" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input className="w-full p-2 rounded bg-gray-800" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input className="w-full p-2 rounded bg-gray-800" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
        
        <select className="w-full p-2 rounded bg-gray-800" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input className="w-full p-2 rounded bg-gray-800" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" required />

        <div>
          <label className="block">Previous Health Problems:</label>
          <div className="flex flex-wrap gap-2">
            {["Diabetes", "Heart Issue", "Asthma"].map(problem => (
              <label key={problem}>
                <input type="checkbox" value={problem} onChange={handleChange} /> {problem}
              </label>
            ))}
          </div>
        </div>

        <textarea className="w-full p-2 rounded bg-gray-800" name="address" value={formData.address} onChange={handleChange} placeholder="Address"></textarea>
        <input className="w-full p-2 rounded bg-gray-800" name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Alternate Number" />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
