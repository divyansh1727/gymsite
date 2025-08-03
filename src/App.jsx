import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Trainers from "./pages/Trainers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ParticlesBackground from "./components/ParticlesBackground";

export default function App() {
  const location = useLocation();

  // Only show particles on Home page
  const showParticles = location.pathname === "/";

  return (
    <>
      {/* Show particles only on Home */}
      {showParticles && <ParticlesBackground />}

      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}



