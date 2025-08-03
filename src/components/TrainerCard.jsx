import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function TrainerCard({ name, specialty, image }) {
  return (
    <motion.div
      className="bg-neutral-900 rounded-2xl shadow-md hover:shadow-neon transition p-4 max-w-xs mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img
        src={image}
        alt={name}
        className="rounded-xl w-full h-64 object-cover mb-4 border-2 border-neon"
      />
      <h2 className="text-white text-xl font-semibold text-center">{name}</h2>
      <p className="text-neutral-400 text-sm mt-2 text-center">{specialty}</p>

      <div className="flex justify-center gap-4 mt-4 text-neon text-2xl">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-500 transition" />
        </a>
      </div>
    </motion.div>
  );
}

