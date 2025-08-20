import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          if (role === "admin") {
            setIsAdmin(true);
          } else {
            navigate("/not-authorized");
          }
        } else {
          navigate("/not-authorized");
        }
      } catch (err) {
        console.error("Admin check failed:", err);
        navigate("/not-authorized");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="text-white text-center mt-10">Checking access...</div>;
  }

  return isAdmin ? children : null;
}
//tLKSXjohrudJLprTKSUO3XFgljl2