import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import Trainers from "./Trainers";
import Testimonials from "../pages/Testimonials"; // This can stay here for now
import Footer from "../components/Footer";
import About from "./About";
import RegisterButton from "../components/RegisterButton";
import Plans from "./Plans";




export default function Home() {
  return (
        <div className="relative overflow-hidden">

     
      <Hero />
      <WhyChooseUs />
      <About/>
      <Plans/>
      <Trainers/>
      <RegisterButton/>
      <Testimonials />
      <Footer />
    </div>
  );
}

