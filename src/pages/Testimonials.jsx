// src/pages/Testimonials.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Singh",
    rating: 5,
    review: "Joining this gym transformed my life. The trainers are amazing and the vibe is unmatched!",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Priya Mehta",
    rating: 3,
    review: "Best decision ever! I lost 10kg in 3 months and gained so much confidence. Highly recommended.",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "Rahul Verma",
    rating: 2,
    review: "Top-class equipment, motivating environment, and real results. What more do you want?",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Sana Patel",
    rating: 5,
    review: "Love the energy here. The neon gym theme keeps me hyped every day!",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Vikram Rao",
    rating: 3,
    review: "I travel 15km daily just for this gym. It's that good.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen bg-black py-16 px-6 text-white">
      <h1 className="text-4xl md:text-5xl font-bold neon-text text-center mb-12">
        What Our Clients Say
      </h1>

      <div
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: isHovered ? 0 : "-100%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.05}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-sm bg-neutral-900 p-6 rounded-2xl border border-neon shadow-neon snap-center"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-neon"
                />
                <div>
                  <h3 className="text-neon font-bold">{t.name}</h3>
                  <div className="flex">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-300 italic">"{t.review}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



