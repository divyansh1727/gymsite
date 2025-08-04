import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Trainers from "./Trainers";
import Testimonials from "../pages/Testimonials"; // This can stay here for now
import Footer from "../components/Footer";
import About from "./About";

export default function Home() {
  return (
        <div className="relative overflow-hidden">

     
      <Hero />
      <WhyChooseUs />
      <About/>
      <Trainers/>
      <Testimonials />
      <Footer />
    </div>
  );
}

