// src/pages/About.jsx
export default function About() {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold neon-text text-center mb-10">
          About Our Gym
        </h1>

        <p className="text-lg text-neutral-400 mb-8 text-center">
          At <span className="text-neon font-semibold">BeastMode Gym</span>, we
          believe in transforming lives through fitness, discipline, and
          community. Whether you're a beginner or an athlete, our expert trainers,
          cutting-edge equipment, and motivating environment will help you reach
          your full potential.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-neutral-300">
          <div>
            <h2 className="text-2xl text-neon font-semibold mb-2">Our Mission</h2>
            <p>
              To inspire and empower individuals to embrace a healthy lifestyle by
              providing world-class fitness training and a supportive environment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-neon font-semibold mb-2">Our Vision</h2>
            <p>
              To become the leading fitness destination where physical strength,
              mental toughness, and community come together to change lives.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/plans"
            className="bg-neon text-black px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition"
          >
            View Membership Plans
          </a>
        </div>
      </div>
    </section>
  );
}
