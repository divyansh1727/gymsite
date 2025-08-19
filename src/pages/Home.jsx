import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Trainers from "../pages/Trainers";
import Testimonials from "../pages/Testimonials"; // This can stay here for now
import Footer from "../components/Footer";
import About from "../pages/About";
import RegisterButton from "../components/RegisterButton";
import Plans from "../pages/Plans";
import AboutSection from "../components/AboutSection";




export default function Home() {
  return (
        <div className="relative overflow-hidden">

     
      <Hero />
      <WhyChooseUs />
      <About/>
      <AboutSection/>
      <Plans/>
      <Trainers/>
      <RegisterButton/>
      <Testimonials />
      <Footer />
    </div>
  );
}

