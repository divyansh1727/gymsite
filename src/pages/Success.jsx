// src/pages/Success.jsx
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-6 text-center">
        🎉 Welcome to IronFit Gym!
      </h1>
      <p className="text-lg md:text-xl mb-8 text-gray-300 text-center">
        Your membership has been successfully registered.
      </p>
      <Link
        to="/"
        className="bg-neon-green text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-white transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
