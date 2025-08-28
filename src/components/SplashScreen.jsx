import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
 // your main site content
import Logo from "../assets/logo/logo.png"; // or wherever your logo is

import App from "../App";

export default function SplashScreen() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000); // 2s logo stay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, y: -100, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1], // bounce effect
              y: [-100, 0, 0],
              opacity: [0, 1, 1],
            }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <img src={Logo} alt="Gym Logo" className="w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && <App />} {/* Your main Gym site */}
    </div>
  );
}

