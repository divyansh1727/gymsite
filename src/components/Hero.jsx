import { motion } from "framer-motion";


export default function Hero() {
  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">
      {/* ✅ Particles background layer */}
      

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold neon-text mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Train Insane or Remain the Same
        </motion.h1>

        <p className="text-gray-300 max-w-2xl mb-6">
          Unlock your full potential with expert trainers, custom plans, and a fitness community that pushes you to be your best.
        </p>

        <motion.a
          href="#plans"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-black px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-green-400 transition"
        >
          Join Now
        </motion.a>
      </div>
    </section>
  );
}
