import { motion } from "framer-motion";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden 
                 bg-gradient-to-b from-purple-800 via-blue-900 to-black text-white"
    >
      <ParticlesBackground />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold italic mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Train Insane or Remain the Same
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg md:text-xl font-[cursive] text-gray-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Unlock your full potential with expert trainers, custom plans, and a
          fitness community that pushes you to be your best.
        </motion.p>
      </div>
    </section>
  );
}

