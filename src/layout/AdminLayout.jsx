// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar"; // if you have one

export default function AdminLayout() {
  return (
    <div className="flex">
      {/* Sidebar or header if needed */}
      <AdminSidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
