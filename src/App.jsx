import { Routes, Route, useLocation,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Public Pages
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
import AdminDashboard from "./pages/AdminDashboard"; // Layout with <Outlet />        // Dashboard homepage
import ManagePlans from "./pages/ManagePlans";
import ManageTrainers from "./pages/ManageTrainers";
import EditPlan from "./pages/EditPlan";       // Edit Plan page
import EditTrainer from "./pages/EditTrainer"; // Edit Trainer page
import AdminLayout from "./layout/AdminLayout";
import EditUser from "./pages/EditUser";
import ManageTestimonials from "./pages/ManageTestimonials";
import AddPlan from "./pages/AddPlan";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
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

        {/* Admin Routes */}
       <Route path="/admin" element={<AdminLayout />}>

       <Route index element={<Navigate to="panel" replace />} />
      <Route path="panel" element={<AdminDashboard />} />
      <Route path="plans" element={<ManagePlans />} />
      <Route path="trainers" element={<ManageTrainers />} />
      <Route path="edit-plan/:id" element={<EditPlan />} />
      <Route path="/admin/add-plan" element={<AddPlan />} />
      <Route path="edit-trainer" element={<EditTrainer />} />
      <Route path="edit-user/:id" element={<EditUser />} />
      <Route path="testimonials" element={<ManageTestimonials />} />


        </Route>
      </Routes>
    </>
  );
}
