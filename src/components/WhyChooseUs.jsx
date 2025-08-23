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
    <section className="bg-gradient-to-b from-purple-950 via-black to-blue-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-[Dancing_Script] font-bold text-white mb-14">
          Why Choose TFB?
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="bg-gray-900/80 p-8 rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/30 transition transform duration-300"
          >
            <div className="text-green-400 text-5xl mb-4">{f.icon}</div>
            <h3 className="text-2xl font-[Dancing_Script] font-semibold mb-3">
              {f.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

