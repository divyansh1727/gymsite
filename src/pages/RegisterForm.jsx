import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import generatePDF from "../utilis/generatePDF";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { QRCodeCanvas } from "qrcode.react";

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

  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Online"); // ✅ Toggle state

  const healthOptions = [
    "Asthma",
    "Diabetes",
    "Heart Issues",
    "Joint Pain",
    "Back Pain",
    "Other",
  ];

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

  // ✅ handle PDF generation + Firestore save
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

    // ✅ Upload photo file (if any) to Storage
    let photoURL = null;
    if (formData.photoFile) {
      const photoRef = ref(storage, `registrations/${formData.name}_${timestamp}_photo`);
      await uploadBytes(photoRef, formData.photoFile);
      photoURL = await getDownloadURL(photoRef);
    }

    // ✅ Upload document file (if any) to Storage
    let documentURL = null;
    if (formData.documentFile) {
      const docRef = ref(storage, `registrations/${formData.name}_${timestamp}_document`);
      await uploadBytes(docRef, formData.documentFile);
      documentURL = await getDownloadURL(docRef);
    }

    // ✅ Upload final PDF to Storage
    const pdfRef = ref(storage, `registrations/${formData.name}_${timestamp}.pdf`);
    await uploadBytes(pdfRef, pdfBlob);
    const pdfURL = await getDownloadURL(pdfRef);

    // ✅ Save only clean values + URLs to Firestore
    await addDoc(collection(db, "registrations"), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      previousHealthProblems: formData.previousHealthProblems,
      address: formData.address,
      alternateNumber: formData.alternateNumber,
      planName: plan.name,
      planPrice: plan.price,
      paymentMethod,
      photoURL,
      documentURL,
      pdfURL,
      timestamp: serverTimestamp(),
    });

    // ✅ Send email with final PDF
    const formDataToSend = new FormData();
    formDataToSend.append("pdf", pdfBlob, `${formData.name}_${plan.name}.pdf`);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("plan", plan.name);

   

    alert("Registration complete! Admin will receive the PDF automatically.");
    navigate("/success");
  } catch (error) {
    console.error(error);
    alert("Something went wrong during registration.");
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmButton(true); // ✅ Show toggle after submit
  };

  // ✅ UPI QR logic
  const upiId = "ritikraikwar05671@ybl";
  let numericPrice = String(plan.price || "0")
    .replace(/[^0-9.]/g, "")
    .replace(/,/g, "");
  numericPrice = parseFloat(numericPrice);
  if (isNaN(numericPrice) || numericPrice <= 0) numericPrice = 1;
  const amount = numericPrice.toFixed(2);
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    "Ritik Fitness"
  )}&am=${amount}&cu=INR`;

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 text-white rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register for {plan.name} - {plan.price}
      </h2>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        />

        <select
          name="gender"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          name="bloodGroup"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        >
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
                <input
                  type="checkbox"
                  value={opt}
                  onChange={handleCheckboxChange}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-neutral-800"
          required
        />

        <input
  type="file"
  name="photo"
  accept="image/*"
  capture="environment"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,   // base64 string for PDF
          photoFile: file,        // keep original file if needed later
        }));
      };
      reader.readAsDataURL(file);
    }
  }}
/>

<input
  type="file"
  name="document"
  accept="image/*,.pdf"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          document: reader.result,   // base64 for PDF if image
          documentFile: file,        // keep original file for backend/email
        }));
      };
      reader.readAsDataURL(file);
    }
  }}
/>

        

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700"
        >
          Submit
        </button>
      </form>

      {/* ✅ Payment Toggle after Submit (Pill Style) */}
      {showConfirmButton && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
          <div className="flex bg-neutral-800 rounded-full p-1 shadow-inner w-full max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setPaymentMethod("Online")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                paymentMethod === "Online"
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-600"
              }`}
            >
              Online
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("Cash")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                paymentMethod === "Cash"
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-gray-600"
              }`}
            >
              Cash
            </button>
          </div>
        </div>
      )}

      {/* ✅ If Online → Show QR */}
      {showConfirmButton && paymentMethod === "Online" && (
        <div className="mt-8 p-6 bg-neutral-900 border-2 border-green-500 rounded-2xl shadow-lg flex flex-col items-center text-center">
          <p className="text-lg font-semibold text-green-400 mb-4">
            Pay via UPI
          </p>

          <div className="p-4 bg-black rounded-xl shadow-[0_0_20px_#39FF14] mb-4">
            <QRCodeCanvas
              value={upiLink}
              size={180}
              bgColor="#ffffff"
              fgColor="#000000"
              className="rounded-lg shadow-md p-2"
            />
          </div>

          <p className="text-sm text-gray-300 mb-4">
            Scan QR or use UPI ID:{" "}
            <span className="font-mono text-green-400">{upiId}</span>
          </p>
        </div>
      )}

      {/* ✅ Confirm Button (Both Online + Cash) */}
      {showConfirmButton && (
        <button
          onClick={handlePaymentDone}
          className="mt-4 bg-green-500 hover:bg-green-600 shadow-lg px-6 py-3 rounded-xl text-white font-semibold w-full"
        >
          {paymentMethod === "Online"
            ? "I Have Paid / Confirm Registration"
            : "Confirm Cash Registration"}
        </button>
      )}
    </div>
  );
}
