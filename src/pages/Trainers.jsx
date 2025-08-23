// src/pages/Trainers.jsx
import { motion } from "framer-motion";
import trainer1 from "../assets/trainers/trainer1.jpg";
import trainer2 from "../assets/trainers/trainer2.mp4";

export default function Trainers() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-purple-900 py-20 px-6 text-white">
      {/* Section Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-16 drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]"
      >
        Meet Our Trainers
      </motion.h1>

      {/* PT Pricing Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#111] border border-purple-500 rounded-2xl shadow-2xl p-8 max-w-lg mx-auto mb-20 text-center"
      >
        <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] mb-6">
          Personal Training Prices
        </h2>
        <ul className="space-y-4 text-lg text-gray-300 font-semibold">
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <span>1 Month</span>
            <span className="text-purple-300">₹6000</span>
          </li>
          <li className="flex justify-between border-b border-gray-700 pb-2">
            <span>6 Months</span>
            <span className="text-purple-300">₹15000</span>
          </li>
          <li className="flex justify-between">
            <span>12 Months</span>
            <span className="text-purple-300">₹27000</span>
          </li>
        </ul>
      </motion.div>

      {/* Trainers Grid */}
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto place-items-center">
        {/* Trainer 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.8)" }}
          className="bg-[#111] border border-purple-500 rounded-2xl p-6 shadow-xl w-full max-w-sm text-center"
        >
          <img
            src={trainer1}
            alt="Divyansh Singh"
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-purple-400 mb-6"
          />
          <h2 className="text-2xl font-extrabold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            Divyansh Singh
          </h2>
          <p className="text-gray-300 font mt-2">Certified Fitness Coach</p>
        </motion.div>

        {/* Trainer 2 (Video) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.8)" }}
          className="bg-[#111] border border-purple-500 rounded-2xl p-6 shadow-xl w-full max-w-sm text-center"
        >
          <video
            src={trainer2}
            autoPlay
            loop
            muted
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-purple-400 mb-6"
          />
          <h2 className="text-2xl font-extrabold text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            Ritik Raikwar
          </h2>
          <p className="text-gray-300 font-bungee mt-2">
            Strength & Conditioning
          </p>
        </motion.div>
      </div>
    </section>
  );
}
