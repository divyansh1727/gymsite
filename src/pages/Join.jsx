import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <motion.div
        className="bg-[#0f0f0f] border border-[#39FF14] rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold neon-text mb-6 text-center">
          Join the Ultimate Plan
        </h1>

        {/* Plan Summary */}
        <div className="bg-[#1a1a1a] p-4 rounded-xl mb-6 border border-[#39FF14]/30">
          <h2 className="text-2xl font-semibold mb-2 text-lime-300">Ultimate Plan - ₹1,999/month</h2>
          <ul className="list-disc ml-6 text-sm text-gray-300 space-y-1">
            <li>Unlimited Gym Access</li>
            <li>Free Diet Plan</li>
            <li>Personal Trainer</li>
            <li>Steam & Sauna</li>
          </ul>
        </div>

        {/* User Form */}
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          />
          <input
            type="number"
            placeholder="Age"
            className="bg-[#1f1f1f] text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-[#39FF14] text-black font-bold py-3 rounded-xl mt-2 hover:bg-lime-400 transition"
          >
            Join Now
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

