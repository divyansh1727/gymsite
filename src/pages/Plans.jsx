// src/pages/Plans.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "₹999",
    features: ["Access to gym equipment", "1 trainer session", "Locker facility"],
  },
  {
    name: "Standard",
    price: "₹1999",
    features: ["Everything in Basic", "Weekly trainer sessions", "Diet plan"],
  },
  {
    name: "Premium",
    price: "₹2999",
    features: ["Everything in Standard", "Unlimited sessions", "Personal trainer", "24/7 Access"],
  },
];

export default function Plans() {
  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <h2 className="text-center text-4xl font-bold neon-text mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] border border-green-500 rounded-2xl shadow-lg p-6 text-center"
          >
            <h3 className="text-2xl font-bold neon-text mb-4">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-green-400 mb-6">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/join">
  <button className="bg-[#39FF14] text-black px-4 py-2 rounded-xl font-bold hover:bg-lime-400 transition">
    Join Now
  </button>
</Link>
            
          </motion.div>
        ))}
      </div>
    </section>
  );
}
