import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Dumbbell, ClipboardList ,Megaphone} from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 p-6 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Admin Panel</h2>

        <nav className="flex flex-col space-y-3 text-lg">
          <NavLink
            to="/admin/panel"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-neutral-800 text-gray-300"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/plans"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-neutral-800 text-gray-300"
              }`
            }
          >
            <ClipboardList size={20} />
            Manage Plans
          </NavLink>

          <NavLink
            to="/admin/trainers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-neutral-800 text-gray-300"
              }`
            }
          >
            <Dumbbell size={20} />
            Manage Trainers
          </NavLink>
          <NavLink
  to="/admin/testimonials"
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-neutral-800 text-gray-300"
    }`
  }
>
  <Megaphone size={20} />
  Manage Testimonials
</NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

