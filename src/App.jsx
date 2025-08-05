import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Trainers from "./pages/Trainers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Join from "./pages/Join";
import Success from "./pages/Success";
import Testimonials from "./pages/Testimonials";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import GoogleLogin from "./pages/GoogleLogin";
import Register from "./pages/Register";
import RegisterForm from "./pages/RegisterForm";




export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
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

      


        {/* Protected Admin Layout with Nested Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="panel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}



