import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import generatePDF from "../utilis/generatePDF";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; 

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

  // Convert File to Base64 string
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  // After payment
  const handlePaymentDone = async () => {
    try {
      const pdfBlob = await generatePDF(formData, plan);

      const now = new Date();
      const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now
        .getHours()
        .toString()
        .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}`;

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${timestamp}_${formData.name}_${plan.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Upload generated PDF
      const pdfRef = ref(storage, `registrations/${formData.name}_${timestamp}.pdf`);
      await uploadBytes(pdfRef, pdfBlob);
      const pdfURL = await getDownloadURL(pdfRef);

      // Upload user document
      let documentURL = null;
      if (formData.document) {
        const docRef = ref(storage, `documents/${formData.document.name}_${timestamp}`);
        await uploadBytes(docRef, formData.document);
        documentURL = await getDownloadURL(docRef);
      }

      // Save metadata
      await addDoc(collection(db, "registrations"), {
        ...formData,
        planName: plan.name,
        planPrice: plan.price,
        pdfURL,
        documentURL,
        timestamp: serverTimestamp(),
      });

      alert("Registration complete! Admin will receive the PDF automatically.");
      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Something went wrong during registration.");
    }
  };

  // ✅ New universal UPI opener
  const openUPIApp = (upiLink) => {
    try {
      // First try direct redirect
      window.location.href = upiLink;

      // Fallback with hidden iframe
      setTimeout(() => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = upiLink;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 2000);
      }, 500);
    } catch (err) {
      console.error("UPI launch failed:", err);
      alert("Could not open payment app. Please open your UPI app manually.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register for {plan.name} - {plan.price}
      </h2>

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
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
              <option key={g}>{g}</option>
            ))}
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

          <input type="file" name="photo" accept="image/*" capture="environment" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, photo: reader.result }));
              };
              reader.readAsDataURL(file);
            }
          }} />
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

    {(() => {
      const upiId = "7838548016@ptaxis"; // directly set here

      // ✅ Safe numeric conversion
      let numericPrice = String(plan.price || "0")
        .replace(/[^0-9.]/g, "")   // remove all non-numeric except dot
        .replace(/,/g, "");        // remove commas if present
      numericPrice = parseFloat(numericPrice); // convert to number
      if (isNaN(numericPrice) || numericPrice <= 0) numericPrice = 1; // fallback

      const amount = numericPrice.toFixed(2); // safe 2-decimal string

      const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(plan.name)}&am=${amount}&cu=INR`;

      return (
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => openUPIApp(upiLink)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Pay with Google Pay
          </button>
          <button
            onClick={() => openUPIApp(upiLink)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
          >
            Pay with PhonePe
          </button>
          <button
            onClick={() => openUPIApp(upiLink)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Pay with Paytm
          </button>
        </div>
      );
    })()}

    {/* QR fallback */}
    <div className="mt-6">
      <p className="text-sm text-gray-300 mb-2">Or scan this QR to pay:</p>
      <img
        src="/src/assets/upi/upi.png"
        alt="UPI QR Code"
        className="mx-auto w-40 h-40 rounded-lg shadow-md"
      />
      <p className="text-xs text-gray-400 mt-2">
        UPI ID: <span className="font-mono">7838548016@ptaxis</span>
      </p>
    </div>

    <p className="mt-4 text-sm text-gray-300">
      After completing payment, click the button below to confirm.
    </p>
    <button
      onClick={handlePaymentDone}
      className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg mt-2 text-white"
    >
      I Have Paid
    </button>
  </div>
)}

</div>
  )}
