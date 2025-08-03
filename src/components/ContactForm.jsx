export default function ContactForm() {
  return (
    <form className="max-w-2xl mx-auto space-y-4">
      <input type="text" placeholder="Name" className="w-full p-3 bg-neutral-800 text-white rounded-xl" />
      <input type="email" placeholder="Email" className="w-full p-3 bg-neutral-800 text-white rounded-xl" />
      <textarea placeholder="Message" rows="5" className="w-full p-3 bg-neutral-800 text-white rounded-xl"></textarea>
      <button type="submit" className="bg-neon text-black font-semibold py-3 px-6 rounded-xl hover:scale-105 transition">
        Send Message
      </button>
    </form>
  );
}
