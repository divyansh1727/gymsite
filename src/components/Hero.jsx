import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-screen overflow-hidden 
                 bg-gradient-to-b from-purple-800 via-blue-900 to-black text-white"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/gym.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* TFB Wildcat Logo/Text at Top */}
      <motion.div
        className="absolute top-6 w-full flex justify-center z-20"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <h2
          className="text-9xl sm:text-8xl md:text-[1rem] font-extrabold text-black drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          style={{ fontFamily: "'Bungee', sans-serif" }}
        >
          TFB
        </h2>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Train Insane or Remain the Same
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
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
