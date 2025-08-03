import trainer1 from "../assets/trainers/trainer1.jpg"; // You can add more images

export default function TrainerCard() {
  return (
    <div className="bg-neutral-900 p-4 rounded-2xl shadow-md hover:shadow-neon transition">
      <img
        src={trainer1}
        alt="Trainer"
        className="rounded-xl w-full h-60 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold neon-text">Divyansh Singh</h2>
      <p className="text-gray-400">Strength & Conditioning Coach</p>
    </div>
  );
}
