// src/pages/AdminDashboard.jsx
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 min-h-screen bg-neutral-950 text-white">
        <Outlet />
      </div>
    </div>
  );
}
