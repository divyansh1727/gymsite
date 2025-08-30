import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import your transformation images
import t1 from "../assets/trans/t1.jpg";
import t2 from "../assets/trans/t2.jpg";
import t3 from "../assets/trans/t3.jpg";
import t4 from "../assets/trans/t4.jpg";
import t5 from "../assets/trans/t5.jpg";

const images = [t1, t2, t3, t4, t5];

export default function Transformation() {
  const [index, setIndex] = useState(0);

  // Auto-change image every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-black-500"> {/* 🔹 same bg as trainers */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white-600 mb-10">
        Member Transformations
      </h2>

      <div className="relative w-full max-w-lg mx-auto h-96 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg bg-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt="Transformation"
            className="max-h-full max-w-full object-contain rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
