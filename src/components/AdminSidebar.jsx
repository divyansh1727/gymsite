// src/components/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { FaChartLine, FaDumbbell, FaUserTie, FaSignOutAlt } from "react-icons/fa";

const links = [
  { path: "/admin", label: "Dashboard", icon: <FaChartLine /> },
  { path: "/admin/plans", label: "Manage Plans", icon: <FaDumbbell /> },
  { path: "/admin/trainers", label: "Manage Trainers", icon: <FaUserTie /> },
  // Add more links as needed
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-black text-neon-green p-4 shadow-lg border-r border-neutral-800">
      <h2 className="text-2xl font-bold mb-8 text-center neon-text">Admin Panel</h2>
      <nav className="space-y-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-neutral-800 transition ${
              location.pathname === link.path ? "bg-neutral-800 font-semibold" : ""
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}

        <button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white mt-6"
          onClick={() => {
            // Add real logout logic here
            alert("Logging out...");
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </div>
  );
}
