import SectionHeading from "../components/SectionHeading";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <SectionHeading title="Contact Us" subtitle="We'd love to hear from you!" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form className="bg-neutral-900 p-6 rounded-2xl shadow-md shadow-neon space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-transparent focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-transparent focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              rows="4"
              placeholder="Your message"
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-transparent focus:outline-none focus:border-neon"
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-neon border border-neon px-6 py-2 rounded-xl font-semibold hover:bg-neon hover:text-black transition duration-300 shadow-[0_0_10px_#39FF14]"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6 text-lg">
          <div>
            <h3 className="text-2xl font-bold text-neon mb-2">Location</h3>
            <p>Near Kedareshwar Mandir,Laxmi Nagar</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-neon mb-2">Email</h3>
            <p>support@gymfit.com</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-neon mb-2">Phone</h3>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
