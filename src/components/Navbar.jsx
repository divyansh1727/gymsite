// src/components/Navbar.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
    { name: "Trainers", path: "/trainers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black px-6 py-4 border-b border-green-500 flex justify-between items-center">
      <motion.h1
        className="text-3xl font-extrabold neon-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        FitZone
      </motion.h1>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-lg">
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="hover:text-green-400 transition duration-300 text-white"
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-green-400 text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Nav */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-black border-t border-green-500 p-4 flex flex-col md:hidden z-50">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)} // close on link click
              className="py-2 border-b border-gray-700 text-white hover:text-green-400"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

