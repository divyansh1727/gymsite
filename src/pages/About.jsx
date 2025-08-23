import { motion } from "framer-motion";
import { FaDumbbell, FaWind, FaRunning, FaCrown } from "react-icons/fa";

export default function About() {
  return (
    <section className="relative bg-gradient-to-b from-black via-blue-950 to-purple-900 text-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
        >
          About Our Gym
        </motion.h1>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        >
          At{" "}
          <span className="text-purple-400 font-semibold">
            The Fitness Beast Gym
          </span>
          , we believe in transforming lives through{" "}
          <span className="text-white font-semibold">fitness, discipline,</span>{" "}
          and{" "}
          <span className="text-white font-semibold">community</span>. Whether
          you're a beginner or an athlete, our expert trainers, cutting-edge
          equipment, and motivating environment will help you reach your full
          potential.
        </motion.p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 text-gray-300">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-400 mb-3 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              To inspire and empower individuals to embrace a healthy lifestyle
              by providing world-class fitness training and a supportive
              environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-400 mb-3 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              To become the leading fitness destination where physical strength,
              mental toughness, and community come together to change lives.
            </p>
          </motion.div>
        </div>

        {/* We Provide Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-gradient-to-br from-purple-700/30 to-blue-900/30 backdrop-blur-md border border-purple-500/40 rounded-2xl p-8 mt-16 shadow-xl text-center"
        >
          <h2 className="text-3xl font-extrabold text-purple-400 mb-6 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">
            We Provide
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-lg text-gray-200 font-semibold">
            <div className="flex items-center gap-3">
              <FaRunning className="text-purple-400 text-2xl" />
              CrossFit Zone
            </div>
            <div className="flex items-center gap-3">
              <FaWind className="text-purple-400 text-2xl" />
              Fully Air Conditioned
            </div>
            <div className="flex items-center gap-3">
              <FaDumbbell className="text-purple-400 text-2xl" />
              Strength Training
            </div>
            <div className="flex items-center gap-3">
              <FaCrown className="text-purple-400 text-2xl" />
              Premium Equipment
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/plans"
            className="bg-purple-500 text-black px-10 py-4 rounded-2xl font-bold bungee 
                       shadow-lg drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]
                       hover:scale-105 hover:bg-purple-400 
                       transition-transform duration-300"
          >
            View Membership Plans
          </a>
        </motion.div>
      </div>
    </section>
  );
}
