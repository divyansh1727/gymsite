import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import generatePDF from "../utilis/generatePDF";
import emailjs from "emailjs-com";
import upiQR from"../assets/upi.png";

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

  const [showPayment, setShowPayment] = useState(false);
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

  // Step 1: Show payment section instead of sending immediately
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  // Step 2: After payment is done, generate PDF and send
  const handlePaymentDone = async () => {
    try {
      const pdfBlob = await generatePDF(formData, plan);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64PDF = reader.result.split(",")[1];

        await emailjs.send(
          "service_f90de9m", // your EmailJS service ID
          "template_pp56nap", // your EmailJS template ID
          {
            to_email: "divys2705@gmail.com",
            user_name: formData.name,
            user_email: formData.email,
            plan_name: plan.name,
            attachments: [
              {
                name: `${formData.name}_Registration.pdf`,
                data: base64PDF
              }
            ]
          },
          "STd93kFk82qnINfgE" // your EmailJS public key
        );

        // Optional: WhatsApp link to notify admin
        window.open(`https://wa.me/<ADMIN_PHONE>?text=New registration from ${formData.name} for ${plan.name}`);

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

      {/* Step 1: Form */}
      {!showPayment && (
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
      )}

      {/* Step 2: Payment */}
      {/* Step 2: Payment */}
{showPayment && (
  <div className="mt-6 bg-neutral-800 p-4 rounded-lg text-center">
    <h3 className="text-lg font-bold mb-2">Complete Your Payment</h3>
    <p className="mb-3">
      UPI ID: <strong>divirajput2358@oksbi</strong>
    </p>
    <img
      src={upiQR}
      alt="UPI QR"
      className="w-40 mx-auto my-3"
    />
    <button
      onClick={handlePaymentDone}
      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mt-4"
    >
      I Have Paid
    </button>
  </div>
)}

    </div>
  );
}
