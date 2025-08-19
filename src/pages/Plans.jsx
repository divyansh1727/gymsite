// src/pages/Plans.jsx
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      const livePlans = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlans(livePlans);
    });

    return () => unsub();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-900 text-white py-20 px-6">
      {/* Section Heading */}
      <motion.h2
        className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold italic mb-16 drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Plan
      </motion.h2>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id || index}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 35px rgba(168,85,247,0.9)",
            }}
            transition={{ type: "spring", stiffness: 280 }}
            className="bg-[#111] border border-purple-500 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden flex flex-col"
          >
            {/* Animated Glow Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-purple-400 opacity-20 pointer-events-none"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />

            {/* Plan Name */}
            <h3 className="text-2xl md:text-3xl font-extrabold italic text-purple-400 mb-4 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
              {plan.name}
            </h3>

            {/* Plan Price */}
            <p className="text-3xl font-extrabold text-white mb-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
              {plan.price}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-10 text-gray-300 flex-grow text-left font-[cursive]">
              {plan.features?.map((feature, i) => (
                <li
                  key={i}
                  className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-purple-400"
                >
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link to="/register/form" state={{ plan }} className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-black px-8 py-3 rounded-xl font-bold italic 
                           shadow-lg drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]
                           hover:scale-105 hover:bg-purple-400 
                           transition-transform duration-300 w-full"
              >
                Join Now 🚀
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
