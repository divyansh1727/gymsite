// src/components/Navbar.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/logo/logo.png"; // adjust path if needed


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
    { name: "Trainers", path: "/trainers" },
    { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className="px-6 py-4 border-b border-purple-500 
                 flex justify-between items-center
                 bg-gradient-to-r from-purple-800 via-blue-900 to-black"
    >
      <motion.img
  src={Logo}
  alt="FitZone Logo"
  className="w-16 h-16 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-lg">
        {navLinks.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="text-white hover:text-purple-300 transition duration-300"
          >
            {name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-purple-300 text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Nav */}
      {open && (
        <div
          className="absolute top-16 left-0 w-full 
                     bg-gradient-to-b from-purple-800 via-blue-900 to-black 
                     border-t border-purple-500 p-4 flex flex-col md:hidden z-50"
        >
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)} // close on link click
              className="py-2 border-b border-gray-700 text-white hover:text-purple-300"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

