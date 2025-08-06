import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Users</h1>

      <div className="grid gap-6">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-neutral-900 p-4 rounded-xl shadow-md border border-neutral-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Phone:</strong> {u.phone}</p>
                <p><strong>Alternate Phone:</strong> {u.alternatePhone || "—"}</p>
                <p><strong>Gender:</strong> {u.gender || "—"}</p>
                <p><strong>Blood Group:</strong> {u.bloodGroup || "—"}</p>
                <p><strong>Address:</strong> {u.address || "—"}</p>
                <p><strong>Previous Health Issues:</strong> {u.previousHealthProblems?.length > 0 ? u.previousHealthProblems.join(", ") : "None"}</p>
                <p><strong>Role:</strong> {u.role || "user"}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(u.id)}
                  className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

