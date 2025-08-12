import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import generatePDF from "../utilis/generatePDF";
import emailjs from "emailjs-com";

export default function RegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    previousHealthProblems: [],
    address: "",
    alternateNumber: "",
    photo: null,
    document: null,
  });

  const healthOptions = ["Asthma", "Diabetes", "Heart Issues", "Joint Pain", "Back Pain", "Other"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const current = new Set(prev.previousHealthProblems);
      checked ? current.add(value) : current.delete(value);
      return { ...prev, previousHealthProblems: Array.from(current) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Create PDF
      const pdfBlob = await generatePDF(formData, plan);

      // 2. Convert PDF to Base64 for EmailJS
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64PDF = reader.result.split(",")[1];

        await emailjs.send(
          "YOUR_SERVICE_ID",
          "YOUR_TEMPLATE_ID",
          {
            to_email: "YOUR_GYM_EMAIL@example.com",
            user_name: formData.name,
            user_email: formData.email,
            plan_name: plan.name,
            pdf_base64: base64PDF,
          },
          "YOUR_PUBLIC_KEY"
        );

        navigate("/success");
      };
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending your registration.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register for {plan.name} - {plan.price}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required />

        <select name="gender" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select name="bloodGroup" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required>
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => <option key={g}>{g}</option>)}
        </select>

        <div>
          <label>Previous Health Problems:</label>
          <div className="grid grid-cols-2 gap-2">
            {healthOptions.map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input type="checkbox" value={opt} onChange={handleCheckboxChange} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea name="address" placeholder="Address" onChange={handleChange} className="w-full p-3 rounded-lg bg-neutral-800" required />

        <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
        <input type="file" name="document" onChange={handleChange} />

        <button type="submit" className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700">
          Submit
        </button>
      </form>
    </div>
  );
}
