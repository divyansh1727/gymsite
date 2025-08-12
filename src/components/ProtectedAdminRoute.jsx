import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role || "none";
          if (role === "admin") {
            setIsAdmin(true); // ✅ now updates state
          } else {
            console.warn(`Access denied: role is '${role}'`);
            navigate("/not-authorized");
          }
        } else {
          console.warn("Access denied: no user document found");
          navigate("/not-authorized");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        navigate("/not-authorized");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return isAdmin ? children : null;
}
