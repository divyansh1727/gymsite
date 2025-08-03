import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section className="min-h-screen bg-black text-white px-4 pt-24">
      <h1 className="text-4xl font-bold text-center neon-text mb-10">Contact Us</h1>
      <ContactForm />
    </section>
  );
}
