import { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, onSnapshot } from "firebase/firestore";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa";

export default function Footer() {
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    const collRef = collection(db, "registrations");

    // Real-time listener
    const unsubscribe = onSnapshot(collRef, (snapshot) => {
      setMemberCount(snapshot.size); // snapshot.size = total docs in collection
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <footer className="bg-black border-t border-green-500 text-white px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-green-400 mb-4 font-mono">
            TFB
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Transform your body and mind. Join the best fitness community with
            top-notch trainers, tailored plans, and unmatched energy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            {["Home", "Plans", "Trainers", "Contact", "Testimonials"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-green-400 transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-400 uppercase tracking-wide">
            Follow Us
          </h3>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://instagram.com/fitness_beast_gym"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/7224030844"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp />
            </a>

            <a href="#" className="hover:text-red-600 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Members Count */}
      <div className="mt-10 text-center text-green-400 font-semibold text-sm">
        Total Members: {memberCount}
      </div>

      {/* Bottom Line */}
      <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FitZone. All rights reserved.
      </div>
    </footer>
  );
}
