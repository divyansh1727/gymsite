import { motion } from "framer-motion";

export default function RegisterModal({ onGoogle, onEmail, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 p-6 rounded-lg w-80 text-center shadow-lg border border-neon-green"
      >
        <h2 className="text-lg font-bold text-white mb-4">Choose Sign Up Method</h2>
        <button
          onClick={onGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded mb-3"
        >
          Continue with Google
        </button>
        <button
          onClick={onEmail}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Register with Email
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-gray-400 hover:text-white text-sm"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
