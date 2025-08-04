import ContactForm from "../components/ContactForm";

import ParticlesBackground from "../components/ParticlesBackground";

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background particles layer */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl font-bold neon-text mb-4">Contact Us</h1>
        <p className="text-lg">
          You can reach us at: <span className="text-green-400">contact@gymzone.com</span>
        </p>
      </div>
    </div>
  );
}

