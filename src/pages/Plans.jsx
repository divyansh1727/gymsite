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
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <motion.h2
        className="text-center text-4xl font-bold neon-text mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Plan
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id || index}
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px #39FF14" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[#111] border border-green-500 rounded-2xl shadow-lg p-6 text-center relative overflow-hidden flex flex-col"
          >
            {/* Animated glowing border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-green-400 opacity-20 pointer-events-none"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />

            <h3 className="text-2xl font-bold neon-text mb-4">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-green-400 mb-6">
              {plan.price}
            </p>

            <ul className="space-y-3 mb-8 text-gray-300 flex-grow">
              {plan.features?.map((feature, i) => (
                <li key={i} className="text-gray-300 text-left pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-green-400 before:content-['']">
                  {feature}
                </li>
              ))}
            </ul>

            <Link to="/register/form" state={{ plan }} className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#39FF14] text-black px-6 py-3 rounded-xl font-bold hover:bg-lime-400 transition shadow-lg w-full"
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
