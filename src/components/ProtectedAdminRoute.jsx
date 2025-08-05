// src/components/ProtectedAdminRoute.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.role === "admin") {
              setIsAdmin(true);
            } else {
              navigate("/"); // not admin, redirect
            }
          } else {
            navigate("/");
          }
        } else {
          navigate("/"); // not logged in
        }
        setLoading(false);
      });
    };

    checkRole();
  }, [navigate]);

  if (loading) return <div className="text-white text-center">Checking access...</div>;
  return isAdmin ? children : null;
}
