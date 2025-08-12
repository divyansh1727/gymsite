// src/components/PlanCard.jsx
import { motion } from "framer-motion";

export default function PlanCard({ name, price, features }) {
  return (
    <motion.div
      className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-sm mx-auto"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-2xl font-bold text-center mb-4">{name}</h3>
      <p className="text-center text-4xl font-extrabold text-neon mb-6">₹{price}</p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-300">
            • {feature}
          </li>
        ))}
      </ul>
      <button className="w-full bg-neon text-black font-semibold py-2 rounded-xl hover:bg-opacity-80 transition">
        Join Now
      </button>
    </motion.div>
  );
}
