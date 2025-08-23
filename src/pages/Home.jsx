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

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-black text-white">

      <Hero />
      <WhyChooseUs />
      <About />
      <Plans />
      <Trainers />

      {/* Registration & Admin Login Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-12 px-4">
        <RegisterButton /> {/* existing user registration button */}

        <Link
          to="admin-login"
          className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold"
        >
          Admin Login
        </Link>
      </div>

      <Testimonials />
      <Contact/>
      <Footer />
    </div>
  );
}
