import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "emailjs-com";
import generatePDF from "../utilis/generatePDF"; // ✅ import PDF generator

export default function Join() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get plan from query or default
  const searchParams = new URLSearchParams(location.search);
  const selectedPlan = searchParams.get("plan") || "Ultimate Plan";
  const selectedPrice = searchParams.get("price") || 1999;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Convert Blob → Base64
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Save to Firestore
      await addDoc(collection(db, "members"), {
        ...formData,
        plan: selectedPlan,
        price: selectedPrice,
        createdAt: serverTimestamp(),
      });

      // 2️⃣ Generate PDF
      const pdfBlob = generatePDF(
        formData.fullName,
        formData.email,
        formData.phone,
        selectedPlan
      );

      // 3️⃣ Convert PDF to Base64
      const pdfBase64 = await blobToBase64(pdfBlob);

      // 4️⃣ Send via EmailJS
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          plan: selectedPlan,
          attachment: pdfBase64,
        },
        "YOUR_PUBLIC_KEY"
      );

      // ✅ Redirect after success
      navigate("/success");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to join. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <motion.div
        className="bg-[#0f0f0f] border border-[#39FF14] rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold neon-text mb-6 text-center">
          Join the {selectedPlan}
        </h1>

        {/* Plan Summary */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6 border border-[#39FF14]/30">
          <h2 className="text-2xl font-semibold mb-2 text-lime-300">
            {selectedPlan} - ₹{selectedPrice}/month
          </h2>
          <ul className="list-disc ml-6 text-sm text-gray-300 space-y-1">
            <li>Unlimited Gym Access</li>
            <li>Free Diet Plan</li>
            <li>Personal Trainer</li>
            <li>Steam & Sauna</li>
          </ul>
        </div>

        {/* User Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-shadow hover:shadow-[0_0_10px_#39FF14]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-shadow hover:shadow-[0_0_10px_#39FF14]"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-shadow hover:shadow-[0_0_10px_#39FF14]"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-shadow hover:shadow-[0_0_10px_#39FF14]"
          />

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-[#39FF14] text-black font-bold py-3 rounded-xl mt-2 hover:bg-lime-400 hover:shadow-[0_0_15px_#39FF14] transition disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Now"}
          </motion.button>
        </form>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/plans")}
            className="text-sm text-gray-400 hover:text-[#39FF14] transition"
          >
            ← Back to Plans
          </button>
        </div>
      </motion.div>
    </div>
  );
}
 