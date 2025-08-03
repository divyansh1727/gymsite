import TrainerCard from "../components/TrainerCard";

export default function Trainers() {
  return (
    <section className="min-h-screen bg-black text-white px-4 pt-24">
      <h1 className="text-4xl font-bold text-center neon-text mb-10">Meet Our Trainers</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <TrainerCard />
        
      </div>
    </section>
  );
}
