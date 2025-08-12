import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Public Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Trainers from "./pages/Trainers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Join from "./pages/Join";
import Success from "./pages/Success";
import Testimonials from "./pages/Testimonials";
import GoogleLogin from "./pages/GoogleLogin";
import Register from "./pages/Register";
import RegisterForm from "./pages/RegisterForm";

// Admin Layout and Pages
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ManagePlans from "./pages/ManagePlans";
import ManageTrainers from "./pages/ManageTrainers";
import EditPlan from "./pages/EditPlan";
import EditTrainer from "./pages/EditTrainer";
import AdminLayout from "./layout/AdminLayout";
import EditUser from "./pages/EditUser";
import ManageTestimonials from "./pages/ManageTestimonials";
import AddPlan from "./pages/AddPlan";
import UploadStaticTrainers from "./pages/UploadStaticTrainers";
import ExtraDetailsForm from "./pages/ExtraDetailsForm";
import NotAuthorized from "./pages/NotAuthorized";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only on public pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
        <Route path="/success" element={<Success />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/form" element={<RegisterForm />} />
        <Route path="/extra-details" element={<ExtraDetailsForm />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />


        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          {/* Redirect /admin to /admin/panel */}
          <Route index element={<Navigate to="panel" replace />} />

          {/* Admin Pages */}
          <Route path="panel" element={<AdminDashboard />} />
          <Route path="plans" element={<ManagePlans />} />
          <Route path="add-plan" element={<AddPlan />} />
          <Route path="edit-plan/:id" element={<EditPlan />} />

          <Route path="trainers" element={<ManageTrainers />} />
          <Route path="trainers/upload" element={<UploadStaticTrainers />} />
          <Route path="edit-trainer/:id" element={<EditTrainer />} />

          <Route path="edit-user/:id" element={<EditUser />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
        </Route>
      </Routes>
    </>
  );
}
