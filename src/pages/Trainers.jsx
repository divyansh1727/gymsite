// src/pages/Trainers.jsx
// src/pages/Trainers.jsx
import TrainerCard from "../components/TrainerCard";
import trainer1 from "../assets/trainers/trainer1.jpg";
import trainer2 from "../assets/trainers/trainer2.jpg"; // Add your second image here

export default function Trainers() {
  return (
    <section className="min-h-screen bg-black py-16 px-6 text-white">
      <h1 className="text-4xl md:text-5xl font-bold neon-text text-center mb-12">Meet Our Trainers</h1>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        <TrainerCard
          name="Divyansh Singh"
          specialty="Certified Fitness Coach"
          image={trainer1}
        />
        <TrainerCard
          name="Rajput"
          specialty="Strength & Conditioning"
          image={trainer2}
        />
      </div>
    </section>
  );
}
