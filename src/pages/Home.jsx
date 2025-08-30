import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Trainers from "../pages/Trainers";
import Testimonials from "../pages/Testimonials"; 
import Footer from "../components/Footer";
import About from "../pages/About";
import RegisterButton from "../components/RegisterButton";
import Plans from "../pages/Plans";
import Contact from "../pages/Contact";
import Transformation from "./Transformation";
import Logo from "../assets/logo/logo.png"; // your logo path

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000); // 2 seconds splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* Splash Screen */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ scale: 0, y: -100, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              y: [-100, 0, 0],
              opacity: [0, 1, 1],
            }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img src={Logo} alt="Logo" className="w-60 h-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {showContent && (
        <>
          <Hero />
          <WhyChooseUs />
          <About />
          <Plans />
          <Trainers />

          {/* Registration & Admin Login Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-12 px-4">
            <RegisterButton />
            <Link
              to="admin-login"
              className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold"
            >
              Admin Login
            </Link>
          </div>
          <Transformation/>

          <Testimonials />
          <Contact/>
          <Footer />
        </>
      )}
    </div>
  );
}
