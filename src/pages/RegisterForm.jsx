import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import generatePDF from "../utilis/generatePDF";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase"; // ✅ make sure db is exported in firebase.js
import { doc, setDoc } from "firebase/firestore";
import upiQR from "../assets/upi.png";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  // Step 2: After payment is done, generate PDF, upload to Firebase, save to Firestore, and share via WhatsApp
  const handlePaymentDone = async () => {
    try {
      // 1. Generate PDF as Blob
      const pdfBlob = await generatePDF(formData, plan);

      // 2. Upload to Firebase Storage
      const fileRef = ref(storage, `plans/${formData.name}_${Date.now()}.pdf`);
      await uploadBytes(fileRef, pdfBlob);

      // 3. Get download URL
      const pdfUrl = await getDownloadURL(fileRef);

      // 4. Save details in Firestore
      await setDoc(doc(db, "registrations", formData.email), {
        ...formData,
        plan: plan.name,
        price: plan.price,
        pdfUrl,
        createdAt: new Date(),
      });

      // 5. Open WhatsApp with pre-filled message
      const whatsappNumber = "917028642342"; // ✅ replace with your business number
      const message = `New registration from ${formData.name} for ${plan.name}. Download PDF: ${pdfUrl}`;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving your registration.");
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

          <input type="file" name="photo" accept="image/*" onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }}
 />
          <input type="file" name="document" onChange={handleChange} />

          <button type="submit" className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700">
            Submit
          </button>
        </form>
      )}

      {showPayment && (
  <div className="mt-6 bg-neutral-800 p-4 rounded-lg text-center">
    <h3 className="text-lg font-bold mb-2">Complete Your Payment</h3>
    <p className="mb-3">Choose a payment method:</p>

    <div className="flex flex-col space-y-3">
      {/* Google Pay */}
      <a
        href={`upi://pay?pa=divirajput2358@oksbi&pn=Divyansh Singh&tn=${plan.name}&am=${plan.price}&cu=INR`}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
      >
        Pay with Google Pay
      </a>

      {/* PhonePe */}
      <a
        href={`upi://pay?pa=divirajput2358@oksbi&pn=Divyansh Singh&tn=${plan.name}&am=${plan.price}&cu=INR`}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
      >
        Pay with PhonePe
      </a>

      {/* Paytm */}
      <a
        href={`upi://pay?pa=divirajput2358@oksbi&pn=Divyansh Singh&tn=${plan.name}&am=${plan.price}&cu=INR`}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
      >
        Pay with Paytm
      </a>
    </div>

    <p className="mt-4 text-sm text-gray-300">
      After completing payment, click the button below to confirm.
    </p>
    <button
      onClick={handlePaymentDone}
      className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg mt-2"
    >
      I Have Paid
    </button>
  </div>
)}

    </div>
  );
}
