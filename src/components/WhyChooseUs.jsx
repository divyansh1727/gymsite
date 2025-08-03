import { FaDumbbell, FaUserShield, FaClock, FaAppleAlt, FaMoneyBillWave } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserShield />,
      title: "Certified Trainers",
      desc: "Train with professionals who are certified and experienced.",
    },
    {
      icon: <FaDumbbell />,
      title: "Modern Equipment",
      desc: "State-of-the-art machines and training tools.",
    },
    {
      icon: <FaClock />,
      title: "24/7 Access",
      desc: "Workout any time, any day—your schedule, your rules.",
    },
    {
      icon: <FaAppleAlt />,
      title: "Diet Plans",
      desc: "Custom nutrition guidance tailored to your goals.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Affordable Plans",
      desc: "Top-quality training that fits your budget.",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold neon-text mb-10">Why Choose FitZone?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-2xl shadow-md hover:scale-105 transition transform duration-300"
            >
              <div className="text-green-400 text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

