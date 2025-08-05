// src/pages/RegisterPage.jsx
import { Link } from "react-router-dom";

export default function RegisterButton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Link
        to="/register"
        className="px-9 py-6 text-xl font-bold rounded-xl border-2 border-green-500 text-green-400 
                   hover:border-pink-500 hover:text-pink-400 
                   transition duration-300 shadow-lg hover:shadow-pink-500"
      >
        Register
      </Link>
    </div>
  );
}

